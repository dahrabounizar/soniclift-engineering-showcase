import { Link } from "react-router-dom";
import {
  Move,
  MoveHorizontal,
  ArrowUpDown,
  RotateCw,
  Ruler,
  ShieldCheck,
  Layers,
  Cog,
} from "lucide-react";
import { DetailPageLayout } from "@/components/DetailPageLayout";
import { Reveal } from "@/components/Reveal";
import { ImageWithFallback } from "@/components/ImageWithFallback";

/**
 * ============================================================================
 * FILE: src/pages/LaMachinePage.tsx
 * ============================================================================
 * PURPOSE:
 *   Deep-dive detail page for "La Machine". Complete walkthrough of the
 *   mechatronic architecture: 4 DOF explained in detail, kinematic diagram,
 *   numerical mockup with dimensions, V-slot support selection with FEA
 *   validation, translation drive system, Z-axis rotation with functional
 *   requirements d1-d4, double-drum lifting system with E1/E2/e1-e3,
 *   complete materials table.
 *
 *   Content sourced from Dossier de Définition (pages 9-22) with corrections
 *   from Revue 2 (motor types, actual fabrication status).
 * ============================================================================
 */

const DOF_DETAIL = [
  {
    icon: Move,
    axis: "X",
    name: "Translation",
    title: "Déplacement longitudinal du portique",
    course: "1200 mm",
    drive: "2× Moteur NEMA 23 + poulie-courroie GT2",
    description:
      "Le portique complet se déplace sur les rails longitudinaux via deux moteurs synchronisés (marche avant / marche arrière). La configuration bipoutre supporte les contraintes maximales, avec une déflexion maîtrisée à 0,3 mm sous 300 N grâce à la rigidité doublée des deux profilés.",
    components: [
      "Moteurs NEMA 23 pas à pas (2 unités)",
      "Drivers DM542 configurables en microstepping",
      "Transmission poulie-courroie GT2",
      "Rayon effectif de poulie : 15 mm",
      "Tendeurs de courroie réglables pour éviter le saut de pas",
      "Glissières en HPL8 avec galets V-slot",
    ],
  },
  {
    icon: MoveHorizontal,
    axis: "Y",
    name: "Direction",
    title: "Déplacement transversal du chariot",
    course: "800 mm",
    drive: "Moteur NEMA 23 + poulie-courroie",
    description:
      "Le chariot transversal se déplace sur la poutre principale monopoutre (gauche / droite). Configuration poutre simple justifiée par les contraintes mécaniques réduites sur cet axe. La fixation de la courroie est assurée par serrage via une plaque intermédiaire.",
    components: [
      "Moteur NEMA 23 pas à pas",
      "Driver DM542",
      "Transmission poulie-courroie synchrone",
      "Tendeur de courroie intégré à la glissière",
      "Capteurs fin de course aux extrémités",
    ],
  },
  {
    icon: ArrowUpDown,
    axis: "Z",
    name: "Levage",
    title: "Mouvement vertical de la charge",
    course: "1000 mm",
    drive: "2× Moteur NEMA 23 + double tambour à câbles",
    description:
      "La charge est levée par un système à double tambour avec motorisation séparée — solution retenue pour éviter la complexité d'un système poulie-courroie supplémentaire avec tenseur. Chaque tambour est rainuré à ses deux extrémités pour y enrouler les câbles de levage.",
    components: [
      "2 moteurs NEMA 23 indépendants",
      "Tambours rainurés aux extrémités",
      "4 câbles acier (coefficient de sécurité 5)",
      "Paliers à brides et à semelle pour le guidage",
      "Arbres tambour en acier inoxydable",
      "Mise en position par goupille fendue",
    ],
  },
  {
    icon: RotateCw,
    axis: "Rot",
    name: "Orientation",
    title: "Rotation de la charge autour de Z",
    course: "±180°",
    drive: "Servomoteur Dynamixel MX-28T",
    description:
      "Rotation précise de la charge autour de l'axe vertical pour l'orientation au dépôt. Le servomoteur communique avec l'Arduino via une ligne de données dédiée, avec alimentation séparée 12 V répondant à ses exigences en tension et courant.",
    components: [
      "Servomoteur Dynamixel MX-28T",
      "Support MX-28 en impression 3D",
      "Accouplement 8-8 mm avec bague aluminium",
      "Arbre 12 mm en acier inoxydable",
      "Moyeu aluminium avec palier à brides",
      "Communication série + alimentation 12 V dédiée",
    ],
  },
];

