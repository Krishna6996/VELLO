import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";

interface PhotoPlaceholderProps {
  /** Exactly what should be shot, for example "A steel tumbler beside a strip of tablets". */
  caption: string;
  /** Art direction. Defaults to the copy deck line. */
  direction?: string;
  aspect?: "4/3" | "3/2" | "1/1" | "16/9";
  className?: string;
}

const stripes: CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(135deg, var(--color-canvas) 0 10px, var(--color-hairline) 10px 12px)",
};

const aspects: Record<NonNullable<PhotoPlaceholderProps["aspect"]>, string> = {
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
  "16/9": "aspect-video",
};

/**
 * Stands in for a photograph until the real one is shot. Striped cream and
 * tan, a monospace caption saying what belongs here, and the art direction.
 */
export function PhotoPlaceholder({
  caption,
  direction = "Warm, natural, at home, Indian kitchen. Never a clinic.",
  aspect = "4/3",
  className,
}: PhotoPlaceholderProps) {
  return (
    <figure
      className={cx(
        "flex flex-col justify-end overflow-hidden rounded-well border border-hairline",
        aspects[aspect],
        className,
      )}
      style={stripes}
    >
      <figcaption className="m-3 flex flex-col gap-0.5 self-start rounded-well border border-hairline bg-surface px-3 py-2 font-mono text-legal">
        <span className="text-ink">{caption}</span>
        <span className="text-ink-muted">{direction}</span>
      </figcaption>
    </figure>
  );
}
