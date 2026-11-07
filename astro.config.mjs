// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Domaine officiel : asc-sarl.com (URL canoniques, balises SEO).
// Seul le chemin de base change selon l'hébergement :
// - GitHub Pages (test) : BASE_PATH=/asc-sarl-site
// - Hostinger (final)   : BASE_PATH=/  (valeur par défaut)
const site = 'https://asc-sarl.com';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  compressHTML: true,
  // « Projets et références » est masquée au lancement (protocole 5.2) : la rubrique ouvre sur les missions en cours
  // (Astro n'ajoute pas le chemin de base aux redirections : on le préfixe ici)
  redirects: { '/realisations': `${base.endsWith('/') ? base.slice(0, -1) : base}/realisations/missions-en-cours` },
  vite: { plugins: [tailwindcss()] },
});
