/**
 * Contenu détaillé des pages de domaine — protocole complet, sections 4.2 à 4.10.
 * Prestations : SOURCÉES [PROT]. Accroches, enjeux et méthodes : textes proposés À VALIDER par la direction.
 * Rien n'est inventé : pas de référence, de chiffre, de mission ni de client.
 * Les points à compléter sont listés dans A_COMPLETER.md (dossier du projet, hors dépôt).
 *
 * `layout` fait varier la mise en page d'une page à l'autre (voir src/pages/expertises/[slug].astro).
 */
import type { ImageId } from '../config/images';

export type Prestation = { title: string; icon: string };
export type DomainPage = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  accroche: string;
  enjeux: string[];
  prestations: Prestation[];
  /** Prestations regroupées par public (économie locale) */
  prestationGroups?: { title: string; items: Prestation[] }[];
  steps: string[];
  stepsNote?: string;
  publicsSpecific?: string[];
  experts: string[]; // noms de famille (src/data/equipe.ts)
  complementary: string[]; // slugs
  mission?: boolean; // mission en cours liée (Za-Kpota)
  heroImage: ImageId;
  sideImage: ImageId;
  layout: {
    presentation: 'split-right' | 'split-left' | 'quote';
    prestations: 'cards' | 'list' | 'bento';
    demarche: 'timeline' | 'cards' | 'vertical';
  };
};

/** Publics concernés — identiques sur les 8 pages (protocole, bloc 5) */
export const publics = [
  { label: 'Administrations publiques', icon: 'landmark' },
  { label: 'Collectivités territoriales', icon: 'map-pinned' },
  { label: 'ONG et organisations de développement', icon: 'handshake' },
  { label: 'Entreprises', icon: 'briefcase' },
  { label: 'Porteurs de projets', icon: 'lightbulb' },
  { label: 'Partenaires techniques et financiers', icon: 'hand-coins' },
];

export const domainPages: DomainPage[] = [
  {
    slug: 'etudes-environnementales-sociales',
    seoTitle: 'Études environnementales et sociales',
    seoDescription:
      "Études d'impact environnemental et social, évaluations environnementales, audits, PGES et consultation des parties prenantes au Bénin : Alkebulan Services et Conseils intègre les enjeux environnementaux et sociaux dès la conception des projets.",
    accroche: "Prendre en compte, dès la conception, les effets d'un projet sur l'environnement et sur les populations.",
    enjeux: [
      "Au Bénin, les projets d'infrastructures, d'aménagement et d'activités économiques doivent intégrer leurs effets sur le milieu naturel et sur les populations.",
      "Les études environnementales et sociales permettent d'identifier ces effets en amont, de concevoir les mesures pour les éviter, les réduire ou les compenser, et de préparer les documents attendus par les autorités et par les partenaires techniques et financiers.",
    ],
    prestations: [
      { title: "Études d'impact environnemental et social", icon: 'file-search' },
      { title: 'Évaluations environnementales de projets et de programmes', icon: 'clipboard-check' },
      { title: 'Audits et diagnostics environnementaux', icon: 'microscope' },
      { title: 'Plans de gestion environnementale et sociale (PGES) et suivi de leur mise en œuvre', icon: 'list-checks' },
      { title: 'Consultation des parties prenantes et analyse des enjeux sociaux, notamment ceux qui concernent les femmes et les groupes vulnérables', icon: 'messages-square' },
    ],
    steps: [
      "Cadrage de l'étude",
      'Collecte de données de terrain',
      'Analyse des impacts',
      'Consultations publiques',
      'Proposition de mesures',
      'Rédaction des documents réglementaires',
    ],
    stepsNote:
      'Dans le respect du cadre réglementaire béninois et, selon le cas, des exigences des partenaires techniques et financiers.',
    experts: ['DAHODO'],
    complementary: ['changements-climatiques', 'hydraulique-gire', 'formation-sensibilisation'],
    heroImage: 'expertise.etudes-environnementales-sociales',
    sideImage: 'eies.presentation',
    layout: { presentation: 'split-right', prestations: 'cards', demarche: 'timeline' },
  },
];

/** Sélecteur « Quel est votre besoin ? » — situations du protocole (4.1), destinations À VALIDER */
export const besoins = [
  { label: "Évaluer l'impact environnemental d'un projet", slugs: ['etudes-environnementales-sociales'] },
  { label: "Préparer une stratégie d'adaptation au changement climatique", slugs: ['changements-climatiques', 'formation-sensibilisation'] },
  { label: 'Gérer une ressource en eau', slugs: ['hydraulique-gire', 'agriculture-developpement-rural'] },
  { label: 'Planifier un territoire', slugs: ['amenagement-territoire', 'economie-locale'] },
  { label: 'Former et sensibiliser des acteurs', slugs: ['formation-sensibilisation'] },
];
