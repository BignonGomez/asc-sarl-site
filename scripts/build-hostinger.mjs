/**
 * Construit la version finale pour Hostinger et prépare l'archive à déposer dans public_html.
 *   npm run build:hostinger
 *
 * Réglages : BASE_PATH=/ (site à la racine de asc-sarl.com), PUBLIC_NOINDEX=false (indexation autorisée),
 * PUBLIC_FORM_DEMO absent (le formulaire envoie réellement via contact-envoi.php).
 * Vérifie ensuite le contenu de dist/ et crée ../livraison/asc-sarl-hostinger-AAAA-MM-JJ.zip.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const env = { ...process.env, BASE_PATH: '/', PUBLIC_NOINDEX: 'false' };
delete env.PUBLIC_FORM_DEMO;

console.log('1/3  Construction (BASE_PATH=/, PUBLIC_NOINDEX=false, formulaire réel)…');
const build = spawnSync('npx', ['astro', 'build'], { cwd: root, env, stdio: 'inherit', shell: true });
if (build.status !== 0) process.exit(build.status ?? 1);

console.log('2/3  Vérifications…');
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); });
walk(dist);
const html = files.filter((f) => f.endsWith('.html'));
const problemes = [];
const technique = ['404.html', join('contact', 'merci', 'index.html'), join('realisations', 'index.html')];
for (const f of html) {
  const t = readFileSync(f, 'utf-8');
  const rel = f.slice(dist.length + 1);
  if (t.includes('/asc-sarl-site/')) problemes.push(`${rel} : chemin de la version de test`);
  if (t.includes('noindex') && !technique.includes(rel)) problemes.push(`${rel} : balise noindex`);
}
for (const need of ['.htaccess', join('_astro', '.htaccess'), 'robots.txt', 'sitemap.xml', '404.html', 'contact-envoi.php']) {
  if (!existsSync(join(dist, need))) problemes.push(`fichier manquant : ${need}`);
}
if (readFileSync(join(dist, 'robots.txt'), 'utf-8').includes('Disallow: /\n')) problemes.push('robots.txt bloque encore les moteurs');
const contact = readFileSync(join(dist, 'contact', 'index.html'), 'utf-8');
if (!contact.includes('contact-envoi.php')) problemes.push('le formulaire ne pointe pas vers contact-envoi.php');
if (problemes.length) { console.error('ÉCHEC :\n - ' + problemes.join('\n - ')); process.exit(1); }
const nbUrls = (readFileSync(join(dist, 'sitemap.xml'), 'utf-8').match(/<loc>/g) ?? []).length;
console.log(`     ${html.length} pages HTML, ${nbUrls} adresses dans sitemap.xml, aucun problème.`);

console.log('3/3  Archive…');
const out = resolve(root, '..', 'livraison');
mkdirSync(out, { recursive: true });
const zip = join(out, `asc-sarl-hostinger-${new Date().toISOString().slice(0, 10)}.zip`);
rmSync(zip, { force: true });
// tar de Windows (celui de Git Bash prend « D: » pour un serveur distant)
const winTar = join(process.env.SystemRoot ?? 'C:\\Windows', 'System32', 'tar.exe');
const tar = spawnSync(existsSync(winTar) ? winTar : 'tar', ['-a', '-c', '-f', zip, '-C', dist, '.'], { stdio: 'inherit' });
if (tar.status !== 0) process.exit(tar.status ?? 1);
console.log(`     ${zip}`);
console.log('Rappel : la version de test (GitHub Pages) n\'est pas touchée ; dist/ contient maintenant la version finale.');
