/**
 * Images optimisées au build (src/assets) encore utilisées par le site (refonte, étape 6).
 * Les photos des domaines viennent du registre images.json (composant Photo) ; les cartes et schémas sont en SVG.
 * Les anciennes photos (salles de formation, groupes, terrain) ne sont plus publiées : originaux intacts dans /Image_site_web.
 */
import ogImage from '../assets/logo/og-image-1200x630.png';

export type ImageSlot = {
  src: ImageMetadata;
  alt: string;
  status: 'définitif' | 'provisoire';
  position?: string;
  fit?: 'cover' | 'contain';
  note?: string;
};

export const images = {
  'accueil.actualite-lancement': {
    src: ogImage,
    alt: 'Logo Alkebulan Services et Conseils',
    status: 'provisoire',
    fit: 'contain',
    note: "Visuel de l'article de lancement du site.",
  },
} satisfies Record<string, ImageSlot>;

export type ImageId = keyof typeof images;
