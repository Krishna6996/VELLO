"use client";

import type { ReactNode } from "react";
import { calmEaseCss } from "@/lib/motion";
import { useCalmMotion } from "@/lib/use-calm-motion";

interface FadeSwapProps {
  /** When this changes, the content fades in once. */
  watch: string | number;
  children: ReactNode;
  className?: string;
  /** Numbers and marks don't translate; keep them out of the pseudo-locale. */
  skipPseudo?: boolean;
}

/** Opacity only, 180ms, on the text that changed and nothing else. */
export function FadeSwap({ watch, children, className, skipPseudo }: FadeSwapProps) {
  const { reduced, duration } = useCalmMotion();
  return (
    <span
      key={String(watch)}
      className={className}
      data-pseudo-skip={skipPseudo || undefined}
      style={{
        display: "block",
        animation: reduced
          ? "none"
          : `fade-in ${Math.round(duration.fast * 1000)}ms ${calmEaseCss}`,
      }}
    >
      {children}
    </span>
  );
}
