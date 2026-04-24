import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { FEATURED_TEAM_MEMBERS } from "@/data/team";

/**
 * ============================================================================
 * FILE: src/components/NotreEquipe.tsx
 * ============================================================================
 * PURPOSE:
 *   Condensed team preview for the home page. Shows a compact grid of the
 *   first 6 featured members (photo placeholder + name + role only — no
 *   opinions here). A CTA links to the dedicated /notre-equipe page where
 *   all 14 members appear with their individual opinions.
 * ============================================================================
 */

export const NotreEquipe = () => {
  return (
    <section id="notre-equipe" className="section">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">L'Équipe</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Les Ingénieurs Derrière SonicLift
          </h2>
          <p className="mt-6 text-steel leading-[1.8]">
            Quatorze étudiants en robotique réunis autour d'un objectif
            commun : transformer une vision technique ambitieuse en machine
            fonctionnelle.
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {FEATURED_TEAM_MEMBERS.map((m, i) => (
            <Reveal key={m.id} delay={i * 60}>
              <article className="glass rounded-2xl p-5 text-center group transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.3)]">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-16 h-16 mx-auto rounded-full object-cover ring-1 ring-primary/30"
                  />
                ) : (
                  <div
                    className="w-16 h-16 mx-auto rounded-full ring-1 ring-primary/30"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--cyan-accent)))",
                    }}
                  />
                )}
                <h3 className="mt-4 font-display font-semibold text-foreground text-sm">
                  {m.name}
                </h3>
                <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-steel">
                  {m.role}
                </p>
                <div className="mt-3 mx-auto h-[2px] w-8 bg-primary/70 group-hover:w-12 transition-all duration-300" />
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/notre-equipe" className="btn-outline-amber">
            Voir les 14 Membres
          </Link>
        </div>
      </div>
    </section>
  );
};