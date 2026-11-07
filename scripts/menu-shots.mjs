// Captures des états du menu (capsule, méga-menu, défilement, tiroir mobile)
import { chromium } from 'playwright';
const BASE = process.env.SHOT_URL ?? 'http://localhost:4321';
const b = await chromium.launch();
const errors = [];
// Bureau
let c = await b.newContext({ viewport: { width: 1280, height: 800 } });
let p = await c.newPage(); p.on('pageerror', (e) => errors.push(e.message));
await p.goto(BASE + '/', { waitUntil: 'load' }); await p.waitForTimeout(1200);
await p.screenshot({ path: 'shots/menu-1-capsule.png' });
await p.hover('[data-mnav-item]:nth-of-type(3) [data-mnav-trigger], [data-mnav-trigger] >> nth=1'); await p.waitForTimeout(500);
await p.screenshot({ path: 'shots/menu-2-expertises.png' });
await p.mouse.move(640, 600);
await p.hover('[data-mnav-trigger] >> nth=0'); await p.waitForTimeout(500);
await p.screenshot({ path: 'shots/menu-3-cabinet.png', clip: { x: 0, y: 0, width: 1280, height: 520 } });
await p.mouse.move(640, 700); await p.waitForTimeout(300);
await p.mouse.wheel(0, 900); await p.waitForTimeout(700);
console.log('descente → masquée :', await p.evaluate(() => document.querySelector('[data-header]').classList.contains('is-hidden')));
await p.mouse.wheel(0, -300); await p.waitForTimeout(700);
console.log('remontée → visible :', !(await p.evaluate(() => document.querySelector('[data-header]').classList.contains('is-hidden'))),
  '| réduite :', await p.evaluate(() => getComputedStyle(document.querySelector('.site-header__bar')).height),
  '| progression :', await p.evaluate(() => getComputedStyle(document.querySelector('[data-progress]')).getPropertyValue('--progress')));
await p.screenshot({ path: 'shots/menu-4-defilement.png', clip: { x: 0, y: 0, width: 1280, height: 300 } });
// Clavier : Tab jusqu'au premier sous-menu puis Entrée
await p.keyboard.press('Home'); await p.waitForTimeout(400);
await c.close();
// Mobile
c = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
p = await c.newPage(); p.on('pageerror', (e) => errors.push(e.message));
await p.goto(BASE + '/', { waitUntil: 'load' }); await p.waitForTimeout(1200);
await p.screenshot({ path: 'shots/menu-5-mobile.png' });
await p.tap('[data-burger]'); await p.waitForTimeout(600);
await p.tap('#drawer summary >> nth=1'); await p.waitForTimeout(300);
await p.screenshot({ path: 'shots/menu-6-tiroir.png' });
await p.keyboard.press('Escape'); await p.waitForTimeout(500);
console.log('Échap ferme le tiroir :', await p.evaluate(() => document.getElementById('drawer').hidden));
await c.close(); await b.close();
console.log(errors.length ? 'ERREURS : ' + errors.join(' ; ') : 'aucune erreur JS');
