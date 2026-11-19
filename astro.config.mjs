// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Domaine officiel : asc-sarl.com (URL canoniques, balises SEO).
// Seul le chemin de base change selon l'hébergement :
// - GitHub Pages (test) : BASE_PATH=/asc-sarl-site
// - Hostinger (final)   : BASE_PATH=/  (valeur par défaut)
const site = 'https://asc-sarl.com';
const base = process.env.BASE_PATH ?? '/';

// Plan du site (sitemap.xml) écrit à la fin du build, sans dépendance : toutes les pages publiées,
// sauf les pages techniques (404, confirmation d'envoi) et l'adresse de redirection /realisations.
const EXCLUS = new Set(['404', 'contact/merci', 'realisations']);
/** @returns {import('astro').AstroIntegration} */
const sitemap = () => ({
  name: 'asc-sitemap',
  hooks: {
    'astro:build:done': async ({ dir, pages }) => {
      const { writeFile } = await import('node:fs/promises');
      const date = new Date().toISOString().slice(0, 10);
      const urls = pages
        .map((p) => p.pathname.replace(/\/$/, ''))
        .filter((p) => !EXCLUS.has(p))
        .sort()
        .map((p) => `  <url><loc>${site}/${p ? p + '/' : ''}</loc><lastmod>${date}</lastmod></url>`);
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
      await writeFile(new URL('sitemap.xml', dir), xml, 'utf-8');
    },
  },
});

export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  output: 'static',
  trailingSlash: 'ignore',
  // CSS intégrée dans chaque page : une requête bloquante de moins (premier affichage plus rapide en 3G)
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  // « Projets et références » est masquée au lancement (protocole 5.2) : la rubrique ouvre sur les missions en cours
  // (Astro n'ajoute pas le chemin de base aux redirections : on le préfixe ici)
  redirects: { '/realisations': `${base.endsWith('/') ? base.slice(0, -1) : base}/realisations/missions-en-cours` },
  vite: { plugins: [tailwindcss()] },
});
