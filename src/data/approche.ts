/**
 * Démarche d'intervention en 5 étapes — protocole, section 3.4 (intitulés SOURCÉS, textes À VALIDER).
 * `short` et `summary` : forme courte utilisée sur l'accueil (section 5 du protocole).
 */
export type Step = {
  icon: 'file-text' | 'search' | 'drafting-compass' | 'handshake' | 'badge-check';
  short: string;
  summary: string;
  title: string;
  text: string;
};

export const steps: Step[] = [
  {
    icon: 'file-text',
    short: 'Comprendre le besoin',
    summary: 'Analyse de la demande, des objectifs et des termes de référence.',
    title: 'Compréhension des besoins et cadrage de la mission',
    text: "Nous analysons votre demande et vos termes de référence, précisons les objectifs, les résultats attendus et le périmètre de l'intervention, et tenons compte des contraintes techniques, des ressources disponibles et des délais.",
  },
  {
    icon: 'search',
    short: 'Diagnostiquer',
    summary: 'Collecte et analyse des données documentaires et de terrain.',
    title: 'Diagnostic et collecte des données',
    text: "Selon la mission : recherche documentaire, observations de terrain, enquêtes, entretiens avec les parties prenantes, mesures techniques et exploitation des données existantes, avec une attention particulière à la fiabilité des informations.",
  },
  {
    icon: 'drafting-compass',
    short: 'Concevoir',
    summary: "Élaboration de solutions adaptées au contexte d'intervention.",
    title: 'Analyse et conception des solutions',
    text: 'Nous analysons les problématiques identifiées, interprétons les résultats et formulons des propositions qui tiennent compte des réalités locales, des contraintes et des objectifs de développement durable.',
  },
  {
    icon: 'handshake',
    short: 'Accompagner',
    summary: 'Restitution des résultats, appui technique et suivi de la mise en œuvre.',
    title: 'Restitution et accompagnement de la mise en œuvre',
    text: "Nous présentons les résultats à nos clients et aux acteurs concernés, recueillons leurs observations et favorisons l'appropriation des recommandations. Selon le contrat, cette étape peut inclure de la formation, de la sensibilisation, de l'assistance technique ou un appui à la mise en œuvre.",
  },
  {
    icon: 'badge-check',
    short: 'Évaluer et capitaliser',
    summary: 'Appréciation des résultats et capitalisation des enseignements.',
    title: 'Suivi, évaluation et capitalisation',
    text: 'Nous apprécions les résultats obtenus et le niveau de mise en œuvre des recommandations, et tirons les enseignements de chaque intervention pour améliorer nos pratiques.',
  },
];
