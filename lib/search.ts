import Fuse, { type FuseResult } from "fuse.js";
import { concerns } from "@/lib/catalog/concerns";
import { getByConcern, getMolecules } from "@/lib/catalog/queries";
import { skus } from "@/lib/catalog/seed";
import type { Concern, Sku } from "@/lib/catalog/types";

interface SkuDoc {
  slug: string;
  brand: string;
  molecule: string;
  strength: string;
  concernWords: string[];
}

const docs: SkuDoc[] = skus.map((sku) => ({
  slug: sku.slug,
  brand: sku.brand,
  molecule: sku.molecule,
  strength: sku.strength,
  concernWords: sku.concerns.flatMap((slug) => {
    const concern = concerns.find((c) => c.slug === slug);
    return concern ? [concern.title, ...concern.keywords] : [];
  }),
}));

const skuIndex = new Fuse(docs, {
  keys: [
    { name: "brand", weight: 0.5 },
    { name: "molecule", weight: 0.4 },
    { name: "strength", weight: 0.1 },
    { name: "concernWords", weight: 0.1 },
  ],
  threshold: 0.34,
  ignoreLocation: true,
  minMatchCharLength: 2,
  includeScore: true,
  includeMatches: true,
});

const concernIndex = new Fuse(concerns, {
  keys: [
    { name: "title", weight: 0.6 },
    { name: "keywords", weight: 0.4 },
  ],
  threshold: 0.3,
  ignoreLocation: true,
  minMatchCharLength: 2,
  includeScore: true,
});

const bySlug = new Map(skus.map((sku) => [sku.slug, sku]));
const moleculeCounts = new Map(getMolecules().map((m) => [m.molecule, m.count]));

export interface MoleculeResult {
  molecule: string;
  count: number;
}

export interface SearchResults {
  query: string;
  /** Medicines, best match first. */
  brands: Sku[];
  /** Distinct molecules the query matched, with how many medicines carry each. */
  molecules: MoleculeResult[];
  concerns: Concern[];
  empty: boolean;
}

function matchedKeys(result: FuseResult<SkuDoc>): Set<string> {
  return new Set((result.matches ?? []).map((match) => match.key ?? ""));
}

/** Words people add that carry no meaning for matching. */
const filler = new Set([
  "tablet",
  "tablets",
  "tab",
  "tabs",
  "capsule",
  "medicine",
  "medicines",
  "dawai",
  "dawa",
  "for",
  "the",
  "ki",
  "ka",
  "goli",
]);

function tokens(query: string): string[] {
  return query
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length >= 2 && !filler.has(word));
}

/** Concerns matched by the whole query or by any single meaningful word, best first. */
function findConcerns(query: string): Concern[] {
  const seen = new Map<string, { concern: Concern; score: number }>();
  const candidates = [query, ...tokens(query)];
  for (const candidate of candidates) {
    for (const hit of concernIndex.search(candidate, { limit: 3 })) {
      const score = hit.score ?? 1;
      const existing = seen.get(hit.item.slug);
      if (!existing || score < existing.score)
        seen.set(hit.item.slug, { concern: hit.item, score });
    }
  }
  return [...seen.values()]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((entry) => entry.concern);
}

/**
 * Grouped search over the seed. Finds brands with typos, molecules,
 * strengths ("telma 40") and plain concern words ("sugar", "bp").
 */
export function search(rawQuery: string, limit = 50): SearchResults {
  const query = rawQuery.trim().replace(/\s+/g, " ");
  if (query.length < 2) {
    return { query, brands: [], molecules: [], concerns: [], empty: true };
  }

  let skuHits = skuIndex.search(query, { limit: 200 });
  if (skuHits.length === 0) {
    // "bp tablet", "sugar ki dawai": try the meaningful words on their own.
    const seen = new Set<string>();
    skuHits = tokens(query)
      .flatMap((word) => skuIndex.search(word, { limit: 200 }))
      .filter((hit) => (seen.has(hit.item.slug) ? false : (seen.add(hit.item.slug), true)));
  }
  const concernHits = findConcerns(query);

  const brands: Sku[] = [];
  const molecules = new Map<string, number>();
  for (const hit of skuHits) {
    const keys = matchedKeys(hit);
    const sku = bySlug.get(hit.item.slug);
    if (!sku) continue;
    if (keys.has("brand") || keys.has("molecule") || keys.has("strength")) {
      brands.push(sku);
    }
    if (keys.has("molecule")) {
      molecules.set(sku.molecule, moleculeCounts.get(sku.molecule) ?? 0);
    }
  }

  // A concern word alone should still show the shelf it names.
  if (brands.length === 0 && concernHits.length > 0) {
    brands.push(...getByConcern(concernHits[0].slug));
  }

  const moleculeList = [...molecules.entries()]
    .map(([molecule, count]) => ({ molecule, count }))
    .sort((a, b) => b.count - a.count || a.molecule.localeCompare(b.molecule));

  return {
    query,
    brands: brands.slice(0, limit),
    molecules: moleculeList,
    concerns: concernHits,
    empty: brands.length === 0 && moleculeList.length === 0 && concernHits.length === 0,
  };
}
