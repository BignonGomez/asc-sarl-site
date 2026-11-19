/**
 * Mouvement du site (refonte, étape 4). Sobre, et uniquement transform / opacity.
 * - Apparition des blocs au défilement ([data-reveal] → .is-visible), titres de section mot par mot (CSS).
 * - Chiffres qui s'incrémentent ([data-count]).
 * - Méthode : trait de progression dessiné au défilement, étapes qui s'allument une à une ([data-methode]).
 * Ordinateur seulement (pointeur fin, ≥ 1024 px) : parallaxe légère du visuel du héro, boutons magnétiques
 * ([data-magnetic]), curseur discret sur les liens principaux, défilement doux (Lenis, chargé à la demande).
 * « Réduire les animations » : tout est affiché immédiatement, aucun effet n'est lancé.
 * GSAP n'est pas utilisé : ces effets tiennent en quelques lignes sans dépendance.
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const desktop = window.matchMedia('(pointer: fine) and (min-width: 64rem)').matches;
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

// ---------- Apparition au défilement ----------
const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduce || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      // Visible, ou déjà dépassé (saut par ancre, retour en arrière) : on l'affiche
      if (e.isIntersecting || e.boundingClientRect.bottom < 0) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  reveals.forEach((el) => io.observe(el));
  // Rattrapage : un bloc entièrement survolé (saut par ancre, défilement très rapide) ne croise jamais l'écran
  let pending = [...reveals];
  let queued = false;
  const catchUp = () => {
    queued = false;
    pending = pending.filter((el) => {
      if (el.classList.contains('is-visible')) return false;
      if (el.getBoundingClientRect().top < window.innerHeight) { el.classList.add('is-visible'); io.unobserve(el); return false; }
      return true;
    });
    if (!pending.length) window.removeEventListener('scroll', onRevealScroll);
  };
  const onRevealScroll = () => { if (!queued) { queued = true; setTimeout(catchUp, 120); } };
  window.addEventListener('scroll', onRevealScroll, { passive: true });
}

// ---------- Chiffres qui s'incrémentent ----------
const counters = document.querySelectorAll<HTMLElement>('[data-count]');
if (!reduce && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const el = e.target as HTMLElement;
    const to = Number(el.dataset.count);
    const t0 = performance.now(), dur = 1100;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = String(Math.round(to * ease(p)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), { threshold: 0.6 });
  counters.forEach((el) => {
    const to = Number(el.dataset.count);
    if (!Number.isFinite(to)) return;
    el.setAttribute('aria-label', String(to)); // les lecteurs d'écran lisent la valeur finale
    el.textContent = '0';
    io.observe(el);
  });
}

// ---------- Boucle de défilement (méthode, parallaxe) ----------
const methode = document.querySelector<HTMLElement>('[data-methode]');
const steps = methode ? [...methode.querySelectorAll<HTMLElement>('[data-step]')] : [];
const parallax = desktop && !reduce ? [...document.querySelectorAll<HTMLElement>('[data-parallax]')] : [];

if (methode && reduce) {
  methode.style.setProperty('--progress', '1');
  steps.forEach((s) => s.classList.add('is-on'));
}
const animateMethode = methode && !reduce;
if (animateMethode) methode!.style.setProperty('--progress', '0');

let ticking = false;
const update = () => {
  ticking = false;
  const vh = window.innerHeight;
  if (animateMethode) {
    // Le trait se dessine pendant que la section monte de 85 % à 40 % de la hauteur d'écran
    const r = methode!.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height * 0.5 + vh * 0.45)));
    methode!.style.setProperty('--progress', p.toFixed(3));
    steps.forEach((s, i) => s.classList.toggle('is-on', p >= (i + 0.6) / steps.length || p === 1));
  }
  for (const el of parallax) {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) continue;
    const k = Number(el.dataset.parallax || 0.08);
    el.style.transform = `translate3d(0, ${(-r.top * k).toFixed(1)}px, 0)`;
  }
};
const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
if (animateMethode || parallax.length) {
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

// ---------- Ordinateur : boutons magnétiques, curseur discret, défilement doux ----------
if (desktop && !reduce) {
  // Boutons magnétiques : léger déplacement vers le pointeur (6 px max)
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });

  // Curseur discret : anneau qui suit le pointeur et s'agrandit sur les liens et boutons (le curseur système reste visible)
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');
  document.body.append(ring);
  let x = -100, y = -100, cx = x, cy = y, raf = 0;
  const loop = () => {
    cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
    ring.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
    raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(loop) : 0;
  };
  window.addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY;
    ring.classList.add('is-active');
    const t = e.target as Element | null;
    ring.classList.toggle('is-link', !!t?.closest('a, button, [role="button"], summary, label'));
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => ring.classList.remove('is-active'));

  // Défilement doux (Lenis), chargé uniquement ici
  import('lenis').then(({ default: Lenis }) => {
    const lenis = new Lenis({ duration: 1.05, anchors: { offset: -104 }, prevent: (node: HTMLElement) => !!node.closest('[data-lenis-prevent], dialog, .drawer__panel') });
    // Lenis gère le lissage : le défilement doux CSS est neutralisé pour éviter un double amorti
    document.documentElement.style.scrollBehavior = 'auto';
    const raf2 = (t: number) => { lenis.raf(t); requestAnimationFrame(raf2); };
    requestAnimationFrame(raf2);
  }).catch((e) => console.warn('Défilement doux indisponible', e));
}
