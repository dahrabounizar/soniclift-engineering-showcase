import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

/**
 * ============================================================================
 * FILE: src/components/Navbar.tsx
 * ============================================================================
 * PURPOSE:
 *   Main site navigation. Uses React Router <Link> for navigation to dedicated
 *   pages (/, /la-machine, /notre-equipe, /processus, /specifications) plus a
 *   hash link (/#contact) for the Contact scroll anchor on the home page.
 *   Active state is derived from the current URL via useLocation.
 *
 *   Shared by both the home page and every detail page (DetailPageLayout
 *   imports this component directly), so navigation is uniform across the
 *   entire site.
 * ============================================================================
 */

interface NavItem {
  path: string;
  hash?: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Aperçu" },
  { path: "/la-machine", label: "La Machine" },
  { path: "/notre-equipe", label: "Notre Équipe" },
  { path: "/processus", label: "Processus" },
  { path: "/specifications", label: "Spécifications" },
  { path: "/", hash: "#contact", label: "Contact" },
];

/**
 * isItemActive
 *
 * Determines whether a nav item matches the current location. Contact (hash
 * variant) is active only when on "/" AND the hash is "#contact". The plain
 * "Aperçu" item is active on "/" when the hash is NOT "#contact" (to avoid
 * both items appearing active simultaneously).
 *
 * INPUTS:
 *   - item: NavItem — the nav entry being tested
 *   - pathname: string — current location pathname
 *   - hash: string — current location hash (may be "")
 *
 * OUTPUTS: boolean
 */
const isItemActive = (item: NavItem, pathname: string, hash: string): boolean => {
  if (item.hash) {
    return pathname === item.path && hash === item.hash;
  }
  if (item.path === "/") {
    return pathname === "/" && hash !== "#contact";
  }
  return pathname === item.path;
};

/**
 * buildTo
 *
 * Builds the `to` prop for a Link, including optional hash.
 */
const buildTo = (item: NavItem): string =>
  item.hash ? `${item.path}${item.hash}` : item.path;

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer when navigating
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-primary/40 shadow-[0_4px_24px_-12px_hsl(var(--primary)/0.4)]"
          : "border-b border-transparent"
      }`}
      style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          aria-label="SonicLift accueil"
        >
          <img
            src="/logo.jpeg"
            alt="SonicLift"
            className="w-10 h-10 rounded-full object-cover ring-1 ring-primary/30"
          />
          <span className="font-display font-extrabold text-xl tracking-tight text-foreground">
            Soni<span className="text-primary">C</span>Lift
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item, location.pathname, location.hash);
            return (
              <Link
                key={item.label}
                to={buildTo(item)}
                className={`nav-link ${active ? "active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile burger */}
        <button
          aria-label="Ouvrir le menu"
          className="lg:hidden text-primary p-2"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex justify-end p-6">
          <button
            aria-label="Fermer le menu"
            onClick={() => setMobileOpen(false)}
            className="text-primary p-2"
          >
            <X size={28} />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center gap-8 mt-12">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={buildTo(item)}
              className="font-display text-2xl uppercase tracking-[0.15em] text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};