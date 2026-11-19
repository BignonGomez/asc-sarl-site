/**
 * Livrables types — accueil de la refonte (tableau des prestations, méthode).
 * STATUT : PROPOSITIONS À VALIDER PAR LA DIRECTION (19/11/2026).
 * Règle : chaque livrable est dérivé d'une prestation déjà publiée (src/data/expertises-pages.ts) ou d'une étape
 * de la démarche (src/data/approche.ts). Aucun livrable n'est inventé hors de ces sources.
 */

/** Livrables types par domaine (clé : slug du domaine). 2 ou 3 par domaine, dans l'ordre des prestations. */
export const livrablesParDomaine: Record<string, string[]> = {
  'etudes-environnementales-sociales': [
    "Étude d'impact environnemental et social (EIES)",
    'Plan de gestion environnementale et sociale (PGES) et suivi',
    "Rapport d'audit environnemental",
  ],
  'changements-climatiques': [
    'Diagnostic de vulnérabilité',
    "Stratégie et plan local d'adaptation",
    "Mesures d'adaptation hiérarchisées",
  ],
  'hydraulique-gire': [
    'Étude hydrologique et hydraulique',
    "Diagnostic de système d'approvisionnement en eau",
    'Plan de gestion intégrée des ressources en eau',
  ],
  'amenagement-territoire': [
    'Diagnostic territorial',
    'Document de planification locale',
    "Programme d'actions d'aménagement",
  ],
  'agriculture-developpement-rural': [
    'Diagnostic de filière',
    'Étude en agriculture durable',
  ],
  'economie-locale': [
    'Diagnostic économique de territoire',
    'Document de projet de développement local',
    'Analyse de chaîne de valeur',
  ],
  'tourisme-conservation': [
    'Étude de développement touristique durable',
    "Plan d'aménagement et de gestion de site",
    'Programme de conservation et de valorisation',
  ],
  'formation-sensibilisation': [
    'Programme et supports de formation',
    'Comptes rendus de consultations',
    "Rapport d'évaluation de l'appropriation",
  ],
};

/** Livrable de chaque étape de la démarche (même ordre que src/data/approche.ts). */
export const livrablesParEtape: string[] = [
  'Note de cadrage',
  'Rapport de diagnostic',
  'Rapport de propositions',
  'Rapport final et restitution',
  "Note d'évaluation et de capitalisation",
];
