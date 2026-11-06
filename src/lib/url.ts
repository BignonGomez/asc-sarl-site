/**
 * Construit un lien interne compatible avec le chemin de base
 * (« / » sur Hostinger, « /<depot>/ » sur GitHub Pages).
 */
export function url(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

/** Vrai si la page courante appartient à la même rubrique (premier segment d'URL) que `path`. */
export function isActive(current: string, path: string): boolean {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const section = (p: string) => p.replace(base, '').split('/').filter(Boolean)[0] ?? '';
  return section(current) === section(path);
}
