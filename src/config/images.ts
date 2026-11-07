/**
 * CONFIGURATION CENTRALE DES IMAGES DU SITE
 * ------------------------------------------------------------------
 * Chaque emplacement d'image a un identifiant (ex. 'accueil.hero').
 * Pour changer une image : déposer le fichier dans src/assets/images/,
 * modifier l'import correspondant ci-dessous, puis le texte alternatif et le statut.
 * Aucun code de page n'est à modifier.
 *
 * statut : 'définitif' = image adaptée au sujet de l'emplacement
 *          'provisoire' = image la plus proche disponible, à remplacer
 * position : cadrage dans le cadre (CSS object-position), ex. 'center 30%'
 * fit : 'cover' (remplit le cadre, par défaut) ou 'contain' (image entière, ex. logo)
 *
 * Originaux intacts dans /Image_site_web (copies renommées ici, optimisées au build en AVIF/WebP).
 */
import type { ImageMetadata } from 'astro';

import terrainPlantation from '../assets/images/terrain-plantation.png'; // Picture6.png
import terrainGroupe1 from '../assets/images/terrain-groupe-1.png'; // Picture5.png
import terrainPlanches1 from '../assets/images/terrain-planches-1.jpg'; // Picture12.jpg
import terrainPiquetage1 from '../assets/images/terrain-piquetage-1.png'; // Picture7.png
import formationSalle1 from '../assets/images/formation-salle-1.png'; // Picture1.png
import formationSalle2 from '../assets/images/formation-salle-2.png'; // Picture4.png
import eies from '../assets/images/eies.png';
import resilience from '../assets/images/resilience-climatique.png';
import gire from '../assets/images/gire.png';
import jardin from '../assets/images/jardin-communautaire.jpg';
import agriculture from '../assets/images/agriculture-durable.jpg';
import economieLocale from '../assets/images/economie-locale.png';
import tourisme from '../assets/images/tourisme.jpg';
import mangroves from '../assets/images/mangroves.png';
import canal from '../assets/images/canal-irrigation.png';
import terrainVisite from '../assets/images/terrain-visite-site.png'; // Picture2.png
import terrainPiquetage2 from '../assets/images/terrain-piquetage-2.png'; // Picture8.png
import terrainRepiquage2 from '../assets/images/terrain-repiquage-2.png'; // Picture14.png
import economieRurale from '../assets/images/economie-rurale.png';
import ecotourisme from '../assets/images/ecotourisme.png';
import terrainSemis from '../assets/images/terrain-semis-detail.png'; // Picture10.png
import terrainRepiquage1 from '../assets/images/terrain-repiquage-1.png'; // Picture13.png
import terrainGroupe2 from '../assets/images/terrain-groupe-2.png'; // Picture9.png
import terrainPlanches2 from '../assets/images/terrain-planches-2.png'; // Picture3.png
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
  // ---------------- Accueil ----------------
  'accueil.hero': {
    src: terrainPlantation,
    alt: '', // image de fond décorative : le texte du héro porte l'information
    status: 'définitif',
    position: 'center 25%',
    note: 'Photo de terrain (Picture6.png).',
  },
  'accueil.cabinet': {
    src: formationSalle2,
    alt: "Séance de travail en salle animée par un intervenant, avec des participants assis autour des tables",
    status: 'provisoire',
    note: "Emplacement prévu : photo de l'équipe ou du siège du cabinet.",
  },
  'accueil.realisation-zakpota': {
    src: terrainPlanches1,
    alt: 'Participants préparant des planches de culture sur une parcelle, lors de la mission de formation',
    status: 'définitif',
    note: 'Photo de terrain (Picture12.jpg) — à confirmer : prise sur le site de la mission de Za-Kpota.',
  },
  'accueil.actualite-lancement': {
    src: ogImage,
    alt: 'Logo Alkebulan Services et Conseils',
    status: 'provisoire',
    fit: 'contain',
    note: "Visuel de l'article de lancement du site.",
  },

  // ---------------- Domaines d'expertise (cartes de l'accueil, puis pages Expertises) ----------------
  'expertise.etudes-environnementales-sociales': {
    src: eies,
    alt: "Enquêtrice en gilet de sécurité s'entretenant avec des habitants dans une bananeraie",
    status: 'définitif',
  },
  'expertise.changements-climatiques': {
    src: resilience,
    alt: "Agriculteurs observant un champ en partie inondé sous un ciel d'orage",
    status: 'définitif',
  },
  'expertise.hydraulique-gire': {
    src: gire,
    alt: "Techniciens effectuant des mesures dans une rivière",
    status: 'définitif',
  },
  'expertise.amenagement-territoire': {
    src: jardin,
    alt: 'Espace de jardins partagés aménagé en parcelles, au cœur d’un quartier urbain',
    status: 'provisoire',
    note: "Image la plus proche disponible ; prévoir une photo d'aménagement du territoire au Bénin.",
  },
  'expertise.agriculture-developpement-rural': {
    src: agriculture,
    alt: 'Agriculteurs travaillant la terre dans un champ cultivé',
    status: 'définitif',
  },
  'expertise.economie-locale': {
    src: economieLocale,
    alt: 'Femmes triant des noix devant un atelier de transformation villageois',
    status: 'définitif',
    note: 'Image générée par intelligence artificielle (métadonnées C2PA).',
  },
  'expertise.tourisme-conservation': {
    src: tourisme,
    alt: 'Éléphants traversant une piste en forêt',
    status: 'définitif',
  },
  'expertise.formation-sensibilisation': {
    src: formationSalle1,
    alt: 'Participantes et participants réunis dans une salle de formation',
    status: 'définitif',
  },

  // ---------------- Rubrique Le Cabinet ----------------
  'cabinet.hero': {
    src: terrainGroupe1,
    alt: '',
    status: 'définitif',
    position: 'center 45%',
  },
  'cabinet.vocation': {
    src: terrainPlanches1,
    alt: 'Participants préparant des planches de culture sur une parcelle',
    status: 'provisoire',
    note: 'Emplacement prévu : photographie institutionnelle du cabinet.',
  },
  'vision.hero': {
    src: mangroves,
    alt: '',
    status: 'provisoire',
    position: 'center 55%',
    note: 'Image générée par intelligence artificielle (métadonnées C2PA).',
  },
  'equipe.hero': {
    src: formationSalle1,
    alt: '',
    status: 'provisoire',
    note: "Emplacement prévu : photo de l'équipe du cabinet.",
  },
  'approche.hero': {
    src: terrainPiquetage1,
    alt: '',
    status: 'définitif',
    position: 'center 60%',
  },

  // ---------------- Rubrique Nos expertises ----------------
  'expertises.hero': {
    src: canal,
    alt: '',
    status: 'provisoire',
    position: 'center 60%',
    note: "Paysage non béninois ; prévoir une photo de terrain représentative de l'ensemble des domaines.",
  },
  'eies.presentation': {
    src: terrainVisite,
    alt: 'Visite de terrain : un groupe de personnes parcourt une parcelle en bordure de végétation',
    status: 'provisoire',
    note: "Photo de terrain (Picture2.png) ; prévoir une photo d'étude environnementale (enquête, mesures, consultation).",
  },
  'climat.presentation': {
    src: mangroves,
    alt: 'Habitants replantant des palétuviers dans une zone humide',
    status: 'provisoire',
    note: 'Image générée par intelligence artificielle (métadonnées C2PA).',
  },
  'gire.presentation': {
    src: canal,
    alt: "Canal d'irrigation traversant des cultures, au pied de collines",
    status: 'provisoire',
    note: 'Paysage non béninois ; prévoir une photo de ressource en eau au Bénin.',
  },
  'amenagement.presentation': {
    src: terrainPiquetage2,
    alt: 'Piquetage et traçage au cordeau de parcelles sur le terrain',
    status: 'provisoire',
    note: "Photo de terrain (Picture8.png) ; prévoir une photo d'aménagement du territoire.",
  },
  'agriculture.presentation': {
    src: terrainRepiquage2,
    alt: 'Participants repiquant des plants sur des planches de culture',
    status: 'définitif',
    note: 'Photo de terrain (Picture14.png).',
  },
  'economie.presentation': {
    src: economieRurale,
    alt: "Commerçantes échangeant des produits vivriers sur l'étal d'un marché",
    status: 'définitif',
  },
  'tourisme.presentation': {
    src: ecotourisme,
    alt: 'Groupe de visiteurs et un guide observant des éléphants et une girafe dans une savane',
    status: 'provisoire',
    note: 'Faune de savane non représentative du Bénin (girafe) ; prévoir une photo de site naturel ou culturel béninois.',
  },
  'formation.presentation': {
    src: formationSalle2,
    alt: 'Un intervenant anime une séance de travail devant des participants',
    status: 'définitif',
    note: 'Photo de terrain (Picture4.png).',
  },

  // ---------------- Rubrique Actualités ----------------
  'actualites.hero': {
    src: terrainPlantation,
    alt: '',
    status: 'provisoire',
    position: 'center 30%',
    note: "Photo de terrain (Picture6.png, déjà utilisée sur l'accueil) ; prévoir une photo de la vie du cabinet.",
  },

  // ---------------- Rubrique Réalisations ----------------
  'realisations.hero': {
    src: terrainSemis,
    alt: '',
    status: 'définitif',
    position: 'center 45%',
    note: 'Photo de terrain (Picture10.png) — à confirmer : prise lors de la mission de Za-Kpota.',
  },
  'mission.zakpota.2': {
    src: terrainRepiquage1,
    alt: 'Participants repiquant de jeunes plants sur une parcelle',
    status: 'définitif',
    note: 'Photo de terrain (Picture13.png) — à confirmer : mission de Za-Kpota.',
  },
  'mission.zakpota.3': {
    src: terrainGroupe2,
    alt: 'Groupe de participants au travail sur des planches de culture',
    status: 'définitif',
    note: 'Photo de terrain (Picture9.png) — à confirmer : mission de Za-Kpota.',
  },
  'mission.zakpota.4': {
    src: terrainPlanches2,
    alt: 'Planches de culture préparées sur une grande parcelle',
    status: 'définitif',
    note: 'Photo de terrain (Picture3.png) — à confirmer : mission de Za-Kpota.',
  },
} satisfies Record<string, ImageSlot>;

export type ImageId = keyof typeof images;
