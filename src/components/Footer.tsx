import { Link } from "react-router-dom";

/**
 * ============================================================================
 * FILE: src/components/Footer.tsx
 * ============================================================================
 * PURPOSE:
 *   Site footer — displays the SonicLift logo + wordmark, router-based
 *   navigation links, project tagline and copyright. Mirrors the Navbar
 *   link structure so both navigation zones stay in sync.
 * ============================================================================
 */

interface FooterNavItem {
  path: string;
  hash?: string;
  label: string;
}

const NAV: FooterNavItem[] = [
  { path: "/", label: "Aperçu" },
  { path: "/la-machine", label: "La Machine" },
  { path: "/notre-equipe", label: "Équipe" },
  { path: "/processus", label: "Processus" },
  { path: "/specifications", label: "Spécifications" },
  { path: "/", hash: "#contact", label: "Contact" },
];

/**
 * buildTo
 *
 * Builds the Link `to` prop including optional hash.
 */
const buildTo = (item: FooterNavItem): string =>
  item.hash ? `${item.path}${item.hash}` : item.path;

export const Footer = () => {
  return (
    <footer className="border-t border-black/5 bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + wordmark */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="SonicLift"
              className="w-12 h-12 rounded-full object-cover ring-1 ring-primary/30"
            />
            <span className="font-display font-extrabold text-foreground text-lg">
              Soni<span className="text-primary">C</span>Lift
            </span>
          </Link>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs uppercase tracking-[0.12em] text-steel/80">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={buildTo(n)}
                className="hover:text-primary transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-black/5 text-center">
          <p className="font-display text-primary uppercase tracking-[0.4em] text-sm">
            Vitesse. Puissance. Élévation.
          </p>
          <p className="mt-3 text-xs text-steel/80">
            © 2026 SonicLift — Projet Robotique EMINES
          </p>
        </div>
      </div>
    </footer>
  );
};