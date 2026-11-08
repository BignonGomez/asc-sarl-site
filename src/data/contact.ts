/**
 * Page Contact — protocole complet, chapitre 8.
 * Les listes ci-dessous doivent rester identiques à celles du script d'envoi public/contact-envoi.php.
 */
import { expertises } from './expertises';

export const natures = [
  'Information',
  "Demande d'accompagnement",
  'Transmission de termes de référence',
  'Partenariat',
  'Autre',
];

export const domainesFormulaire = [...expertises.map((e) => e.title), 'Je ne sais pas encore'];

/** Pièce jointe : PDF ou Word, taille maximale (proposition du protocole : 10 Mo) */
export const pieceJointe = { maxMo: 10, extensions: ['.pdf', '.doc', '.docx'] };

/** Script d'envoi (Hostinger, PHP). Sur GitHub Pages, le formulaire fonctionne en mode démonstration. */
export const formEndpoint = '/contact-envoi.php';
export const formDemo = import.meta.env.PUBLIC_FORM_DEMO === 'true';
