import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";

const STEPS = [
  { n: "01", title: "Idéation", desc: "Définition du cahier des charges" },
  { n: "02", title: "Conception", desc: "Modélisation 3D et calculs structurels" },
  { n: "03", title: "Fabrication", desc: "Usinage et assemblage mécanique" },
  { n: "04", title: "Électronique", desc: "Câblage, motorisation et capteurs" },
  { n: "05", title: "Programmation", desc: "Interface de commande et automatisation" },
  { n: "06", title: "Tests & Validation", desc: "Essais en charge et calibration" },
];

export const Processus = () => {
  return (
    <section id="processus" className="section">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center">
          <p className="eyebrow">Méthodologie</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Du Concept à la Réalité
          </h2>
          <p className="mt-5 text-steel">
            Six étapes qui ont transformé une idée en machine opérationnelle.
          </p>
        </Reveal>

        {/* Desktop horizontal stepper */}
        <div className="hidden md:block mt-20">
          <div className="relative">
            {/* connecting line */}
            <div className="absolute top-6 left-0 right-0 h-px bg-steel/20" />
            <div className="absolute top-6 left-0 w-1/6 h-px bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />

            <div className="grid grid-cols-6 gap-4 relative">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 80} className="text-center">
                  <div className="flex justify-center">
                    <div
                      className={`relative w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                        i === 0
                          ? "bg-primary text-primary-foreground shadow-[0_0_0_4px_hsl(var(--primary)/0.2),0_0_30px_hsl(var(--primary)/0.5)]"
                          : "bg-surface border border-steel/30 text-steel"
                      }`}
                    >
                      {s.n}
                    </div>
                  </div>
                  <h3 className="mt-5 font-display font-semibold text-foreground text-base">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs text-steel leading-relaxed px-2">
                    {s.desc}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden mt-12 space-y-6 relative">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-steel/20" />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <div className="flex gap-5 relative">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm relative z-10 ${
                    i === 0
                      ? "bg-primary text-primary-foreground shadow-[0_0_0_4px_hsl(var(--primary)/0.2)]"
                      : "bg-surface border border-steel/30 text-steel"
                  }`}
                >
                  {s.n}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-display font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-sm text-steel">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/processus" className="btn-outline-amber">
            Voir la Documentation Complète
          </Link>
        </div>
      </div>
    </section>
  );
};
