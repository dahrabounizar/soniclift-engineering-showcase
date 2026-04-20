import { ArrowRight, FileText } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

/**
 * ============================================================================
 * FILE: src/components/Hero.tsx
 * ============================================================================
 * PURPOSE:
 *   Landing hero for SonicLift — Pont Roulant Intelligent (EMINES × Sonasid
 *   robotics project). Two-column layout on desktop: left column presents the
 *   project identity, tagline, CTAs, and a metric strip; right column features
 *   the circular SonicLift logo with an amber glow backdrop.
 * ============================================================================
 */

const STATS = [
  { value: "8 kg", label: "Charge utile" },
  { value: "32 m/min", label: "Vitesse max" },
  { value: "1200×800×1000", label: "Espace (mm)" },
  { value: "4 DDL", label: "Degrés de liberté" },
];

/**
 * Hero
 *
 * Renders the full-viewport hero section with staggered fade-up animations
 * on entry. Scroll targets for the CTAs use native anchor behavior with
 * smooth scroll already enabled globally in index.css.
 *
 * INPUTS:  None.
 * OUTPUTS: JSX.Element — the <section id="apercu"> element.
 */
export const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="apercu"
      className="relative min-h-screen flex items-center pt-28 pb-20 px-6"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
        {/* Left column — identity & messaging */}
        <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
          <p
            className="eyebrow animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            UM6P × EMINES × Sonasid — Projet Robotique 2025/2026
          </p>

          <h1
            className="mt-6 font-display font-extrabold leading-[0.95] tracking-tight text-foreground animate-fade-up"
            style={{ animationDelay: "150ms", fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            Soni<span className="text-primary">C</span>Lift
            <span className="text-primary">.</span>
          </h1>

          <h2
            className="mt-4 font-display font-semibold text-2xl md:text-3xl text-foreground/90 animate-fade-up"
            style={{ animationDelay: "250ms" }}
          >
            Pont Roulant Intelligent
          </h2>

          <p
            className="mt-7 text-steel text-lg leading-[1.7] max-w-[560px] mx-auto lg:mx-0 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            Prototype à échelle réduite d'un pont roulant autonome pour la
            métallurgie. Alliant vision stéréoscopique par intelligence
            artificielle, commande anti-ballant par Input Shaping, et
            génération de trajectoire temps-réel évitant les obstacles — un
            cycle de chargement entièrement automatisé dans le respect des
            normes HSE industrielles.
          </p>

          {/* CTAs */}
          <div
            className="mt-9 flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-up"
            style={{ animationDelay: "550ms" }}
          >
            <button
              onClick={() => scrollTo("la-machine")}
              className="btn-amber"
            >
              Découvrir la Machine <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("specifications")}
              className="btn-outline-amber"
            >
              <FileText size={16} /> Spécifications Techniques
            </button>
          </div>

          {/* Stats strip */}
          <div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up"
            style={{ animationDelay: "700ms" }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="glass rounded-xl px-4 py-4 text-center lg:text-left"
              >
                <p className="font-display font-extrabold text-primary text-xl md:text-2xl leading-none">
                  {s.value}
                </p>
                <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-steel">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — logo with amber glow */}
        <div
          className="lg:col-span-5 flex items-center justify-center relative order-1 lg:order-2 animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          {/* Amber backdrop glow */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="w-[70%] h-[70%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--primary) / 0.35), hsl(var(--cyan-accent) / 0.15) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </div>

          {/* Logo with float animation */}
          <div className="relative animate-float-y w-full max-w-[420px] mx-auto">
            <ImageWithFallback
              src="/logo.jpeg"
              alt="SonicLift — logo officiel"
              aspectRatio="1/1"
              objectFit="contain"
              className="drop-shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};