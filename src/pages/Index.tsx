import { useEffect } from "react";
import { Background, CustomCursor } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LaMachine } from "@/components/LaMachine";
import { NotreEquipe } from "@/components/NotreEquipe";
import { Processus } from "@/components/Processus";
import { Specifications } from "@/components/Specifications";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "SonicLift — Vitesse. Puissance. Élévation.";
    const meta = document.querySelector('meta[name="description"]');
    const desc = "SonicLift : pont roulant conçu et fabriqué par des étudiants en robotique. Précision mécanique, électronique embarquée, commande intelligente.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <>
      <Background />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <LaMachine />
        <NotreEquipe />
        <Processus />
        <Specifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;
