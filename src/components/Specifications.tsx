import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";

const SPECS: [string, string][] = [
  ["Portée utile", "4 200 mm"],
  ["Capacité de charge", "150 kg"],
  ["Système de translation", "Motoréducteur DC brushless"],
  ["Système de levage", "Palan électrique à câble"],
  ["Mode de commande", "Télécommande filaire + IHM"],
  ["Matériaux structure", "Profilés acier S235"],
  ["Vitesse de translation", "0 – 12 m/min"],
  ["Alimentation", "230 V AC / 48 V DC"],
];

export const Specifications = () => {
  return (
    <section
      id="specifications"
      className="section"
      style={{
        background: "hsl(var(--surface))",
        borderTop: "1px solid hsl(var(--primary) / 0.2)",
        borderBottom: "1px solid hsl(var(--primary) / 0.2)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center">
          <p className="eyebrow">Données Techniques</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Fiche Technique
          </h2>
          <p className="mt-5 text-steel">Paramètres clés du système SonicLift</p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="grid md:grid-cols-2 gap-x-12">
            {SPECS.map(([label, value], i) => (
              <div
                key={label}
                className="flex justify-between items-baseline py-5 border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <span className="font-body text-[0.72rem] uppercase tracking-[0.15em] text-steel">
                  {label}
                </span>
                <span className="font-mono text-[1.05rem] text-foreground text-right">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 text-center">
          <Link to="/specifications" className="btn-outline-amber">
            <Download size={16} /> Télécharger la Fiche Complète
          </Link>
        </div>
      </div>
    </section>
  );
};
