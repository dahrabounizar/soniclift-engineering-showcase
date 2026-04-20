import { Link } from "react-router-dom";
import { Move, MoveHorizontal, ArrowUpDown, RotateCw } from "lucide-react";
import { Reveal } from "./Reveal";
import { ImageWithFallback } from "./ImageWithFallback";

/**
 * ============================================================================
 * FILE: src/components/LaMachine.tsx
 * ============================================================================
 * PURPOSE:
 *   "La Machine" section — presents the mechatronic architecture of the
 *   SonicLift crane. Covers the 4 degrees of freedom (Translation X,
 *   Direction Y, Lifting Z, Rotation), the V-slot aluminum frame and its
 *   bipoutre configuration, FEA validation, and materials used.
 * ============================================================================
 */

const DOF = [
  {
    icon: Move,
    axis: "Translation (X)",
    title: "Déplacement longitudinal",
    desc: "Course de 1200 mm sur rails principaux bipoutre. Motorisation NEMA 23 + transmission poulie-courroie GT2 tendue.",
  },
  {
    icon: MoveHorizontal,
    axis: "Direction (Y)",
    title: "Déplacement transversal",
    desc: "Course de 800 mm du chariot sur la poutre principale monopoutre. NEMA 23 + poulie-courroie synchrone.",
  },
  {
    icon: ArrowUpDown,
    axis: "Levage (Z)",
    title: "Mouvement vertical",
    desc: "Course de 1000 mm via double tambour à câbles. 2× NEMA 23 motorisés indépendamment pour la symétrie de charge.",
  },
  {
    icon: RotateCw,
    axis: "Orientation",
    title: "Rotation de la charge",
    desc: "Servomoteur Dynamixel MX-28T avec commande angulaire numérique précise. Guidage par paliers et arbre inox Ø12 mm.",
  },
];

const MATERIALS = [
  { name: "Aluminium 6061", detail: "Profilés V-slot 20×20" },
  { name: "Acier Inoxydable", detail: "Arbres de transmission" },
  { name: "HPL8", detail: "Plaques structurelles" },
  { name: "PVC & Thermoplastique", detail: "Supports & impression 3D" },
];

/**
 * LaMachine
 *
 * Composite section rendering machine identity, 4 DOF cards, kinematic
 * diagram, structure/dimensions, FEA validation, and materials strip.
 *
 * INPUTS:  None.
 * OUTPUTS: JSX.Element — <section id="la-machine">.
 */
