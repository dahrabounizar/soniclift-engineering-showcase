import { useEffect, useRef, useState } from "react";

/**
 * ============================================================================
 * FILE: src/components/Background.tsx
 * ============================================================================
 * PURPOSE:
 *   Scroll-reactive atmospheric background for SonicLift. Renders a rotating
 *   dual-color halo ring (cyan top-left / amber bottom-right) that echoes the
 *   SonicLift logo's rim. Rotation combines an autonomous time-based spin with
 *   a scroll-linked offset, producing a cinematic "traveling through the logo"
 *   effect. The component writes two CSS custom properties (--rim-rotate and
 *   --scroll-progress) to the root background element on each animation frame.
 *
 * RESPONSIVE:
 *   - Desktop: full blur, full intensity, +90deg scroll-driven rotation
 *   - Mobile (<=767px): reduced blur, reduced intensity, +45deg scroll rotation
 *   - prefers-reduced-motion: static rim, no rAF loop, no listeners
 *
 * PERFORMANCE:
 *   - Single requestAnimationFrame loop (no scroll event listener)
 *   - Only two inline CSS variables mutated per frame
 *   - will-change: transform isolates rim to its own compositor layer
 *   - Background is pointer-events: none, aria-hidden via decorative role
 * ============================================================================
 */

/**
 * Background
 *
 * PURPOSE: Render the fixed, full-viewport atmospheric background layer stack
 *          (rim halo + drifting orbs + blueprint grid + noise grain).
 *
 * INPUTS:  None.
 * OUTPUTS: JSX.Element — fixed div positioned behind all page content.
 */
export const Background = () => {
  // Ref to the root background element; used to mutate CSS custom properties
  // imperatively on each animation frame (avoids React re-renders).
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Detect user motion preference. If reduced motion is requested, apply a
    // static rim rotation and skip the animation loop entirely.
    const reducedMotionMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionMQ.matches) {
      el.style.setProperty("--rim-rotate", "0deg");
      el.style.setProperty("--scroll-progress", "0");
      return;
    }

    // Mobile breakpoint detection. On narrow viewports we reduce the
    // scroll-driven rotation multiplier to preserve frame rate and because
    // the visual scale is smaller.
    const mobileMQ = window.matchMedia("(max-width: 767px)");

    /**
     * applyMobileClass
     * Syncs the "mobile" class on the background root with the current
     * viewport width so CSS can scope reduced blur/opacity tokens.
     *
     * INPUTS: MediaQueryListEvent | MediaQueryList — current match state.
     * OUTPUTS: void.
     */
    const applyMobileClass = (e: MediaQueryListEvent | MediaQueryList) => {
      el.classList.toggle("mobile", e.matches);
    };
    applyMobileClass(mobileMQ);
    mobileMQ.addEventListener("change", applyMobileClass);

    // rAF loop handle, kept in closure for cleanup.
    let rafId = 0;

    /**
     * tick
     * Runs on every animation frame. Computes scroll progress (0 -> 1) and
     * the combined rim rotation (autonomous time spin + scroll-linked
     * offset), then writes them as CSS custom properties on the root.
     *
     * INPUTS: None (reads window.scrollY, document.documentElement, performance).
     * OUTPUTS: void (side effect: style mutation + next rAF scheduled).
     */
    const tick = () => {
      // Scroll progress as a normalized 0..1 fraction of total scrollable height.
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollable))
          : 0;

      // Autonomous slow spin: one full rotation per 60 seconds. Uses
      // performance.now() so the spin is continuous across frame drops.
      const timeSpin = (performance.now() / 60000) * 360;

      // Scroll-linked rotation offset. Desktop: 90deg over full page scroll.
      // Mobile: 45deg to reduce visual churn and compositor work.
      const scrollMultiplier = mobileMQ.matches ? 45 : 90;
      const scrollOffset = progress * scrollMultiplier;

      const rimRotate = timeSpin + scrollOffset;

      // Imperative style write — cheap, compositor-only property.
      el.style.setProperty("--rim-rotate", `${rimRotate}deg`);
      el.style.setProperty("--scroll-progress", progress.toFixed(4));

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // Cleanup: cancel the pending frame and remove the media query listener.
    return () => {
      cancelAnimationFrame(rafId);
      mobileMQ.removeEventListener("change", applyMobileClass);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="bg-atmosphere"
      aria-hidden="true"
      role="presentation"
    >
      {/* Rotating dual-color halo ring — echoes the SonicLift logo rim. */}
      <div className="rim-halo" />
      {/* Pre-existing drifting gradient orbs. */}
      <div className="orb orb-amber" />
      <div className="orb orb-cyan" />
    </div>
  );
};

/**
 * CustomCursor
 *
 * PURPOSE: Render a custom cursor (dot + ring) that follows the pointer on
 *          devices with fine pointer support (desktop). Mobile devices skip
 *          this entirely since hover/fine pointer media query fails.
 *
 * INPUTS:  None.
 * OUTPUTS: JSX.Fragment with two fixed positioned elements, or null.
 */
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
      <div
        className="cursor-ring"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }}
      />
      <div
        className="cursor-dot"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }}
      />
    </>
  );
};
