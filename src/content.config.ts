/**
 * Collections de contenu éditorial.
 * Actualités : un fichier Markdown par article dans src/content/actualites/ (protocole, chapitre 6).
 * Chaque contenu est relu et validé avant publication. `draft: true` = article non publié.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const categories = ['Vie du cabinet', 'Partenariats', 'Rencontres et participations', 'Nouvelles prestations'] as const;

const actualites = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/actualites' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    category: z.enum(categories),
    summary: z.string(),
    cover: z.string(), // identifiant d'image de src/config/images.ts
    draft: z.boolean().default(false),
  }),
});

export const collections = { actualites };
