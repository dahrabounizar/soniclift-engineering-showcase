import { ReactNode, useEffect } from "react";
import { Background, CustomCursor } from "./Background";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/**
 * ============================================================================
 * FILE: src/components/DetailPageLayout.tsx
 * ============================================================================
 * PURPOSE:
 *   Reusable wrapper for detail pages (/la-machine, /processus,
 *   /specifications, /notre-equipe). Provides the atmospheric background,
 *   custom cursor, unified main Navbar (same as the home page), and footer.
 *   Sets the document title and resets scroll position on mount.
 * ============================================================================
 */

interface DetailPageLayoutProps {
  title: string;
  children: ReactNode;
}

export const DetailPageLayout = ({ title, children }: DetailPageLayoutProps) => {
  useEffect(() => {
    document.title = `${title} — SonicLift`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <>
      <Background />
      <CustomCursor />
      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
    </>
  );
};