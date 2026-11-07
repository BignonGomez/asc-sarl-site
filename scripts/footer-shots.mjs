// Captures du pied de page (bureau, mobile, survol, réduire les animations)
import { chromium } from 'playwright';
const BASE = process.env.SHOT_URL ?? 'http://localhost:4321';
const b = await chromium.launch(); const errors = [];
for (const vp of [{ n: 'bureau', w: 1280, h: 800, d: 1 }, { n: 'mobile', w: 390, h: 844, d: 2, m: true }, { n: 'reduit', w: 1280, h: 800, d: 1, r: true }]) {
  const c = await b.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: vp.d, isMobile: !!vp.m, reducedMotion: vp.r ? 'reduce' : 'no-preference' });
  const p = await c.newPage(); p.on('pageerror', (e) => errors.push(e.message));
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible')));
  await p.addStyleTag({ content: '[data-header],[data-progress]{visibility:hidden!important}' });
  const f = p.locator('footer');
  await f.scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(1200);
  await f.screenshot({ path: `shots/footer-${vp.n}.png` });
  const over = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  const shift = await p.evaluate(() => getComputedStyle(document.querySelector('[data-footer-word]')).transform);
  console.log(vp.n, '| débordement', over, '| mot', shift);
  if (vp.n === 'bureau') {
    await p.hover('.sf-social'); await p.hover('.sf-cta', { position: { x: 300, y: 120 } }); await p.waitForTimeout(500);
    await p.locator('.sf-cta').screenshot({ path: 'shots/footer-cta-survol.png' });
  }
  await c.close();
}
await b.close();
console.log(errors.length ? 'ERREURS : ' + errors.join(' ; ') : 'aucune erreur JS');
