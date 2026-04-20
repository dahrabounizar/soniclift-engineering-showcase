import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "apercu", label: "Aperçu" },
  { id: "la-machine", label: "La Machine" },
  { id: "notre-equipe", label: "Notre Équipe" },
  { id: "processus", label: "Processus" },
  { id: "specifications", label: "Spécifications" },
  { id: "contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("apercu");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_ITEMS.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
        <a
          href="#apercu"
          onClick={(e) => { e.preventDefault(); handleClick("apercu"); }}
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
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
              className={`nav-link ${active === item.id ? "active" : ""}`}
            >
              {item.label}
            </a>
          ))}
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
        style={{ background: "rgba(10,13,20,0.97)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex justify-end p-6">
          <button aria-label="Fermer le menu" onClick={() => setMobileOpen(false)} className="text-primary p-2">
            <X size={28} />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center gap-8 mt-12">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
              className="font-display text-2xl uppercase tracking-[0.15em] text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
