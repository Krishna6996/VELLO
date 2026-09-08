import type { HTMLAttributes } from "react";
import { cx } from "@/lib/cx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 1.5px Primary edge, drawn without moving the layout. */
  selected?: boolean;
  /** Hero and feature cards: 18px radius and larger padding. */
  hero?: boolean;
}

/** Ring drawn as a pseudo-element so a 1.5px edge never shifts neighbours. */
export const selectedEdge =
  "relative after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border-[1.5px] after:border-primary";

export function Card({ selected = false, hero = false, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cx(
        "border bg-surface",
        hero ? "rounded-hero p-6 md:p-8" : "rounded-card p-4 md:p-5",
        selected ? cx("border-primary", selectedEdge) : "border-hairline",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
