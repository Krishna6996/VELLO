import type { PackForm } from "@/lib/format";

export type Form = PackForm;

export type Schedule = "OTC" | "H" | "H1";

/** The schedules that need a prescription, shown as a tag beside the ℞ mark. */
export type RxSchedule = Exclude<Schedule, "OTC">;

export type ConcernSlug =
  | "diabetes"
  | "blood-pressure"
  | "thyroid"
  | "skin-hair"
  | "sexual-health"
  | "mind-sleep"
  | "periods"
  | "everyday";

export interface Concern {
  slug: ConcernSlug;
  title: string;
  /** The deck's one-line for the landing tile. */
  line: string;
  /** The deck's hub intro. Describes the condition and the service, never a drug. */
  intro: string;
  /** Plain words people type when they mean this concern. */
  keywords: readonly string[];
}

/** A typical regimen, in India's morning-afternoon-night notation, with a plain note. */
export interface Regimen {
  pattern: string;
  note: string;
}

export interface Sku {
  id: string;
  slug: string;
  brand: string;
  /** Combination molecules joined with " + ". */
  molecule: string;
  strength: string;
  form: Form;
  /** "strip of 10", "bottle of 60ml". */
  packLabel: string;
  packUnits: number;
  /** Printed MRP in paise. */
  mrp: number;
  schedule: Schedule;
  /** Derived: schedule !== "OTC". */
  rxRequired: boolean;
  manufacturer: string;
  concerns: readonly ConcernSlug[];
  /** Slugs of SKUs with the same molecule, strength and form. */
  substitutes: readonly string[];
  /** Two to three plain sentences. */
  description: string;
  howToTake: string;
  sideEffects: readonly string[];
  warnings: readonly string[];
  storage: string;
  inStock: boolean;
  regimen?: Regimen;
}
