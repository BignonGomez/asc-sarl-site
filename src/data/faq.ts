/**
 * Foire aux questions — protocole complet, section 7.2 (réponses proposées, À VALIDER par la direction).
 * Règles : réponses de trois à six lignes, avec un lien utile ; aucune promesse de délai, de prix ou de résultat
 * non validée ; revue au moins deux fois par an.
 * « ASC SARL » est remplacé par le nom complet du cabinet, conformément à la règle d'affichage du site.
 */
export type FaqItem = { q: string; a: string; link?: { label: string; href: string } };
export type FaqTheme = { id: string; title: string; icon: string; items: FaqItem[] };

export const faq: FaqTheme[] = [
  {
    id: 'cabinet',
    title: 'Le cabinet',
    icon: 'building',
    items: [
      {
        q: 'Qui est Alkebulan Services et Conseils ?',
        a: "Alkebulan Services et Conseils est un cabinet béninois d'études et de conseil, constitué sous forme de société à responsabilité limitée et immatriculé au RCCM de Cotonou en 2025. Il accompagne les acteurs publics et privés sur les questions d'environnement, de changements climatiques, de ressources en eau, d'aménagement du territoire, d'agriculture durable et de développement local.",
        link: { label: 'Présentation du cabinet', href: '/cabinet' },
      },
      {
        q: 'Dans quels domaines intervenez-vous ?',
        a: "Le cabinet intervient dans huit domaines : études environnementales et sociales ; changements climatiques et adaptation ; hydraulique, hydrologie et GIRE ; aménagement du territoire ; agriculture durable et développement rural ; économie locale et développement territorial ; tourisme et conservation ; formation, sensibilisation et participation des acteurs.",
        link: { label: 'Nos expertises', href: '/expertises' },
      },
      {
        q: 'Où intervenez-vous ?',
        a: "Le cabinet, dont le siège est à Cotonou, intervient au Bénin, auprès d'acteurs nationaux et locaux, en milieu urbain comme en milieu rural.",
        link: { label: 'Présentation du cabinet', href: '/cabinet' },
      },
      {
        q: "À qui s'adressent vos prestations ?",
        a: 'Nos prestations s’adressent aux administrations publiques, aux collectivités territoriales, aux organisations non gouvernementales, aux entreprises, aux porteurs de projets et aux partenaires techniques et financiers.',
        link: { label: 'Nos expertises', href: '/expertises' },
      },
    ],
  },
  {
    id: 'prestations',
    title: 'Les prestations',
    icon: 'clipboard',
    items: [
      {
        q: 'Quels types d’études réalisez-vous ?',
        a: 'Selon les domaines : études environnementales et sociales, diagnostics de vulnérabilité climatique, études hydrologiques et hydrauliques, diagnostics territoriaux, diagnostics de filières agricoles, diagnostics économiques de territoires. Chaque page de domaine détaille les prestations proposées.',
        link: { label: 'Nos expertises', href: '/expertises' },
      },
      {
        q: 'Comment se déroule une mission ?',
        a: 'Nos missions suivent une démarche en cinq étapes : compréhension des besoins et cadrage ; diagnostic et collecte des données ; analyse et conception des solutions ; restitution et accompagnement de la mise en œuvre ; suivi, évaluation et capitalisation. Cette démarche est adaptée à chaque mission.',
        link: { label: 'Notre approche méthodologique', href: '/cabinet/approche' },
      },
      {
        q: 'Quels livrables remettez-vous ?',
        a: 'Les livrables sont définis dans les termes de référence et le contrat de chaque mission. Il s’agit généralement de rapports provisoires, puis de rapports définitifs intégrant les observations du client, accompagnés selon les cas de supports de restitution ou de formation.',
      },
      {
        q: 'Proposez-vous des formations ?',
        a: 'Oui. Le cabinet conçoit et anime des ateliers et des sessions de formation, et facilite des consultations et des concertations avec les acteurs concernés.',
        link: { label: 'Formation, sensibilisation et participation des acteurs', href: '/expertises/formation-sensibilisation' },
      },
    ],
  },
  {
    id: 'collaboration',
    title: 'La collaboration',
    icon: 'handshake',
    items: [
      {
        q: 'Comment vous demander une prestation ?',
        a: 'Le plus simple est d’utiliser le formulaire de la page Contact, en précisant la nature de votre demande et le domaine concerné. Vous pouvez y joindre vos documents. Vous pouvez également nous appeler ou nous écrire.',
        link: { label: 'Contact', href: '/contact' },
      },
      {
        q: 'Qu’est-ce que des termes de référence (TDR) ?',
        a: 'Les termes de référence sont le document par lequel un commanditaire décrit la mission qu’il souhaite confier : contexte, objectifs, résultats attendus, tâches à réaliser, livrables, profil des experts et délais. Ils servent de base à l’élaboration de l’offre du cabinet.',
      },
      {
        q: 'Comment vous transmettre nos TDR ?',
        a: 'Vous pouvez joindre vos termes de référence au formulaire de la page Contact (format PDF ou Word) ou les envoyer par courrier électronique à l’adresse indiquée sur cette page.',
        link: { label: 'Contact', href: '/contact' },
      },
      {
        q: 'Comment obtenir une proposition technique et financière ?',
        a: 'Après analyse de votre demande et de vos termes de référence, le cabinet vous indique s’il est en mesure d’y répondre et selon quelles modalités. Le délai d’établissement d’une proposition dépend de la nature et de l’ampleur de la mission.',
        link: { label: 'Contact', href: '/contact' },
      },
      {
        q: 'Quelles sont vos langues de travail ?',
        a: 'Le cabinet travaille en français.',
      },
    ],
  },
  {
    id: 'equipe',
    title: "L'équipe et ses qualifications",
    icon: 'users',
    items: [
      {
        q: 'Qui sont vos experts ?',
        a: 'Le cabinet s’appuie sur ses responsables et sur des experts associés aux spécialités complémentaires. Pour chaque mission, il constitue une équipe adaptée, dont la composition est précisée dans l’offre technique.',
        link: { label: 'Notre équipe', href: '/cabinet/equipe' },
      },
      {
        q: 'Comment vérifier les qualifications des experts proposés ?',
        a: 'Les CV des experts proposés sont joints à nos offres techniques. Les justificatifs de leurs diplômes et de leurs expériences peuvent être communiqués sur demande.',
        link: { label: 'Notre équipe', href: '/cabinet/equipe' },
      },
    ],
  },
  {
    id: 'donnees',
    title: 'La protection des données',
    icon: 'shield',
    items: [
      {
        q: 'Que deviennent les informations transmises par le formulaire ?',
        a: 'Elles sont utilisées uniquement pour répondre à votre demande et assurer le suivi de nos échanges. Elles ne sont ni vendues ni cédées à des tiers.',
        link: { label: 'Politique de confidentialité', href: '/politique-de-confidentialite' },
      },
      {
        q: 'Comment exercer vos droits sur vos données ?',
        a: "Vous pouvez demander l'accès à vos données, leur rectification ou leur suppression, ou vous opposer à leur traitement, en écrivant à l'adresse indiquée dans la politique de confidentialité. Vous pouvez également saisir l'Autorité de protection des données à caractère personnel (APDP).",
        link: { label: 'Politique de confidentialité', href: '/politique-de-confidentialite' },
      },
    ],
  },
];
