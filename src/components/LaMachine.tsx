import { Link } from "react-router-dom";
import { Move, MoveHorizontal, ArrowUpDown, RotateCw, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * ============================================================================
 * FILE: src/components/LaMachine.tsx
 * ============================================================================
 * PURPOSE:
 *   Compact "peek" version of La Machine on the home page. Presents the 4
 *   degrees of freedom of the crane with icon cards, then links to the full
 *   detail page (/la-machine) via an "En savoir plus" CTA.
 * ============================================================================
 */

const DOF = [
  {
    icon: Move,
    axis: "Translation (X)",
    title: "Déplacement longitudinal",
    desc: "Course 1200 mm sur rails bipoutre. NEMA 23 + poulie-courroie GT2.",
  },
  {
    icon: MoveHorizontal,
    axis: "Direction (Y)",
    title: "Déplacement transversal",
    desc: "Course 800 mm du chariot sur poutre principale. NEMA 23 + courroie tendue.",
  },
  {
    icon: ArrowUpDown,
    axis: "Levage (Z)",
    title: "Mouvement vertical",
    desc: "Course 1000 mm via double tambour. 2× NEMA 23 motorisés indépendamment.",
  },
  {
    icon: RotateCw,
    axis: "Orientation",
    title: "Rotation de la charge",
    desc: "Servomoteur Dynamixel MX-28T pour commande angulaire précise.",
  },
];

export const LaMachine = () => {
  return (
    <section id="la-machine" className="section">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">La Machine</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Architecture Mécatronique
          </h2>
          <p className="mt-6 text-steel leading-[1.8]">
            Quatre degrés de liberté indépendants pour manipuler une charge
            dans un volume 3D complet, avec rotation contrôlée.
          </p>
        </Reveal>

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

        <div className="mt-14 text-center">
          <Link to="/la-machine" className="btn-amber">
            En savoir plus <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};