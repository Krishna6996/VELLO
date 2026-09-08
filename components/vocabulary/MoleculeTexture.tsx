"use client";

import { useId } from "react";
import { cx } from "@/lib/cx";

/** Pointy-top hexagon of circumradius 10 centred at (x, y). */
function hexagon(x: number, y: number): string {
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = ((-90 + i * 60) * Math.PI) / 180;
    return `${(x + 10 * Math.cos(angle)).toFixed(2)},${(y + 10 * Math.sin(angle)).toFixed(2)}`;
  });
  return `M${points.join("L")}Z`;
}

const cells = [
  hexagon(8.66, 10),
  hexagon(0, 25),
  hexagon(17.32, 25),
  hexagon(0, -5),
  hexagon(17.32, -5),
];

/**
 * Hexagonal chemistry lattice at 5% opacity. Welcome header and dividers only.
 * Fills its positioned parent; purely decorative.
 */
export function MoleculeTexture({ className }: { className?: string }) {
  const id = `${useId()}-lattice`;
  return (
    <svg
      aria-hidden="true"
      className={cx("pointer-events-none absolute inset-0 h-full w-full stroke-primary", className)}
      style={{ opacity: 0.05 }}
    >
      <defs>
        <pattern id={id} width="17.32" height="30" patternUnits="userSpaceOnUse">
          {cells.map((d) => (
            <path key={d} d={d} fill="none" strokeWidth="1.5" />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
