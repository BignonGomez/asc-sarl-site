/**
 * OFFRES D'EMPLOI, DE MISSION OU DE STAGE — configuration centrale de la page /ressources/recrutement.
 *
 * Tant que ce tableau est vide, la page affiche le bloc « Aucune offre en cours ».
 * Dès qu'une offre est ajoutée, la liste s'affiche automatiquement à la place (aucun code à modifier).
 * Retirer chaque offre à sa date limite (protocole 6.4 : annonces de recrutement retirées à l'échéance).
 *
 * Exemple d'offre (à recopier dans le tableau) :
 * {
 *   title: 'Intitulé du poste ou de la mission',
 *   lieu: 'Cotonou, Bénin',
 *   contrat: 'CDD', // ou « Mission ponctuelle », « Stage »…
 *   dateLimite: '2026-12-31', // AAAA-MM-JJ
 *   description: 'Courte description du poste et du profil recherché.',
 *   lien: 'https://…', // facultatif : fiche de poste en PDF ou page externe
 * },
 */
export type Offre = {
  title: string;
  lieu: string;
  contrat: string;
  dateLimite: string;
  description?: string;
  lien?: string;
};

export const offres: Offre[] = [];

/** Adresse et objet des candidatures */
export const candidature = {
  email: 'contact@asc-sarl.com',
  objetSpontanee: 'Candidature spontanée',
};
