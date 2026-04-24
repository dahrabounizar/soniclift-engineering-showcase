import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { PROJECT_AXES } from "@/data/axes";

/**
 * ============================================================================
 * FILE: src/components/AxesProjet.tsx
 * ============================================================================
 * PURPOSE:
 *   Home-page section presenting the four project disciplines as linked
 *   cards. Each card shows an icon, title, short description, and a
 *   "Découvrir" link. Data comes from src/data/axes.ts.
 * ============================================================================
 */

/**
 * AxesProjet
 *
 * Renders a 4-card grid with each card routing to its dedicated page or
 * deep-linked section. The entire card is a clickable Link for maximum
 * affordance on mobile.
 *
 * INPUTS:  None.
 * OUTPUTS: JSX.Element — the <section id="axes"> element.
 */
export const AxesProjet = () => {
  return (
    <section
      id="axes"
      className="section"
      style={{
        background: "hsl(var(--surface))",
        borderTop: "1px solid hsl(var(--border))",
        borderBottom: "1px solid hsl(var(--border))",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">Axes du Projet</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Quatre Disciplines Convergentes
          </h2>
          <p className="mt-6 text-steel leading-[1.8]">
            SonicLift combine quatre domaines d'ingénierie complémentaires.
            Cliquez sur chaque axe pour explorer les choix techniques, les
            calculs de dimensionnement et les résultats de validation.
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECT_AXES.map((axis, i) => {
            const Icon = axis.icon;
            return (
              <Reveal key={axis.id} delay={i * 80}>
                <Link
                  to={axis.link}
                  className="glass rounded-2xl p-7 h-full flex flex-col group transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.4)]"
                >
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

                  <h3 className="mt-5 font-display font-bold text-xl text-foreground">
                    {axis.title}
                  </h3>
                  <p className="mt-3 text-sm text-steel leading-[1.7] flex-1">
                    {axis.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-primary font-mono text-[0.72rem] uppercase tracking-[0.15em] group-hover:gap-3 transition-all">
                    Découvrir
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
