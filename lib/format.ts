/**
 * Formatting helpers. Prices are printed MRPs shown plainly; nothing sits
 * beside them (design-system.md §6, §8).
 */

const rupeeFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** rupees(3650) → "₹36.50". Input is paise so prices stay integer-safe. */
export function rupees(paise: number): string {
  const rounded = Math.round(paise);
  const sign = rounded < 0 ? "-" : "";
  return `${sign}₹${rupeeFormatter.format(Math.abs(rounded) / 100)}`;
}

/** Physical forms from docs/catalog-seed.md. */
export type PackForm =
  | "tablet"
  | "sr-tablet"
  | "capsule"
  | "syrup"
  | "drops"
  | "cream"
  | "gel"
  | "inhaler"
  | "vial"
  | "sachet"
  | "strip"
  | "device";

function plural(count: number, one: string, many: string): string {
  return count === 1 ? `1 ${one}` : `${count} ${many}`;
}

/**
 * packLabel(20, "sr-tablet") → "strip of 20"
 * packLabel(60, "syrup") → "bottle of 60ml"
 * packLabel(20, "cream") → "tube of 20g"
 */
export function packLabel(units: number, form: PackForm): string {
  switch (form) {
    case "tablet":
    case "sr-tablet":
    case "capsule":
      return `strip of ${units}`;
    case "syrup":
    case "drops":
      return `bottle of ${units}ml`;
    case "cream":
    case "gel":
      return `tube of ${units}g`;
    case "inhaler":
      return plural(units, "inhaler", "inhalers");
    case "vial":
      return plural(units, "vial", "vials");
    case "sachet":
      return units === 1 ? "1 sachet" : `pack of ${units} sachets`;
    case "strip":
      return `box of ${units} strips`;
    case "device":
      return plural(units, "unit", "units");
  }
}

/**
 * doseCaption("1-0-1", "after food") → "1–0–1 · after food"
 * India's morning-afternoon-night notation, made legible with en dashes.
 */
export function doseCaption(pattern: string, note?: string): string {
  const dashed = pattern
    .trim()
    .split(/\s*-\s*/)
    .join("\u2013");
  const trimmedNote = note?.trim();
  return trimmedNote ? `${dashed} \u00b7 ${trimmedNote}` : dashed;
}
