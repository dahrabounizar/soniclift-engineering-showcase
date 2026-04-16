/**
 * Hero — full viewport, left-aligned content, geometric crane SVG on right.
 * Stagger fade-up on load via tailwind animation + delay style.
 */
export const Hero = () => {
  return (
    <section id="apercu" className="relative min-h-screen flex items-center pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 text-center lg:text-left">
          <p className="eyebrow animate-fade-up" style={{ animationDelay: "0ms" }}>
            Projet Robotique Étudiant — Pont Roulant
          </p>

          <h1
            className="mt-6 font-display font-extrabold leading-[0.95] tracking-tight text-foreground animate-fade-up"
            style={{ animationDelay: "150ms", fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            Ingénierie en
            <br />
            Mouvement<span className="text-primary">.</span>
          </h1>

          <p
            className="mt-7 text-steel text-lg leading-[1.7] max-w-[520px] mx-auto lg:mx-0 animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            SonicLift est un pont roulant conçu et fabriqué par des étudiants en
            robotique, alliant précision mécanique, électronique embarquée et
            commande intelligente.
          </p>

          <div
            className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-up"
            style={{ animationDelay: "450ms" }}
          >
            <a href="#la-machine" className="btn-amber">Explorer la Machine</a>
            <a href="#notre-equipe" className="btn-outline-amber">Notre Équipe</a>
          </div>
        </div>

        <div
          className="lg:col-span-5 hidden lg:flex justify-center animate-fade-up"
          style={{ animationDelay: "600ms" }}
        >
          <CraneIllustration />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.65rem] tracking-[0.3em] text-steel/60 uppercase">
        Défiler
      </div>
    </section>
  );
};

const CraneIllustration = () => (
  <svg
    viewBox="0 0 400 480"
    className="w-full max-w-md animate-float-y"
    aria-hidden="true"
  >
    {/* Gantry pillars */}
    <line x1="40" y1="40" x2="40" y2="440" stroke="hsl(var(--steel))" strokeWidth="3" />
    <line x1="360" y1="40" x2="360" y2="440" stroke="hsl(var(--steel))" strokeWidth="3" />
    {/* Base feet */}
    <line x1="20" y1="440" x2="60" y2="440" stroke="hsl(var(--steel))" strokeWidth="4" />
    <line x1="340" y1="440" x2="380" y2="440" stroke="hsl(var(--steel))" strokeWidth="4" />
    {/* I-beam rail (top) */}
    <rect x="30" y="80" width="340" height="14" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
    <line x1="30" y1="87" x2="370" y2="87" stroke="hsl(var(--primary)/0.4)" strokeWidth="1" />
    {/* Trolley */}
    <rect x="180" y="100" width="60" height="30" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
    <circle cx="195" cy="100" r="4" fill="hsl(var(--primary))" />
    <circle cx="225" cy="100" r="4" fill="hsl(var(--primary))" />
    {/* Cable */}
    <line x1="210" y1="130" x2="210" y2="320" stroke="hsl(var(--steel))" strokeWidth="1.2" strokeDasharray="2 3" />
    {/* Hook */}
    <path d="M210 320 Q200 335 205 350 Q210 365 220 360 Q228 355 222 345" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
    {/* Cross-bracing */}
    <line x1="40" y1="40" x2="100" y2="80" stroke="hsl(var(--steel)/0.5)" strokeWidth="1" />
    <line x1="360" y1="40" x2="300" y2="80" stroke="hsl(var(--steel)/0.5)" strokeWidth="1" />
    {/* Tech labels */}
    <text x="50" y="30" fill="hsl(var(--steel)/0.6)" fontSize="9" fontFamily="monospace">RAIL — I-BEAM</text>
    <text x="245" y="118" fill="hsl(var(--steel)/0.6)" fontSize="9" fontFamily="monospace">CHARIOT</text>
    <text x="230" y="358" fill="hsl(var(--steel)/0.6)" fontSize="9" fontFamily="monospace">CROCHET</text>
  </svg>
);
