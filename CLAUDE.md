# CLAUDE.md : Refonte du site Alkebulan Services et Conseils (ASC)

## 1. Contexte
- Client : Alkebulan Services et Conseils (ASC), SARL de droit béninois,
  immatriculée à Cotonou en 2025, cabinet d'études et de conseil.
- Huit domaines : études environnementales et sociales ; changements
  climatiques et adaptation ; hydraulique, hydrologie et GIRE ; aménagement
  du territoire ; agriculture durable et développement rural ; économie locale
  et développement territorial ; tourisme et conservation ; formation et
  sensibilisation.
- Site actuel : https://bignongomez.github.io/asc-sarl-site/ (domaine cible :
  asc-sarl.com). Stack apparente : Astro. Vérifie dans le dépôt avant de
  modifier.
- Cibles : institutions publiques, collectivités, organisations, entreprises
  (appels d'offres, termes de référence).

## 2. Problème à résoudre
Le directeur trouve que le site fait "ONG" et non "cabinet d'ingénierie".
Causes : photos de groupes, de salles de formation et de champs, slogans
d'impact ("Bâtir ensemble…"), vocabulaire "sensibiliser/mobiliser", vert
dominant, sections aux couleurs de fond qui tranchent, une seule mission
visible (une formation).

## 3. Objectif
Un site qui, dès l'écran d'arrivée, dégage rigueur technique, expertise et
sérieux, avec le niveau de finition des grandes marques : épuré, aéré,
dynamique, fluide.

## 4. Méthode de travail
1. Audit du site actuel (structure, composants, styles, contenus, images,
   performances). Résume en 10 lignes maximum.
1bis. Étude des sites d'inspiration (section 12) : visite-les, analyse-les et
   résume ce que tu en retiens en 15 lignes maximum.
2. Propose un plan de refonte, puis attends la validation.
3. Implémente dans cet ordre : tokens de design (couleurs, typo, espacements)
   → hero → autres sections de l'accueil → pages d'expertises → autres pages.
4. Un commit par étape, avec message clair.
5. À la fin de chaque étape : liste ce que tu as changé et pourquoi, et ce que
   tu recommandes ensuite.

## 5. Direction visuelle
### À supprimer ou remplacer
- Photos de groupes, salles de formation, éléphants, images génériques
- Slogans d'impact et vocabulaire "ONG" (sensibiliser, mobiliser, ensemble)
- Fond vert dominant

### Palette
- Fond unique et continu : blanc cassé #F7F8FA
- Texte : #1B2630 ; secondaire : #5A6672
- Accent unique : vert #1F4D2E, réservé aux boutons, liens et petits repères
- Pas de dégradés criards, pas d'ombres lourdes

### Typographie et grille
- Sans-serif géométrique (Inter ou IBM Plex Sans)
- Titres courts, denses, interlettrage serré ; grille 12 colonnes stricte
- Chiffres clés en grand (style tableau de bord), unités en petit

### Homogénéité entre sections
- Même fond sur toute la page : aucune section ne change brutalement de couleur.
- Séparer par l'espace (120 à 160 px verticaux) et par des filets 1px.
- Variation éventuelle : dégradé très progressif ou voile de vert très pâle
  qui se fond dans le fond.
- Le pied de page est la seule zone sombre, avec transition en dégradé.
- Mêmes rayons, ombres légères, espacements et alignements partout.

## 6. Hero (priorité absolue)
- Plein écran, une seule idée : titre (12 mots max), sous-titre (2 lignes max),
  bouton principal "Transmettre vos termes de référence", bouton secondaire discret.
- Beaucoup d'espace vide autour du texte. Aucun bandeau, chiffre ni carte
  dans le hero (les chiffres arrivent juste après, au scroll).
- Titre grand (clamp 3rem à 5.5rem), poids moyen.
  Exemple : "Études environnementales, hydrologie et aménagement du territoire".
- Un seul visuel net et haute définition (carte, schéma technique animé,
  vue aérienne ou vidéo courte sans texte), jamais de collage.
- Menu simple en capsule flottante.

## 7. Structure de la page d'accueil
1. Hero
2. Chiffres clés : uniquement des faits vérifiables (8 domaines, création 2025,
   SARL). N'invente aucun chiffre ; demande-moi les autres.
3. Prestations en tableau : domaine | livrables | exemples de rendus
   (EIES, PGES, étude hydrologique, plan d'aménagement, etc.)
4. Méthode : schéma horizontal en 5 étapes, avec le livrable de chaque étape
5. Références : fiches de mission (contexte, méthode, livrable). Une seule
   mission réelle existe (Commune de Za-Kpota) ; ne pas en inventer.
6. Équipe : titre, diplôme, domaine technique
7. Contact orienté termes de référence (pièce jointe PDF ou Word)
8. Pied de page : conserver RCCM, mentions légales, politique de confidentialité

## 8. Dynamisme et effets (sobres, style grandes marques)
- Apparition progressive des blocs au scroll (fade + glissement 24 px,
  600 à 800 ms, cubic-bezier(0.22, 1, 0.36, 1))
- Titres révélés ligne par ligne ou mot par mot
- Chiffres qui s'incrémentent à l'entrée dans l'écran
- Parallaxe léger sur les visuels, zoom lent au survol des cartes
- Boutons magnétiques, curseur discret sur les liens principaux
- Section Méthode : trait de progression dessiné au scroll, étapes qui
  s'allument une à une
- Transitions de page fluides, défilement doux
- Outils : GSAP + ScrollTrigger (ou Framer Motion) et Lenis
- Références d'inspiration : Stripe, Linear, Vercel (sobriété technique et
  micro-animations)

## 9. Images : tu les trouves toi-même
Ne me demande plus d'images pour le hero, les expertises ou les actualités.
1. Sources, dans cet ordre, selon les clés présentes dans .env :
   a) API Pixabay (PIXABAY_API_KEY), b) API Unsplash (UNSPLASH_ACCESS_KEY),
   c) API Pexels (PEXELS_API_KEY, si disponible : l'émission de nouvelles clés
   est actuellement suspendue), d) dossier /images-source : images que
   l'utilisateur a téléchargées lui-même depuis Pexels, Pixabay ou Unsplash ;
   les trier, les choisir, les optimiser et les intégrer.
   Si aucune clé n'est disponible, ne bloque pas : travaille avec /images-source
   et propose-moi une liste de recherches précise à faire à la main.
   Jamais Google Images ni source sans licence claire.
