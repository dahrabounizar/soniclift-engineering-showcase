import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Move,
  MoveHorizontal,
  RotateCw,
  ArrowUpDown,
  Radar,
  type LucideIcon,
} from "lucide-react";
import { DetailPageLayout } from "@/components/DetailPageLayout";
import { Reveal } from "@/components/Reveal";
import { ImageWithFallback } from "@/components/ImageWithFallback";

/**
 * ============================================================================
 * FILE: src/pages/LaMachinePage.tsx
 * ============================================================================
 * PURPOSE:
 *   Tabbed detail page for the mechanical architecture. Five tabs cover the
 *   physical sub-systems of SonicLift — Axe X, Axe Y, Axe Z (rotation),
 *   Système de Levage (double drum), and Détection (limit switches + IMU +
 *   emergency stop). Tab state is synchronized with the URL via
 *   useSearchParams so deep links like /la-machine?tab=axe-z work.
 *
 *   Content is entirely rewritten (per user request) relative to the
 *   previous monolithic layout. Each tab renders its own panel sub-component.
 * ============================================================================
 */

interface Tab {
  id: string;
  label: string;
  sublabel: string;
  icon: LucideIcon;
}

const TABS: Tab[] = [
  { id: "axe-x", label: "Axe X", sublabel: "Translation longitudinale", icon: Move },
  { id: "axe-y", label: "Axe Y", sublabel: "Translation transversale", icon: MoveHorizontal },
  { id: "axe-z", label: "Axe Z", sublabel: "Rotation de charge", icon: RotateCw },
  { id: "levage", label: "Système de Levage", sublabel: "Double tambour à câbles", icon: ArrowUpDown },
  { id: "detection", label: "Détection", sublabel: "Capteurs & sécurité", icon: Radar },
];

const DEFAULT_TAB = "axe-x";

/**
 * StatBadge
 *
 * Small key/value card used to highlight 3 quick facts at the top of every
 * tab panel (e.g. "Course 1200 mm").
 *
 * INPUTS:
 *   - label: string — the caption above the value
 *   - value: string — the headline figure or short string
 */
const StatBadge = ({ label, value }: { label: string; value: string }) => (
  <div className="text-center p-5 rounded-xl bg-primary/5 border border-primary/20">
    <p className="font-display font-extrabold text-primary text-2xl md:text-3xl">
      {value}
    </p>
    <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-steel">
      {label}
    </p>
  </div>
);

/**
 * RequirementCard
 *
 * Functional-requirement card (e.g. d1–d4 for the rotation axis, E1/E2/e1/e3
 * for the lifting system). Shows a code badge on the left and a description
 * block on the right.
 */
const RequirementCard = ({ code, title, body }: { code: string; title: string; body: string }) => (
  <article className="glass rounded-xl p-6 h-full">
    <div className="flex items-start gap-4">
      <span className="font-display font-extrabold text-primary text-3xl leading-none shrink-0">
        {code}
      </span>
      <div>
        <p className="font-display font-semibold text-foreground">{title}</p>
        <p className="mt-3 text-sm text-steel leading-[1.7]">{body}</p>
      </div>
    </div>
  </article>
);

/**
 * BulletList
 *
 * Simple ul renderer for component lists. Extracted for readability.
 */
