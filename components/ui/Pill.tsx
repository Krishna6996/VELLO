import type { HTMLAttributes } from "react";
import { cx } from "@/lib/cx";

type PillProps = HTMLAttributes<HTMLSpanElement>;

/** Sage capsule, 12px/600. Used for the ℞ mark, tags and quiet status labels. */
export function Pill({ className, children, ...rest }: PillProps) {
  return (
    <span
      className={cx(
        "inline-flex min-h-6 items-center rounded-pill bg-sage px-2.5 text-legal font-semibold text-primary",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
