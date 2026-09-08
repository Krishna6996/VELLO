"use client";

import type { ReactNode } from "react";
import { calmEaseCss, useCalmMotion } from "@/lib/motion";

interface FadeSwapProps {
  /** When this changes, the content fades in once. */
  watch: string | number;
  children: ReactNode;
  className?: string;
}

/** Opacity only, 180ms, on the text that changed and nothing else. */
export function FadeSwap({ watch, children, className }: FadeSwapProps) {
  const { reduced, duration } = useCalmMotion();
  return (
    <span
      key={String(watch)}
      className={className}
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
