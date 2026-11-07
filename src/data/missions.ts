/**
 * Missions du cabinet — protocole complet, chapitre 5.
 * Règles : seules les missions confiées au cabinet ; statut affiché ; aucun montant, numéro de contrat,
 * imputation budgétaire ni résultat annoncé pour une mission en cours.
 * Une mission achevée passera dans « Projets et références » sur présentation de l'attestation de bonne exécution.
 */
import type { ImageId } from '../config/images';

export type Mission = {
  slug: string;
  status: 'en-cours' | 'achevee';
  /** Date de dernière mise à jour de la fiche (À RENSEIGNER à chaque mise à jour) */
  updated: string; // AAAA-MM-JJ
  title: string;
  summary: string;
  domains: string[]; // slugs des domaines
  place: string;
  client: string; // publication du nom soumise à l'autorisation de la commune
  period: string[];
  team: { lastName: string; role?: string }[];
  volets: { title: string; public: string; items: string[]; extra?: string }[];
  images: ImageId[];
};

export const missions: Mission[] = [
  {
    slug: 'za-kpota-formation-pisciculture-maraichage',
    status: 'en-cours',
    updated: '2026-11-07',
    title:
      'Formation de jeunes à la production piscicole et maraîchère intégrée et renforcement des capacités des responsables de filières agricoles',
    summary:
      "À la demande de la Commune de Za-Kpota, Alkebulan Services et Conseils conduit un programme de formation au profit des jeunes et des responsables des filières agricoles de la commune. Vingt-cinq jeunes sont formés, en théorie et en pratique sur le site aménagé d'Allahé, aux techniques de combinaison de la production piscicole et maraîchère. En parallèle, les responsables des faîtières de plusieurs filières sont formés, dans une perspective d'agriculture résiliente aux changements climatiques.",
    domains: ['agriculture-developpement-rural', 'formation-sensibilisation', 'changements-climatiques'],
    place: "Commune de Za-Kpota, site aménagé d'Allahé (département du Zou), Bénin",
    client: 'Commune de Za-Kpota',
    period: ['Contrat notifié le 23 juillet 2026', "Délai d'exécution contractuel de deux mois"],
    team: [{ lastName: 'MENSAH', role: 'Chef de mission' }, { lastName: 'DAYOU' }, { lastName: 'DAHODO' }],
    volets: [
      {
        title: 'Formation des jeunes',
        public: "25 jeunes, en théorie et en pratique sur le site aménagé d'Allahé",
        items: ['Pisciculture', 'Maraîchage', 'Systèmes intégrés poisson-légumes', "Gestion d'exploitation", 'Montage de micro-projets'],
      },
      {
        title: 'Renforcement des responsables de filières',
        public: 'Responsables des faîtières des filières agricoles de la commune',
        items: ['Organisation des filières', 'Techniques améliorées de production', 'Chaînes de valeur', "Gestion d'entreprise agricole"],
        extra: 'Filières concernées : riz, poisson, maraîchage, arachide et agrumes.',
      },
    ],
    images: ['accueil.realisation-zakpota', 'mission.zakpota.2', 'mission.zakpota.3', 'mission.zakpota.4'],
  },
];

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));
