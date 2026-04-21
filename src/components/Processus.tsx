import { Link } from "react-router-dom";
import {
  ClipboardList,
  Ruler,
  Wrench,
  Zap,
  Eye,
  Waves,
  Route,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * ============================================================================
 * FILE: src/components/Processus.tsx
 * ============================================================================
 * PURPOSE:
 *   Compact "peek" of the 7-phase engineering process. Each phase is a small
 *   icon card showing only phase number + eyebrow + title. Full descriptions,
 *   badges, and images are on the dedicated /processus detail page.
 * ============================================================================
 */

const PHASES = [
  { n: "01", icon: ClipboardList, eyebrow: "Analyse", title: "Analyse Fonctionnelle SysML" },
  { n: "02", icon: Ruler, eyebrow: "Conception", title: "Étude Mécanique & Dimensionnement" },
  { n: "03", icon: Wrench, eyebrow: "Fabrication", title: "Usinage Multi-Procédés" },
  { n: "04", icon: Zap, eyebrow: "Électrique", title: "Câblage & Puissance" },
  { n: "05", icon: Eye, eyebrow: "Vision", title: "Détection IA & Stéréovision" },
  { n: "06", icon: Waves, eyebrow: "Commande", title: "Anti-Ballant Input Shaping" },
  { n: "07", icon: Route, eyebrow: "Trajectoire", title: "Planification A* Multi-Critères" },
];

export const Processus = () => {
  return (
    <section id="processus" className="section">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">Processus</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Du Cahier des Charges au Prototype
          </h2>
          <p className="mt-6 text-steel leading-[1.8]">
            Sept phases coordonnées — de l'analyse fonctionnelle à la
            planification de trajectoire temps-réel — qui transforment un
            besoin industriel complexe en machine mécatronique autonome.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PHASES.map(({ n, icon: Icon, eyebrow, title }, i) => (
            <Reveal key={n} delay={i * 50}>
              <article className="glass rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.4)]">
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="font-display font-extrabold text-primary leading-none"
                    style={{ fontSize: "2rem" }}
                  >
                    {n}
                  </span>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--cyan-accent) / 0.15))",
                      border: "1px solid hsl(var(--primary) / 0.3)",
                    }}
                  >
                    <Icon size={18} className="text-primary" />
                  </div>
                </div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-steel">
                  {eyebrow}
                </p>
                <h3 className="mt-1.5 font-display font-semibold text-base text-foreground leading-snug">
                  {title}
                </h3>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/processus" className="btn-amber">
            En savoir plus <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};