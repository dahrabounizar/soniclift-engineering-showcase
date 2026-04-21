import { Link } from "react-router-dom";
import { Ruler, Cog, Layers, Cpu, Download, CheckCircle2 } from "lucide-react";
import { DetailPageLayout } from "@/components/DetailPageLayout";
import { Reveal } from "@/components/Reveal";

/**
 * ============================================================================
 * FILE: src/pages/SpecificationsPage.tsx
 * ============================================================================
 * PURPOSE:
 *   Deep-dive specifications page. Full parameter tables grouped by theme,
 *   followed by a performance envelope section, HSE compliance note, and a
 *   download CTA for the full dossier.
 * ============================================================================
 */

type SpecRow = [string, string];

interface SpecGroup {
  icon: typeof Ruler;
  eyebrow: string;
  title: string;
  rows: SpecRow[];
}

const GROUPS: SpecGroup[] = [
  {
    icon: Ruler,
    eyebrow: "Géométrie",
    title: "Dimensions & Capacités",
    rows: [
      ["Espace de travail utile", "1200 × 800 × 1000 mm"],
      ["Dimensions globales", "1240 × 760 × 984 mm"],
      ["Charge utile maximale", "8 kg"],
      ["Charge de test FEA (majorée)", "30 kg (≈ 300 N)"],
      ["Degrés de liberté", "4 (X, Y, Z + rotation)"],
      ["Vitesse de déplacement max", "32 m/min (0,533 m/s)"],
      ["Accélération nominale", "0,5 m/s²"],
      ["Accélération levage", "0,3 m/s²"],
    ],
  },
  {
    icon: Cog,
    eyebrow: "Motorisation",
    title: "Actionneurs & Transmission",
    rows: [
      ["Moteurs pas à pas", "5× NEMA 17"],
      ["Drivers de puissance", "DM542 (microstepping configurable)"],
      ["Servomoteur de rotation", "Dynamixel MX-28T"],
      ["Transmission X / Y", "Poulie-courroie GT2, rayon eff. 15 mm"],
      ["Transmission Z", "Double tambour à câbles, rayon 20 mm"],
      ["Couple requis X/Y", "≈ 0,19 N·m (total avec inertie)"],
      ["Couple requis levage (total)", "2,92 N·m (1,46 N·m par moteur)"],
      ["Couple requis rotation", "≈ 1,67 N·m"],
      ["Rendement transmission", "η ≈ 0,85 – 0,90"],
    ],
  },
  {
    icon: Layers,
    eyebrow: "Structure",
    title: "Matériaux & Validation",
    rows: [
      ["Châssis principal", "V-slot aluminium 6061, 20×20 mm"],
      ["Configuration", "Bipoutre (X) + monopoutre (Y)"],
      ["Moment d'inertie axe X (bipoutre)", "≈ 1,07×10⁻⁷ m⁴"],
      ["Déflexion max validée (FEA)", "0,3 mm sous 300 N"],
      ["Câbles de levage", "4× acier, coefficient sécurité 5"],
      ["Diamètre min théorique câble", "0,61 mm"],
      ["Allongement élastique", "≈ 0,5 mm/m"],
      ["Plaques structurelles", "HPL8, PVC 5,1 mm"],
      ["Supports spécifiques", "Impression 3D thermoplastique"],
      ["Arbres de transmission", "Acier inoxydable Ø12 mm"],
    ],
  },
  {
    icon: Cpu,
    eyebrow: "Intelligence",
    title: "Électronique & Logiciel",
    rows: [
      ["Contrôleur principal", "Arduino Mega 2560"],
      ["Capteurs de position", "7× fins de course (X, Y, Z)"],
      ["Capteurs inertiels", "Accéléromètre + gyroscope"],
      ["Sécurité", "Bouton d'arrêt d'urgence ligne principale"],
      ["Alimentation", "12 V stabilisée + 5 V régulée"],
      ["Vision", "2× caméras Logitech (stéréovision calibrée)"],
      ["Modèle détection", "YOLOv5 custom — précision 99,64 %"],
      ["Dataset d'entraînement", "3 038 images annotées Roboflow"],
      ["mAP50 / mAP50-95", "99,24 % / 92,87 %"],
      ["Inférence temps réel", "3,55 ms/image"],
      ["Commande anti-ballant", "Input Shaping ZVD"],
      ["Réduction θmax (ZVD vs trapézoïdal)", "−74 %"],
      ["Réduction RMS oscillations", "−73 %"],
      ["Réduction θ̇max", "−77 %"],
      ["Planification trajectoire", "A* 3D multi-critères + replanification"],
    ],
  },
];

