import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Background, CustomCursor } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Contexte } from "@/components/Contexte";
import { AxesProjet } from "@/components/AxesProjet";
import { NotreEquipe } from "@/components/NotreEquipe";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/**
 * ============================================================================
 * FILE: src/pages/Index.tsx
 * ============================================================================
 * PURPOSE:
 *   Home page. New condensed flow:
 *     Hero → Contexte → AxesProjet → NotreEquipe (preview) → Contact
 *   Handles hash-based scroll when users navigate to "/#contact" from other
 *   routes via the Navbar or Footer.
 * ============================================================================
 */

const Index = () => {
  const location = useLocation();

  // Set document title + description once on mount
  useEffect(() => {
    document.title = "SonicLift — Vitesse. Puissance. Élévation.";
    const meta = document.querySelector('meta[name="description"]');
    const desc =
      "SonicLift : pont roulant conçu et fabriqué par des étudiants en robotique. Précision mécanique, électronique embarquée, commande intelligente.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  // Scroll to hash anchor when present (supports "/#contact" from other pages)
  useEffect(() => {
    if (location.hash) {
      // Give the DOM a moment to paint before scrolling
      const id = location.hash.replace("#", "");
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(t);
    } else {
      // Ensure fresh visits land at the top
      window.scrollTo(0, 0);
    }
  }, [location.hash, location.pathname]);

  return (
    <>
      <Background />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Contexte />
        <AxesProjet />
        <NotreEquipe />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;
