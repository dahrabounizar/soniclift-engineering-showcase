import { useState } from "react";
import { ImageOff } from "lucide-react";

/**
 * ============================================================================
 * FILE: src/components/ImageWithFallback.tsx
 * ============================================================================
 * PURPOSE:
 *   Reusable image component with graceful error fallback. When the image
 *   source fails to load (404, not yet uploaded, network issue), renders a
 *   dark glass placeholder with an "image unavailable" icon and caption.
 *   Used throughout the SonicLift site so sections render cleanly even
 *   before real image assets are uploaded to /public/images/.
 *
 * USAGE:
 *   <ImageWithFallback
 *     src="/images/machine/kinematic-diagram.png"
 *     alt="Schéma cinématique"
 *     caption="Figure 1 — Schéma cinématique 4 DDL"
 *     aspectRatio="16/10"
 *   />
 * ============================================================================
 */

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspectRatio?: string;
  objectFit?: "contain" | "cover";
}

/**
 * ImageWithFallback
 *
 * Renders an image with a graceful fallback state. Uses onError to detect
 * load failures and swap to a styled placeholder. Wraps in <figure> with
 * optional <figcaption> for semantic HTML.
 *
 * INPUTS:
 *   - src: image URL (absolute or public-rooted like "/images/...")
 *   - alt: required accessible alt text
 *   - caption: optional visible text below the image
 *   - className: optional additional classes on the outer <figure>
 *   - aspectRatio: CSS aspect-ratio string (default "16/10")
 *   - objectFit: "contain" preserves full image, "cover" fills (default contain)
 *
 * OUTPUTS: JSX.Element — a figure containing img or fallback placeholder.
 */
export const ImageWithFallback = ({
  src,
  alt,
  caption,
  className = "",
  aspectRatio = "16/10",
  objectFit = "contain",
}: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`w-full ${className}`}>
      <div
        className="glass rounded-xl overflow-hidden relative"
        style={{ aspectRatio }}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className="w-full h-full"
            style={{ objectFit }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
            <ImageOff size={36} className="text-steel/50" />
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-steel/70">
              Image à venir
            </p>
            <p className="text-xs text-steel/50 max-w-xs">{alt}</p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-[0.7rem] uppercase tracking-[0.15em] text-steel/80">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};