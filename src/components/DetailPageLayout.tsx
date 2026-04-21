import { ReactNode, useEffect } from "react";
import { Background, CustomCursor } from "./Background";
import { DetailNavbar } from "./DetailNavbar";
import { Footer } from "./Footer";

/**
 * ============================================================================
 * FILE: src/components/DetailPageLayout.tsx
 * ============================================================================
 * PURPOSE:
 *   Reusable wrapper for detail pages (/la-machine, /processus,
 *   /specifications). Provides the atmospheric background, custom cursor,
 *   simplified detail navbar, and footer. Sets the document title.
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
      <DetailNavbar />
      <main className="pt-24">{children}</main>
      <Footer />
    </>
  );
};