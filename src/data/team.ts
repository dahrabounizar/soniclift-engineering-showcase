/**
 * ============================================================================
 * FILE: src/data/team.ts
 * ============================================================================
 * PURPOSE:
 *   Source of truth for the SonicLift team members. Exposes the full 14-member
 *   list (TEAM_MEMBERS) used on /notre-equipe and a FEATURED_TEAM_MEMBERS
 *   subset used for the condensed home-page preview.
 *
 *   PHOTO PATHS:
 *   Each photo is expected at: public/images/team/<filename>.jpg
 *   Filenames are lowercase to be safe on Vercel's case-sensitive Linux build.
 * ============================================================================
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  opinion: string;
  photo?: string;
}

/**
 * TEAM_MEMBERS
 *
 * The full 14-member team. Each member has a personalized opinion tied to
 * their specific contribution area (Mécanique, Électrique, Commande,
 * Dimensionnement, Détection, Chef de projet).
 *
 * Photos: place files at public/images/team/<filename>.jpg
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "youssra-gaddah",
    name: "Youssra Gaddah",
    role: "Mécanique & Chef de Projet",
    opinion:
      "Coordonner 14 ingénieurs autour d'une vision commune tout en participant à la conception mécanique m'a appris l'équilibre entre vision technique et leadership opérationnel.",
    photo: "/images/team/youssra_gaddah.jpg",
  },
  {
    id: "mehdi-sahhar",
    name: "Mehdi Sahhar",
    role: "Commande",
    opinion:
      "Travailler sur la commande anti-ballant et voir le contrôleur Input Shaping ZVD réduire θmax de 74 % en validation expérimentale fut le moment fort du projet.",
    photo: "/images/team/mehdi_sahhar.jpg",
  },
  {
    id: "asmae-chabab",
    name: "Asmae Chabab",
    role: "Détection",
    opinion:
      "Concevoir un système de détection robuste — fins de course, capteurs inertiels et arrêt d'urgence — m'a sensibilisée à la rigueur des normes industrielles HSE.",
    photo: "/images/team/asmae_chabab.jpg",
  },
  {
    id: "nizar-dahrabou",
    name: "Nizar Dahrabou",
    role: "Dimensionnement",
    opinion:
      "Le dimensionnement des arbres, paliers et accouplements a été une école de précision : chaque cote, chaque coefficient de sécurité a son importance.",
    photo: "/images/team/nizar_dahrabou.jpg",
  },
  {
    id: "khadija-elmrabet",
    name: "Khadija El Mrabet",
    role: "Électrique",
    opinion:
      "L'intégration de l'Arduino Mega avec cinq drivers DM542 synchronisés m'a confrontée à la réalité du câblage industriel et de la gestion d'alimentations multiples.",
    photo: "/images/team/khadija_elmrabet.jpg",
  },
  {
    id: "sara-gherras",
    name: "Sara Gherras",
    role: "Détection",
    opinion:
      "La fusion de données entre accéléromètre et gyroscope pour reconstruire l'angle de ballant en temps réel m'a fascinée par sa finesse algorithmique.",
    photo: "/images/team/sara_gherras.jpg",
  },
  {
    id: "mohammed-sadiki",
    name: "Mohammed Sadiki",
    role: "Dimensionnement",
    opinion:
      "Valider mes calculs RDM par éléments finis SolidWorks et observer la déflexion réelle de 0,3 mm sous charge fut une satisfaction technique profonde.",
    photo: "/images/team/mohammed_sadiki.jpg",
  },
  {
    id: "hiba-tajri",
    name: "Hiba Tajri",
    role: "Électrique",
    opinion:
      "Concevoir une architecture électrique modulaire et tolérante aux pannes m'a appris que la sécurité d'un système se construit dès le schéma de câblage.",
    photo: "/images/team/hiba_tajri.jpg",
  },
  {
    id: "iliass-ait-ali-ouiddar",
    name: "Iliass Ait Ali Ouiddar",
    role: "Commande",
    opinion:
      "Implémenter la planification A* 3D avec replanification dynamique en temps réel m'a poussé à optimiser chaque ligne de code pour tenir les contraintes temps réel.",
    photo: "/images/team/iliass_ait_ali_ouiddar.jpg",
  },
  {
    id: "aya-nait-yazza",
    name: "Aya Nait Yazza",
    role: "Électrique",
    opinion:
      "Gérer les alimentations 12 V et 5 V avec leurs circuits de sécurité m'a fait comprendre l'importance d'une conception électrique anticipant les pires scénarios.",
    photo: "/images/team/aya_nait_yazza.jpg",
  },
  {
    id: "marouane-zemrani",
    name: "Marouane Zemrani",
    role: "Dimensionnement",
    opinion:
      "Calculer le couple requis pour le levage à double tambour et le valider expérimentalement reste pour moi l'illustration parfaite du lien entre théorie et pratique.",
    photo: "/images/team/marouane_zemrani.jpg",
  },
  {
    id: "aymane-knadel",
    name: "Aymane Knadel",
    role: "Mécanique",
    opinion:
      "Concevoir le système de levage double tambour plutôt qu'une transmission poulie-courroie m'a appris à défendre un choix technique par les chiffres et l'expérimentation.",
    photo: "/images/team/aymane_knadel.jpg",
  },
  {
    id: "rami-iloughmane",
    name: "Rami Iloughmane",
    role: "Mécanique",
    opinion:
      "La fabrication multi-procédés — tour, fraiseuse, CNC, impression 3D — a élargi ma maîtrise des ateliers et m'a montré que la conception ne vit que par sa réalisation.",
    photo: "/images/team/rami_iloughmane.jpg",
  },
  {
    id: "mohammed-sitel",
    name: "Mohammed Sitel",
    role: "Mécanique",
    opinion:
      "L'analyse fonctionnelle SysML jusqu'au montage final m'a fait vivre le cycle complet d'un projet d'ingénierie — chaque étape construit la suivante.",
    photo: "/images/team/mohammed_sitel.jpg",
  },
];

/**
 * FEATURED_TEAM_MEMBERS
 *
 * First 6 members — used as a compact preview on the home page. Clicking the
 * CTA below this preview sends the user to /notre-equipe for the complete
 * 14-member list with individual opinions.
 */
export const FEATURED_TEAM_MEMBERS: TeamMember[] = TEAM_MEMBERS.slice(0, 6);