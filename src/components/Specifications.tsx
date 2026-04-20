import { Download, Ruler, Cog, Layers, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";

/**
 * ============================================================================
 * FILE: src/components/Specifications.tsx
 * ============================================================================
 * PURPOSE:
 *   "Specifications" section — technical data sheet organized into four
 *   thematic glass cards: dimensions, motorization, structure/materials, and
 *   electronics/intelligence. Each card renders its own parameter table with
 *   values consolidated from the dossier de définition and Revue 2 updates.
 * ============================================================================
 */

type SpecRow = [string, string];

interface SpecGroup {
  icon: typeof Ruler;
  eyebrow: string;
  title: string;
  rows: SpecRow[];
}

const GROUPS: SpecGroup[] = [
  {
    icon: Ruler,
    eyebrow: "Géométrie",
    title: "Dimensions & Capacités",
    rows: [
      ["Espace de travail utile", "1200 × 800 × 1000 mm"],
      ["Dimensions globales", "1240 × 760 × 984 mm"],
      ["Charge utile maximale", "8 kg"],
      ["Charge de test FEA (majorée)", "30 kg (≈ 300 N)"],
      ["Degrés de liberté", "4 (X, Y, Z + rotation)"],
      ["Vitesse de déplacement max", "32 m/min (0,533 m/s)"],
      ["Accélération nominale", "0,5 m/s²"],
    ],
  },
  {
    icon: Cog,
    eyebrow: "Motorisation",
    title: "Actionneurs & Transmission",
    rows: [
      ["Moteurs pas à pas", "5× NEMA 23"],
      ["Drivers de puissance", "DM542 (microstepping configurable)"],
      ["Servomoteur de rotation", "Dynamixel MX-28T"],
      ["Transmission X / Y", "Poulie-courroie GT2, rayon eff. 15 mm"],
      ["Transmission Z", "Double tambour à câbles, rayon 20 mm"],
      ["Couple requis levage (total)", "2,92 N·m (1,46 N·m par moteur)"],
      ["Couple requis rotation", "≈ 1,67 N·m"],
      ["Rendement transmission", "η ≈ 0,85 – 0,90"],
    ],
  },
  {
    icon: Layers,
    eyebrow: "Structure",
    title: "Matériaux & Validation",
    rows: [
      ["Châssis principal", "V-slot aluminium 6061, 20×20 mm"],
      ["Configuration", "Bipoutre (X) + monopoutre (Y)"],
      ["Moment d'inertie axe X (bipoutre)", "≈ 1,07×10⁻⁷ m⁴"],
      ["Déflexion max validée (FEA)", "0,3 mm sous 300 N"],
      ["Câbles de levage", "4× acier, coefficient sécurité 5"],
      ["Allongement élastique", "≈ 0,5 mm par mètre"],
      ["Plaques & supports", "HPL8, PVC 5,1 mm, impression 3D"],
      ["Arbres de transmission", "Acier inoxydable Ø12 mm"],
    ],
  },
  {
    icon: Cpu,
    eyebrow: "Intelligence",
    title: "Électronique & Logiciel",
    rows: [
      ["Contrôleur principal", "Arduino Mega 2560"],
      ["Capteurs de position", "7× fins de course (X, Y, Z)"],
      ["Capteurs inertiels", "Accéléromètre + gyroscope"],
      ["Sécurité", "Bouton d'arrêt d'urgence ligne principale"],
      ["Alimentation", "12 V stabilisée + 5 V régulée"],
      ["Vision", "2× caméras Logitech (stéréovision calibrée)"],
      ["Modèle détection", "YOLOv5 — précision 99,64 %"],
      ["mAP50 / mAP50-95", "99,24 % / 92,87 %"],
      ["Inférence temps réel", "3,55 ms/image"],
      ["Commande anti-ballant", "Input Shaping ZVD (θmax −74 %, RMS −73 %)"],
      ["Planification trajectoire", "A* 3D multi-critères + replanification"],
    ],
  },
];

/**
 * SpecCard
 * Renders a single thematic specification card.
 *
 * INPUTS:  group (SpecGroup).
 * OUTPUTS: JSX.Element — a styled glass card with header + rows.
 */
const SpecCard = ({ group }: { group: SpecGroup }) => {
  const { icon: Icon, eyebrow, title, rows } = group;
  return (
    <article className="glass rounded-2xl p-7 h-full">
      <header className="flex items-start gap-4 pb-5 mb-5 border-b border-white/5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--cyan-accent) / 0.15))",
            border: "1px solid hsl(var(--primary) / 0.3)",
          }}
        >
          <Icon size={20} className="text-primary" />
        </div>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h3 className="mt-1 font-display font-bold text-xl text-foreground">
            {title}
          </h3>
        </div>
      </header>

      <dl className="space-y-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between items-baseline gap-4 py-1.5"
          >
            <dt className="font-body text-[0.72rem] uppercase tracking-[0.13em] text-steel shrink-0 max-w-[55%]">
              {label}
            </dt>
            <dd className="font-mono text-sm text-foreground text-right">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
};

/**
 * Specifications
 * Section container for all 4 specification groups.
 *
 * INPUTS:  None.
 * OUTPUTS: JSX.Element — <section id="specifications">.
 */
export const Specifications = () => {
  return (
    <section
      id="specifications"
      className="section"
      style={{
        background: "hsl(var(--surface))",
        borderTop: "1px solid hsl(var(--primary) / 0.2)",
        borderBottom: "1px solid hsl(var(--primary) / 0.2)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">Données Techniques</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Fiche Technique Complète
          </h2>
          <p className="mt-5 text-steel leading-[1.8]">
            Paramètres clés du système SonicLift — géométrie, motorisation,
            structure et intelligence embarquée.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 80}>
              <SpecCard group={g} />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/specifications" className="btn-outline-amber">
            <Download size={16} /> Télécharger la Fiche Complète
          </Link>
        </div>
      </div>
    </section>
  );
};