// Captures d'écran headless (bureau + mobile) du site lancé en local.
// Usage : node scripts/screenshots.mjs [chemin...]   (le serveur d'aperçu doit tourner sur BASE_URL)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.SHOT_URL ?? 'http://localhost:4321';
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];
const out = process.env.SHOT_DIR ?? 'shots';
mkdirSync(out, { recursive: true });

const viewports = [
  { name: 'bureau', width: 1280, height: 800 },
  { name: 'mobile', width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 },
];

const browser = await chromium.launch({ headless: true });
for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor ?? 1,
    isMobile: vp.isMobile ?? false,
    hasTouch: vp.isMobile ?? false,
    reducedMotion: process.env.SHOT_REDUCED === '1' ? 'reduce' : 'no-preference',
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  for (const p of paths) {
    await page.goto(BASE + p, { waitUntil: 'load', timeout: 60000 });
    await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible')));
    await page.evaluate(() => document.fonts.ready);
    // Défilement progressif pour déclencher le chargement différé des images
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(1600);
    const slug = p === '/' ? 'accueil' : p.replace(/^\/|\/$/g, '').replace(/\//g, '_');
    await page.screenshot({ path: `${out}/${slug}-${vp.name}.png`, fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(`${slug}-${vp.name}: ok${overflow > 0 ? ` | DÉBORDEMENT HORIZONTAL ${overflow}px` : ''}${errors.length ? ' | erreurs : ' + errors.join(' ; ') : ''}`);
  }
  await ctx.close();
}
await browser.close();
