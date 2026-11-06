/** Les 8 domaines d'expertise — intitulés du protocole, descriptions de cartes validées (section 2.3). */
export type Expertise = {
  slug: string;
  title: string;
  summary: string;
  icon: 'leaf' | 'thermometer' | 'droplets' | 'map' | 'sprout' | 'store' | 'trees' | 'users';
};

export const expertises: Expertise[] = [
  {
    slug: 'etudes-environnementales-sociales',
    title: 'Études environnementales et sociales',
    summary:
      "Évaluer les effets d'un projet sur l'environnement et les populations, et proposer les mesures pour les éviter, les réduire ou les compenser.",
    icon: 'leaf',
  },
  {
    slug: 'changements-climatiques',
    title: 'Changements climatiques et adaptation',
    summary:
      "Comprendre la vulnérabilité d'un territoire et construire des stratégies d'adaptation concrètes, avec la participation de tous les acteurs.",
    icon: 'thermometer',
  },
  {
    slug: 'hydraulique-gire',
    title: 'Hydraulique, hydrologie et GIRE',
    summary:
      "Connaître la ressource en eau, éclairer les décisions d'aménagement et organiser une gestion concertée entre les usagers.",
    icon: 'droplets',
  },
  {
    slug: 'amenagement-territoire',
    title: 'Aménagement du territoire',
    summary:
      "Appuyer la planification et l'organisation de l'espace urbain et rural en intégrant les enjeux environnementaux et sociaux.",
    icon: 'map',
  },
  {
    slug: 'agriculture-developpement-rural',
    title: 'Agriculture durable et développement rural',
    summary:
      'Améliorer la productivité et les revenus des activités agricoles tout en préservant les ressources naturelles.',
    icon: 'sprout',
  },
  {
    slug: 'economie-locale',
    title: 'Économie locale et développement territorial',
    summary:
      'Valoriser les ressources locales, appuyer les collectivités et accompagner les initiatives économiques des territoires.',
    icon: 'store',
  },
  {
    slug: 'tourisme-conservation',
    title: 'Tourisme et conservation',
    summary:
      'Concilier la valorisation des sites naturels et culturels, la conservation des ressources et le développement local.',
    icon: 'trees',
  },
  {
    slug: 'formation-sensibilisation',
    title: 'Formation, sensibilisation et participation des acteurs',
    summary:
      'Informer, former et mobiliser les acteurs pour que les solutions soient comprises, acceptées et appliquées.',
    icon: 'users',
  },
];
