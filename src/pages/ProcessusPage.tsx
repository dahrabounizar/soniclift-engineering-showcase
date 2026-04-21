import { Link } from "react-router-dom";
import {
  ClipboardList,
  Ruler,
  Wrench,
  Zap,
  Eye,
  Waves,
  Route,
} from "lucide-react";
import { DetailPageLayout } from "@/components/DetailPageLayout";
import { Reveal } from "@/components/Reveal";
import { ImageWithFallback } from "@/components/ImageWithFallback";

/**
 * ============================================================================
 * FILE: src/pages/ProcessusPage.tsx
 * ============================================================================
 * PURPOSE:
 *   Deep-dive detail page for "Processus". Walks through all 7 engineering
 *   phases from functional analysis (SysML) through trajectory planning (A*),
 *   with corrected technical values per Revue 2 (notably: real V-slot hollow
 *   moment of inertia, 5× NEMA 23 motors, validated anti-sway KPIs).
 *
 *   Content sourced from Dossier de Définition (pages 6-71) with Revue 2
 *   experimental validation data.
 * ============================================================================
 */

const YOLO_METRICS: [string, string, string][] = [
  ["Précision", "99,64 %", "Détection presque tous objets présents"],
  ["mAP50", "99,24 %", "Localisation très précise"],
  ["mAP50-95", "92,87 %", "Robustesse sur conditions variées"],
  ["Inférence", "3,55 ms/image", "Compatible temps réel"],
  ["Apprentissage GPU", "25 min", "Via Google Colab Tesla T4/P100"],
  ["Dataset", "3 038 images", "Roboflow, annotées manuellement"],
];

const SHAPING_KPIS: [string, string, string, string][] = [
  ["θ max (deg)", "6,22°", "3,16°", "1,61°"],
  ["RMS(θ) (deg)", "3,56°", "1,33°", "0,95°"],
  ["θ̇ max (deg/s)", "19,47", "5,10", "4,51"],
  ["Force max (N)", "10,63", "5,41", "3,27"],
  ["Couple max (N·m)", "0,16", "0,08", "0,05"],
  ["Temps fin course (s)", "3,22", "4,08", "4,99"],
];

const MOTOR_DIM = [
  { axis: "X & Y", couple: "≈ 0,19 N·m", details: "Force linéaire 6 N + inertie 12 kg × r² — NEMA 23 largement dimensionné" },
  { axis: "Z (levage total)", couple: "2,92 N·m", details: "1,46 N·m par moteur × 2 moteurs, avec rendement η = 0,85" },
  { axis: "Rotation", couple: "≈ 1,67 N·m", details: "Dynamixel MX-28T, ω cible = 6,28 rad/s en 0,5 s" },
];

