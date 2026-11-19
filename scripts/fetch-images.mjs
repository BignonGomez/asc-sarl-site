#!/usr/bin/env node
/**
 * Recherche et intégration d'images libres (source unique : API Pixabay).
 * Unsplash est volontairement exclu (ses conditions d'API imposent l'affichage depuis ses serveurs).
 *
 * La clé est lue dans site/.env (PIXABAY_API_KEY). Elle n'est jamais affichée ni écrite ailleurs.
 *
 * Usage :
 *   node scripts/fetch-images.mjs search "river hydrology measurement" [--min 1920] [--orientation horizontal|vertical|all] [--n 12]
 *       → liste les candidats (identifiant, dimensions, auteur, mots-clés, aperçu) triés par résolution.
 *   node scripts/fetch-images.mjs get <id> --name <nom-fichier> --page "<page d'usage>" --alt "<texte alternatif>" [--min 1920]
 *       → télécharge l'image, la convertit en AVIF et WebP (640, 1280, 1920 px max selon l'original)
 *         dans public/images/photos/, et l'inscrit dans le registre images.json (racine du site).
 *
 * Règles (CLAUDE.md, section 9) : mots-clés anglais précis ; jamais de mention « libre de droit » sur le site ;
 * aucune image d'archives pour Réalisations et Équipe.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public', 'images', 'photos');
const REGISTRY = join(ROOT, 'images.json');
const WIDTHS = [640, 1280, 1920];

// ---------- Lecture de la clé (sans jamais l'afficher) ----------
function readKey(name) {
  if (process.env[name]) return process.env[name].trim();
  const file = join(ROOT, '.env');
  if (!existsSync(file)) return '';
  for (const line of readFileSync(file, 'utf-8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && m[1] === name) return m[2].replace(/^["']|["']$/g, '').trim();
  }
  return '';
}
const KEY = readKey('PIXABAY_API_KEY');
if (!KEY) {
  console.error("PIXABAY_API_KEY absente de .env : recherche impossible. Déposez des images dans /images-source ou renseignez la clé.");
  process.exit(1);
}

// ---------- Arguments ----------
const [cmd, ...rest] = process.argv.slice(2);
const args = { _: [] };
for (let i = 0; i < rest.length; i++) {
  if (rest[i].startsWith('--')) args[rest[i].slice(2)] = rest[i + 1], i++;
  else args._.push(rest[i]);
}

/** Appel à l'API ; les erreurs sont nettoyées pour ne jamais faire apparaître la clé. */
async function api(params) {
  const url = new URL('https://pixabay.com/api/');
  url.search = new URLSearchParams({ key: KEY, image_type: 'photo', safesearch: 'true', lang: 'en', ...params });
  let res;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      res = await fetch(url);
      if (res.status === 429) { await new Promise((r) => setTimeout(r, 2000 * attempt)); continue; }
      break;
    } catch (e) {
      if (attempt === 3) throw new Error(`Réseau indisponible (${e.code ?? e.message})`);
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
  if (!res.ok) throw new Error(`Pixabay a répondu ${res.status} ${res.statusText}`);
  return res.json();
}

/** Meilleure URL disponible selon le niveau d'accès de la clé. */
const bestUrl = (h) => h.imageURL || h.fullHDURL || h.largeImageURL;
const bestWidth = (h) => (h.imageURL ? h.imageWidth : h.fullHDURL ? Math.min(1920, h.imageWidth) : Math.min(1280, h.imageWidth));

async function search(q) {
  if (!q) throw new Error('Indiquez des mots-clés : search "mots clés"');
  const min = Number(args.min ?? 1920);
  const data = await api({
    q: q.slice(0, 100),
    orientation: args.orientation ?? 'horizontal',
    min_width: String(min),
    per_page: String(Math.min(200, Math.max(3, Number(args.n ?? 12)))),
    order: 'popular',
  });
  const hits = data.hits.sort((a, b) => bestWidth(b) - bestWidth(a));
  console.log(`${data.totalHits} résultat(s) pour « ${q} » (≥ ${min} px) ; ${hits.length} affiché(s)\n`);
  for (const h of hits) {
    console.log(`#${h.id}  ${h.imageWidth}×${h.imageHeight} (téléchargeable : ${bestWidth(h)} px)  par ${h.user}`);
    console.log(`   mots-clés : ${h.tags}`);
    console.log(`   aperçu : ${h.webformatURL}`);
    console.log(`   page : ${h.pageURL}\n`);
  }
}

async function get(id) {
  if (!/^\d+$/.test(id ?? '')) throw new Error('Identifiant Pixabay numérique attendu : get <id>');
  for (const k of ['name', 'page', 'alt']) if (!args[k]) throw new Error(`Option --${k} obligatoire`);
  if (!/^[a-z0-9-]+$/.test(args.name)) throw new Error('--name : minuscules, chiffres et tirets uniquement');
  const data = await api({ id });
  const h = data.hits?.[0];
  if (!h) throw new Error(`Image ${id} introuvable`);
  const min = Number(args.min ?? 0);
  if (bestWidth(h) < min) throw new Error(`Résolution insuffisante : ${bestWidth(h)} px < ${min} px`);

  const res = await fetch(bestUrl(h));
  if (!res.ok) throw new Error(`Téléchargement refusé (${res.status})`);
  const input = Buffer.from(await res.arrayBuffer());
  const meta = await sharp(input).metadata();
  mkdirSync(OUT_DIR, { recursive: true });

  const files = [];
  const widths = WIDTHS.filter((w) => w <= meta.width);
  if (!widths.length) widths.push(meta.width);
  for (const w of widths) {
    const base = join(OUT_DIR, `${args.name}-${w}`);
    const img = sharp(input).rotate().resize({ width: w, withoutEnlargement: true });
    await img.clone().avif({ quality: 52, effort: 6 }).toFile(`${base}.avif`);
    await img.clone().webp({ quality: 74, effort: 6 }).toFile(`${base}.webp`);
    files.push(`/${relative(join(ROOT, 'public'), base).replace(/\\/g, '/')}.{avif,webp}`);
  }

  const registry = existsSync(REGISTRY) ? JSON.parse(readFileSync(REGISTRY, 'utf-8')) : [];
  const entry = {
    fichier: args.name,
    variantes: files,
    largeurs: widths,
    source: 'Pixabay',
    auteur: h.user,
    url: h.pageURL,
    pixabayId: h.id,
    page: args.page,
    alt: args.alt,
    ajoute: new Date().toISOString().slice(0, 10),
  };
  const i = registry.findIndex((e) => e.fichier === args.name);
  if (i >= 0) registry[i] = entry; else registry.push(entry);
  writeFileSync(REGISTRY, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
  console.log(`Image ${id} intégrée : ${files.join(', ')} (registre mis à jour)`);
}

try {
  if (cmd === 'search') await search(args._.join(' '));
  else if (cmd === 'get') await get(args._[0]);
  else console.log('Commandes : search "<mots-clés>" | get <id> --name <nom> --page "<page>" --alt "<texte>"');
} catch (e) {
  console.error('Erreur :', String(e.message).replaceAll(KEY, '***'));
  process.exit(1);
}
