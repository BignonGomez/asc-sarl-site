/** Accès aux actualités publiées (hors brouillons), de la plus récente à la plus ancienne. */
import { getCollection } from 'astro:content';

export const PAR_PAGE = 9;

export async function getActualites() {
  const all = await getCollection('actualites', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const formatDateFr = (d: Date) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
