const NAV = [
  { id: "apercu", label: "Aperçu" },
  { id: "la-machine", label: "La Machine" },
  { id: "notre-equipe", label: "Équipe" },
  { id: "processus", label: "Processus" },
  { id: "specifications", label: "Spécifications" },
  { id: "contact", label: "Contact" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display font-extrabold text-foreground">
            Soni<span className="text-primary">C</span>Lift
          </span>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs uppercase tracking-[0.12em] text-steel/70">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(n.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-primary transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="font-display text-primary uppercase tracking-[0.4em] text-sm">
            Vitesse. Puissance. Élévation.
          </p>
          <p className="mt-3 text-xs text-steel/70">
            © 2026 SonicLift — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
};
