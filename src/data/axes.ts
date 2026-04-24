/**
 * ============================================================================
 * FILE: src/data/axes.ts
 * ============================================================================
 * PURPOSE:
 *   Source of truth for the four project disciplines (axes) shown on the
 *   home page. Each axis links to the page or anchor where that domain is
 *   presented in depth. Used by src/components/AxesProjet.tsx.
 * ============================================================================
 */

import { Cog, Zap, Eye, Waves, type LucideIcon } from "lucide-react";

export interface ProjectAxis {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

/**
 * PROJECT_AXES
 *
 * Four disciplines that together form the SonicLift system. Mécanique lives
 * on its own detail page; Électrique, IA & Vision, and Commande & Trajectoire
 * link to the Processus page at specific phase anchors.
 */
export const PROJECT_AXES: ProjectAxis[] = [
  {
    id: "mecanique",
    icon: Cog,
    title: "Mécanique",
    description:
      "Architecture 4 degrés de liberté, structure V-slot validée par FEA, système de levage double tambour.",
    link: "/la-machine",
  },
  {
    id: "electrique",
    icon: Zap,
    title: "Électrique",
    description:
      "Arduino Mega 2560, drivers DM542, alimentations 12 V / 5 V, architecture modulaire sécurisée.",
    link: "/processus#phase-04",
  },
  {
    id: "ia-vision",
    icon: Eye,
    title: "IA & Vision",
    description:
      "YOLOv5 custom (précision 99,64 %), stéréovision calibrée, détection temps réel multi-classes.",
    link: "/processus#phase-05",
  },
  {
    id: "commande",
    icon: Waves,
    title: "Commande & Trajectoire",
    description:
      "Input Shaping ZVD anti-ballant, planification A* 3D, replanification dynamique en temps réel.",
    link: "/processus#phase-07",
  },
];
