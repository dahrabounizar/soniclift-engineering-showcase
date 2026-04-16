import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";

const TEAM = [
  { name: "Membre 1", role: "Responsable Mécanique" },
  { name: "Membre 2", role: "Ingénierie Électronique" },
  { name: "Membre 3", role: "Développement Logiciel" },
  { name: "Membre 4", role: "Chef de Projet" },
];

export const NotreEquipe = () => {
  return (
    <section id="notre-equipe" className="section">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center">
          <p className="eyebrow">L'Équipe</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Les Ingénieurs Derrière SonicLift
          </h2>
          <p className="mt-6 max-w-[600px] mx-auto text-steel leading-[1.8]">
            Une équipe pluridisciplinaire d'étudiants en robotique réunie autour
            d'un objectif commun : transformer une vision technique ambitieuse en
            machine fonctionnelle.
          </p>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 80}>
              <article className="glass rounded-2xl p-8 text-center group transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.4)]">
                <div
                  className="w-20 h-20 mx-auto rounded-full"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--cyan-accent)))",
                  }}
                />
                <h3 className="mt-5 font-display font-semibold text-foreground text-lg">
                  {m.name}
                </h3>
                <p className="mt-2 font-body text-[0.72rem] uppercase tracking-[0.18em] text-steel">
                  {m.role}
                </p>
                <div className="mt-5 mx-auto h-[2px] w-10 bg-primary/70 group-hover:w-16 transition-all duration-300" />
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/notre-equipe" className="btn-outline-amber">
            Voir l'Équipe Complète
          </Link>
        </div>
      </div>
    </section>
  );
};
