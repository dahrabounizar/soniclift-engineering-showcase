import { Link } from "react-router-dom";
import { Ruler, Cog, Layers, Cpu, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * ============================================================================
 * FILE: src/components/Specifications.tsx
 * ============================================================================
 * PURPOSE:
 *   Compact "peek" of the technical specifications. Shows 4 thematic group
 *   cards with 3 headline values each. Full parameter tables are on the
 *   dedicated /specifications detail page.
 * ============================================================================
 */

const GROUPS = [
  {
    icon: Ruler,
    eyebrow: "Géométrie",
    title: "Dimensions & Capacités",
    highlights: ["8 kg charge utile", "32 m/min vitesse", "4 DDL"],
  },
  {
    icon: Cog,
    eyebrow: "Motorisation",
    title: "Actionneurs & Transmission",
    highlights: ["5× NEMA 23", "Dynamixel MX-28T", "Drivers DM542"],
  },
  {
    icon: Layers,
    eyebrow: "Structure",
    title: "Matériaux & Validation",
    highlights: ["V-slot aluminium 6061", "Bipoutre X", "FEA 0,3 mm @ 300 N"],
  },
  {
    icon: Cpu,
    eyebrow: "Intelligence",
    title: "Électronique & Logiciel",
    highlights: ["Arduino Mega 2560", "YOLOv5 — 99,64 %", "Input Shaping ZVD"],
  },
];

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
            Fiche Technique
          </h2>
          <p className="mt-5 text-steel leading-[1.8]">
            Les paramètres clés du système SonicLift — géométrie, motorisation,
            structure et intelligence embarquée.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {GROUPS.map(({ icon: Icon, eyebrow, title, highlights }, i) => (
            <Reveal key={title} delay={i * 80}>
              <article className="glass rounded-2xl p-7 h-full transition-all duration-300 hover:border-primary/40 hover:shadow-[0_20px_60px_-25px_hsl(var(--primary)/0.35)]">
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
                <ul className="space-y-2.5">
                  {highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-3 font-mono text-sm text-foreground"
                    >
                      <span className="text-primary">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/specifications" className="btn-amber">
            En savoir plus <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};