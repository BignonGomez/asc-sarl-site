/**
 * Informations du cabinet et réglages globaux.
 * Sources : protocole complet validé (annexe A) — les valeurs marquées « À VALIDER » restent provisoires.
 */
export const site = {
  // Nom d'usage affiché partout sur le site (« ASC SARL » réservé à l'e-mail et au domaine)
  name: 'Alkebulan Services et Conseils',
  shortName: 'Alkebulan Services et Conseils',
  fullName: 'Alkebulan Services et Conseils',
  // Dénomination juridique complète (mentions légales uniquement)
  legalName: 'ALKEBULAN SERVICES ET CONSEILS SARL',
  domain: 'asc-sarl.com',
  url: 'https://asc-sarl.com', // domaine officiel : URL canoniques et balises SEO
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
  // À RENSEIGNER : adresses des pages officielles. Une icône est masquée tant que son lien est vide (null).
  social: [
    { name: 'LinkedIn', icon: 'linkedin', href: null as string | null },
    { name: 'Facebook', icon: 'facebook', href: null as string | null },
    { name: 'WhatsApp', icon: 'whatsapp', href: null as string | null }, // format : https://wa.me/229XXXXXXXX
  ],
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

export type NavChild = { label: string; href: string; desc?: string; icon?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

/**
 * Menu principal à 7 rubriques — seules les pages publiées au lancement sont listées (annexe E).
 * Une rubrique n'ouvre un sous-menu que si elle compte plusieurs pages publiées.
 */
export const nav: NavItem[] = [
  { label: 'Accueil', href: '/' },
  {
    label: 'Le Cabinet',
    href: '/cabinet',
    children: [
      { label: 'Présentation du cabinet', href: '/cabinet', desc: 'Identité, statut et positionnement', icon: 'building' },
      { label: 'Vision, mission et valeurs', href: '/cabinet/vision-mission-valeurs', desc: 'Le cap et les principes qui nous guident', icon: 'target' },
      { label: 'Notre équipe', href: '/cabinet/equipe', desc: 'Responsables et experts associés', icon: 'users' },
      { label: 'Notre approche méthodologique', href: '/cabinet/approche', desc: 'Une démarche en cinq étapes', icon: 'route' },
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
