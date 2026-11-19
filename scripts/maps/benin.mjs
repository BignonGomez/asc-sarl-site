#!/usr/bin/env node
/**
 * Carte de localisation du Bénin (fiche de mission de l'accueil) : src/assets/carte-benin.svg
 * Données : Natural Earth 1:10m (domaine public), via le paquet world-atlas@2.0.2.
 *
 *   node scripts/maps/benin.mjs extract <countries-10m.json>   → écrit scripts/maps/benin-ne.json (contours utiles, allégés)
 *   node scripts/maps/benin.mjs                                → génère l'SVG depuis benin-ne.json
 *
 * Contenu : Bénin (contour), pays voisins en trait léger, graticule réel (1°), siège à Cotonou,
 * et un repère « mission » sur le département du Zou (position du département, pas d'un site précis).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const DATA = join(HERE, 'benin-ne.json');
const IDS = { '204': 'Bénin', '768': 'Togo', '566': 'Nigeria', '562': 'Niger', '854': 'Burkina Faso' };

if (process.argv[2] === 'extract') {
  const topo = JSON.parse(readFileSync(process.argv[3], 'utf-8'));
  const { scale, translate } = topo.transform;
  const arcs = topo.arcs.map((arc) => { let x = 0, y = 0; return arc.map(([dx, dy]) => { x += dx; y += dy; return [x * scale[0] + translate[0], y * scale[1] + translate[1]]; }); });
  const ring = (ids) => ids.flatMap((i, k) => { const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i]; return k ? a.slice(1) : a; });
  const out = {};
  for (const g of topo.objects.countries.geometries) {
    if (!IDS[g.id]) continue;
    const polys = g.type === 'Polygon' ? [g.arcs] : g.arcs;
    out[g.id] = polys.map((p) => ring(p[0]).filter(([lon, lat]) => lon > -2 && lon < 6.5 && lat > 4.5 && lat < 14.5).map(([a, b]) => [+a.toFixed(3), +b.toFixed(3)])).filter((r) => r.length > 2);
  }
  writeFileSync(DATA, JSON.stringify(out));
  console.log('benin-ne.json écrit');
  process.exit(0);
}

const data = JSON.parse(readFileSync(DATA, 'utf-8'));
// Projection équirectangulaire corrigée de la latitude moyenne (≈ 9,3° N)
const LON0 = 0.2, LON1 = 4.4, LAT0 = 5.9, LAT1 = 12.7, K = Math.cos((9.3 * Math.PI) / 180);
const W = 420, H = Math.round(W * ((LAT1 - LAT0) / ((LON1 - LON0) * K)));
const px = (lon, lat) => [((lon - LON0) / (LON1 - LON0)) * W, ((LAT1 - lat) / (LAT1 - LAT0)) * H];
const r1 = (v) => Math.round(v * 10) / 10;
const path = (rings, close) => rings.map((r) => 'M' + r.map(([a, b]) => px(a, b).map(r1).join(',')).join('L') + (close ? 'Z' : '')).join('');

const pts = {
  cotonou: px(2.42, 6.37),   // Cotonou
  zou: px(2.15, 7.25),       // Département du Zou (centre approximatif)
};
const grid = [];
for (let lon = 1; lon <= 4; lon++) { const [x] = px(lon, 0); grid.push(`M${r1(x)},0V${H}`); }
for (let lat = 6; lat <= 12; lat++) { const [, y] = px(0, lat); grid.push(`M0,${r1(y)}H${W}`); }
const labels = [];
for (let lon = 1; lon <= 4; lon++) { const [x] = px(lon, 0); labels.push(`<text x="${r1(x) + 4}" y="${H - 8}">${lon}°E</text>`); }
for (let lat = 7; lat <= 12; lat++) { const [, y] = px(0, lat); labels.push(`<text x="6" y="${r1(y) - 5}">${lat}°N</text>`); }

const neighbors = Object.keys(data).filter((k) => k !== '204').map((k) => path(data[k], true)).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="cb" role="img" aria-labelledby="cb-t">
<title id="cb-t">Carte du Bénin : siège à Cotonou et mission en cours dans le département du Zou</title>
<defs><clipPath id="cb-clip"><rect width="${W}" height="${H}"/></clipPath></defs>
<g clip-path="url(#cb-clip)">
<path class="cb-grid" d="${grid.join('')}"/>
<path class="cb-neighbors" d="${neighbors}"/>
<path class="cb-country" d="${path(data['204'], true)}"/>
<g class="cb-labels">${labels.join('')}</g>
<g class="cb-pt cb-pt--siege" transform="translate(${pts.cotonou.map(r1).join(' ')})"><circle r="4"/><text x="9" y="4">Cotonou · siège</text></g>
<g class="cb-pt cb-pt--mission" transform="translate(${pts.zou.map(r1).join(' ')})"><circle class="cb-ring" r="11"/><rect x="-5" y="-5" width="10" height="10"/><text x="12" y="-8">Zou · mission en cours</text></g>
<text class="cb-sea" x="${r1(px(0.45, 5.98)[0])}" y="${r1(px(0.45, 5.98)[1])}">Golfe de Guinée</text>
</g>
</svg>
`;
writeFileSync(join(ROOT, 'src', 'assets', 'carte-benin.svg'), svg);
console.log(`carte-benin.svg : ${(svg.length / 1024).toFixed(1)} Ko (${W}×${H})`);