2. Script scripts/fetch-images.mjs : recherche par mots-clés, filtre
   orientation et résolution (min 1920 px pour le hero), téléchargement,
   conversion WebP/AVIF, sauvegarde dans /public/images.
3. Registre images.json : fichier, source, auteur, URL, page d'usage, alt.
   Ne jamais afficher de mention "libre de droit" sur le site.
4. Mots-clés en anglais, précis et techniques (ex. "environmental impact
   assessment field survey Africa", "river hydrology measurement", "urban
   planning aerial view", "agroforestry West Africa"). Privilégier l'Afrique
   de l'Ouest, des professionnels en situation de travail, des plans et vues aériennes.
5. Choisir la meilleure parmi plusieurs résultats : netteté, composition
   aérée avec espace pour le texte, cohérence de lumière et de ton.
6. Interdits : aucune image d'archives dans Réalisations et Équipe (réservées
   aux vraies photos du cabinet ; à défaut, schéma, carte ou visuel
   typographique) ; pas de photos de groupes posées ni de stock reconnaissable.
7. Si le script échoue : diagnostique, corrige, réessaie. En dernier recours,
   crée un visuel SVG propre plutôt qu'un emplacement vide.

## 10. Posture : va plus loin que la demande
Tu es le spécialiste web ; je suis ingénieur de l'environnement, pas designer.
- Avant d'implémenter, signale ce qui nuit au résultat (design, lisibilité,
  performance, accessibilité, SEO, crédibilité).
- Propose une meilleure alternative argumentée en 2 ou 3 lignes, applique celle
  que tu estimes la meilleure et indique ce que tu as changé et pourquoi.
- Anticipe : sections ou pages manquantes, cohérence entre pages, mobile,
  états de chargement, métadonnées.
- Si deux de mes instructions se contredisent ou créent un défaut, dis-le
  avant d'exécuter.
- Ne réécris jamais les contenus factuels (légal, chiffres, missions, équipe)
  sans validation.

## 11. Garde-fous techniques
- Respecter prefers-reduced-motion (animations désactivées)
- Animer uniquement transform et opacity
- Images WebP/AVIF avec chargement différé ; page d'accueil sous 2 Mo
- Mobile d'abord, test sur connexion lente (public principal : mobile au Bénin)
- Conserver les routes existantes, le SEO, les balises meta et les pages légales
- Contraste AA minimum, textes alternatifs, navigation clavier
- Ne jamais commiter de clé API (.env dans .gitignore)

## 12. Sites d'inspiration : à visiter et analyser avant de concevoir

### Comment les étudier
- Ouvre chaque site (outil de navigation web, ou Playwright pour le rendu réel
  et les captures d'écran desktop 1440 px et mobile 390 px). Si un site est
  bloqué, passe au suivant et signale-le-moi : je te donnerai des captures.
- Pour chacun, note en 3 à 5 lignes : (1) structure du hero (ce qu'il y a et,
  surtout, ce qu'il n'y a pas), (2) rythme des sections et espacements,
  (3) typographie et échelle des titres, (4) animations au scroll et au survol,
  (5) navigation, (6) comment les prestations, références et chiffres sont présentés.
- Retiens des principes, jamais des copies : ni texte, ni images, ni code,
  ni mise en page reproduite à l'identique. Notre identité reste celle d'ASC.
- Termine par un tableau "ce que je retiens / où je l'applique chez ASC" et
  propose-moi les 5 idées les plus fortes avant de les implémenter.

### A. Cabinets d'ingénierie et de conseil (le ton et la crédibilité)
Regarde surtout : hero sobre, présentation des expertises, projets et références,
chiffres, équilibre texte/visuels.
- Arup : https://www.arup.com
- Sweco : https://www.swecogroup.com
- Artelia : https://www.artelia.com
- Egis : https://www.egis-group.com
- Tractebel : https://tractebel-engie.com
- Royal HaskoningDHV : https://www.royalhaskoningdhv.com
- Ramboll : https://www.ramboll.com
- ERM (environnement et conseil) : https://www.erm.com
- Stantec : https://www.stantec.com

### B. Références de design et de dynamisme (le niveau de finition)
Regarde surtout : hero épuré, espace, micro-animations, typographie, fluidité.
- Stripe : https://stripe.com
- Linear : https://linear.app
- Vercel : https://vercel.com
- Apple (rigueur, espace, mise en scène du scroll) : https://www.apple.com

### C. Galeries pour trouver d'autres idées
- Awwwards (filtrer par catégorie Business et Corporate) : https://www.awwwards.com
- Si tu trouves mieux dans ces galeries, propose-le-moi avec la raison.

### Règle d'adaptation
Ces sites sont de grandes structures avec des moyens importants. ASC est un
jeune cabinet avec peu de références publiées : adapte l'ambition au contenu
réel. Mieux vaut une page sobre, nette et vraie qu'une imitation vide de
grand groupe. Si un élément inspirant demande un contenu que nous n'avons pas
(centaines de projets, cartes interactives de milliers de sites), propose une
version honnête à notre échelle.
