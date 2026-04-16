import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";

export const LaMachine = () => {
  return (
    <section id="la-machine" className="section">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
        <Reveal direction="left" className="lg:col-span-3">
          <p className="eyebrow">Le Système</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Un pont roulant conçu de zéro
          </h2>

          <div className="mt-8 space-y-5 text-steel leading-[1.8] text-[1.02rem]">
            <p>
              SonicLift repose sur une structure portique en profilés d'acier S235,
              dimensionnée par calculs RDM et validée en éléments finis. Deux
              poutres principales soutiennent un rail supérieur sur lequel se
              déplace un chariot motorisé, garantissant une portée utile de plus
              de quatre mètres avec une rigidité maîtrisée.
            </p>
            <p>
              La motorisation associe un motoréducteur DC brushless pour la
              translation et un palan électrique à câble pour le levage. Chaque
              axe est piloté par un variateur dédié, asservi par codeurs
              incrémentaux pour un positionnement précis et des accélérations
              contrôlées.
            </p>
            <p>
              L'interface de commande combine une télécommande filaire ergonomique
              et une IHM tactile pour les opérations programmées. Un microcontrôleur
              centralise les capteurs de fin de course, la mesure de charge et la
              gestion des sécurités, conformément aux exigences industrielles.
            </p>
          </div>

          <Link to="/la-machine" className="btn-outline-amber mt-10">
            En Savoir Plus <ArrowRight size={16} />
          </Link>
        </Reveal>

        <Reveal direction="right" className="lg:col-span-2">
          <div
            className="aspect-[4/5] rounded-xl flex items-center justify-center animate-pulse-glow"
            style={{
              border: "1px solid hsl(var(--primary) / 0.3)",
              background: "rgba(255,255,255,0.025)",
            }}
          >
            <div className="text-center px-8">
              <CraneIcon />
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-steel">
                Photo du prototype
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const CraneIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" className="mx-auto opacity-70" aria-hidden="true">
    <rect x="10" y="14" width="60" height="6" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
    <line x1="14" y1="20" x2="14" y2="68" stroke="hsl(var(--steel))" strokeWidth="1.5" />
    <line x1="66" y1="20" x2="66" y2="68" stroke="hsl(var(--steel))" strokeWidth="1.5" />
    <rect x="34" y="22" width="12" height="6" fill="hsl(var(--primary)/0.4)" stroke="hsl(var(--primary))" />
    <line x1="40" y1="28" x2="40" y2="54" stroke="hsl(var(--steel))" strokeDasharray="2 2" />
    <path d="M40 54 Q36 60 40 64 Q44 60 40 56" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.8" />
  </svg>
);
