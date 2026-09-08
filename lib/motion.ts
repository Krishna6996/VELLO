import type { CSSProperties } from "react";

/**
 * Motion tokens (design-system.md §12 item 1, desktop-extension.md "Motion").
 * The only source of durations and easing on the site. Durations in seconds.
 * Permitted: opacity, a 4 to 8px translate, border-colour, background-colour.
 */
export const duration = {
  /** Hover on buttons and cards. */
  hover: 0.16,
  fast: 0.18,
  base: 0.22,
  slow: 0.24,
} as const;

export type DurationName = keyof typeof duration;

export const calmEase = [0.2, 0, 0, 1] as const;

export const calmEaseCss = "cubic-bezier(0.2, 0, 0, 1)";

/** Milliseconds between dose dots filling in. */
export const doseStaggerMs = 40;

/**
 * CSS custom properties written onto <html> by the root layout, so Tailwind
 * utilities can read the same tokens: duration-(--motion-hover), ease-(--motion-ease).
 * app/globals.css sets every duration to 0ms under prefers-reduced-motion.
 */
export const motionCssVars = {
  "--motion-hover": `${Math.round(duration.hover * 1000)}ms`,
  "--motion-fast": `${Math.round(duration.fast * 1000)}ms`,
  "--motion-base": `${Math.round(duration.base * 1000)}ms`,
  "--motion-slow": `${Math.round(duration.slow * 1000)}ms`,
  "--motion-stagger": `${doseStaggerMs}ms`,
  "--motion-ease": calmEaseCss,
} as CSSProperties;
