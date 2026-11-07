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
  {
    slug: 'changements-climatiques',
    seoTitle: 'Changements climatiques et adaptation',
    seoDescription:
      "Diagnostics de vulnérabilité, stratégies et plans locaux d'adaptation, intégration du climat dans la planification : Alkebulan Services et Conseils aide les territoires béninois à anticiper les effets des changements climatiques.",
    accroche: 'Comprendre, anticiper et réduire la vulnérabilité des territoires face aux changements climatiques.',
    enjeux: [
      "Les effets des changements climatiques touchent directement les ressources en eau, l'agriculture, les infrastructures et les conditions de vie des populations.",
      "Pour y faire face, les acteurs publics et privés ont besoin d'analyser leur vulnérabilité, d'identifier des mesures d'adaptation réalistes et d'intégrer le climat dans leurs documents de planification, en associant toutes les parties prenantes.",
    ],
    prestations: [
      { title: "Stratégies et plans d'adaptation aux changements climatiques à l'échelle locale", icon: 'clipboard-list' },
      { title: 'Diagnostics de vulnérabilité', icon: 'scan-search' },
      { title: "Identification et hiérarchisation de mesures d'adaptation concrètes", icon: 'list-checks' },
      { title: 'Stratégies de sensibilisation et de mobilisation des acteurs', icon: 'megaphone' },
      { title: "Appui à l'intégration du climat dans les documents de planification", icon: 'file-text' },
    ],
    steps: ['Diagnostics participatifs', 'Analyse documentaire et de terrain', 'Ateliers de concertation', 'Hiérarchisation des mesures'],
    stepsNote: 'Avec une attention particulière à la participation des femmes, en tenant compte de leurs besoins et de leur disponibilité.',
    experts: ['DAHODO'],
    complementary: ['agriculture-developpement-rural', 'amenagement-territoire', 'formation-sensibilisation'],
    heroImage: 'expertise.changements-climatiques',
    sideImage: 'climat.presentation',
    layout: { presentation: 'quote', prestations: 'bento', demarche: 'vertical' },
  },
  {
    slug: 'hydraulique-gire',
    seoTitle: 'Hydraulique, hydrologie et GIRE',
    seoDescription:
      "Études hydrologiques et hydrauliques, évaluation des ressources en eau, diagnostics d'approvisionnement et gestion intégrée des ressources en eau (GIRE) au Bénin : Alkebulan Services et Conseils éclaire vos décisions.",
    accroche: 'Mieux connaître la ressource en eau pour mieux la partager et la gérer.',
    enjeux: [
      "L'eau est au cœur des enjeux d'approvisionnement des populations, de production agricole et d'adaptation au climat.",
      "Les analyses hydrologiques et hydrauliques éclairent les décisions d'aménagement, de planification et de gestion, et la gestion intégrée des ressources en eau (GIRE) permet d'organiser la concertation entre les différents usagers.",
    ],
    prestations: [
      { title: 'Études hydrologiques et hydrauliques', icon: 'droplets' },
      { title: 'Évaluation des ressources en eau et de leurs usages', icon: 'scan-search' },
      { title: "Diagnostics de systèmes d'approvisionnement en eau", icon: 'microscope' },
      { title: "Appui à l'élaboration de plans de gestion intégrée à l'échelle d'un bassin, d'un territoire ou d'une commune", icon: 'map' },
      { title: 'Concertation entre usagers', icon: 'messages-square' },
    ],
    steps: ['Analyse des données hydrologiques existantes', 'Observations de terrain', 'Diagnostic des usages', 'Concertation des usagers'],
    stepsNote: "Les liens avec l'agriculture, l'environnement et l'adaptation au climat sont systématiquement pris en compte.",
    experts: [],
    complementary: ['agriculture-developpement-rural', 'etudes-environnementales-sociales', 'changements-climatiques'],
    heroImage: 'expertise.hydraulique-gire',
    sideImage: 'gire.presentation',
    layout: { presentation: 'split-left', prestations: 'list', demarche: 'cards' },
  },
  {
    slug: 'amenagement-territoire',
    seoTitle: 'Aménagement du territoire',
    seoDescription:
      "Diagnostics territoriaux, planification urbaine et rurale, appui aux documents de planification locale et concertation : Alkebulan Services et Conseils accompagne les collectivités béninoises dans l'organisation de leur territoire.",
    accroche: "Planifier l'usage de l'espace en intégrant les enjeux environnementaux, climatiques et sociaux.",
    enjeux: [
      "Les collectivités et les acteurs du développement doivent organiser l'usage de l'espace urbain et rural en conciliant l'habitat, les activités économiques, les ressources naturelles et la prévention des risques.",
      'Une planification bien conçue tient compte des enjeux environnementaux, climatiques, hydrauliques, agricoles et sociaux de chaque territoire.',
    ],
    prestations: [
      { title: 'Études et conseils en planification urbaine et rurale', icon: 'map' },
      { title: "Appui à l'élaboration ou à la révision des documents de planification locale prévus par la réglementation", icon: 'file-text' },
      { title: 'Diagnostics territoriaux', icon: 'scan-search' },
      { title: 'Analyse des risques et des contraintes', icon: 'triangle-alert' },
      { title: "Identification d'actions d'aménagement", icon: 'list-checks' },
      { title: "Concertation avec les acteurs locaux, en particulier l'accompagnement des collectivités territoriales", icon: 'messages-square' },
    ],
    steps: ['Diagnostic territorial', 'Analyse des contraintes et des risques', 'Ateliers de concertation avec les acteurs locaux', "Formulation d'actions d'aménagement"],
    stepsNote: 'Des propositions formulées dans un langage accessible aux décideurs.',
    experts: [],
    complementary: ['economie-locale', 'hydraulique-gire', 'changements-climatiques'],
    heroImage: 'expertise.amenagement-territoire',
    sideImage: 'amenagement.presentation',
    layout: { presentation: 'split-right', prestations: 'bento', demarche: 'timeline' },
  },
  {
    slug: 'agriculture-developpement-rural',
    seoTitle: 'Agriculture durable et développement rural',
    seoDescription:
      'Conseil en agriculture durable, diagnostics de filières, appui aux organisations paysannes, à la transformation et à la commercialisation : Alkebulan Services et Conseils accompagne le développement rural au Bénin.',
    accroche: 'Améliorer la productivité et les revenus agricoles tout en préservant les ressources naturelles.',
    enjeux: [
      "L'agriculture fait vivre une grande partie des populations rurales. Les producteurs rencontrent souvent des difficultés d'accès aux techniques modernes, d'organisation des filières et de connaissance des marchés.",
      "Le conseil et la formation permettent d'améliorer durablement la production, la transformation et la commercialisation, tout en préservant les sols, l'eau et la biodiversité.",
    ],
    prestations: [
      { title: 'Études et conseils en agriculture durable', icon: 'sprout' },
      { title: "Appui à la transformation, à la commercialisation et à l'élevage", icon: 'store' },
      { title: 'Diagnostics de filières', icon: 'scan-search' },
      { title: 'Appui aux organisations paysannes', icon: 'users' },
      { title: 'Vulgarisation des bonnes pratiques et sensibilisation des producteurs', icon: 'megaphone' },
    ],
    steps: [
      'Diagnostic des filières et des exploitations',
      'Formations théoriques et pratiques sur site',
      'Démonstrations',
      'Accompagnement des organisations de producteurs',
      'Intégration de la résilience climatique',
    ],
    publicsSpecific: ['Collectivités', 'Organisations de producteurs', 'Projets de développement', 'Entreprises du secteur'],
    experts: ['MENSAH', 'DAYOU'],
    complementary: ['changements-climatiques', 'economie-locale', 'hydraulique-gire'],
    mission: true,
    heroImage: 'expertise.agriculture-developpement-rural',
    sideImage: 'agriculture.presentation',
    layout: { presentation: 'split-left', prestations: 'cards', demarche: 'vertical' },
  },
  {
    slug: 'economie-locale',
    seoTitle: 'Économie locale et développement territorial',
    seoDescription:
      'Diagnostics économiques de territoires, projets de développement local, chaînes de valeur et conseil aux entreprises : Alkebulan Services et Conseils accompagne les collectivités et les porteurs de projets au Bénin.',
    accroche: "Valoriser les ressources des territoires au service d'un développement économique inclusif.",
    enjeux: [
      'Le développement des territoires repose sur la valorisation des ressources locales, le dynamisme des activités génératrices de revenus et la qualité des services publics.',
      "Il doit s'articuler avec la préservation de l'environnement et l'inclusion de toutes les catégories de la population.",
    ],
    prestations: [],
    prestationGroups: [
      {
        title: 'Pour les collectivités territoriales',
        items: [
          { title: 'Diagnostics économiques de territoires', icon: 'scan-search' },
          { title: "Appui à l'élaboration de projets de développement local et à la recherche de financements", icon: 'hand-coins' },
          { title: 'Appui à la gestion des services publics locaux', icon: 'landmark' },
        ],
      },
      {
        title: 'Pour les entreprises et les porteurs de projets',
        items: [
          { title: 'Analyse de chaînes de valeur locales', icon: 'route' },
          { title: 'Conseil aux entreprises et aux porteurs de projets', icon: 'briefcase' },
        ],
      },
    ],
    steps: ['Diagnostics économiques', 'Analyse des chaînes de valeur', 'Accompagnement à la formulation de projets', 'Concertation avec les acteurs économiques et institutionnels'],
    experts: ['HOUEDOU', 'EFIO'],
    complementary: ['agriculture-developpement-rural', 'amenagement-territoire', 'tourisme-conservation'],
    heroImage: 'expertise.economie-locale',
    sideImage: 'economie.presentation',
    layout: { presentation: 'quote', prestations: 'cards', demarche: 'cards' },
  },
  {
    slug: 'tourisme-conservation',
    seoTitle: 'Tourisme et conservation',
    seoDescription:
      "Tourisme durable, aménagement et gestion de sites, conservation et valorisation des ressources naturelles avec les communautés locales : l'approche d'Alkebulan Services et Conseils au Bénin.",
    accroche: 'Valoriser les sites naturels et culturels sans dégrader les écosystèmes et les paysages.',
    enjeux: [
      'Les sites naturels et culturels constituent une ressource pour le développement local.',
      'Leur valorisation touristique doit préserver les écosystèmes, associer les communautés locales et contribuer à la conservation des ressources naturelles.',
    ],
    prestations: [
      { title: "Études et conseils pour le développement d'un tourisme durable", icon: 'trees' },
      { title: "Appui à l'aménagement et à la gestion de sites", icon: 'map-pinned' },
      { title: 'Conception d’actions de conservation et de valorisation des ressources naturelles', icon: 'leaf' },
      { title: 'Implication des communautés locales dans la gestion des sites', icon: 'users' },
      { title: 'Sensibilisation des acteurs', icon: 'megaphone' },
    ],
    // Le protocole ne détaille pas de méthode propre à ce domaine : démarche générale du cabinet (5 étapes)
    steps: ['Comprendre le besoin', 'Diagnostiquer', 'Concevoir', 'Accompagner', 'Évaluer et capitaliser'],
    stepsNote: 'Démarche générale du cabinet, adaptée à chaque site et à ses communautés.',
    experts: [],
    complementary: ['etudes-environnementales-sociales', 'economie-locale', 'formation-sensibilisation'],
    heroImage: 'expertise.tourisme-conservation',
    sideImage: 'tourisme.presentation',
    layout: { presentation: 'split-right', prestations: 'list', demarche: 'timeline' },
  },
  {
    slug: 'formation-sensibilisation',
    seoTitle: 'Formation, sensibilisation et participation des acteurs',
    seoDescription:
      'Stratégies de sensibilisation, ateliers et sessions de formation, facilitation de concertations et supports de vulgarisation : Alkebulan Services et Conseils mobilise les acteurs pour des solutions comprises et appliquées.',
    accroche: 'Informer, former et mobiliser les acteurs pour que les solutions soient comprises, acceptées et appliquées.',
    enjeux: [
      "Une solution technique ne produit d'effets durables que si elle est comprise et portée par celles et ceux qui la mettent en œuvre.",
      'La participation des parties prenantes, y compris des femmes et des groupes souvent peu entendus, est une condition de réussite des projets.',
    ],
    prestations: [
      { title: 'Élaboration de stratégies de sensibilisation', icon: 'megaphone' },
      { title: "Conception et animation d'ateliers et de sessions de formation", icon: 'presentation' },
      { title: 'Facilitation de consultations et de concertations', icon: 'messages-square' },
      { title: 'Production de supports de communication et de vulgarisation', icon: 'book-open' },
      { title: "Évaluation de l'appropriation par les bénéficiaires", icon: 'clipboard-check' },
    ],
    steps: ['Ingénierie pédagogique', 'Alternance de théorie et de pratique', 'Évaluation avant et après formation', 'Animation participative', 'Supports adaptés aux publics'],
    experts: ['HOUEDOU', 'EFIO', 'ATTOSSI'],
    complementary: ['changements-climatiques', 'etudes-environnementales-sociales', 'agriculture-developpement-rural'],
    mission: true,
    heroImage: 'expertise.formation-sensibilisation',
    sideImage: 'formation.presentation',
    layout: { presentation: 'split-left', prestations: 'bento', demarche: 'vertical' },
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