const ProcessusPage = () => {
  return (
    <DetailPageLayout title="Processus">
      {/* Hero band */}
      <section className="section pt-16">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <p className="eyebrow">Processus — Détails Complets</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
              Du Besoin au Prototype Validé
            </h1>
            <p className="mt-6 text-steel text-lg leading-[1.8] max-w-3xl mx-auto">
              Sept phases coordonnées qui transforment une vision technique
              ambitieuse en machine mécatronique autonome : de l'analyse
              SysML à la génération de trajectoire A*, en passant par le
              dimensionnement RDM rigoureux, la fabrication multi-procédés, la
              vision stéréoscopique par intelligence artificielle, et la
              commande anti-ballant par Input Shaping.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Phase 01 — SysML */}
      <section id="phase-01" className="section pt-0">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span
                className="font-display font-extrabold text-primary leading-none"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                01
              </span>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--cyan-accent) / 0.15))",
                  border: "1px solid hsl(var(--primary) / 0.3)",
                }}
              >
                <ClipboardList size={26} className="text-primary" />
              </div>
              <div>
                <p className="eyebrow">Analyse Fonctionnelle</p>
                <h2 className="mt-1 text-3xl md:text-4xl font-extrabold leading-tight">
                  Modélisation SysML
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="text-steel leading-[1.8] max-w-4xl">
              Le système a été modélisé via trois diagrammes SysML
              complémentaires qui couvrent structure, exigences fonctionnelles
              et interactions avec les acteurs. Les relations de raffinement et
              de satisfaction tracent le lien entre les exigences de haut
              niveau et les exigences détaillées imposées au système.
            </p>
          </Reveal>

          <div className="mt-10 space-y-8">
            <Reveal>
              <article className="glass rounded-2xl p-7">
                <p className="eyebrow">Diagramme de cas d'utilisation</p>
                <h3 className="mt-2 font-display font-bold text-xl">
                  Acteurs & Interactions
                </h3>
                <p className="mt-4 text-steel leading-[1.8]">
                  Décrit les interactions entre les acteurs (opérateur, camion,
                  fardeaux, secteur de travail) et le système. Met en évidence
                  les modes manuel et automatique, et les fonctions clés :
                  reconnaissance des camions/fardeaux, génération de
                  trajectoires en évitant les obstacles, arrêt sans
                  oscillations, saisie/levage/rotation/dépose de la charge.
                </p>
                <div className="mt-6">
                  <ImageWithFallback
                    src="/images/processus/sysml-use-cases.png"
                    alt="Diagramme SysML des cas d'utilisation"
                    caption="Mode manuel vs mode automatique — acteurs et fonctions"
                    aspectRatio="16/10"
                  />
                </div>
              </article>
            </Reveal>

            <Reveal>
              <article className="glass rounded-2xl p-7">
                <p className="eyebrow">Diagramme d'exigences</p>
                <h3 className="mt-2 font-display font-bold text-xl">
                  Spécifications Traçables
                </h3>
                <p className="mt-4 text-steel leading-[1.8]">
                  Regroupe les exigences principales : sécurité HSE, détection
                  (fardeaux, camions, obstacles, personnes), automatisation,
                  performances (vitesse max 32 m/min, charge admissible 8 kg),
                  encombrement (1200×800×1000 mm), déplacement sans
                  oscillation, arrêt d'urgence accessible à tout moment.
                </p>
                <div className="mt-6">
                  <ImageWithFallback
                    src="/images/processus/sysml-requirements.png"
                    alt="Diagramme SysML des exigences"
                    caption="Arborescence d'exigences avec raffinement et satisfaction"
                    aspectRatio="16/10"
                  />
                </div>
              </article>
            </Reveal>

            <Reveal>
              <article className="glass rounded-2xl p-7">
                <p className="eyebrow">Diagramme de blocs (BDD)</p>
                <h3 className="mt-2 font-display font-bold text-xl">
                  Architecture Statique
                </h3>
                <p className="mt-4 text-steel leading-[1.8]">
                  Présente l'architecture statique du système en sous-systèmes
                  cohérents : éléments mécaniques (translation, levage,
                  rotation), capteurs (fins de course, accéléromètre,
                  gyroscope, capteur de charge), actionneurs (moteurs, servo,
                  driver), et unité de contrôle (Arduino, microcontrôleurs, IA,
                  IHM).
                </p>
                <div className="mt-6">
                  <ImageWithFallback
                    src="/images/processus/sysml-bdd.png"
                    alt="Diagramme BDD de l'architecture du pont roulant"
                    caption="Décomposition en blocs — mécanique, capteurs, IA, commande"
                    aspectRatio="16/10"
                  />
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Phase 02 — Dimensionnement */}
      <section id="phase-02" className="section pt-0">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span
                className="font-display font-extrabold text-primary leading-none"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                02
              </span>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--cyan-accent) / 0.15))",
                  border: "1px solid hsl(var(--primary) / 0.3)",
                }}
              >
                <Ruler size={26} className="text-primary" />
              </div>
              <div>
                <p className="eyebrow">Dimensionnement</p>
                <h2 className="mt-1 text-3xl md:text-4xl font-extrabold leading-tight">
                  Étude RDM & Calculs
                </h2>
              </div>
            </div>
          </Reveal>

          {/* RDM correction callout */}
          <Reveal>
            <article
              className="glass rounded-2xl p-7 mb-8"
              style={{ borderColor: "hsl(var(--primary) / 0.3)" }}
            >
              <p className="eyebrow">Correction Technique</p>
              <h3 className="mt-2 font-display font-bold text-xl">
                Moment d'Inertie Réel du V-slot
              </h3>
              <p className="mt-4 text-steel leading-[1.8]">
                Le dossier de définition utilise une approximation de section
                carrée pleine pour simplifier le calcul RDM (I =
                b·h³/12 ≈ 1,33×10⁻⁸ m⁴). En réalité, le profilé V-slot 20×20
                est une section creuse complexe avec des rainures en T. La
                valeur constructeur réelle du moment d'inertie est plutôt{" "}
                <strong className="text-foreground">
                  Ix ≈ 6,5×10⁻⁹ m⁴
                </strong>{" "}
                — environ 2× plus faible que l'approximation solide.
              </p>
              <p className="mt-4 text-steel leading-[1.8]">
                Cette correction{" "}
                <strong className="text-foreground">
                  renforce
                </strong>{" "}
                la justification de la configuration bipoutre sur l'axe X : le
                doublement du profilé (I ≈ 1,07×10⁻⁷ m⁴ théorique, ≈ 5,2×10⁻⁸
                m⁴ réel) reste significativement plus rigide que la solution
                simple, et la validation FEA SolidWorks (déflexion 0,3 mm sous
                300 N) fournit la preuve expérimentale.
              </p>
            </article>
          </Reveal>

          <Reveal>
            <article className="glass rounded-2xl p-7">
              <h3 className="font-display font-bold text-xl">
                Profilé Simple vs Double — Comparaison
              </h3>
              <p className="mt-4 text-steel leading-[1.8]">
                Charge utile 10 kg + chariot 2 kg → P = 117,72 N, longueur
                L = 1,2 m, charge centrée (Mmax = P·L/4).
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 pr-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                        Configuration
                      </th>
                      <th className="text-right py-3 px-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                        Moment inertie
                      </th>
                      <th className="text-right py-3 px-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                        Contrainte
                      </th>
                      <th className="text-right py-3 pl-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                        Flèche
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3 pr-4 font-display text-foreground">
                        Profilé simple
                      </td>
                      <td className="py-3 px-4 font-mono text-right text-foreground">
                        1,33×10⁻⁸ m⁴
                      </td>
                      <td className="py-3 px-4 font-mono text-right text-foreground">
                        26,49 MPa
                      </td>
                      <td className="py-3 pl-4 font-mono text-right text-foreground">
                        4,6 mm
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-display text-primary">
                        Profilé double (retenu)
                      </td>
                      <td className="py-3 px-4 font-mono text-right text-primary">
                        1,07×10⁻⁷ m⁴
                      </td>
                      <td className="py-3 px-4 font-mono text-right text-primary">
                        3,31 MPa
                      </td>
                      <td className="py-3 pl-4 font-mono text-right text-primary">
                        0,58 mm
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-5 text-sm text-steel italic">
                Le double profilé réduit la flèche d'un facteur ≈ 8 et les
                contraintes d'un facteur ≈ 8 — adopté sur l'axe X qui supporte
                le maximum de contraintes. L'axe Y conserve un profilé simple
                (pont bipoutre posé).
              </p>
            </article>
          </Reveal>

          {/* Motor dimensioning */}
          <Reveal className="mt-6">
            <article className="glass rounded-2xl p-7">
              <h3 className="font-display font-bold text-xl">
                Dimensionnement des Motorisations
              </h3>
              <div className="mt-6 space-y-4">
                {MOTOR_DIM.map((m) => (
                  <div
                    key={m.axis}
                    className="grid sm:grid-cols-[150px_140px_1fr] gap-4 py-4 border-b border-white/5 last:border-0"
                  >
                    <div className="font-display font-semibold text-foreground">
                      {m.axis}
                    </div>
                    <div className="font-mono text-primary font-bold">
                      {m.couple}
                    </div>
                    <div className="text-sm text-steel leading-[1.6]">
                      {m.details}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-steel italic">
                Note : le dossier initial préconisait NEMA 17 — la Revue 2
                confirme l'adoption de NEMA 23 (×5) pour la marge de couple
                nécessaire sur l'ensemble des axes de translation et de
                levage, avec drivers DM542.
              </p>
            </article>
          </Reveal>

          {/* Cable dimensioning */}
          <Reveal className="mt-6">
            <article className="glass rounded-2xl p-7">
              <h3 className="font-display font-bold text-xl">
                Câbles de Levage
              </h3>
              <p className="mt-4 text-steel leading-[1.8]">
                Pour 4 câbles supportant 12 kg (chariot + charge), avec acier
                σult = 500 MPa et coefficient de sécurité SF = 5 :
              </p>
              <div className="mt-5 grid sm:grid-cols-4 gap-3">
                {[
                  { val: "29,43 N", label: "Force par câble" },
                  { val: "100 MPa", label: "Contrainte admissible" },
                  { val: "0,61 mm", label: "Diamètre min théorique" },
                  { val: "0,5 mm/m", label: "Allongement élastique" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="text-center p-4 rounded-xl bg-primary/5 border border-primary/20"
                  >
                    <p className="font-display font-extrabold text-primary text-xl">
                      {s.val}
                    </p>
                    <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-steel leading-tight">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Phase 03 — Fabrication */}
      <section id="phase-03" className="section pt-0">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span
                className="font-display font-extrabold text-primary leading-none"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                03
              </span>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--cyan-accent) / 0.15))",
                  border: "1px solid hsl(var(--primary) / 0.3)",
                }}
              >
                <Wrench size={26} className="text-primary" />
              </div>
              <div>
                <p className="eyebrow">Fabrication & Assemblage</p>
                <h2 className="mt-1 text-3xl md:text-4xl font-extrabold leading-tight">
                  Usinage Multi-Procédés
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="text-steel leading-[1.8] max-w-4xl">
              Chaîne complète de fabrication des composants mécaniques au
              Fablab UM6P : tour conventionnel, fraiseuse, CNC, impression 3D
              et scie électrique. Exemple illustré de gamme d'usinage :
              moyeu SHF en aluminium sur tour + fraiseuse.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <article className="glass rounded-2xl p-7">
              <h3 className="font-display font-bold text-xl">
                Exemple — Moyeu SHF (Tour + Fraiseuse)
              </h3>
              <div className="mt-6 space-y-5">
                {[
                  {
                    step: "1",
                    title: "Débit de la matière première",
                    desc: "Scie à ruban électrique — tronçonnage d'une barre Ø≥30 mm, lopin de 25 mm conservant la surépaisseur de dressage.",
                  },
                  {
                    step: "2",
                    title: "Usinage et finition (Tour)",
                    desc: "Dressage face avant, chariotage épaulement Ø18 mm sur 15 mm, formation collerette Ø30 mm × 5,5 mm, perçage axial Ø12 mm avec centrage, chanfreinage des arêtes.",
                  },
                  {
                    step: "3",
                    title: "Perçages complémentaires (Fraiseuse)",
                    desc: "Deux trous Ø4 mm sur collerette à 12,5 mm de l'axe, un trou radial Ø3 mm sur le corps cylindrique.",
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-5">
                    <span className="font-display font-extrabold text-primary text-2xl shrink-0 w-8">
                      {s.step}
                    </span>
                    <div>
                      <p className="font-display font-semibold text-foreground">
                        {s.title}
                      </p>
                      <p className="mt-1.5 text-sm text-steel leading-[1.7]">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal className="mt-6">
            <article className="glass rounded-2xl p-7">
              <h3 className="font-display font-bold text-xl">
                Exemple — Glissière Y (CNC)
              </h3>
              <p className="mt-4 text-steel leading-[1.8]">
                Découpe sur CNC à partir d'une plaque HPL8. Conversion du
                fichier .dxf en vecteurs via ArtCam, profondeur d'usinage
                8,8 mm, fraise M4. Ordre impératif : <strong className="text-foreground">intérieur
                d'abord</strong> (4 chambrages profondeur 2 mm → perçages
                traversants → ouvertures internes), <strong className="text-foreground">contour
                extérieur en dernier</strong> pour maintenir la stabilité de la
                pièce pendant l'usinage. Tolérance de +0,3 mm par rapport au
                diamètre nominal pour les ajustements serrés.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Phase 04 — Electrical */}
      <section id="phase-04" className="section pt-0">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span
                className="font-display font-extrabold text-primary leading-none"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                04
              </span>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--cyan-accent) / 0.15))",
                  border: "1px solid hsl(var(--primary) / 0.3)",
                }}
              >
                <Zap size={26} className="text-primary" />
              </div>
              <div>
                <p className="eyebrow">Architecture Électrique</p>
                <h2 className="mt-1 text-3xl md:text-4xl font-extrabold leading-tight">
                  Câblage & Puissance
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="text-steel leading-[1.8] max-w-4xl">
              Architecture modulaire et robuste visant un contrôle précis,
              sûr et synchronisé des différents axes. Carte Arduino Mega au
              cœur du dispositif, choisie pour son nombre élevé
              d'entrées/sorties numériques permettant la gestion simultanée de
              plusieurs moteurs, capteurs et actionneurs.
            </p>
          </Reveal>

          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {[
              { label: "Contrôleur", val: "Arduino Mega 2560" },
              { label: "Moteurs pas à pas", val: "5× NEMA 23" },
              { label: "Drivers puissance", val: "5× DM542" },
              { label: "Servo rotation", val: "Dynamixel MX-28T" },
              { label: "Fins de course", val: "7 capteurs (X, Y, Z)" },
              { label: "Sécurité", val: "Bouton arrêt d'urgence" },
              { label: "Alimentation principale", val: "12 V stabilisée" },
              { label: "Capteurs logique", val: "5 V régulée (interne Arduino)" },
            ].map((r) => (
              <Reveal key={r.label}>
                <div className="glass rounded-xl p-4 flex items-center justify-between gap-4">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.13em] text-steel">
                    {r.label}
                  </span>
                  <span className="font-display font-semibold text-foreground text-right text-sm">
                    {r.val}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <ImageWithFallback
              src="/images/processus/circuit-electrique.png"
              alt="Circuit électrique global avec Arduino Mega, drivers DM542 et moteurs NEMA 23"
              caption="Figure 13 — Schéma de câblage complet"
              aspectRatio="16/10"
            />
          </Reveal>

          <Reveal className="mt-6">
            <ImageWithFallback
              src="/images/processus/schema-synoptique.png"
              alt="Schéma synoptique du système"
              caption="Figure 14 — Schéma synoptique (liaisons numérique, électrique, mécanique)"
              aspectRatio="16/10"
            />
          </Reveal>
        </div>
      </section>

      {/* Phase 05 — Vision */}
      <section id="phase-05" className="section pt-0">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span
                className="font-display font-extrabold text-primary leading-none"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                05
              </span>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--cyan-accent) / 0.15))",
                  border: "1px solid hsl(var(--primary) / 0.3)",
                }}
              >
                <Eye size={26} className="text-primary" />
              </div>
              <div>
                <p className="eyebrow">Vision Stéréoscopique</p>
                <h2 className="mt-1 text-3xl md:text-4xl font-extrabold leading-tight">
                  Détection IA & Localisation 3D
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="text-steel leading-[1.8] max-w-4xl">
              Module de perception combinant détection par apprentissage
              profond (YOLOv5) et reconstruction 3D par stéréovision. Quatre
              classes cibles : camions (CAMION), fardeaux (FARDEAUX), personnes
              et obstacles. La présence d'une personne déclenche l'arrêt
              immédiat — conformément aux exigences HSE Sonasid.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <article className="glass rounded-2xl p-7">
              <h3 className="font-display font-bold text-xl">
                Dataset Personnalisé Roboflow
              </h3>
              <p className="mt-4 text-steel leading-[1.8]">
                Un modèle YOLO entraîné sur dataset industriel standard échoue
                à détecter un camion jouet — les proportions, textures et
                couleurs diffèrent fortement. Nous avons donc constitué un{" "}
                <strong className="text-foreground">dataset entièrement
                personnalisé</strong> : plus de 200 images initiales du camion
                jouet sous différents angles, annotées manuellement.
                Augmentations Roboflow (flip, rotations 90°, variations de
                luminosité ±15 %) portant le dataset final à{" "}
                <strong className="text-foreground">3 038 images</strong>.
              </p>
              <p className="mt-4 text-steel leading-[1.8]">
                Répartition : 2 706 entraînement / 222 validation / 110 test.
                Entraînement sur Google Colab avec GPU Tesla T4/P100 — temps
                divisé par 7 vs CPU local (25 min contre 3 h).
              </p>
            </article>
          </Reveal>

          <Reveal className="mt-6">
            <article className="glass rounded-2xl p-7">
              <h3 className="font-display font-bold text-xl">
                Performances du Modèle best.pt
              </h3>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 pr-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                        Métrique
                      </th>
                      <th className="text-right py-3 px-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                        Valeur
                      </th>
                      <th className="text-right py-3 pl-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                        Interprétation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {YOLO_METRICS.map(([metric, val, interp]) => (
                      <tr
                        key={metric}
                        className="border-b border-white/5 last:border-0"
                      >
                        <td className="py-3 pr-4 font-display text-foreground">
                          {metric}
                        </td>
                        <td className="py-3 px-4 font-mono text-right text-primary font-bold">
                          {val}
                        </td>
                        <td className="py-3 pl-4 text-right text-sm text-steel">
                          {interp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </Reveal>

          <Reveal className="mt-10">
            <div className="grid lg:grid-cols-2 gap-6">
              <ImageWithFallback
                src="/images/processus/detection-camion-fardeaux.png"
                alt="Résultats de détection sur camion et fardeaux"
                caption="Détection camion + fardeaux (scores > 0,84)"
                aspectRatio="4/3"
              />
              <ImageWithFallback
                src="/images/processus/detection-complete.png"
                alt="Détection simultanée camion, fardeaux, personne, obstacle"
                caption="Détection multi-classes en temps réel"
                aspectRatio="4/3"
              />
            </div>
          </Reveal>

          {/* Stereovision */}
          <Reveal className="mt-10">
            <article className="glass rounded-2xl p-7">
              <h3 className="font-display font-bold text-xl">
                Principe de la Stéréovision
              </h3>
              <p className="mt-4 text-steel leading-[1.8]">
                Deux caméras identiques séparées par une distance connue
                (baseline B) observent la scène. Un même point apparaît à des
                positions différentes dans les deux images —{" "}
                <em className="text-foreground">disparité d</em>. La profondeur
                réelle est donnée par :
              </p>
              <div className="mt-5 glass rounded-xl p-6 font-mono text-center text-lg text-primary">
                Z = (f × B) / d
              </div>
              <p className="mt-4 text-steel leading-[1.8]">
                Où f est la focale en pixels. Étapes de mise en œuvre :
              </p>
              <ol className="mt-4 space-y-2 text-sm text-steel list-decimal list-inside">
                <li>Calibration des deux caméras avec un échiquier OpenCV (cv.findChessboardCorners)</li>
                <li>Calcul des paramètres intrinsèques, distorsion, extrinsèques</li>
                <li>Rectification stéréo (cv.stereoRectify) alignant horizontalement les correspondances</li>
                <li>Sauvegarde XML des matrices pour réutilisation sans recalibration</li>
                <li>Détection YOLO des bounding boxes dans gauche et droite</li>
                <li>Calcul de la disparité via décalage horizontal des centres</li>
                <li>Reconstruction (X, Y, Z) via projection perspective inverse</li>
              </ol>
            </article>
          </Reveal>

          <Reveal className="mt-6">
            <article className="glass rounded-2xl p-7">
              <h3 className="font-display font-bold text-xl">
                Coordonnées X, Y & Correction au Sol
              </h3>
              <p className="mt-4 text-steel leading-[1.8]">
                À partir du centre image (c<sub>x</sub>, c<sub>y</sub>) et du
                centre optique (W/2, H/2), les coordonnées réelles se
                déduisent par similitude :
              </p>
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <div className="glass rounded-xl p-5 font-mono text-center text-primary">
                  X = (c<sub>x</sub> − W/2) × Z / f
                </div>
                <div className="glass rounded-xl p-5 font-mono text-center text-primary">
                  Y = (c<sub>y</sub> − H/2) × Z / f
                </div>
              </div>
              <p className="mt-5 text-steel leading-[1.8]">
                Dans le cas réel où les caméras sont suspendues à une hauteur H
                au-dessus du sol, la profondeur Z mesurée est la distance
                <em className="text-foreground"> directe</em>, pas la distance
                horizontale utile pour le pilotage. Correction par théorème
                de Pythagore :
              </p>
              <div className="mt-5 glass rounded-xl p-6 font-mono text-center text-lg text-primary">
                D = √(Z² − H²)
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Phase 06 — Anti-Sway */}
      <section id="phase-06" className="section pt-0">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span
                className="font-display font-extrabold text-primary leading-none"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                06
              </span>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--cyan-accent) / 0.15))",
                  border: "1px solid hsl(var(--primary) / 0.3)",
                }}
              >
                <Waves size={26} className="text-primary" />
              </div>
              <div>
                <p className="eyebrow">Commande Anti-Ballant</p>
                <h2 className="mt-1 text-3xl md:text-4xl font-extrabold leading-tight">
                  Input Shaping ZV / ZVD
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="text-steel leading-[1.8] max-w-4xl">
              Modélisation pendulaire non-linéaire par formalisme de Lagrange,
              avec pulsation naturelle ωₙ = √(g/ℓ). La commande trapézoïdale
              classique excite fortement le mode propre du pendule.{" "}
              <strong className="text-foreground">L'Input Shaping</strong>{" "}
              convolue la commande de référence par une séquence d'impulsions
              calibrées pour produire une oscillation en opposition de phase —
              annulation totale à l'arrêt.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <article className="glass rounded-2xl p-7">
              <h3 className="font-display font-bold text-xl">
                Fréquence Propre & Temps Caractéristique
              </h3>
              <div className="mt-5 grid sm:grid-cols-3 gap-4">
                {[
                  { val: "3,13 rad/s", label: "Pulsation naturelle ωn" },
                  { val: "1,00 s", label: "Demi-période T = π/ωd" },
                  { val: "ζ = 0,01", label: "Amortissement faible" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="text-center p-5 rounded-xl bg-primary/5 border border-primary/20"
                  >
                    <p className="font-display font-extrabold text-primary text-xl">
                      {s.val}
                    </p>
                    <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-steel">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-steel leading-[1.8]">
                <strong className="text-foreground">Shaper ZV</strong> —
                2 impulsions (t = 0 et T) : A₁ ≈ 0,508 / A₂ ≈ 0,492.<br />
                <strong className="text-foreground">Shaper ZVD</strong> —
                3 impulsions (t = 0, T, 2T) : A₁ ≈ 0,258 / A₂ ≈ 0,500 /
                A₃ ≈ 0,242. Plus robuste aux incertitudes de modèle au prix
                d'un temps de fin de course légèrement accru.
              </p>
            </article>
          </Reveal>

          {/* Shaping KPI table */}
          <Reveal className="mt-10">
            <article className="glass rounded-2xl p-7">
              <h3 className="font-display font-bold text-xl">
                KPIs — Trapézoïdal vs ZV vs ZVD
              </h3>
              <p className="mt-4 text-steel leading-[1.8]">
                Distance cible 1,20 m, charge m = 8 kg, longueur ℓ = 1 m.
                Données extraites des simulations et validées
                expérimentalement en Revue 2.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 pr-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                        KPI
                      </th>
                      <th className="text-right py-3 px-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                        Trapézoïdal
                      </th>
                      <th className="text-right py-3 px-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                        Input ZV
                      </th>
                      <th className="text-right py-3 pl-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-primary">
                        Input ZVD
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SHAPING_KPIS.map(([kpi, trap, zv, zvd]) => (
                      <tr
                        key={kpi}
                        className="border-b border-white/5 last:border-0"
                      >
                        <td className="py-3 pr-4 font-display text-foreground">
                          {kpi}
                        </td>
                        <td className="py-3 px-4 font-mono text-right text-steel">
                          {trap}
                        </td>
                        <td className="py-3 px-4 font-mono text-right text-foreground">
                          {zv}
                        </td>
                        <td className="py-3 pl-4 font-mono text-right text-primary font-bold">
                          {zvd}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 grid sm:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/30">
                  <p className="font-display font-extrabold text-primary text-2xl">
                    −74 %
                  </p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-steel">
                    θmax (ZVD)
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/30">
                  <p className="font-display font-extrabold text-primary text-2xl">
                    −73 %
                  </p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-steel">
                    RMS oscillations
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/30">
                  <p className="font-display font-extrabold text-primary text-2xl">
                    −77 %
                  </p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-steel">
                    θ̇max
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal className="mt-10">
            <ImageWithFallback
              src="/images/processus/shaping-comparison.png"
              alt="Comparaison graphique des réponses pendulaires"
              caption="Comparaison : trapézoïdal vs Input Shaping ZVD"
              aspectRatio="16/9"
            />
          </Reveal>

          <Reveal className="mt-6">
            <article
              className="glass rounded-2xl p-7"
              style={{ borderColor: "hsl(var(--primary) / 0.25)" }}
            >
              <p className="eyebrow">Validation Expérimentale (Revue 2)</p>
              <h3 className="mt-2 font-display font-bold text-xl">
                Test sur Prototype Physique
              </h3>
              <p className="mt-4 text-steel leading-[1.8]">
                Test de déplacement point-à-point (distance 0,50 m, vitesse
                0,50 m/s, accélération 0,50 m/s²) sur axe linéaire NEMA 17 +
                pendule simple de longueur ℓ = 0,66 m.{" "}
                <strong className="text-foreground">Résultat
                trapézoïdal :</strong> chariot arrêté net, pendule fortement
                oscillant.{" "}
                <strong className="text-foreground">Résultat ZV :</strong>{" "}
                mouvement en escalier caractéristique, à l'arrêt du chariot le
                pendule est immobile. Suppression totale des oscillations
                résiduelles — modèle Python validé par l'expérience.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Phase 07 — Trajectory */}
      <section id="phase-07" className="section pt-0">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span
                className="font-display font-extrabold text-primary leading-none"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                07
              </span>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--cyan-accent) / 0.15))",
                  border: "1px solid hsl(var(--primary) / 0.3)",
                }}
              >
                <Route size={26} className="text-primary" />
              </div>
              <div>
                <p className="eyebrow">Génération de Trajectoire</p>
                <h2 className="mt-1 text-3xl md:text-4xl font-extrabold leading-tight">
                  A* Multi-Critères 3D
                </h2>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="text-steel leading-[1.8] max-w-4xl">
              Système hybride à deux niveaux : planification globale A*
              exécutée une fois avant le départ à partir de la carte statique,
              puis boucle de surveillance temps-réel avec replanification
              locale en cas de détection d'obstacles dynamiques sur l'horizon
              Lookahead.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <article className="glass rounded-2xl p-7">
              <h3 className="font-display font-bold text-xl">
                Fonction de Coût Multi-Critères
              </h3>
              <p className="mt-4 text-steel leading-[1.8]">
                Le coût réel parcouru{" "}
                <span className="font-mono text-primary">g(n)</span> combine
                plusieurs pondérations :
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  {
                    label: "Distance euclidienne 3D",
                    desc: "Base de minimisation de la longueur du parcours",
                  },
                  {
                    label: "Pénalité d'oscillations (la plus forte)",
                    desc: "Sanctionne les mouvements brusques — changements d'altitude rapides, zigzags horizontaux",
                  },
                  {
                    label: "Pénalité de hauteur",
                    desc: "Dissuade d'opérer trop haut (risque d'accrochage) ou trop bas (instabilité)",
                  },
                  {
                    label: "Pénalité de proximité",
                    desc: "Force l'algorithme à planifier un dégagement confortable autour des obstacles",
                  },
                  {
                    label: "Bonus d'orientation",
                    desc: "Récompense les états où la nacelle est alignée avec la direction cible",
                  },
                ].map((c) => (
                  <li key={c.label} className="flex items-start gap-3">
                    <span className="text-primary mt-1">▸</span>
                    <div>
                      <p className="font-display font-semibold text-foreground">
                        {c.label}
                      </p>
                      <p className="mt-1 text-sm text-steel leading-[1.6]">
                        {c.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-steel leading-[1.7]">
                L'heuristique h(n) reste admissible (distance euclidienne en
                ligne droite) pour garantir l'optimalité A*, augmentée de
                pénalités minimales d'angle et de hauteur accélérant la
                convergence.
              </p>
            </article>
          </Reveal>

          <Reveal className="mt-10">
            <ImageWithFallback
              src="/images/processus/trajectory-architecture.png"
              alt="Architecture de planification : globale A* + replanification locale"
              caption="Architecture hybride — planification + surveillance + replanification"
              aspectRatio="16/10"
            />
          </Reveal>

          {/* Scenarios */}
          <Reveal className="mt-10">
            <h3 className="text-center font-display font-bold text-2xl">
              Trois Scénarios de Test
            </h3>
          </Reveal>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {
                n: "1",
                title: "Obstacles bas dispersés",
                desc: "Deux obstacles de type palettes dispersés — trajectoire fluide à altitude modérée, orientation alignée.",
                img: "/images/processus/scenario-1.png",
              },
              {
                n: "2",
                title: "Obstacle central dominant",
                desc: "Un bloc volumineux au centre — contournement progressif avec ajustement d'altitude automatique.",
                img: "/images/processus/scenario-2.png",
              },
              {
                n: "3",
                title: "Mur gauche + mur droit",
                desc: "Espaces confinés — trajectoire centrale stable avec marges de sécurité respectées.",
                img: "/images/processus/scenario-3.png",
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <article className="glass rounded-xl overflow-hidden h-full flex flex-col">
                  <ImageWithFallback
                    src={s.img}
                    alt={s.title}
                    aspectRatio="4/3"
                  />
                  <div className="p-5">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary">
                      Scénario {s.n}
                    </p>
                    <h4 className="mt-2 font-display font-semibold text-foreground">
                      {s.title}
                    </h4>
                    <p className="mt-3 text-sm text-steel leading-[1.7]">
                      {s.desc}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <article className="glass rounded-2xl p-7">
              <p className="eyebrow">Obstacles Dynamiques</p>
              <h3 className="mt-2 font-display font-bold text-xl">
                Replanification Temps Réel
              </h3>
              <p className="mt-4 text-steel leading-[1.8]">
                À chaque pas de temps, un moniteur de sécurité utilise un
                horizon de prédiction (Lookahead) pour anticiper si la
                trajectoire nominale va croiser un obstacle dynamique
                (opérateur, chariot). Dès qu'une collision est détectée à
                l'avance, le système déclenche immédiatement une{" "}
                <strong className="text-foreground">
                  replanification en cascade
                </strong>{" "}
                — relance A* à partir de la position actuelle avec la carte
                d'environnement mise à jour.
              </p>
              <div className="mt-6">
                <ImageWithFallback
                  src="/images/processus/trajectory-dynamic.png"
                  alt="Simulation avec obstacles dynamiques rouge et vert plus statiques gris"
                  caption="Planification avec 2 obstacles dynamiques (rouge, vert) + statiques (gris)"
                  aspectRatio="16/10"
                />
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section pt-0 pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Route size={32} className="text-primary mx-auto opacity-70" />
            <h2 className="mt-4 text-3xl font-extrabold">
              Poursuivre l'Exploration
            </h2>
            <p className="mt-4 text-steel">
              Découvrir l'architecture mécatronique détaillée ou la fiche
              technique complète.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link to="/la-machine" className="btn-amber">
                La Machine
              </Link>
              <Link to="/specifications" className="btn-outline-amber">
                Spécifications
              </Link>
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

export default ProcessusPage;