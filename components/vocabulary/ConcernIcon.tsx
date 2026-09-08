import type { ReactNode } from "react";
import { Glyph } from "@/components/vocabulary/Glyph";
import type { ConcernSlug } from "@/lib/catalog/types";

export type { ConcernSlug };
export { concernSlugs } from "@/lib/catalog/concerns";

/** 28 dots on a ring, one filled: a cycle. */
function CycleRing() {
  const dots = Array.from({ length: 28 }, (_, i) => {
    const angle = (-90 + (i * 360) / 28) * (Math.PI / 180);
    return { x: 12 + 9 * Math.cos(angle), y: 12 + 9 * Math.sin(angle) };
  });
  return (
    <>
      {dots.slice(1).map((dot) => (
        <circle
          key={`${dot.x.toFixed(2)}-${dot.y.toFixed(2)}`}
          cx={dot.x.toFixed(2)}
          cy={dot.y.toFixed(2)}
          r="0.8"
          stroke="none"
          className="fill-primary"
        />
      ))}
      <circle cx="12" cy="3" r="2" className="fill-sage" />
    </>
  );
}

const drawings: Record<ConcernSlug, ReactNode> = {
  diabetes: (
    <path
      d="M12 3.5c-2.5 3.4-5.5 7.1-5.5 10.2a5.5 5.5 0 0 0 11 0C17.5 10.6 14.5 6.9 12 3.5z"
      className="fill-sage"
    />
  ),
  "blood-pressure": (
    <>
      <path d="M4.5 16.5a7.5 7.5 0 0 1 15 0z" className="fill-sage" />
      <path d="M12 16.5l3.5-5.5" />
      <circle cx="12" cy="16.5" r="1.25" className="fill-primary" />
    </>
  ),
  thyroid: (
    <>
      <path d="M11.5 11.5C10 8.5 6 5 4.5 6.5S5 11.5 8 12.5z" className="fill-sage" />
      <path d="M12.5 11.5C14 8.5 18 5 19.5 6.5S19 11.5 16 12.5z" className="fill-sage" />
      <path d="M11.5 12.5C9 12.5 5 13 5 16s3.5 2 6.5-2z" className="fill-sage" />
      <path d="M12.5 12.5c2.5 0 6.5.5 6.5 3.5s-3.5 2-6.5-2z" className="fill-sage" />
      <path d="M12 8v9M12 8l-1.5-2.5M12 8l1.5-2.5" />
    </>
  ),
  "skin-hair": (
    <>
      <rect x="4" y="7.5" width="16" height="13" rx="2" className="fill-surface" />
      <path d="M4 16h16v2.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" className="fill-sage" />
      <path d="M4 12h16" />
      <path d="M12 7.5c0-2 .8-3.3 2-4.2" />
    </>
  ),
  "sexual-health": (
    <>
      <circle cx="9.5" cy="12" r="5.5" className="fill-surface" />
      <circle cx="14.5" cy="12" r="5.5" className="fill-surface" />
      <path d="M12 7.1a5.5 5.5 0 0 1 0 9.8 5.5 5.5 0 0 1 0-9.8z" className="fill-sage" />
    </>
  ),
  "mind-sleep": (
    <path d="M14.5 3.5a8.5 8.5 0 1 0 6 15.5A8 8 0 0 1 14.5 3.5z" className="fill-sage" />
  ),
  periods: <CycleRing />,
  everyday: (
    <>
      <path d="M6.5 16.5a5.5 5.5 0 0 1 11 0z" className="fill-sage" />
      <path d="M3 16.5h18" />
      <path d="M12 7.5V4.5M6.2 9.9L4.1 7.8M17.8 9.9l2.1-2.1" />
    </>
  ),
};

/** Clinically literate, not decorative. Always paired with the concern's title. */
export function ConcernIcon({ concern, className }: { concern: ConcernSlug; className?: string }) {
  return <Glyph className={className}>{drawings[concern]}</Glyph>;
}
