import { doseCaption } from "@/lib/format";
import { cx } from "@/lib/cx";

interface DoseGlyphsProps {
  /** India's notation: "1-0-1" is morning and night, "0-0-1" is night only. */
  pattern: string;
  /** For example "after food" or "before breakfast". */
  note?: string;
  className?: string;
}

const slots = ["bg-dose-morning", "bg-dose-afternoon", "bg-dose-night"] as const;

/** Parses "1-0-1" into three booleans. Anything above zero counts as a dose. */
export function parseDosePattern(pattern: string): [boolean, boolean, boolean] {
  const parts = pattern.split("-").map((part) => Number.parseFloat(part.replace("½", "0.5")));
  return [Boolean(parts[0]), Boolean(parts[1]), Boolean(parts[2])];
}

/**
 * Three 11px dots for morning, afternoon and night, always captioned in words.
 * Filled: amber, sage-grey, deep green. Empty: a 1.5px ring.
 */
export function DoseGlyphs({ pattern, note, className }: DoseGlyphsProps) {
  const taken = parseDosePattern(pattern);
  const caption = doseCaption(pattern, note);

  return (
    <span className={cx("inline-flex items-center gap-2", className)}>
      <span aria-hidden="true" className="inline-flex items-center gap-1">
        {taken.map((filled, index) => (
          <span
            key={slots[index]}
            className={cx(
              "block size-[11px] rounded-pill",
              filled ? slots[index] : "border-[1.5px] border-dose-empty",
            )}
          />
        ))}
      </span>
      <span className="text-legal text-ink-muted">{caption}</span>
    </span>
  );
}
