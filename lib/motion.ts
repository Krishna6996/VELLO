import { useSyncExternalStore } from "react";

/**
 * Motion tokens (design-system.md §12 item 1, desktop-extension.md "Motion").
 * Durations are in seconds. Only opacity and a 4 to 8px translate move.
 */
export const duration = {
  fast: 0.18,
  base: 0.22,
  slow: 0.24,
} as const;

export type DurationName = keyof typeof duration;

export const calmEase = [0.2, 0, 0, 1] as const;

export const calmEaseCss = "cubic-bezier(0.2, 0, 0, 1)";

export interface CalmMotion {
  /** True when the user has asked the OS for reduced motion. */
  reduced: boolean;
  /** Seconds. All zero when reduced. */
  duration: Record<DurationName, number>;
  ease: typeof calmEase;
  /** A ready CSS transition value, e.g. `opacity 220ms cubic-bezier(0.2, 0, 0, 1)`. */
  transition: (property: string, name?: DurationName) => string;
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(REDUCED_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(REDUCED_QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

const instant: Record<DurationName, number> = { fast: 0, base: 0, slow: 0 };

export function useCalmMotion(): CalmMotion {
  const reduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const active = reduced ? instant : duration;

  return {
    reduced,
    duration: active,
    ease: calmEase,
    transition: (property, name = "base") =>
      `${property} ${Math.round(active[name] * 1000)}ms ${calmEaseCss}`,
  };
}
