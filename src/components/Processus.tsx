import {
  ClipboardList,
  Ruler,
  Wrench,
  Zap,
  Eye,
  Waves,
  Route,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { ImageWithFallback } from "./ImageWithFallback";

/**
 * ============================================================================
 * FILE: src/components/Processus.tsx
 * ============================================================================
 * PURPOSE:
 *   "Processus" section — 7-phase vertical timeline of the SonicLift project
 *   from functional analysis through to trajectory planning. Each phase has
 *   a unique icon, description, and tech badges. Images are embedded via
 *   ImageWithFallback for phases that benefit from visual support.
 *
 *   Technical corrections applied vs the original dossier:
 *   - V-slot 20×20 moment of inertia uses real hollow-section value
 *     (≈ 6,5×10⁻⁹ m⁴), not the simplified solid-square approximation
 *   - Motor count and types reflect Revue 2 (5× NEMA 23 + Dynamixel MX-28T)
 * ============================================================================
 */

interface Phase {
  n: string;
  icon: typeof ClipboardList;
  eyebrow: string;
  title: string;
  description: string;
  badges: string[];
  image?: { src: string; alt: string; caption: string };
}

const PHASES: Phase[] = [
  {
    n: "01",
    icon: ClipboardList,
    eyebrow: "Analyse Fonctionnelle",
    title: "Modélisation SysML",
    description:
      "Le système a été entièrement modélisé via trois diagrammes SysML complémentaires : diagramme de cas d'utilisation (modes manuel et automatique), diagramme d'exigences (sécurité HSE, détection, performances), et diagramme de blocs (BDD) structurant l'architecture en sous-systèmes mécaniques, électroniques et logiciels.",
    badges: ["SysML", "BDD", "Cas d'utilisation", "Exigences"],
  },
  {
    n: "02",
    icon: Ruler,
    eyebrow: "Conception & Dimensionnement",
    title: "Étude Mécanique Rigoureuse",
    description:
      "Architecture bipoutre validée par analyse RDM du profilé V-slot 20×20 en section réelle (I ≈ 6,5×10⁻⁹ m⁴, valeur constructeur — non une approximation carrée pleine). Configuration double sur l'axe X fortement sollicité, monopoutre sur Y. Dimensionnement des motorisations, câbles de levage acier (coefficient de sécurité 5), et validation par FEA SolidWorks.",
    badges: ["SolidWorks", "FEA", "RDM", "Dimensionnement"],
  },
  {
    n: "03",
    icon: Wrench,
    eyebrow: "Fabrication & Assemblage",
    title: "Usinage Multi-Procédés",
    description:
      "Chaîne de fabrication complète au Fablab : tour conventionnel et fraiseuse pour les moyeux aluminium et arbres acier inoxydable, CNC pour les plaques HPL8 et PVC et les glissières, impression 3D pour les supports (MX-28, guides), scie à ruban pour le débit des profilés aluminium.",
    badges: ["CNC", "Tournage", "Fraisage", "Impression 3D", "Fablab"],
  },
  {
    n: "04",
    icon: Zap,
    eyebrow: "Architecture Électrique",
    title: "Câblage & Puissance",
    description:
      "Arduino Mega 2560 pilote 5 moteurs NEMA 23 pas à pas via drivers DM542 (axes X, Y, 2× levage Z, translation secondaire), ainsi qu'un servomoteur Dynamixel MX-28T pour la rotation. 7 capteurs de fin de course sécurisent les courses mécaniques. Un bouton d'arrêt d'urgence coupe l'alimentation principale. Alimentation 12 V stabilisée pour les moteurs et Arduino, 5 V régulée pour les capteurs.",
    badges: [
      "Arduino Mega",
      "5× NEMA 23",
      "DM542",
      "Dynamixel MX-28T",
      "Arrêt d'urgence",
    ],
    image: {
      src: "/images/processus/circuit-electrique.png",
      alt: "Circuit électrique complet avec Arduino Mega, drivers DM542 et moteurs",
      caption: "Figure 13 — Schéma de câblage global",
    },
  },
  {
    n: "05",
    icon: Eye,
    eyebrow: "Vision Stéréoscopique",
    title: "Détection IA & Localisation 3D",
    description:
      "Modèle YOLOv5 entraîné sur un dataset personnalisé Roboflow de 3 038 images annotées (camions, fardeaux, cônes, boîtes), complété par un modèle dédié personnes (dataset LEGO) et yolov5x6.pt pré-entraîné sur Open Images pour les obstacles génériques. Performances validées : précision 99,64 %, mAP50 99,24 %, mAP50-95 92,87 %, inférence 3,55 ms/image. Stéréovision par deux caméras Logitech calibrées (échiquier OpenCV) pour reconstruire les coordonnées (X, Y, Z) de chaque objet détecté, avec correction de hauteur par Pythagore pour obtenir la distance horizontale au sol.",
    badges: [
      "YOLOv5",
      "Roboflow",
      "OpenCV",
      "Stéréovision",
      "99,64% précision",
    ],
    image: {
      src: "/images/processus/detection-result.png",
      alt: "Résultats de détection temps réel avec bounding boxes sur camion, fardeaux, personnes et obstacles",
      caption: "Détection simultanée camion, fardeaux, personne, obstacle",
    },
  },
  {
    n: "06",
    icon: Waves,
    eyebrow: "Commande Anti-Ballant",
    title: "Input Shaping ZV / ZVD",
    description:
      "Modélisation pendulaire non-linéaire par formalisme de Lagrange, aboutissant à la pulsation naturelle ωₙ = √(g/ℓ). La loi de commande trapézoïdale classique excite fortement le mode propre (θmax ≈ 6,22° résiduel). L'Input Shaping convolue la commande par une séquence d'impulsions calibrées : ZVD (3 impulsions) réduit θmax de 74 %, RMS de 73 %, vitesse angulaire max de 77 %. Validation expérimentale sur prototype : pendule immobile à l'arrêt du chariot.",
    badges: [
      "Lagrange",
      "Input Shaping ZVD",
      "θmax -74%",
      "RMS -73%",
      "Anti-Sway",
    ],
    image: {
      src: "/images/processus/input-shaping-comparison.png",
      alt: "Comparaison des réponses pendulaires entre commande trapézoïdale et Input Shaping ZVD",
      caption: "Trapézoïdal vs Input Shaping ZVD — réduction des oscillations",
    },
  },
  {
    n: "07",
    icon: Route,
    eyebrow: "Génération de Trajectoire",
    title: "A* Multi-Critères 3D",
    description:
      "Planification globale par algorithme A* configuré avec une fonction de coût multi-critères : distance euclidienne 3D + pénalité d'oscillations (mouvements brusques, zigzags), pénalité de hauteur (zone de croisière optimale), pénalité de proximité aux obstacles, et bonus d'orientation vers la cible. Une boucle de surveillance temps-réel détecte les obstacles dynamiques (opérateurs, engins) sur un horizon Lookahead et déclenche une replanification locale à partir de la position courante.",
    badges: ["A*", "Replanification", "Multi-Critères", "Temps Réel"],
    image: {
      src: "/images/processus/trajectory-3d.png",
      alt: "Visualisation 3D de trajectoire planifiée contournant des obstacles",
      caption: "Trajectoire A* 3D — contournement d'obstacles centraux",
    },
  },
];

/**
 * PhaseCard
 * Renders a single timeline phase with alternating reveal direction.
 *
 * INPUTS:  phase (Phase object), index (number for direction alternation).
 * OUTPUTS: JSX.Element — the full phase card.
 */
const PhaseCard = ({ phase, index }: { phase: Phase; index: number }) => {
  const { n, icon: Icon, eyebrow, title, description, badges, image } = phase;
  const direction = index % 2 === 0 ? "left" : "right";

  return (
    <Reveal direction={direction} delay={index * 60}>
      <article className="glass rounded-2xl p-7 md:p-9 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_20px_60px_-25px_hsl(var(--primary)/0.35)]">
        <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
          {/* Phase number + icon column */}
          <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6">
            <span
              className="font-display font-extrabold text-primary leading-none"
              style={{ fontSize: "clamp(3rem, 5vw, 4rem)" }}
            >
              {n}
            </span>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--cyan-accent) / 0.15))",
                border: "1px solid hsl(var(--primary) / 0.3)",
              }}
            >
              <Icon size={22} className="text-primary" />
            </div>
          </div>

          {/* Content column */}
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h3 className="mt-2 font-display font-bold text-2xl md:text-3xl text-foreground leading-tight">
              {title}
            </h3>
            <p className="mt-4 text-steel leading-[1.8]">{description}</p>

            {/* Badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="font-mono text-[0.65rem] uppercase tracking-[0.12em] px-3 py-1.5 rounded-full"
                  style={{
                    background: "hsl(var(--primary) / 0.12)",
                    border: "1px solid hsl(var(--primary) / 0.25)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Optional image */}
            {image && (
              <div className="mt-7 max-w-2xl">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  caption={image.caption}
                  aspectRatio="16/10"
                />
              </div>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
};

/**
 * Processus
 * Timeline container for all 7 phases.
 *
 * INPUTS:  None.
 * OUTPUTS: JSX.Element — <section id="processus">.
 */
export const Processus = () => {
  return (
    <section id="processus" className="section">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">Processus</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Du Cahier des Charges au Prototype
          </h2>
          <p className="mt-6 text-steel leading-[1.8]">
            Sept phases coordonnées — de l'analyse fonctionnelle SysML à la
            planification de trajectoire temps-réel — qui transforment un
            besoin industriel complexe en machine mécatronique autonome.
          </p>
        </Reveal>

        <div className="mt-16 space-y-6">
          {PHASES.map((phase, i) => (
            <PhaseCard key={phase.n} phase={phase} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};