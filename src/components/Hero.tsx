import { ArrowRight, FileText } from "lucide-react";

/**
 * ============================================================================
 * FILE: src/components/Hero.tsx
 * ============================================================================
 * PURPOSE:
 *   Landing hero for SonicLift — Pont Roulant Intelligent. Two-column layout:
 *   left column presents project identity + CTAs + stats strip; right column
 *   features an inline SVG of a geometric crane (I-beam + trolley + swinging
 *   hook on chain) with CSS keyframe pendulum animation. Respects
 *   prefers-reduced-motion.
 * ============================================================================
 */

const STATS = [
  { value: "8 kg", label: "Charge utile" },
  { value: "32 m/min", label: "Vitesse max" },
  { value: "4 DDL", label: "Degrés de liberté" },
  { value: "1200×800×1000", label: "Espace (mm)", smallValue: true },
];

/**
 * CraneSVG
 *
 * Inline SVG of a geometric crane: horizontal I-beam with a trolley,
 * a cable dropping to a hook that swings. Animation is defined inline via
 * <style> so it requires no tailwind config changes. The pendulum group is
 * transformed around its top-center pivot via transform-origin.
 *
 * INPUTS:  None.
 * OUTPUTS: JSX.Element — the SVG.
 */
const CraneSVG = () => (
  <svg
    viewBox="0 0 360 420"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    role="img"
    aria-label="Illustration d'un pont roulant avec crochet oscillant"
  >
    <defs>
      <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="hsl(199, 89%, 60%)" stopOpacity="0.6" />
        <stop offset="50%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.85" />
        <stop offset="100%" stopColor="hsl(199, 89%, 60%)" stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id="cableGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.4" />
      </linearGradient>
    </defs>

    <style>{`
      .crane-pendulum {
        transform-origin: 180px 100px;
        animation: crane-swing 4s ease-in-out infinite;
      }
      @keyframes crane-swing {
        0%, 100% { transform: rotate(-7deg); }
        50%      { transform: rotate(7deg); }
      }
      @media (prefers-reduced-motion: reduce) {
        .crane-pendulum { animation: none; }
      }
    `}</style>

    {/* Left support column */}
    <line
      x1="40" y1="60" x2="40" y2="380"
      stroke="hsl(215, 16%, 40%)"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Right support column */}
    <line
      x1="320" y1="60" x2="320" y2="380"
      stroke="hsl(215, 16%, 40%)"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Horizontal I-beam (top rail) */}
    <rect
      x="30" y="70" width="300" height="20"
      fill="url(#beamGrad)"
      rx="2"
    />
    {/* Beam outline */}
    <rect
      x="30" y="70" width="300" height="20"
      fill="none"
      stroke="hsl(38, 92%, 50%)"
      strokeWidth="1.5"
      strokeOpacity="0.6"
      rx="2"
    />
    {/* Rivet marks on beam */}
    {[60, 100, 140, 180, 220, 260, 300].map((x) => (
      <circle
        key={x}
        cx={x}
        cy="80"
        r="1.8"
        fill="hsl(220, 31%, 10%)"
      />
    ))}

    {/* Trolley (rectangle on top of beam center) */}
    <rect
      x="160" y="88" width="40" height="14"
      fill="hsl(215, 16%, 26%)"
      stroke="hsl(199, 89%, 60%)"
      strokeWidth="1.5"
      strokeOpacity="0.7"
      rx="2"
    />
    {/* Trolley top detail */}
    <rect
      x="168" y="82" width="24" height="8"
      fill="hsl(215, 16%, 34%)"
      rx="1"
    />

    {/* Pendulum group — cable + hook, swinging as one unit */}
    <g className="crane-pendulum">
      {/* Cable */}
      <line
        x1="180" y1="102" x2="180" y2="300"
        stroke="url(#cableGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Hook assembly (top block) */}
      <rect
        x="168" y="298" width="24" height="18"
        fill="hsl(215, 16%, 34%)"
        stroke="hsl(38, 92%, 50%)"
        strokeWidth="1.5"
        rx="2"
      />
      {/* Hook body — curved path */}
      <path
        d="M 180 316 L 180 335 Q 180 355 164 355 Q 154 355 154 345"
        fill="none"
        stroke="hsl(38, 92%, 50%)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Hook tip highlight */}
      <circle
        cx="154"
        cy="345"
        r="2.5"
        fill="hsl(38, 92%, 60%)"
      />
    </g>

    {/* Base line (floor) */}
    <line
      x1="10" y1="395" x2="350" y2="395"
      stroke="hsl(215, 16%, 30%)"
      strokeWidth="1.5"
      strokeDasharray="4 6"
      opacity="0.6"
    />
  </svg>
);

/**
 * Hero
 *
 * Full-viewport hero with staggered fade-up animations on entry.
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
        <div className="lg:col-span-7 text-center lg:text-left">
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
            génération de trajectoire temps-réel évitant les obstacles.
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
              <FileText size={16} /> Spécifications
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
                className="glass rounded-xl px-4 py-4 text-center lg:text-left overflow-hidden"
              >
                <p
                  className={`font-display font-extrabold text-primary leading-none whitespace-nowrap ${
                    s.smallValue
                      ? "text-sm md:text-base"
                      : "text-xl md:text-2xl"
                  }`}
                >
                  {s.value}
                </p>
                <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-steel">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — swinging crane SVG */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="w-full max-w-[420px] aspect-square animate-fade-up" style={{ animationDelay: "300ms" }}>
            <CraneSVG />
          </div>
        </div>
      </div>
    </section>
  );
};