const ENVELOPE = [
  "Manipulation autonome de fardeaux d'acier simulés jusqu'à 8 kg",
  "Reconnaissance automatique des camions et fardeaux dans l'espace de travail",
  "Arrêt d'urgence immédiat à la détection d'une personne (conformité HSE)",
  "Évitement actif des obstacles statiques et dynamiques en temps réel",
  "Déplacement précis sans oscillations résiduelles à l'arrêt",
  "Cycle de chargement entièrement automatisé de bout en bout",
];

const SpecCard = ({ group }: { group: SpecGroup }) => {
  const { icon: Icon, eyebrow, title, rows } = group;
  return (
    <article className="glass rounded-2xl p-7 h-full">
      <header className="flex items-start gap-4 pb-5 mb-5 border-b border-white/5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--cyan-accent) / 0.15))",
            border: "1px solid hsl(var(--primary) / 0.3)",
          }}
        >
          <Icon size={20} className="text-primary" />
        </div>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h3 className="mt-1 font-display font-bold text-xl text-foreground">
            {title}
          </h3>
        </div>
      </header>

      <dl className="space-y-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between items-baseline gap-4 py-1.5"
          >
            <dt className="font-body text-[0.72rem] uppercase tracking-[0.13em] text-steel shrink-0 max-w-[55%]">
              {label}
            </dt>
            <dd className="font-mono text-sm text-foreground text-right">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
};

const SpecificationsPage = () => {
  return (
    <DetailPageLayout title="Spécifications Techniques">
      {/* Hero band */}
      <section className="section pt-16">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <p className="eyebrow">Données Techniques — Détails Complets</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
              Fiche Technique Complète
            </h1>
            <p className="mt-6 text-steel text-lg leading-[1.8] max-w-3xl mx-auto">
              L'ensemble des paramètres mécaniques, électroniques et logiciels
              du pont roulant intelligent SonicLift, consolidés à partir du
              dossier de définition et des validations expérimentales de la
              Revue 2.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Full spec tables */}
      <section className="section pt-0">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {GROUPS.map((g, i) => (
              <Reveal key={g.title} delay={i * 80}>
                <SpecCard group={g} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Performance envelope */}
      <section className="section pt-0">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <article className="glass rounded-3xl p-8 md:p-12">
              <p className="eyebrow">Enveloppe de Fonctionnement</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
                Capacités Opérationnelles
              </h2>
              <p className="mt-5 text-steel leading-[1.8]">
                Le système intègre les trois volets technologiques —
                mécanique robuste, intelligence artificielle de perception, et
                commande automatique sophistiquée — pour délivrer les capacités
                suivantes :
              </p>
              <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {ENVELOPE.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-primary shrink-0 mt-0.5"
                    />
                    <span className="leading-[1.6]">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      {/* HSE & Compliance */}
      <section className="section pt-0">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <article
              className="glass rounded-3xl p-8 md:p-12"
              style={{
                borderColor: "hsl(var(--primary) / 0.25)",
              }}
            >
              <p className="eyebrow">Conformité & Normes</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
                Sécurité HSE Sonasid
              </h2>
              <p className="mt-5 text-steel leading-[1.8]">
                L'architecture logicielle et matérielle respecte les normes HSE
                en vigueur chez Sonasid. La détection d'une personne dans
                l'espace de travail déclenche l'arrêt immédiat de la nacelle,
                tandis que les obstacles non humains induisent uniquement une
                modification de trajectoire. Cette différenciation assure la
                protection des opérateurs sans compromettre l'efficacité des
                déplacements.
              </p>
              <div className="mt-7 grid sm:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="font-display font-extrabold text-primary text-2xl">
                    Arrêt
                  </p>
                  <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                    Personne détectée
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="font-display font-extrabold text-primary text-2xl">
                    Contournement
                  </p>
                  <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                    Obstacle statique
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="font-display font-extrabold text-primary text-2xl">
                    Replanification
                  </p>
                  <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                    Obstacle dynamique
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Download & return */}
      <section className="section pt-0 pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="eyebrow">Documentation</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
              Dossier Complet
            </h2>
            <p className="mt-5 text-steel leading-[1.8]">
              Pour une lecture approfondie de l'analyse fonctionnelle, des
              calculs de dimensionnement, et des validations expérimentales,
              consultez le dossier de définition complet.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <button className="btn-amber" disabled>
                <Download size={16} /> Télécharger le Dossier (PDF)
              </button>
              <Link to="/" className="btn-outline-amber">
                Retour à l'Accueil
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </DetailPageLayout>
  );
};

export default SpecificationsPage;