/**
 * Photo associée à chaque domaine (nom de fichier du registre images.json, variantes dans public/images/photos/).
 * Utilisée par l'en-tête des pages de domaine et par le tableau des domaines (accueil, Nos expertises).
 */
export const photoParDomaine: Record<string, string> = {
  'etudes-environnementales-sociales': 'expertise-etudes-environnementales',
  'changements-climatiques': 'expertise-changements-climatiques',
  'hydraulique-gire': 'expertise-hydraulique',
  'amenagement-territoire': 'expertise-amenagement',
  'agriculture-developpement-rural': 'expertise-agriculture',
  'economie-locale': 'expertise-economie-locale',
  'tourisme-conservation': 'expertise-tourisme-conservation',
  'formation-sensibilisation': 'expertise-formation',
};
