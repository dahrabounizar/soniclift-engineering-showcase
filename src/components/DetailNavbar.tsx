import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * ============================================================================
 * FILE: src/components/DetailNavbar.tsx
 * ============================================================================
 * PURPOSE:
 *   Simplified navbar for detail pages. Displays only the SonicLift logo +
 *   wordmark (linking home) and a single "Retour à l'Accueil" button. No
 *   section tabs, since the detail page is outside the home scroll context.
 *   Matches the aesthetic of the main Navbar: fixed top, amber border when
 *   scrolled, backdrop blur.
 * ============================================================================
 */

export const DetailNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-primary/40 shadow-[0_4px_24px_-12px_hsl(var(--primary)/0.4)]"
          : "border-b border-transparent"
      }`}
      style={{ background: "rgba(10,13,20,0.75)", backdropFilter: "blur(16px)" }}
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

        <Link to="/" className="btn-outline-amber">
          <ArrowLeft size={16} /> Retour à l'Accueil
        </Link>
      </div>
    </header>
  );
};