/**
 * Informations du cabinet et réglages globaux.
 * Sources : protocole complet validé (annexe A) — les valeurs marquées « À VALIDER » restent provisoires.
 */
export const site = {
  name: 'ALKEBULAN SERVICES ET CONSEILS',
  shortName: 'ASC SARL',
  fullName: 'ALKEBULAN SERVICES ET CONSEILS (ASC SARL)',
  domain: 'asc-sarl.com',
  description:
    "Cabinet béninois d'études et de conseil en environnement, changements climatiques, gestion des ressources en eau, aménagement du territoire et développement local.",
  address: {
    lines: ['Cotonou, 12e arrondissement', 'quartier Cadjéhoun Aupiais', 'îlot 621 F, Maison MR International'],
    oneLine: 'Cotonou, 12e arrondissement, quartier Cadjéhoun Aupiais, îlot 621 F, Maison MR International',
  },
  // À VALIDER : numéro officiel à choisir parmi les trois connus (annexe C du protocole)
  phone: { display: '+229 XX XX XX XX', href: null as string | null },
  // À VALIDER : adresse à créer après l'achat de l'hébergement
  email: 'contact@asc-sarl.com',
  rccm: 'RB/COT/25 B 40462',
  copyrightYear: 2026,
  cta: { label: 'Parlons de votre projet', href: '/contact' },
} as const;

/**
 * Phase de test (GitHub Pages) : le site ne doit pas être indexé.
 * Mettre PUBLIC_NOINDEX=false uniquement pour la version finale Hostinger.
 */
export const noindex = import.meta.env.PUBLIC_NOINDEX !== 'false';

/**
 * Sections de l'accueil soumises à condition (annexe E du protocole).
 * Visibles pendant la phase de démonstration ; à masquer au lancement si les conditions ne sont pas réunies.
 */
export const features = {
  homeNews: true,      // Section 6 : seulement si la rubrique Actualités est lancée
  homePartners: true,  // Section 7 : seulement avec l'accord écrit de la Commune de Za-Kpota
};

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

/** Menu principal à 7 rubriques — seules les pages publiées au lancement sont listées (annexe E). */
export const nav: NavItem[] = [
  { label: 'Accueil', href: '/' },
  {
    label: 'Le Cabinet',
    href: '/cabinet',
    children: [
      { label: 'Présentation du cabinet', href: '/cabinet' },
      { label: 'Vision, mission et valeurs', href: '/cabinet/vision-mission-valeurs' },
      { label: 'Notre équipe', href: '/cabinet/equipe' },
      { label: 'Notre approche méthodologique', href: '/cabinet/approche' },
    ],
  },
  {
    label: 'Nos expertises',
    href: '/expertises',
    children: [], // rempli dynamiquement avec les 8 domaines
  },
  {
    label: 'Réalisations',
    href: '/realisations/missions-en-cours',
    children: [{ label: 'Missions en cours', href: '/realisations/missions-en-cours' }],
  },
  {
    label: 'Actualités',
    href: '/actualites',
    children: [{ label: 'Actualités du cabinet', href: '/actualites' }],
  },
  {
    label: 'Ressources',
    href: '/ressources/faq',
    children: [{ label: 'Foire aux questions (FAQ)', href: '/ressources/faq' }],
  },
  { label: 'Contact', href: '/contact' },
];

export const footerLinks = [
  { label: 'Le Cabinet', href: '/cabinet' },
  { label: 'Nos expertises', href: '/expertises' },
  { label: 'Réalisations', href: '/realisations/missions-en-cours' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Ressources', href: '/ressources/faq' },
  { label: 'Contact', href: '/contact' },
];

export const legalLinks = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/politique-de-confidentialite' },
];
