import { Reveal } from "./Reveal";

/**
 * ============================================================================
 * FILE: src/components/Contexte.tsx
 * ============================================================================
 * PURPOSE:
 *   Short contextual section placed just after the Hero on the home page.
 *   Frames the SonicLift project — the UM6P × EMINES × Sonasid partnership,
 *   the industrial problem being addressed, and the student-driven ambition.
 *   Deliberately concise (2-3 paragraphs) to keep the home page short.
 * ============================================================================
 */

/**
 * Contexte
 *
 * Presents the project's origin and purpose in French prose. No CTA — the
 * section flows directly into the "Axes du Projet" section below it.
 *
 * INPUTS:  None.
 * OUTPUTS: JSX.Element — the <section id="contexte"> element.
 */
export const Contexte = () => {
  return (
    <section id="contexte" className="section pt-16 md:pt-20">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center">
          <p className="eyebrow">Contexte</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Un Pont Roulant Repensé
          </h2>
        </Reveal>

        <Reveal className="mt-8">
          <div className="space-y-6 text-steel text-lg leading-[1.85] text-left md:text-center">
            <p>
              SonicLift est né d'un partenariat entre l'
              <strong className="text-foreground">UM6P</strong>, l'
              <strong className="text-foreground">EMINES — School of Industrial Management</strong>{" "}
              et <strong className="text-foreground">Sonasid</strong>, leader marocain de
              l'acier. L'objectif : concevoir et fabriquer un pont roulant
              intelligent à échelle réduite, capable de manipuler des fardeaux
              métallurgiques en toute autonomie.
            </p>
            <p>
              Dans l'industrie sidérurgique, la manutention des charges lourdes
              est à la fois répétitive, dangereuse et sensible aux erreurs. Notre
              prototype répond à ce défi par trois leviers technologiques
              convergents : une mécanique rigoureuse validée par éléments finis,
              une perception par intelligence artificielle temps réel, et une
              commande automatique sophistiquée intégrant anti-ballant et
              évitement d'obstacles.
            </p>
            <p>
              Ce projet est porté de bout en bout par une équipe de{" "}
              <strong className="text-foreground">14 étudiants ingénieurs</strong> en
              robotique — de l'analyse fonctionnelle SysML jusqu'à la
              génération de trajectoire A*, en passant par le dimensionnement
              RDM, la fabrication multi-procédés et la validation
              expérimentale.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