const D_REQUIREMENTS = [
  {
    code: "d1",
    objective: "S'assurer que le palonnier du MX-28 ne quitte pas son logement",
    function:
      "Garantir le maximum de contact entre le palonnier et la pièce (3). Crucial pour une transmission de mouvement stable et sans jeu.",
  },
  {
    code: "d2",
    objective: "Mise en position du palier à brides",
    function:
      "Centrage court. Ce centrage aligne parfaitement l'élément supportant l'arbre rotatif.",
  },
  {
    code: "d3",
    objective: "Guidage efficace en rotation",
    function:
      "Centrage long. La longueur de la zone de contact est optimisée pour minimiser le basculement et assurer une trajectoire de rotation précise.",
  },
  {
    code: "d4",
    objective:
      "S'assurer que le système de levage ne touche pas l'axe X lors de la rotation",
    function:
      "Définir la longueur optimale de l'arbre rotatif pour éviter toute interférence mécanique.",
  },
];

const E_REQUIREMENTS = [
  {
    code: "E1",
    function:
      "Distance de sécurité pour préserver le centrage long entre l'axe moteur et la pièce (13). Garantit la qualité du guidage en rotation.",
  },
  {
    code: "E2",
    function: "Empêcher que l'arbre (11) ne quitte son logement sous contraintes dynamiques.",
  },
  {
    code: "e1",
    function:
      "Centrage du moteur avec la pièce (14). Un bon centrage est fondamental pour éviter les vibrations et l'usure prématurée.",
  },
  {
    code: "e3",
    function:
      "Distance à prendre en considération selon la longueur du tambour. Influence la cinématique et l'encombrement global.",
  },
];

const MATERIALS = [
  { name: "Aluminium 6061", detail: "Profilés V-slot 20×20 mm, moyeux, bagues" },
  { name: "Acier Inoxydable", detail: "Arbres de transmission Ø12 mm, arbres tambour" },
  { name: "HPL8 (Haute Pression)", detail: "Glissières X/Y, plaques structurelles" },
  { name: "PVC 5,1 mm", detail: "Plaques de fixation, supports moteurs" },
  { name: "Thermoplastique", detail: "Support MX-28 (impression 3D)" },
  { name: "Acier (câbles)", detail: "Câbles de levage, coefficient sécurité 5" },
];

const FABRICATION = [
  { machine: "Tour conventionnel", parts: "Moyeu-palonnier, Moyeu SHF, Bague, Arbres, Tambours" },
  { machine: "Fraiseuse", parts: "Reprises sur pièces de tour, perçages complémentaires" },
  { machine: "CNC", parts: "Plaques PVC/HPL8, Glissières X/Y, Supports NEMA 17, Cales" },
  { machine: "Impression 3D", parts: "Support MX-28 en thermoplastique" },
  { machine: "Scie électrique", parts: "Débit des profilés aluminium V-slot (X, Y, Z)" },
];

