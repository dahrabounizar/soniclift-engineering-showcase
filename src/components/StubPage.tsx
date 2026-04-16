import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Background, CustomCursor } from "@/components/Background";
import { Navbar } from "@/components/Navbar";

export const StubPage = ({ title }: { title: string }) => {
  return (
    <>
      <Background />
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow">SonicLift</p>
        <h1 className="mt-4 text-5xl md:text-6xl font-extrabold">{title}</h1>
        <p className="mt-6 text-steel max-w-md">
          Page en construction. Le contenu détaillé sera bientôt disponible.
        </p>
        <Link to="/" className="btn-outline-amber mt-10">
          <ArrowLeft size={16} /> Retour à l'Accueil
        </Link>
      </main>
    </>
  );
};
