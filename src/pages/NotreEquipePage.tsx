import { Link } from "react-router-dom";
import { Users, Quote } from "lucide-react";
import { DetailPageLayout } from "@/components/DetailPageLayout";
import { Reveal } from "@/components/Reveal";
import { TEAM_MEMBERS } from "@/data/team";

/**
 * ============================================================================
 * FILE: src/pages/NotreEquipePage.tsx
 * ============================================================================
 * PURPOSE:
 *   Dedicated /notre-equipe page. Presents all 14 team members as full cards
 *   including photo placeholder, name, role, and an individual opinion
 *   rendered as an italicized blockquote. Data comes from src/data/team.ts.
 * ============================================================================
 */

const NotreEquipePage = () => {
  return (
    <DetailPageLayout title="Notre Équipe">
      {/* Hero band */}
      <section className="section pt-16">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <p className="eyebrow">Notre Équipe — 14 Ingénieurs</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
              Les Ingénieurs Derrière SonicLift
            </h1>
            <p className="mt-6 text-steel text-lg leading-[1.8] max-w-3xl mx-auto">
              Quatorze étudiants en robotique rassemblés autour d'un projet
              ambitieux — du dimensionnement mécanique à la génération de
              trajectoires A*, chaque discipline est portée par une expertise
              dédiée. Découvrez ici le témoignage individuel de chaque membre.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Members grid */}
      <section className="section pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((m, i) => (
              <Reveal key={m.id} delay={(i % 4) * 60}>
                <article className="glass rounded-2xl p-7 h-full flex flex-col">
                  {/* Photo + identity */}
                  <div className="flex flex-col items-center text-center">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-24 h-24 rounded-full object-cover ring-2 ring-primary/30"
                      />
                    ) : (
                      <div
                        className="w-24 h-24 rounded-full ring-2 ring-primary/30"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--cyan-accent)))",
                        }}
                      />
                    )}
                    <h3 className="mt-5 font-display font-bold text-foreground text-lg">
                      {m.name}
                    </h3>
                    <p className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary">
                      {m.role}
                    </p>
                    <div className="mt-4 h-[2px] w-10 bg-primary/40" />
                  </div>

                  {/* Opinion */}
                  <blockquote className="mt-6 flex-1 relative pl-6">
                    <Quote
                      size={18}
                      className="text-primary/40 absolute left-0 top-0"
                    />
                    <p className="italic text-sm text-steel leading-[1.7]">
                      {m.opinion}
                    </p>
                  </blockquote>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section pt-0 pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Users size={32} className="text-primary mx-auto opacity-70" />
            <h2 className="mt-4 text-3xl font-extrabold">
              Une Équipe, Un Projet
            </h2>
            <p className="mt-4 text-steel">
              Pour toute question ou opportunité de collaboration, n'hésitez
              pas à nous contacter.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link to="/#contact" className="btn-amber">
                Contacter l'Équipe
              </Link>
              <Link to="/la-machine" className="btn-outline-amber">
                Découvrir la Machine
              </Link>
              <Link to="/" className="btn-outline-amber">
                Retour à l'Accueil
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </DetailPageLayout>
  );
};

export default NotreEquipePage;