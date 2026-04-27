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
  photo?: string;
}

/**
 * TEAM_MEMBERS
 *
 * The full 14-member team. Each member is identified by their real name,
 * area of contribution, and photo path under public/images/team/.
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "youssra-gaddah",
    name: "Youssra Gaddah",
    role: "Mécanique & Chef de Projet",
    photo: "/images/team/youssra_gaddah.jpg",
  },
  {
    id: "mehdi-sahhar",
    name: "Mehdi Sahhar",
    role: "Commande",
    photo: "/images/team/mehdi_sahhar.jpg",
  },
  {
    id: "asmae-chabab",
    name: "Asmae Chabab",
    role: "Détection",
    photo: "/images/team/asmae_chabab.jpg",
  },
  {
    id: "nizar-dahrabou",
    name: "Nizar Dahrabou",
    role: "Dimensionnement",
    photo: "/images/team/nizar_dahrabou.jpg",
  },
  {
    id: "khadija-elmrabet",
    name: "Khadija El Mrabet",
    role: "Électrique",
    photo: "/images/team/khadija_elmrabet.jpg",
  },
  {
    id: "sara-gherras",
    name: "Sara Gherras",
    role: "Détection",
    photo: "/images/team/sara_gherras.jpg",
  },
  {
    id: "mohammed-sadiki",
    name: "Mohammed Sadiki",
    role: "Dimensionnement",
    photo: "/images/team/mohammed_sadiki.jpg",
  },
  {
    id: "hiba-tajri",
    name: "Hiba Tajri",
    role: "Électrique",
    photo: "/images/team/hiba_tajri.jpg",
  },
  {
    id: "iliass-ait-ali-ouiddar",
    name: "Iliass Ait Ali Ouiddar",
    role: "Commande",
    photo: "/images/team/iliass_ait_ali_ouiddar.jpg",
  },
  {
    id: "aya-nait-yazza",
    name: "Aya Nait Yazza",
    role: "Électrique",
    photo: "/images/team/aya_nait_yazza.jpg",
  },
  {
    id: "marouane-zemrani",
    name: "Marouane Zemrani",
    role: "Dimensionnement",
    photo: "/images/team/marouane_zemrani.jpg",
  },
  {
    id: "aymane-knadel",
    name: "Aymane Knadel",
    role: "Mécanique",
    photo: "/images/team/aymane_knadel.jpg",
  },
  {
    id: "rami-iloughmane",
    name: "Rami Iloughmane",
    role: "Mécanique",
    photo: "/images/team/rami_iloughmane.jpg",
  },
  {
    id: "mohammed-sitel",
    name: "Mohammed Sitel",
    role: "Mécanique",
    photo: "/images/team/mohammed_sitel.jpg",
  },
];

/**
 * FEATURED_TEAM_MEMBERS
 *
 * First 6 members — used as a compact preview on the home page. Clicking the
 * CTA below this preview sends the user to /notre-equipe for the complete
 * 14-member list.
 */
export const FEATURED_TEAM_MEMBERS: TeamMember[] = TEAM_MEMBERS.slice(0, 6);