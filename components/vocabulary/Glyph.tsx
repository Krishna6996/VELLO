import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

interface GlyphProps {
  children: ReactNode;
  viewBox?: string;
  className?: string;
}

/**
 * Frame for every drawing: single 1.5px Primary stroke, geometric, flat.
 * Scales with its container. Decorative on its own; the text beside it carries meaning.
 */
export function Glyph({ children, viewBox = "0 0 24 24", className }: GlyphProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      width="100%"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("block stroke-primary", className)}
    >
      {children}
    </svg>
  );
}

/** 44px sage well with a 12px radius, holding a 24px glyph. */
export function IconWell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "flex size-11 shrink-0 items-center justify-center rounded-well bg-sage",
        className,
      )}
    >
      <span className="block size-6">{children}</span>
    </span>
  );
}
