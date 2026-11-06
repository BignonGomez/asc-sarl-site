// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Chemin de base et URL du site, fournis par l'environnement :
// - GitHub Pages (test) : SITE_URL=https://<compte>.github.io  BASE_PATH=/<depot>
// - Hostinger (final)   : SITE_URL=https://asc-sarl.com        BASE_PATH=/
const site = process.env.SITE_URL ?? 'https://asc-sarl.com';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  compressHTML: true,
  vite: { plugins: [tailwindcss()] },
});
