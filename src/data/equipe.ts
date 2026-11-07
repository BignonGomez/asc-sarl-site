/**
 * Équipe — protocole, section 3.3 (sources : [MCV], [CONTRAT]).
 * Règles : pas de titre « Dr » tant que le doctorat n'est pas confirmé ; pas de mention « expert certifié »
 * sans vérification du certificat ; publication soumise à l'accord écrit de chaque personne.
 * photo : null = monogramme (initiales) affiché à la place du portrait. Pour ajouter une photo : déposer le fichier dans
 * src/assets/equipe/ puis l'importer ici (ex. import dahodo from '../assets/equipe/dahodo.jpg').
 */
import type { ImageMetadata } from 'astro';

export type Member = {
  firstName: string;
  lastName: string;
  role: string;
  badge?: 'Direction' | 'Expert associé';
  specialty: string;
  degree?: string;
  experience?: number; // années
  bio: string;
  photo: ImageMetadata | null;
};

export const team: Member[] = [
  {
    firstName: 'Médard',
    lastName: 'DAHODO',
    role: 'Directeur Général',
    badge: 'Direction',
    specialty: 'Environnement et changements climatiques',
    degree: 'Bac+5 en génie de l’environnement',
    experience: 13,
    bio: "Titulaire d'un diplôme de niveau Bac+5 en génie de l'environnement, Médard DAHODO compte 13 années d'expérience professionnelle dans les domaines de l'environnement et des changements climatiques. Il assure la direction du cabinet, la supervision des prestations et la direction de missions.",
    photo: null,
  },
  {
    firstName: 'Koffi Ambroise',
    lastName: 'HOUEDOU',
    role: 'Expert, encadrement des missions',
    specialty: 'Communication : économie, sociologie et vulgarisation rurales',
    degree: 'Bac+5 en communication',
    experience: 12,
    bio: "Titulaire d'un diplôme de niveau Bac+5 en communication, avec une spécialisation en économie, sociologie et vulgarisation rurales, il compte 12 années d'expérience professionnelle. Il intervient dans l'encadrement des missions du cabinet.",
    photo: null,
  },
  {
    firstName: 'Sylvain',
    lastName: 'EFIO',
    role: 'Expert, encadrement des missions',
    specialty: 'Communication : économie et sociologie du développement rural',
    degree: 'Bac+5 en communication',
    experience: 9,
    bio: "Titulaire d'un diplôme de niveau Bac+5 en communication, avec une spécialisation en économie et sociologie du développement rural, il compte 9 années d'expérience professionnelle. Il intervient dans l'encadrement des missions du cabinet.",
    photo: null,
  },
  {
    firstName: 'Valentin',
    lastName: 'ATTOSSI',
    role: 'Spécialiste en communication',
    specialty: 'Communication : économie, sociologie et vulgarisation rurales',
    degree: 'Bac+5 en communication',
    experience: 6,
    bio: "Titulaire d'un diplôme de niveau Bac+5 en communication, avec une spécialisation en économie, sociologie et vulgarisation rurales, il compte 6 années d'expérience professionnelle.",
    photo: null,
  },
  {
    firstName: 'Ezechiel',
    lastName: 'MENSAH',
    role: 'Expert associé',
    badge: 'Expert associé',
    specialty: 'Ingénieur en agronomie, spécialiste du secteur piscicole',
    bio: 'Ingénieur en agronomie, il est spécialiste du secteur piscicole. Il assure la fonction de chef de mission sur la mission de formation en cours dans la commune de Za-Kpota.',
    photo: null,
  },
  {
    firstName: 'Ephrem',
    lastName: 'DAYOU',
    role: 'Expert associé',
    badge: 'Expert associé',
    specialty: 'Ingénieur en agronomie et en génie rural, spécialiste du secteur maraîcher',
    bio: 'Ingénieur en agronomie et en génie rural, il est spécialiste du secteur maraîcher. Il intervient sur la mission de formation en cours dans la commune de Za-Kpota.',
    photo: null,
  },
];
