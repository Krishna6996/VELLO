import type { ConcernSlug } from "@/lib/catalog/types";

/**
 * What to photograph at the foot of each concern hub: a domestic Indian
 * moment, never a clinic. Stands in for the spot illustration until shot.
 */
export const spotCaptions: Record<ConcernSlug, string> = {
  diabetes:
    "A steel tumbler of water and one tablet on a steel plate, on a kitchen counter in morning light",
  "blood-pressure":
    "A cuff on an arm at the dining table, the other hand resting on a cup of chai going cold",
  thyroid: "A single small tablet and a glass of water on a bedside table, curtains still drawn",
  "skin-hair":
    "A dressing-table mirror, a comb, and a plain paper package from the pharmacy, unopened",
  "sexual-health":
    "A plain paper package on a hallway table beside house keys, afternoon light through a window",
  "mind-sleep":
    "A phone face down on a bedside table beside a glass of water, the lamp switched off",
  periods: "A hot-water bottle on a sofa, a cup of chai on the side table, a book left open",
  everyday: "The kitchen shelf where the medicines live: a tin, a strip, a bottle, a thermometer",
};