const BulletList = ({ items }: { items: string[] }) => (
  <ul className="mt-5 space-y-2.5">
    {items.map((it) => (
      <li
        key={it}
        className="flex items-start gap-3 text-sm text-steel leading-[1.7]"
      >
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

/* ========================================================================
 * TAB PANELS
 * ========================================================================
 */

/** AxeXPanel — content for the "Axe X" tab (longitudinal translation). */
const AxeXPanel = () => (
  <div className="space-y-12">
    <Reveal>
      <p className="eyebrow">Axe X — Déplacement Longitudinal</p>
      <h2 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
        Translation du Portique
      </h2>
      <p className="mt-6 text-steel leading-[1.8] max-w-4xl">
        L'ensemble du portique se déplace le long de deux rails horizontaux
        grâce à deux moteurs synchronisés, l'un assurant la marche avant et
        l'autre la marche arrière. Le choix d'une configuration bipoutre a été
        dicté par les contraintes mécaniques maximales relevées sur cet axe,
        qui supporte la charge totale du chariot et du système de levage.
      </p>
    </Reveal>

    <Reveal>
      <div className="grid sm:grid-cols-3 gap-4">
        <StatBadge label="Course" value="1200 mm" />
        <StatBadge label="Motorisation" value="2× NEMA 17" />
        <StatBadge label="Configuration" value="Bipoutre" />
      </div>
    </Reveal>

    <Reveal>
      <article className="glass rounded-2xl p-7">
        <h3 className="font-display font-bold text-xl">
          Validation Structurelle par FEA
        </h3>
        <p className="mt-4 text-steel leading-[1.8]">
          Plusieurs configurations ont été testées sous un effort majoré de
          30 kg (≈ 300 N) via l'analyse par éléments finis SolidWorks. La
          configuration bipoutre retenue offre la meilleure rigidité avec une
          déflexion maximale de{" "}
          <strong className="text-foreground">0,3 mm</strong> — résultat qui
          valide le choix de doubler le profilé pour l'axe X uniquement.
        </p>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <StatBadge label="Charge test (majorée)" value="300 N" />
          <StatBadge label="Déflexion max validée" value="0,3 mm" />
          <StatBadge label="Moment d'inertie" value="1,07×10⁻⁷ m⁴" />
        </div>
      </article>
    </Reveal>

    <Reveal>
      <article className="glass rounded-2xl p-7">
        <h3 className="font-display font-bold text-xl">
          Transmission Poulie-Courroie
        </h3>
        <p className="mt-4 text-steel leading-[1.8]">
          La mise en mouvement du portique est assurée par une transmission
          poulie-courroie GT2 avec un rayon effectif de poulie de 15 mm. Des
          tendeurs réglables maintiennent la courroie en tension permanente
          afin d'éviter tout saut de pas lors des phases d'accélération. Les
          deux moteurs pas à pas NEMA 17 sont pilotés par des drivers DM542
          configurables en microstepping pour un positionnement fluide.
        </p>
        <BulletList
          items={[
            "Moteurs NEMA 17 pas à pas (2 unités synchronisées)",
            "Drivers DM542 configurables en microstepping",
            "Transmission poulie-courroie GT2 (rayon effectif 15 mm)",
            "Tendeurs de courroie réglables anti-saut de pas",
            "Glissières HPL8 avec galets V-slot",
            "Fixation vis-écrou directe (solution retenue en Revue 2)",
          ]}
        />
      </article>
    </Reveal>

    <Reveal>
      <ImageWithFallback
        src="/images/machine/axe-x-complete.png"
        alt="Montage complet de l'axe X avec moteur, glissière et tendeur"
        caption="Figure — Montage axe X : moteur NEMA 17, glissière HPL8 et tendeur de courroie"
        aspectRatio="16/9"
      />
    </Reveal>
  </div>
);

/** AxeYPanel — content for the "Axe Y" tab (transverse translation). */
const AxeYPanel = () => (
  <div className="space-y-12">
    <Reveal>
      <p className="eyebrow">Axe Y — Déplacement Transversal</p>
      <h2 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
        Translation du Chariot
      </h2>
      <p className="mt-6 text-steel leading-[1.8] max-w-4xl">
        Le chariot transversal se déplace gauche-droite sur la poutre
        principale. Contrairement à l'axe X, une configuration monopoutre a
        été retenue : les contraintes mécaniques sur cet axe sont suffisamment
        réduites pour qu'un profilé unique assure la rigidité nécessaire, tout
        en allégeant la structure globale.
      </p>
    </Reveal>

    <Reveal>
      <div className="grid sm:grid-cols-3 gap-4">
        <StatBadge label="Course" value="800 mm" />
        <StatBadge label="Motorisation" value="1× NEMA 17" />
        <StatBadge label="Configuration" value="Monopoutre" />
      </div>
    </Reveal>

    <Reveal>
      <article className="glass rounded-2xl p-7">
        <h3 className="font-display font-bold text-xl">
          Chariot Transversal
        </h3>
        <p className="mt-4 text-steel leading-[1.8]">
          Le chariot embarque le système de levage complet (moteurs de levage
          + tambours + axe de rotation). Il se déplace sur des galets V-slot
          solidaires de la poutre principale. La fixation de la courroie
          motrice sur le chariot est assurée par serrage via une plaque
          intermédiaire en PVC, qui permet un démontage rapide pour la
          maintenance.
        </p>
        <BulletList
          items={[
            "Moteur NEMA 17 unique avec driver DM542",
            "Transmission poulie-courroie GT2",
            "Plaque intermédiaire PVC pour fixation courroie",
            "Galets V-slot guidant le chariot",
            "Fins de course aux extrémités pour référencement absolu",
          ]}
        />
      </article>
    </Reveal>

    <Reveal>
      <article className="glass rounded-2xl p-7">
        <h3 className="font-display font-bold text-xl">
          Justification du Monopoutre
        </h3>
        <p className="mt-4 text-steel leading-[1.8]">
          Les calculs RDM montrent que le moment fléchissant maximal sur l'axe
          Y, rapporté à la charge embarquée et à la portée, reste
          largement en deçà de la limite d'écoulement du profilé V-slot
          aluminium 6061. Le monopoutre est donc suffisant — doubler le
          profilé n'apporterait aucun gain fonctionnel et alourdirait
          inutilement l'ensemble mobile, pénalisant la dynamique.
        </p>
      </article>
    </Reveal>

    <Reveal>
      <ImageWithFallback
        src="/images/machine/axe-y-complete.png"
        alt="Montage de l'axe Y avec chariot et fixation de courroie"
        caption="Figure — Chariot transversal et fixation intermédiaire de courroie"
        aspectRatio="16/9"
      />
    </Reveal>
  </div>
);

/** AxeZPanel — content for the "Axe Z" tab (load rotation axis). */
const AxeZPanel = () => {
  const D_REQUIREMENTS = [
    {
      code: "d1",
      title: "Transmission du couple moteur",
      body:
        "Accoupler l'arbre du Dynamixel MX-28 à l'arbre rotatif via un accouplement rigide 8-8 mm. Garantit la transmission intégrale du couple sans glissement.",
    },
    {
      code: "d2",
      title: "Centrage du moteur",
      body:
        "Aligner parfaitement l'axe du moteur avec l'arbre rotatif via une bague aluminium usinée au tour. Ce centrage élimine toute vibration parasite en rotation.",
    },
    {
      code: "d3",
      title: "Guidage efficace en rotation",
      body:
        "Centrage long optimisé : la longueur de la zone de contact est calculée pour minimiser le basculement et garantir une trajectoire de rotation parfaitement régulière.",
    },
    {
      code: "d4",
      title: "Non-interférence avec l'axe X",
      body:
        "Définir la longueur optimale de l'arbre rotatif pour que le système de levage ne touche jamais l'axe X, quelle que soit la position angulaire.",
    },
  ];

  return (
    <div className="space-y-12">
      <Reveal>
        <p className="eyebrow">Axe Z — Rotation de la Charge</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
          Axe de Rotation de Précision
        </h2>
        <p className="mt-6 text-steel leading-[1.8] max-w-4xl">
          L'axe de rotation permet d'orienter la charge indépendamment des
          déplacements translatifs. Sa chaîne cinématique intègre un
          servomoteur Dynamixel, un accouplement rigide, un arbre en acier
          inoxydable guidé par deux paliers, et un moyeu d'entraînement. Le
          dimensionnement suit quatre exigences fonctionnelles critiques.
        </p>
      </Reveal>

      <Reveal>
        <div className="grid sm:grid-cols-3 gap-4">
          <StatBadge label="Servomoteur" value="Dynamixel MX-28T" />
          <StatBadge label="Couple requis" value="≈ 1,67 N·m" />
          <StatBadge label="Vitesse cible" value="6,28 rad/s" />
        </div>
      </Reveal>

      <Reveal>
        <article className="glass rounded-2xl p-7">
          <h3 className="font-display font-bold text-xl">
            Chaîne Mécanique Complète
          </h3>
          <p className="mt-4 text-steel leading-[1.8]">
            De l'actionneur à la charge, la chaîne mécanique enchaîne huit
            éléments dimensionnés pour garantir précision, robustesse et
            absence de jeu en rotation.
          </p>
          <BulletList
            items={[
              "Dynamixel MX-28T — servomoteur à commande angulaire précise",
              "Support MX-28 en thermoplastique imprimé 3D",
              "Accouplement rigide 8-8 mm",
              "Bague aluminium usinée au tour",
              "Arbre acier inoxydable Ø 12 mm",
              "Palier à brides (fixation supérieure)",
              "Moyeu aluminium d'entraînement",
              "Palier à semelle (fixation inférieure)",
            ]}
          />
        </article>
      </Reveal>

      <Reveal>
        <h3 className="font-display font-bold text-xl text-center">
          Exigences Fonctionnelles d1 — d4
        </h3>
        <div className="mt-6 grid sm:grid-cols-2 gap-5">
          {D_REQUIREMENTS.map((r) => (
            <RequirementCard key={r.code} code={r.code} title={r.title} body={r.body} />
          ))}
        </div>
      </Reveal>

      <Reveal>
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
    </div>
  );
};

/** LevagePanel — content for the "Système de Levage" tab. */
const LevagePanel = () => {
  const E_REQUIREMENTS = [
    {
      code: "E1",
      title: "Préserver le centrage long",
      body:
        "Distance de sécurité entre l'axe moteur et la pièce (13). Garantit la qualité du guidage en rotation sur toute la course verticale.",
    },
    {
      code: "E2",
      title: "Maintenir l'arbre dans son logement",
      body:
        "Empêcher que l'arbre (11) ne quitte son logement sous les contraintes dynamiques induites par le levage et l'accélération.",
    },
    {
      code: "e1",
      title: "Centrage moteur-pièce",
      body:
        "Centrage rigoureux du moteur avec la pièce (14). Condition fondamentale pour éviter vibrations et usure prématurée.",
    },
    {
      code: "e3",
      title: "Distance selon longueur de tambour",
      body:
        "Paramètre à prendre en compte selon la longueur du tambour — influence directe sur la cinématique et l'encombrement global du système.",
    },
  ];

  return (
    <div className="space-y-12">
      <Reveal>
        <p className="eyebrow">Système de Levage</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
          Double Tambour à Câbles
        </h2>
        <p className="mt-6 text-steel leading-[1.8] max-w-4xl">
          Pour le levage de la charge, nous avons retenu une solution à deux
          tambours avec motorisations séparées plutôt qu'une transmission
          poulie-courroie. Ce choix évite l'ajout d'un système de tension
          supplémentaire et simplifie le montage — chaque tambour est rainuré
          à ses deux extrémités pour l'enroulement propre de deux câbles
          acier.
        </p>
      </Reveal>

      <Reveal>
        <div className="grid sm:grid-cols-3 gap-4">
          <StatBadge label="Course" value="1000 mm" />
          <StatBadge label="Motorisation" value="2× NEMA 17" />
          <StatBadge label="Coefficient sécurité" value="5" />
        </div>
      </Reveal>

      <Reveal>
        <article className="glass rounded-2xl p-7">
          <h3 className="font-display font-bold text-xl">
            Calcul du Couple Requis
          </h3>
          <p className="mt-4 text-steel leading-[1.8]">
            Le couple total requis pour le levage atteint{" "}
            <strong className="text-foreground">2,92 N·m</strong> — soit{" "}
            <strong className="text-foreground">1,46 N·m par moteur</strong>{" "}
            (répartition équilibrée sur les deux tambours), en tenant compte
            d'un rendement de transmission{" "}
            <strong className="text-foreground">η ≈ 0,85</strong>. Cette
            répartition permet de rester dans la plage nominale des NEMA 17,
            avec une marge de sécurité pour les phases d'accélération.
          </p>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <StatBadge label="Couple total levage" value="2,92 N·m" />
            <StatBadge label="Couple par moteur" value="1,46 N·m" />
            <StatBadge label="Rendement" value="η ≈ 0,85" />
          </div>
        </article>
      </Reveal>

      <Reveal>
        <article className="glass rounded-2xl p-7">
          <h3 className="font-display font-bold text-xl">
            Câbles Acier de Levage
          </h3>
          <p className="mt-4 text-steel leading-[1.8]">
            Quatre câbles acier assurent le lien entre les tambours et la
            charge. Leur dimensionnement respecte un coefficient de sécurité
            de 5 conformément aux pratiques industrielles pour les systèmes
            de levage.
          </p>
          <BulletList
            items={[
              "Diamètre minimum théorique : 0,61 mm",
              "Coefficient de sécurité : 5 (norme industrielle)",
              "Allongement élastique : ≈ 0,5 mm/m",
              "Matériau : acier haute résistance",
              "Enroulement : rainurage du tambour pour spires régulières",
            ]}
          />
        </article>
      </Reveal>

      <Reveal>
        <h3 className="font-display font-bold text-xl text-center">
          Exigences Fonctionnelles E1 / E2 / e1 / e3
        </h3>
        <div className="mt-6 grid sm:grid-cols-2 gap-5">
          {E_REQUIREMENTS.map((r) => (
            <RequirementCard key={r.code} code={r.code} title={r.title} body={r.body} />
          ))}
        </div>
      </Reveal>

      <Reveal>
        <ImageWithFallback
          src="/images/machine/levage-complete.png"
          alt="Système de levage complet avec double tambour et câbles acier"
          caption="Figure — Système de levage double tambour avec câbles acier rainurés"
          aspectRatio="16/10"
        />
      </Reveal>
    </div>
  );
};

/** DetectionPanel — content for the "Détection" tab (mechanical sensing). */
const DetectionPanel = () => (
  <div className="space-y-12">
    <Reveal>
      <p className="eyebrow">Détection Mécanique</p>
      <h2 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
        Capteurs & Sécurité Physique
      </h2>
      <p className="mt-6 text-steel leading-[1.8] max-w-4xl">
        La détection mécanique assure le référencement absolu des axes, le
        contrôle d'assiette de la charge, et la sécurité physique du système.
        Elle agit en complément de la perception par IA (traitée dans le
        Processus) par une redondance matérielle indépendante du logiciel.
      </p>
    </Reveal>

    <Reveal>
      <div className="grid sm:grid-cols-3 gap-4">
        <StatBadge label="Fins de course" value="7 capteurs" />
        <StatBadge label="Inertiel" value="Accéléro + Gyro" />
        <StatBadge label="Sécurité" value="Arrêt d'urgence" />
      </div>
    </Reveal>

    <Reveal>
      <article className="glass rounded-2xl p-7">
        <h3 className="font-display font-bold text-xl">
          Fins de Course (Référencement)
        </h3>
        <p className="mt-4 text-steel leading-[1.8]">
          Sept interrupteurs fins de course sont répartis sur les axes X, Y et
          Z. Leur double rôle : servir de référence absolue pour la procédure
          de homing au démarrage, et constituer une butée électrique dure
          empêchant tout dépassement de course même en cas de dérive logicielle.
        </p>
        <BulletList
          items={[
            "2 fins de course sur l'axe X (butées min / max)",
            "2 fins de course sur l'axe Y (butées min / max)",
            "2 fins de course sur l'axe Z (sécurité haut / bas)",
            "1 fin de course réserve pour diagnostic",
            "Câblage normalement fermé (détection de rupture de fil)",
          ]}
        />
      </article>
    </Reveal>

    <Reveal>
      <article className="glass rounded-2xl p-7">
        <h3 className="font-display font-bold text-xl">
          Capteurs Inertiels (Anti-Ballant)
        </h3>
        <p className="mt-4 text-steel leading-[1.8]">
          Un accéléromètre et un gyroscope embarqués sur la charge mesurent
          en permanence l'angle de ballant{" "}
          <strong className="text-foreground">θ</strong> et sa vitesse{" "}
          <strong className="text-foreground">θ̇</strong>. Ces mesures
          alimentent le contrôleur Input Shaping ZVD — clef de la réduction
          des oscillations (θmax divisé par 3,9 et RMS divisé par 3,7 selon la
          validation expérimentale).
        </p>
        <BulletList
          items={[
            "Accéléromètre 3 axes — mesure de l'inclinaison statique",
            "Gyroscope 3 axes — mesure de la vitesse angulaire",
            "Fusion de données pour reconstruire θ et θ̇",
            "Entrée directe du contrôleur Input Shaping ZVD",
            "Communication temps réel avec l'Arduino Mega",
          ]}
        />
      </article>
    </Reveal>

    <Reveal>
      <article className="glass rounded-2xl p-7">
        <h3 className="font-display font-bold text-xl">
          Arrêt d'Urgence Physique
        </h3>
        <p className="mt-4 text-steel leading-[1.8]">
          Un bouton coup-de-poing est inséré sur la ligne d'alimentation
          principale 12 V. Pressé, il coupe instantanément toute puissance
          vers les moteurs — indépendamment du logiciel. Le réarmement est
          manuel : impossible à déclencher à distance, conforme aux normes
          HSE Sonasid applicables aux systèmes de levage.
        </p>
        <BulletList
          items={[
            "Bouton coup-de-poing rouge, accès direct opérateur",
            "Coupure matérielle de la ligne 12 V principale",
            "Réarmement manuel obligatoire",
            "Indépendant de l'état du logiciel ou de l'Arduino",
            "Conforme aux exigences HSE Sonasid",
          ]}
        />
      </article>
    </Reveal>

    <Reveal>
      <ImageWithFallback
        src="/images/machine/detection-schema.png"
        alt="Schéma de câblage des capteurs et de l'arrêt d'urgence"
        caption="Figure — Schéma d'implantation des capteurs mécaniques et circuit d'arrêt d'urgence"
        aspectRatio="16/10"
      />
    </Reveal>
  </div>
);

/* ========================================================================
 * MAIN PAGE COMPONENT
 * ========================================================================
 */

/**
 * renderPanel
 *
 * Selects the correct panel component for the active tab id. Keeping this
 * as a plain function (not an object literal) makes it trivial to add new
 * tabs later — just add a new case.
 */
const renderPanel = (tabId: string) => {
  switch (tabId) {
    case "axe-x":
      return <AxeXPanel />;
    case "axe-y":
      return <AxeYPanel />;
    case "axe-z":
      return <AxeZPanel />;
    case "levage":
      return <LevagePanel />;
    case "detection":
      return <DetectionPanel />;
    default:
      return <AxeXPanel />;
  }
};

const LaMachinePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTab = searchParams.get("tab");
  const initialTab =
    urlTab && TABS.some((t) => t.id === urlTab) ? urlTab : DEFAULT_TAB;
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Keep URL in sync when tab changes (no history stacking on every click)
  useEffect(() => {
    const current = searchParams.get("tab");
    if (current !== activeTab) {
      setSearchParams({ tab: activeTab }, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    // Scroll to just below the tab bar so the user sees panel content
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  return (
    <DetailPageLayout title="La Machine">
      {/* Hero band */}
      <section className="section pt-16 pb-8">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <p className="eyebrow">La Machine — Architecture Mécatronique</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
              Cinq Sous-Systèmes, Une Machine
            </h1>
            <p className="mt-6 text-steel text-lg leading-[1.8] max-w-3xl mx-auto">
              Explorez chaque sous-système mécanique du pont roulant : les
              trois axes de translation et de rotation, le système de levage
              à double tambour, et la détection mécanique qui garantit
              précision et sécurité.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sticky tab bar */}
      <div
        className="sticky top-20 z-40"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto md:overflow-visible md:justify-center scrollbar-hide">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`shrink-0 flex items-center gap-3 px-4 md:px-5 py-3 rounded-xl border transition-all ${
                    isActive
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-transparent border-transparent text-steel hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  <Icon size={18} />
                  <div className="flex flex-col items-start leading-tight">
                    <span className="font-display font-semibold text-sm whitespace-nowrap">
                      {tab.label}
                    </span>
                    <span className="hidden md:block font-mono text-[0.6rem] uppercase tracking-[0.12em] opacity-70 whitespace-nowrap">
                      {tab.sublabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active panel */}
      <section className="section pt-10">
        <div className="max-w-6xl mx-auto">
          {/* key={activeTab} retriggers Reveal fade-ups on each tab switch */}
          <div key={activeTab}>{renderPanel(activeTab)}</div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section pt-0 pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl font-extrabold">
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