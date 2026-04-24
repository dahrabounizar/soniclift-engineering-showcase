/**
 * ============================================================================
 * FILE: src/data/team.ts
 * ============================================================================
 * PURPOSE:
 *   Source of truth for the SonicLift team members. Exposes the full 14-member
 *   list (TEAM_MEMBERS) used on /notre-equipe and a FEATURED_TEAM_MEMBERS
 *   subset used for the condensed home-page preview.
 *
 *   All entries are placeholders. Replace `name`, `role`, `opinion`, and
 *   `photo` values with real data when ready.
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
 * The full 14-member team. Roles are distributed across the four project
 * axes (Mécanique, Électrique, IA & Vision, Commande & Trajectoire) plus
 * project management. Opinions are generic placeholders.
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member-01",
    name: "Membre 01",
    role: "Ingénieur Mécanique",
    opinion:
      "Ce projet m'a permis d'approfondir la conception de structures mécaniques et de valider mes analyses FEA en conditions réelles. Placeholder — à remplacer par l'opinion réelle du membre.",
  },
  {
    id: "member-02",
    name: "Membre 02",
    role: "Ingénieur Mécanique",
    opinion:
      "Travailler sur le système de levage double tambour m'a confronté à des problématiques industrielles concrètes. Placeholder — à remplacer par l'opinion réelle du membre.",
  },
  {
    id: "member-03",
    name: "Membre 03",
    role: "Ingénieur Mécanique",
    opinion:
      "La fabrication multi-procédés (tour, fraiseuse, CNC, impression 3D) a élargi ma maîtrise des ateliers. Placeholder — à remplacer par l'opinion réelle du membre.",
  },
  {
    id: "member-04",
    name: "Membre 04",
    role: "Ingénieur Mécanique",
    opinion:
      "Le dimensionnement rigoureux de l'axe de rotation m'a appris à anticiper les contraintes dynamiques. Placeholder — à remplacer par l'opinion réelle du membre.",
  },
  {
    id: "member-05",
    name: "Membre 05",
    role: "Ingénieur Électronique",
    opinion:
      "L'intégration de l'Arduino Mega avec cinq drivers DM542 synchrones a été un vrai défi de câblage. Placeholder — à remplacer par l'opinion réelle du membre.",
  },
  {
    id: "member-06",
    name: "Membre 06",
    role: "Ingénieur Électronique",
    opinion:
      "La gestion des alimentations 12V/5V et des circuits de sécurité m'a sensibilisé aux normes HSE. Placeholder — à remplacer par l'opinion réelle du membre.",
  },
  {
    id: "member-07",
    name: "Membre 07",
    role: "Ingénieur Électronique",
    opinion:
      "Concevoir une architecture modulaire et tolérante aux pannes reste une leçon précieuse. Placeholder — à remplacer par l'opinion réelle du membre.",
  },
  {
    id: "member-08",
    name: "Membre 08",
    role: "Développeur IA / Vision",
    opinion:
      "Entraîner un YOLOv5 custom sur notre propre dataset Roboflow et atteindre 99,64 % fut extrêmement satisfaisant. Placeholder — à remplacer par l'opinion réelle du membre.",
  },
  {
    id: "member-09",
    name: "Membre 09",
    role: "Développeur IA / Vision",
    opinion:
      "La calibration de la stéréovision et la reconstruction 3D m'ont ouvert à la perception robotique. Placeholder — à remplacer par l'opinion réelle du membre.",
  },
  {
    id: "member-10",
    name: "Membre 10",
    role: "Développeur IA / Vision",
    opinion:
      "L'inférence temps réel à 3,55 ms/image m'a poussé à optimiser chaque étape du pipeline. Placeholder — à remplacer par l'opinion réelle du membre.",
  },
  {
    id: "member-11",
    name: "Membre 11",
    role: "Ingénieur Commande & Trajectoire",
    opinion:
      "Valider expérimentalement l'Input Shaping ZVD avec une réduction θmax de 74 % fut un moment fort. Placeholder — à remplacer par l'opinion réelle du membre.",
  },
  {
    id: "member-12",
    name: "Membre 12",
    role: "Ingénieur Commande & Trajectoire",
    opinion:
      "Implémenter la planification A* 3D avec replanification dynamique m'a appris la robustesse algorithmique. Placeholder — à remplacer par l'opinion réelle du membre.",
  },
  {
    id: "member-13",
    name: "Membre 13",
    role: "Chef de Projet",
    opinion:
      "Coordonner 14 ingénieurs autour d'une vision commune a été la meilleure école de leadership. Placeholder — à remplacer par l'opinion réelle du membre.",
  },
  {
    id: "member-14",
    name: "Membre 14",
    role: "Chef de Projet",
    opinion:
      "Le dialogue avec Sonasid et EMINES a consolidé ma compréhension des enjeux industriels. Placeholder — à remplacer par l'opinion réelle du membre.",
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
