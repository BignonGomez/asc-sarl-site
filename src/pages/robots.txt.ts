/**
 * robots.txt généré au build.
 * - Version de test (PUBLIC_NOINDEX ≠ 'false') : tout est interdit aux moteurs de recherche.
 * - Version finale Hostinger (PUBLIC_NOINDEX=false) : tout est autorisé et le plan du site est déclaré.
 */
import type { APIRoute } from 'astro';
import { site, noindex } from '../config/site';

export const GET: APIRoute = () => {
  const body = noindex
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nDisallow: /contact-envoi.php\n\nSitemap: ${site.url}/sitemap.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
