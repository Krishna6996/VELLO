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

const formLabels: Record<PackForm, string> = {
  tablet: "tablet",
  "sr-tablet": "SR tablet",
  capsule: "capsule",
  syrup: "syrup",
  drops: "drops",
  cream: "cream",
  gel: "gel",
  inhaler: "inhaler",
  vial: "vial",
  sachet: "sachet",
  strip: "test strips",
  device: "device",
};

/** formLabel("sr-tablet") → "SR tablet", as it reads on the medicine line. */
export function formLabel(form: PackForm): string {
  return formLabels[form];
}

/**
 * medicineLine("Metformin", "500mg", "sr-tablet", "strip of 20")
 * → "Metformin 500mg · SR tablet · strip of 20"
 * The honesty promise made visible: the molecule is always named.
 */
export function medicineLine(
  molecule: string,
  strength: string,
  form: PackForm,
  pack: string,
): string {
  const first = strength ? `${molecule} ${strength}` : molecule;
  // Devices and test strips are already named by their line; repeating the form says nothing.
  const parts =
    form === "device" || form === "strip" ? [first, pack] : [first, formLabel(form), pack];
  return parts.join(" \u00b7 ");
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

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

/** formatDate("2026-09-08T13:12:00Z") → "8 Sept 2026" */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso)).replace("Sept", "Sep");
}

/** formatDateTime(iso) → "8 Sep 2026, 6:42 pm" */
export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  return `${formatDate(iso)}, ${timeFormatter.format(date).toLowerCase()}`;
}