export const LaMachine = () => {
  return (
    <section id="la-machine" className="section">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">La Machine</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Architecture Mécatronique
          </h2>
          <p className="mt-6 text-steel leading-[1.8]">
            Quatre degrés de liberté indépendants pour manipuler une charge
            dans un volume 3D complet, avec rotation contrôlée. Une structure
            bipoutre en aluminium V-slot validée par analyse éléments finis
            garantit rigidité et précision sous charge nominale.
          </p>
        </Reveal>

        {/* 4 DOF cards */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOF.map(({ icon: Icon, axis, title, desc }, i) => (
            <Reveal key={axis} delay={i * 80}>
              <article className="glass rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.4)]">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--cyan-accent) / 0.15))",
                    border: "1px solid hsl(var(--primary) / 0.3)",
                  }}
                >
                  <Icon size={22} className="text-primary" />
                </div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary">
                  {axis}
                </p>
                <h3 className="mt-2 font-display font-semibold text-lg text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-steel leading-[1.7]">{desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Kinematic diagram */}
        <Reveal className="mt-24">
          <div className="text-center mb-8">
            <p className="eyebrow">Cinématique</p>
            <h3 className="mt-3 text-3xl font-extrabold">Schéma Cinématique</h3>
          </div>
          <div className="max-w-4xl mx-auto">
            <ImageWithFallback
              src="/images/machine/kinematic-diagram.png"
              alt="Schéma cinématique du pont roulant bipoutre avec les 4 degrés de liberté"
              caption="Architecture bipoutre posée — Translation, Direction, Levage, Orientation"
              aspectRatio="16/10"
            />
          </div>
        </Reveal>

        {/* Structure & Dimensions */}
        <div className="mt-24 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <p className="eyebrow">Structure</p>
            <h3 className="mt-3 text-3xl font-extrabold leading-tight">
              Châssis V-slot Bipoutre
            </h3>
            <p className="mt-5 text-steel leading-[1.8]">
              La structure repose sur des profilés aluminium V-slot 20×20 mm,
              assemblés par cornières et écrous en T. Une configuration
              bipoutre est retenue pour l'axe X — qui supporte la majorité des
              contraintes — tandis que l'axe Y conserve un profilé simple.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-steel">
              <li className="flex gap-3">
                <span className="text-primary font-mono mt-0.5">▸</span>
                <span>
                  <strong className="text-foreground">Dimensions globales :</strong>{" "}
                  1240 × 760 × 984 mm
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-mono mt-0.5">▸</span>
                <span>
                  <strong className="text-foreground">Espace utile :</strong>{" "}
                  1200 × 800 × 1000 mm
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-mono mt-0.5">▸</span>
                <span>
                  <strong className="text-foreground">Moment d'inertie bipoutre :</strong>{" "}
                  ≈ 1,07×10⁻⁷ m⁴ (≈ 8× profilé simple)
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-mono mt-0.5">▸</span>
                <span>
                  <strong className="text-foreground">Fixation :</strong>{" "}
                  cornières aluminium + T-nuts, solution vis-écrou directe pour
                  les assemblages critiques
                </span>
              </li>
            </ul>
          </Reveal>

          <Reveal direction="right">
            <ImageWithFallback
              src="/images/machine/solidworks-render.png"
              alt="Maquette numérique SolidWorks complète du pont roulant"
              caption="Maquette numérique SolidWorks — assemblage complet"
              aspectRatio="4/3"
            />
          </Reveal>
        </div>

        {/* FEA Validation */}
        <Reveal className="mt-24">
          <article
            className="glass rounded-3xl p-8 md:p-12"
            style={{
              background: "rgba(255,255,255,0.025)",
              borderColor: "hsl(var(--primary) / 0.18)",
            }}
          >
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="eyebrow">Validation</p>
                <h3 className="mt-3 text-3xl font-extrabold leading-tight">
                  Analyse Éléments Finis
                </h3>
                <p className="mt-5 text-steel leading-[1.8]">
                  Plusieurs configurations structurelles ont été comparées
                  sous charge majorée de 30 kg (soit ≈ 300 N). La solution
                  bipoutre retenue présente une déflexion maximale de{" "}
                  <strong className="text-foreground">0,3 mm</strong> —
                  largement compatible avec les exigences de précision des
                  mouvements X et Y.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="font-display font-extrabold text-primary text-3xl">
                      0,3 mm
                    </p>
                    <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                      Déflexion max
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-display font-extrabold text-primary text-3xl">
                      300 N
                    </p>
                    <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                      Charge test
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ImageWithFallback
                  src="/images/machine/fea-deformation.png"
                  alt="Analyse par éléments finis — déformation sous charge majorée"
                  caption="Déformation FEA"
                  aspectRatio="1/1"
                />
                <ImageWithFallback
                  src="/images/machine/axe-z-section.png"
                  alt="Coupe de l'axe Z de rotation avec détail du guidage"
                  caption="Coupe axe Z"
                  aspectRatio="1/1"
                />
              </div>
            </div>
          </article>
        </Reveal>

        {/* Materials strip */}
        <Reveal className="mt-24">
          <div className="text-center mb-10">
            <p className="eyebrow">Matériaux</p>
            <h3 className="mt-3 text-3xl font-extrabold">Sélection Technique</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MATERIALS.map((m) => (
              <div
                key={m.name}
                className="glass rounded-xl p-5 text-center"
              >
                <p className="font-display font-semibold text-foreground">
                  {m.name}
                </p>
                <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link to="/la-machine" className="btn-outline-amber">
            Explorer en Détail
          </Link>
        </div>
      </div>
    </section>
  );
};