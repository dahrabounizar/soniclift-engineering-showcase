import { Link } from "react-router-dom";

/**
 * ============================================================================
 * FILE: src/components/Hero.tsx
 * ============================================================================
 * PURPOSE:
 *   Home-page hero. Displays the SonicLift identity, a concise tagline, and
 *   two CTAs — primary routes to /la-machine, secondary scrolls to the
 *   Contexte section below. Paired with an SVG crane illustration on large
 *   screens. Deliberately kept short so the home page stays tight.
 * ============================================================================
 */

/**
 * CraneSVG
 *
 * Decorative schematic crane rendered as an inline SVG. No props; sized by
 * its parent container.
 */
const CraneSVG = () => (
  <svg
    viewBox="0 0 360 410"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto max-w-md mx-auto"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="beamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="hsl(215, 16%, 40%)" />
        <stop offset="100%" stopColor="hsl(215, 16%, 22%)" />
      </linearGradient>
      <linearGradient id="cableGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="hsl(38, 92%, 50%)" />
        <stop offset="100%" stopColor="hsl(38, 92%, 35%)" />
      </linearGradient>
    </defs>

    {/* Support columns */}
    <line x1="40" y1="60" x2="40" y2="380" stroke="hsl(215, 16%, 40%)" strokeWidth="4" strokeLinecap="round" />
    <line x1="320" y1="60" x2="320" y2="380" stroke="hsl(215, 16%, 40%)" strokeWidth="4" strokeLinecap="round" />

    {/* I-beam (top rail) */}
    <rect x="30" y="70" width="300" height="20" fill="url(#beamGrad)" rx="2" />
    <rect x="30" y="70" width="300" height="20" fill="none" stroke="hsl(38, 92%, 50%)" strokeWidth="1.5" strokeOpacity="0.6" rx="2" />
    {[60, 100, 140, 180, 220, 260, 300].map((x) => (
      <circle key={x} cx={x} cy="80" r="1.8" fill="hsl(220, 31%, 40%)" />
    ))}

    {/* Trolley */}
    <rect x="160" y="88" width="40" height="14" fill="hsl(215, 16%, 26%)" stroke="hsl(199, 89%, 60%)" strokeWidth="1.5" strokeOpacity="0.7" rx="2" />
    <rect x="168" y="82" width="24" height="8" fill="hsl(215, 16%, 34%)" rx="1" />

    {/* Pendulum — cable + hook */}
    <g className="crane-pendulum">
      <line x1="180" y1="102" x2="180" y2="300" stroke="url(#cableGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="168" y="298" width="24" height="18" fill="hsl(215, 16%, 34%)" stroke="hsl(38, 92%, 50%)" strokeWidth="1.5" rx="2" />
      <path d="M 180 316 L 180 335 Q 180 355 164 355 Q 154 355 154 345" fill="none" stroke="hsl(38, 92%, 50%)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="154" cy="345" r="2.5" fill="hsl(38, 92%, 60%)" />
    </g>

    {/* Floor */}
    <line x1="10" y1="395" x2="350" y2="395" stroke="hsl(215, 16%, 45%)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6" />
  </svg>
);

/**
 * Hero
 *
 * Trimmed hero: identity, single-paragraph tagline, and two CTAs (primary →
 * /la-machine, secondary → scroll to #contexte on home).
 *
 * INPUTS:  None.
 * OUTPUTS: JSX.Element — the <section id="apercu"> element.
 */
export const Hero = () => {
  const scrollToContexte = () => {
    document.getElementById("contexte")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="apercu"
      className="relative min-h-screen flex items-center pt-24 pb-12 px-6"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
        {/* Left column — identity & messaging */}
        <div className="lg:col-span-7 text-center lg:text-left">
          <p className="eyebrow animate-fade-up" style={{ animationDelay: "0ms" }}>
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
            className="mt-6 text-steel text-lg leading-[1.7] max-w-[560px] mx-auto lg:mx-0 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            Prototype autonome pour la métallurgie — vision par IA,
            commande anti-ballant et trajectoires temps réel.
          </p>

          <div
            className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-up"
            style={{ animationDelay: "550ms" }}
          >
            <Link to="/la-machine" className="btn-amber">
              Découvrir la Machine
            </Link>
            <button onClick={scrollToContexte} className="btn-outline-amber">
              En Savoir Plus
            </button>
          </div>
        </div>

        {/* Right column — SVG crane */}
        <div className="lg:col-span-5 hidden lg:block animate-fade-up" style={{ animationDelay: "700ms" }}>
          <CraneSVG />
        </div>
      </div>
    </section>
  );
};