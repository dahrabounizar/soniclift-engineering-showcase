import { useEffect, useState } from "react";

/**
 * Atmospheric background: charcoal base + drifting gradient orbs +
 * blueprint grid + noise grain. Fixed full-viewport, behind everything.
 */
export const Background = () => (
  <div className="bg-atmosphere">
    <div className="orb orb-amber" />
    <div className="orb orb-cyan" />
  </div>
);

/** Custom cursor dot + ring (desktop hover devices only) */
export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <>
      <div className="cursor-ring" style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }} />
      <div className="cursor-dot" style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }} />
    </>
  );
};
