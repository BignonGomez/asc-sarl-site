#!/usr/bin/env node
/**
 * Génère la carte technique du héro : src/assets/hero-map.svg
 * Bassin versant TYPE (schéma illustratif, pas un lieu réel) construit à partir d'un relief calculé :
 *   1. carroyage (graticule) ;
 *   2. occupation des sols (sols nus / latérite, couvert végétal) ;
 *   3. courbes de niveau (courbes maîtresses tous les 5 niveaux) ;
 *   4. réseau hydrographique obtenu par plus grande pente : il suit réellement les talwegs du relief ;
 *   5. stations de mesure, carroyage référencé (A, B… / 1, 2…), nord. Pas d'échelle ni de coordonnées : la carte n'est pas un lieu réel.
 * Sortie déterministe (graine fixe) ; les couleurs sont portées par des classes CSS (jetons --color-map-*).
 * Usage : node scripts/hero-map/generate.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const W = 800, H = 900;           // Cadre de la carte (portrait léger : colonne droite du héro)
const NX = 120, NY = 135;         // Résolution du relief
const sx = W / (NX - 1), sy = H / (NY - 1);

// ---------- Bruit déterministe ----------
let seed = 20251;
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const perm = Array.from({ length: 256 }, (_, i) => i).sort(() => rand() - 0.5);
const grad = (h, x, y) => ((h & 1) ? x : -x) + ((h & 2) ? y : -y);
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
function noise(x, y) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  const xf = x - Math.floor(x), yf = y - Math.floor(y);
  const p = (i, j) => perm[(perm[(X + i) & 255] + Y + j) & 255];
  const u = fade(xf), v = fade(yf);
  const a = grad(p(0, 0), xf, yf), b = grad(p(1, 0), xf - 1, yf);
  const c = grad(p(0, 1), xf, yf - 1), d = grad(p(1, 1), xf - 1, yf - 1);
  return (a + u * (b - a)) + v * ((c + u * (d - c)) - (a + u * (b - a)));
}
const fbm = (x, y, o = 4) => { let s = 0, a = 0.5, f = 1; for (let i = 0; i < o; i++) { s += a * noise(x * f, y * f); a *= 0.5; f *= 2; } return s; };

// ---------- Relief : vallée principale orientée nord-est → sud-ouest, crêtes latérales ----------
const hgt = [];
for (let j = 0; j < NY; j++) {
  hgt.push([]);
  for (let i = 0; i < NX; i++) {
    const x = i / (NX - 1), y = j / (NY - 1);
    const valleyX = 0.58 - 0.28 * y + 0.06 * Math.sin(y * 7);          // axe du talweg principal
    const valley = Math.min(1, Math.abs(x - valleyX) * 2.1);           // 0 au fond de vallée
    const slope = 0.55 * (1 - y);                                      // pente générale vers le sud
    const hills = 0.9 * Math.exp(-((x - 0.15) ** 2 + (y - 0.25) ** 2) / 0.03) + 0.7 * Math.exp(-((x - 0.9) ** 2 + (y - 0.55) ** 2) / 0.04);
    hgt[j].push(slope + 0.75 * valley ** 1.4 + hills + 0.32 * fbm(x * 4.2, y * 4.2) + 0.03 * fbm(x * 12, y * 12, 2));
  }
}
let hmin = Infinity, hmax = -Infinity;
for (const r of hgt) for (const v of r) { hmin = Math.min(hmin, v); hmax = Math.max(hmax, v); }

// ---------- Courbes de niveau (marching squares + chaînage) ----------
const r1 = (v) => Math.round(v * 10) / 10;
function contours(field, level, minLen = 8) {
  const segs = [];
  const lerp = (a, b) => (level - a) / (b - a);
  for (let j = 0; j < NY - 1; j++) for (let i = 0; i < NX - 1; i++) {
    const a = field[j][i], b = field[j][i + 1], c = field[j + 1][i + 1], d = field[j + 1][i];
    const idx = (a > level) | ((b > level) << 1) | ((c > level) << 2) | ((d > level) << 3);
    if (idx === 0 || idx === 15) continue;
    const T = [(i + lerp(a, b)) * sx, j * sy], R = [(i + 1) * sx, (j + lerp(b, c)) * sy];
    const B = [(i + lerp(d, c)) * sx, (j + 1) * sy], L = [i * sx, (j + lerp(a, d)) * sy];
    const map = { 1: [[L, T]], 2: [[T, R]], 3: [[L, R]], 4: [[R, B]], 5: [[L, T], [R, B]], 6: [[T, B]], 7: [[L, B]], 8: [[B, L]], 9: [[T, B]], 10: [[T, R], [B, L]], 11: [[R, B]], 12: [[R, L]], 13: [[T, R]], 14: [[L, T]] };
    for (const s of map[idx]) segs.push(s);
  }
  // Chaînage non orienté : chaque extrémité est indexée, la polyligne est prolongée par ses deux bouts
  const key = (p) => `${Math.round(p[0] * 100)},${Math.round(p[1] * 100)}`;
  const at = new Map();
  segs.forEach((sg, n) => { for (const e of [0, 1]) { const k = key(sg[e]); if (!at.has(k)) at.set(k, []); at.get(k).push(n); } });
  const used = new Uint8Array(segs.length), lines = [];
  const extend = (line, end) => {
    for (;;) {
      const p = end ? line[line.length - 1] : line[0];
      const n = (at.get(key(p)) ?? []).find((m) => !used[m]);
      if (n === undefined) return;
      used[n] = 1;
      const sg = segs[n], q = key(sg[0]) === key(p) ? sg[1] : sg[0];
      end ? line.push(q) : line.unshift(q);
    }
  };
  segs.forEach((sg, n) => {
    if (used[n]) return;
    used[n] = 1;
    const line = [sg[0], sg[1]];
    extend(line, true); extend(line, false);
    if (line.length > minLen) lines.push(line);
  });
  return lines;
}
// Simplification (Ramer-Douglas-Peucker) puis lissage en courbes de Catmull-Rom
function rdp(pts, eps) {
  if (pts.length < 3) return pts;
  const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1];
  let dmax = 0, k = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i];
    const d = Math.abs((by - ay) * px - (bx - ax) * py + bx * ay - by * ax) / (Math.hypot(bx - ax, by - ay) || 1);
    if (d > dmax) { dmax = d; k = i; }
  }
  return dmax > eps ? [...rdp(pts.slice(0, k + 1), eps).slice(0, -1), ...rdp(pts.slice(k), eps)] : [pts[0], pts[pts.length - 1]];
}
function smoothPath(pts, closed = false) {
  const p = pts.map(([x, y]) => [r1(x), r1(y)]);
  if (p.length < 3) return `M${p.map((q) => q.join(',')).join('L')}`;
  let d = `M${p[0][0]},${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? (closed ? p[p.length - 2] : p[i]), p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] ?? (closed ? p[1] : p2);
    const c1 = [r1(p1[0] + (p2[0] - p0[0]) / 6), r1(p1[1] + (p2[1] - p0[1]) / 6)];
    const c2 = [r1(p2[0] - (p3[0] - p1[0]) / 6), r1(p2[1] - (p3[1] - p1[1]) / 6)];
    d += `C${c1} ${c2} ${p2}`;
  }
  return d + (closed ? 'Z' : '');
}

const LEVELS = 18;
const contourPaths = [];
for (let k = 1; k < LEVELS; k++) {
  const level = hmin + ((hmax - hmin) * k) / LEVELS;
  for (const line of contours(hgt, level)) {
    const closed = Math.hypot(line[0][0] - line.at(-1)[0], line[0][1] - line.at(-1)[1]) < 2;
    contourPaths.push({ d: smoothPath(rdp(line, 2.4), closed), master: k % 4 === 0 });
  }
}

// ---------- Occupation des sols (second champ de bruit) ----------
const land = hgt.map((row, j) => row.map((_, i) => fbm(i / NX * 3.1 + 11, j / NY * 3.1 + 7, 3)));
const soilPaths = contours(land, 0.12, 20).map((l) => smoothPath(rdp(l, 3), true));
const vegPaths = contours(land, -0.14, 20).map((l) => smoothPath(rdp(l, 3), true));

// Lissage de Chaikin (extrémités conservées) : adoucit les marches de la grille D8
function chaikin(pts, it) {
  let p = pts;
  for (let k = 0; k < it; k++) {
    const q = [p[0]];
    for (let i = 0; i < p.length - 1; i++) {
      const [x0, y0] = p[i], [x1, y1] = p[i + 1];
      q.push([0.75 * x0 + 0.25 * x1, 0.75 * y0 + 0.25 * y1], [0.25 * x0 + 0.75 * x1, 0.25 * y0 + 0.75 * y1]);
    }
    q.push(p[p.length - 1]); p = q;
  }
  return p;
}

// ---------- Réseau hydrographique : comblement des dépressions, directions D8, accumulation de flux ----------
// 1. Comblement (priority-flood) depuis le bord sud : tout le bassin s'écoule vers l'aval, sans cuvette.
const N = NX * NY, idx = (i, j) => j * NX + i;
const filled = new Float64Array(N).fill(Infinity), done = new Uint8Array(N);
const heap = [];
const push = (n, v) => { heap.push([v, n]); let c = heap.length - 1; while (c > 0) { const p = (c - 1) >> 1; if (heap[p][0] <= heap[c][0]) break; [heap[p], heap[c]] = [heap[c], heap[p]]; c = p; } };
const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let c = 0; for (;;) { const l = 2 * c + 1, r = l + 1; let m = c; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (r < heap.length && heap[r][0] < heap[m][0]) m = r; if (m === c) break; [heap[m], heap[c]] = [heap[c], heap[m]]; c = m; } } return top; };
for (let i = 0; i < NX; i++) { const n = idx(i, NY - 1); filled[n] = hgt[NY - 1][i]; done[n] = 1; push(n, filled[n]); }
const NB = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
while (heap.length) {
  const [v, n] = pop(); const i = n % NX, j = (n / NX) | 0;
  for (const [di, dj] of NB) {
    const a = i + di, b = j + dj; if (a < 0 || b < 0 || a >= NX || b >= NY) continue;
    const m = idx(a, b); if (done[m]) continue;
    // Sur les zones comblées, une pente infime et légèrement aléatoire évite les écoulements rectilignes
    done[m] = 1; filled[m] = Math.max(hgt[b][a], v + 1e-5 * (0.2 + rand())); push(m, filled[m]);
  }
}
// 2. Direction D8 (plus forte pente vers un voisin) et accumulation de flux (cellules triées de l'amont vers l'aval)
const down = new Int32Array(N).fill(-1);
for (let j = 0; j < NY - 1; j++) for (let i = 0; i < NX; i++) {
  const n = idx(i, j); let best = 0;
  for (const [di, dj] of NB) {
    const a = i + di, b = j + dj; if (a < 0 || b < 0 || a >= NX || b >= NY) continue;
    const drop = (filled[n] - filled[idx(a, b)]) / Math.hypot(di, dj);
    if (drop > best) { best = drop; down[n] = idx(a, b); }
  }
}
const order = Array.from({ length: N }, (_, n) => n).sort((a, b) => filled[b] - filled[a]);
const acc = new Float64Array(N).fill(1);
for (const n of order) if (down[n] >= 0) acc[down[n]] += acc[n];
// 3. Tracé : chaque tronçon part d'une tête de chenal et descend jusqu'à rejoindre un tronçon déjà tracé
const T = 260;                                   // seuil d'accumulation (cellules) pour former un chenal
const isCh = (n) => acc[n] >= T;
const drawn = new Uint8Array(N);
const heads = [];
for (let n = 0; n < N; n++) if (isCh(n)) {
  const i = n % NX, j = (n / NX) | 0;
  const fed = NB.some(([di, dj]) => { const a = i + di, b = j + dj; return a >= 0 && b >= 0 && a < NX && b < NY && down[idx(a, b)] === n && isCh(idx(a, b)); });
  if (!fed) heads.push(n);
}
heads.sort((a, b) => filled[a] - filled[b]);    // les plus bas d'abord : le tronc principal est tracé en premier
const pt = (n) => [(n % NX) * sx, ((n / NX) | 0) * sy];
const rivers = [];
let maxAcc = 0; for (let n = 0; n < N; n++) maxAcc = Math.max(maxAcc, acc[n]);
for (const h of heads) {
  const line = []; let n = h, peak = 0;
  while (n >= 0) {
    line.push(pt(n)); peak = Math.max(peak, acc[n]);
    if (drawn[n]) break;
    drawn[n] = 1; n = down[n];
  }
  if (line.length < 6) continue;
  const w = Math.log(peak / T + 1) / Math.log(maxAcc / T + 1);   // 0 → 1 selon l'importance du cours d'eau
  rivers.push({ d: smoothPath(rdp(chaikin(line, 3), 1.4)), order: w > 0.7 ? 3 : w > 0.38 ? 2 : 1, line });
}
const main = rivers.filter((r) => r.order === 3).reduce((a, b) => (b.line.length > a.line.length ? b : a));

// ---------- Stations de mesure (repères techniques) ----------
// Stations hydrométriques posées sur le cours d'eau principal ; piézomètre et point de sondage sur les versants
const onMain = (f) => { const [x, y] = main.line[Math.floor(main.line.length * f)]; return { x: x / W, y: y / H }; };
const stations = [
  { id: 'H-01', ...onMain(0.42), type: 'hydro' },
  { id: 'H-02', ...onMain(0.8), type: 'hydro' },
  { id: 'P-03', x: 0.8, y: 0.26, type: 'piezo' },
  { id: 'S-04', x: 0.5, y: 0.16, type: 'sol' },
].map((s) => ({ ...s, x: r1(s.x * W), y: r1(s.y * H) }));

// ---------- Assemblage ----------
const grid = [];
for (let x = 100; x < W; x += 100) grid.push(`M${x},0V${H}`);
for (let y = 100; y < H; y += 100) grid.push(`M0,${y}H${W}`);
const ticks = [];
// Références de carroyage neutres (A, B, C… / 1, 2, 3…) : la carte est schématique, aucune coordonnée réelle n'est affichée
for (let x = 0; x < W; x += 100) ticks.push(`<text x="${x + 6}" y="16">${String.fromCharCode(65 + x / 100)}</text>`);
for (let y = 100; y < H; y += 100) ticks.push(`<text x="6" y="${y - 6}">${y / 100}</text>`);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="hm" role="img" aria-labelledby="hm-t hm-d" preserveAspectRatio="xMidYMid slice">
<title id="hm-t">Carte technique schématique d'un bassin versant</title>
<desc id="hm-d">Représentation illustrative : courbes de niveau, réseau hydrographique, occupation des sols et stations de mesure.</desc>
<defs>
<pattern id="hm-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0,0V7" class="hm-hatch-line"/></pattern>
<clipPath id="hm-frame"><rect width="${W}" height="${H}"/></clipPath>
<mask id="hm-river-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect class="hm-river-reveal" width="${W}" height="${H}" fill="#fff"/></mask>
</defs>
<g clip-path="url(#hm-frame)">
<g class="hm-layer hm-grid" style="--i:0"><path d="${grid.join('')}"/></g>
<g class="hm-layer hm-land" style="--i:1">
${soilPaths.map((d) => `<path class="hm-soil" d="${d}"/>`).join('\n')}
${vegPaths.map((d) => `<path class="hm-veg" d="${d}"/>`).join('\n')}
</g>
<g class="hm-layer hm-relief" style="--i:2">
${contourPaths.map((c) => `<path${c.master ? ' class="hm-master"' : ''} d="${c.d}"/>`).join('\n')}
</g>
<g class="hm-layer hm-water" style="--i:3" mask="url(#hm-river-mask)">
${rivers.map((r) => `<path class="hm-o${r.order}" d="${r.d}"/>`).join('\n')}
</g>
<g class="hm-layer hm-stations" style="--i:4">
${stations.map((s, n) => `<g class="hm-st hm-st--${s.type}" transform="translate(${s.x} ${s.y})" style="--n:${n}"><circle class="hm-st-ring" r="14"/><rect x="-5" y="-5" width="10" height="10"/><text x="12" y="-10">${s.id}</text></g>`).join('\n')}
</g>
<g class="hm-layer hm-ticks" style="--i:5">${ticks.join('')}</g>
<g class="hm-layer hm-furniture" style="--i:5" transform="translate(${W - 40} 60)"><path class="hm-north" d="M0,-22L8,10L0,4L-8,10Z"/><text x="-4" y="28">N</text></g>
</g>
</svg>
`;
mkdirSync(join(ROOT, 'src', 'assets'), { recursive: true });
writeFileSync(join(ROOT, 'src', 'assets', 'hero-map.svg'), svg);
console.log(`hero-map.svg : ${(svg.length / 1024).toFixed(1)} Ko, ${contourPaths.length} courbes, ${soilPaths.length + vegPaths.length} zones, ${rivers.length} cours d'eau`);