const LaMachinePage = () => {
  return (
    <DetailPageLayout title="La Machine">
      {/* Hero band */}
      <section className="section pt-16">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <p className="eyebrow">La Machine — Détails Complets</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
              Architecture Mécatronique
            </h1>
            <p className="mt-6 text-steel text-lg leading-[1.8] max-w-3xl mx-auto">
              Le système SonicLift est conçu pour manipuler une charge et lui
              faire occuper n'importe quelle position dans un volume 3D, tout en
              l'orientant. Quatre degrés de liberté coordonnés, une structure
              bipoutre validée par analyse éléments finis, et une chaîne
              cinématique optimisée pour la précision.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Kinematic diagram */}
      <section className="section pt-0">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="eyebrow text-center">Cinématique</p>
            <h2 className="mt-3 text-center text-3xl md:text-4xl font-extrabold">
              Schéma Cinématique
            </h2>
            <p className="mt-5 text-steel leading-[1.8] text-center max-w-3xl mx-auto">
              Décomposition en classes d'équivalence du pont roulant bipoutre
              posé. Cette représentation sert de fondation à la modélisation
              numérique SolidWorks et à la vérification de l'assemblage.
            </p>
            <div className="mt-10">
              <ImageWithFallback
                src="/images/machine/kinematic-diagram.png"
                alt="Schéma cinématique du pont roulant avec les 4 DDL annotés"
                caption="Figure 1 — Translation, Direction, Levage, Orientation"
                aspectRatio="16/10"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 DOF in detail */}
      <section className="section pt-0">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center">
            <p className="eyebrow">Degrés de Liberté</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">
              Les 4 Mouvements Principaux
            </h2>
          </Reveal>

          <div className="mt-14 space-y-6">
            {DOF_DETAIL.map(
              (
                { icon: Icon, axis, name, title, course, drive, description, components },
                i
              ) => (
                <Reveal key={axis} direction={i % 2 === 0 ? "left" : "right"}>
                  <article className="glass rounded-2xl p-7 md:p-9">
                    <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8">
                      <div className="flex md:flex-col items-center md:items-start gap-4 shrink-0">
                        <span
                          className="font-display font-extrabold text-primary leading-none"
                          style={{ fontSize: "4rem" }}
                        >
                          {axis}
                        </span>
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            background:
                              "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--cyan-accent) / 0.15))",
                            border: "1px solid hsl(var(--primary) / 0.3)",
                          }}
                        >
                          <Icon size={22} className="text-primary" />
                        </div>
                      </div>

                      <div>
                        <p className="eyebrow">{name}</p>
                        <h3 className="mt-2 font-display font-bold text-2xl text-foreground">
                          {title}
                        </h3>

                        <div className="mt-5 grid sm:grid-cols-2 gap-4">
                          <div className="glass rounded-lg p-4">
                            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-steel">
                              Course
                            </p>
                            <p className="mt-1 font-display font-extrabold text-primary text-lg">
                              {course}
                            </p>
                          </div>
                          <div className="glass rounded-lg p-4">
                            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-steel">
                              Motorisation
                            </p>
                            <p className="mt-1 font-display font-semibold text-foreground text-sm">
                              {drive}
                            </p>
                          </div>
                        </div>

                        <p className="mt-5 text-steel leading-[1.8]">
                          {description}
                        </p>

                        <div className="mt-5">
                          <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel mb-2">
                            Composants clés
                          </p>
                          <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                            {components.map((c) => (
                              <li
                                key={c}
                                className="flex items-start gap-2 text-sm text-foreground/90"
                              >
                                <span className="text-primary mt-0.5">▸</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              )
            )}
          </div>
        </div>
      </section>

      {/* Numerical mockup */}
      <section className="section pt-0">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center">
            <p className="eyebrow">SolidWorks</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">
              Maquette Numérique
            </h2>
            <p className="mt-5 text-steel leading-[1.8] max-w-3xl mx-auto">
              Passage de l'abstraction cinématique à la représentation physique
              concrète. La maquette 3D permet de vérifier l'encombrement et les
              interférences entre pièces en mouvement, de visualiser
              l'assemblage complet et la nature des liaisons, et de préparer
              les plans de détails pour la fabrication.
            </p>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <Reveal>
              <ImageWithFallback
                src="/images/machine/maquette-perspective.png"
                alt="Vue en perspective de la maquette complète"
                caption="Vue en perspective — Z = 984 mm"
                aspectRatio="4/3"
              />
            </Reveal>
            <Reveal delay={80}>
              <ImageWithFallback
                src="/images/machine/maquette-top.png"
                alt="Vue de dessus avec dimensions X et Y"
                caption="Vue de dessus — X = 1240 mm × Y = 760 mm"
                aspectRatio="4/3"
              />
            </Reveal>
          </div>

          <Reveal className="mt-6">
            <ImageWithFallback
              src="/images/machine/maquette-sides.png"
              alt="Vues de gauche et de droite de la maquette"
              caption="Vues latérales — chariot central et poutres"
              aspectRatio="16/7"
            />
          </Reveal>

          {/* Dimensions callout */}
          <Reveal className="mt-10">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { axis: "X", val: "1240 mm", label: "Longueur" },
                { axis: "Y", val: "760 mm", label: "Largeur" },
                { axis: "Z", val: "984 mm", label: "Hauteur" },
              ].map((d) => (
                <div
                  key={d.axis}
                  className="glass rounded-xl p-6 text-center"
                >
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary">
                    Axe {d.axis}
                  </p>
                  <p className="mt-2 font-display font-extrabold text-foreground text-3xl">
                    {d.val}
                  </p>
                  <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                    {d.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Support selection & FEA */}
      <section className="section pt-0">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <article
              className="glass rounded-3xl p-8 md:p-12"
              style={{ borderColor: "hsl(var(--primary) / 0.2)" }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--cyan-accent) / 0.15))",
                    border: "1px solid hsl(var(--primary) / 0.3)",
                  }}
                >
                  <ShieldCheck size={22} className="text-primary" />
                </div>
                <div>
                  <p className="eyebrow">Choix du Support</p>
                  <h2 className="mt-2 text-3xl md:text-4xl font-extrabold leading-tight">
                    Structure V-slot Validée par FEA
                  </h2>
                </div>
              </div>

              <p className="text-steel leading-[1.8]">
                Le choix d'une structure en profilés aluminium V-slot est
                justifié par le rapport robustesse / légèreté, assurant une
                base structurelle adéquate pour les systèmes de mouvement de
                précision.
              </p>
              <p className="mt-4 text-steel leading-[1.8]">
                Plusieurs configurations ont été testées sous un effort majoré
                de 30 kg (≈ 300 N) dans l'analyse par éléments finis
                SolidWorks. La solution retenue assure une bonne rigidité avec
                une déformation maximale de{" "}
                <strong className="text-foreground">0,3 mm</strong>.
              </p>

              <div className="mt-8 grid lg:grid-cols-2 gap-6">
                <ImageWithFallback
                  src="/images/machine/fea-configurations.png"
                  alt="Comparaison FEA de plusieurs configurations structurelles"
                  caption="Configurations testées — déformations comparées"
                  aspectRatio="16/10"
                />
                <ImageWithFallback
                  src="/images/machine/fea-final.png"
                  alt="Configuration finale retenue avec déformation minimale"
                  caption="Configuration retenue — déflexion 0,3 mm"
                  aspectRatio="16/10"
                />
              </div>

              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <div className="text-center p-5 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="font-display font-extrabold text-primary text-3xl">
                    300 N
                  </p>
                  <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                    Charge test (majorée)
                  </p>
                </div>
                <div className="text-center p-5 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="font-display font-extrabold text-primary text-3xl">
                    0,3 mm
                  </p>
                  <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                    Déflexion max
                  </p>
                </div>
                <div className="text-center p-5 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="font-display font-extrabold text-primary text-3xl">
                    Bipoutre
                  </p>
                  <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
                    Axe X retenu
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Translation drive system */}
      <section className="section pt-0">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center">
            <p className="eyebrow">Transmission</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">
              Entraînement des Axes X & Y
            </h2>
            <p className="mt-5 text-steel leading-[1.8] max-w-3xl mx-auto">
              La motorisation des deux axes est assurée par des moteurs NEMA 23
              (Revue 2) — originalement prévus en NEMA 17 dans le dossier de
              définition — avec transmission poulie-courroie GT2. La fixation
              du moteur sur le profilé se fait par une plaque en PVC et des
              T-nuts. Un système de tendeur maintient la courroie en tension
              pour éviter le saut de pas lors des phases d'accélération.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <ImageWithFallback
              src="/images/machine/axe-x-complete.png"
              alt="Montage complet de l'axe X avec moteur, glissière et tendeur"
              caption="Montage axe X — Moteur NEMA 23 + glissière + tendeur de courroie"
              aspectRatio="16/9"
            />
          </Reveal>

          <Reveal className="mt-10">
            <article className="glass rounded-2xl p-7">
              <p className="eyebrow">Fixation des profilés</p>
              <h3 className="mt-2 font-display font-bold text-xl">
                Solution d'Assemblage Retenue
              </h3>
              <p className="mt-4 text-steel leading-[1.8]">
                La mise en position des profilés V-slot est assurée par des
                ouvertures de logement dans les glissières. La fixation
                initialement prévue par angles en aluminium et T-nuts a été
                remplacée (Revue 2) par une solution plus directe{" "}
                <strong className="text-foreground">vis-écrou</strong> —
                simplifiant le montage et améliorant la rigidité. Des
                chambrages sont réalisés au niveau des glissières pour
                maximiser la surface de contact avec les angles en aluminium.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Axe Z — rotation detail */}
      <section className="section pt-0">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center">
            <p className="eyebrow">Solution de Rotation</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">
              Axe Z — Guidage de Précision
            </h2>
            <p className="mt-5 text-steel leading-[1.8] max-w-3xl mx-auto">
              Chaîne mécanique de l'axe de rotation : Dynamixel MX-28 → support
              imprimé 3D → accouplement 8-8 → bague aluminium → arbre 12 mm
              acier inox → palier à brides → moyeu aluminium → palier à
              semelle. L'ensemble est dimensionné selon quatre exigences
              fonctionnelles critiques.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <div className="grid lg:grid-cols-2 gap-6">
              <ImageWithFallback
                src="/images/machine/axe-z-complete.png"
                alt="Vue d'ensemble de l'axe Z de rotation"
                caption="Axe Z complet — chaîne de transmission rotative"
                aspectRatio="4/5"
              />
              <ImageWithFallback
                src="/images/machine/axe-z-section-aa.png"
                alt="Coupe A-A de l'axe Z avec annotations des exigences d1-d4"
                caption="Coupe A-A — exigences fonctionnelles d1 / d2 / d3 / d4"
                aspectRatio="4/5"
              />
            </div>
          </Reveal>

          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {D_REQUIREMENTS.map((req, i) => (
              <Reveal key={req.code} delay={i * 60}>
                <article className="glass rounded-xl p-6 h-full">
                  <div className="flex items-start gap-4">
                    <span className="font-display font-extrabold text-primary text-3xl leading-none shrink-0">
                      {req.code}
                    </span>
                    <div>
                      <p className="font-display font-semibold text-foreground">
                        {req.objective}
                      </p>
                      <p className="mt-3 text-sm text-steel leading-[1.7]">
                        {req.function}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lifting system */}
      <section className="section pt-0">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center">
            <p className="eyebrow">Système de Levage</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">
              Double Tambour à Câbles
            </h2>
            <p className="mt-5 text-steel leading-[1.8] max-w-3xl mx-auto">
              Pour la réalisation du levage, la solution à deux tambours avec
              motorisation séparée a été retenue plutôt qu'une solution
              poulie-courroie — évitant ainsi l'ajout d'un système de tension
              supplémentaire qui aurait complexifié le montage. Chaque tambour
              est rainuré à ses deux extrémités pour l'enroulement des câbles
              de levage acier.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <div className="grid lg:grid-cols-2 gap-6">
              <ImageWithFallback
                src="/images/machine/systeme-levage.png"
                alt="Vue d'ensemble du système de levage"
                caption="Système de levage — deux tambours motorisés indépendamment"
                aspectRatio="4/3"
              />
              <ImageWithFallback
                src="/images/machine/systeme-levage-coupe.png"
                alt="Coupe longitudinale du système de levage avec annotations E1-E2-e1-e3"
                caption="Coupe longitudinale — exigences E1 / E2 / e1 / e3"
                aspectRatio="4/3"
              />
            </div>
          </Reveal>

          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {E_REQUIREMENTS.map((req, i) => (
              <Reveal key={req.code} delay={i * 60}>
                <article className="glass rounded-xl p-6 h-full">
                  <div className="flex items-start gap-4">
                    <span className="font-display font-extrabold text-primary text-2xl leading-none shrink-0">
                      {req.code}
                    </span>
                    <p className="text-sm text-steel leading-[1.7]">
                      {req.function}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <p className="text-center text-sm text-steel italic">
              Note : la mise en position des pièces (11), (12) et (9) est
              assurée par une goupille fendue.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Materials table */}
      <section className="section pt-0">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center">
            <p className="eyebrow">Matériaux</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">
              Sélection Technique Complète
            </h2>
          </Reveal>

          <Reveal className="mt-10">
            <article className="glass rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <Layers size={22} className="text-primary" />
                <h3 className="font-display font-bold text-lg">
                  Matériaux par Fonction
                </h3>
              </div>
              <dl className="divide-y divide-white/5">
                {MATERIALS.map((m) => (
                  <div
                    key={m.name}
                    className="flex justify-between items-baseline gap-4 py-3"
                  >
                    <dt className="font-display font-semibold text-foreground shrink-0 max-w-[40%]">
                      {m.name}
                    </dt>
                    <dd className="font-mono text-xs uppercase tracking-[0.12em] text-steel text-right">
                      {m.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>

          <Reveal className="mt-6">
            <article className="glass rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <Cog size={22} className="text-primary" />
                <h3 className="font-display font-bold text-lg">
                  Procédés de Fabrication
                </h3>
              </div>
              <dl className="divide-y divide-white/5">
                {FABRICATION.map((f) => (
                  <div
                    key={f.machine}
                    className="grid sm:grid-cols-[200px_1fr] gap-4 py-3"
                  >
                    <dt className="font-display font-semibold text-foreground">
                      {f.machine}
                    </dt>
                    <dd className="font-mono text-xs uppercase tracking-[0.12em] text-steel sm:text-right">
                      {f.parts}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section pt-0 pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Ruler size={32} className="text-primary mx-auto opacity-70" />
            <h2 className="mt-4 text-3xl font-extrabold">
              Poursuivre la Découverte
            </h2>
            <p className="mt-4 text-steel">
              Explorer le processus complet de conception ou les spécifications
              techniques détaillées.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link to="/processus" className="btn-amber">
                Voir le Processus
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

export default LaMachinePage;