// Captures du héro : cascade (en cours / terminée), parallaxe, 1440 px, mobile
import { chromium } from 'playwright';
const BASE = process.env.SHOT_URL ?? 'http://localhost:4321';
const b = await chromium.launch(); const errors = [];
for (const vp of [{ n: 'bureau', w: 1280, h: 800 }, { n: '1440', w: 1440, h: 900 }]) {
  const c = await b.newContext({ viewport: { width: vp.w, height: vp.h } });
  const p = await c.newPage(); p.on('pageerror', (e) => errors.push(e.message));
  await p.goto(BASE + '/', { waitUntil: 'load' });
  if (vp.n === 'bureau') {
    // Fige toutes les animations à 550 ms pour montrer la cascade en cours
    await p.evaluate(() => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = 550; }));
    await p.screenshot({ path: 'shots/hero-1-cascade.png' });
    await p.evaluate(() => document.getAnimations().forEach((a) => { try { a.finish(); } catch { a.play(); } }));
    await p.waitForTimeout(400);
    await p.screenshot({ path: 'shots/hero-2-final.png' });
    await p.mouse.move(640, 500); await p.mouse.wheel(0, 260); await p.waitForTimeout(800);
    await p.screenshot({ path: 'shots/hero-3-parallaxe.png' });
  } else { await p.waitForTimeout(2600); await p.screenshot({ path: 'shots/hero-4-1440.png' }); }
  await c.close();
}
const c = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
const p = await c.newPage(); await p.goto(BASE + '/', { waitUntil: 'load' }); await p.waitForTimeout(2600);
await p.screenshot({ path: 'shots/hero-5-mobile.png' });
await b.close();
console.log(errors.length ? 'ERREURS : ' + errors.join(' ; ') : 'aucune erreur JS');
