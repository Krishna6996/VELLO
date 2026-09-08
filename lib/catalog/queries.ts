import { concernBySlug } from "@/lib/catalog/concerns";
import { skus } from "@/lib/catalog/seed";
import type { ConcernSlug, Sku } from "@/lib/catalog/types";

const bySlug = new Map(skus.map((sku) => [sku.slug, sku]));

export function getAll(): readonly Sku[] {
  return skus;
}

export function getBySlug(slug: string): Sku | undefined {
  return bySlug.get(slug);
}

/** Sorted by brand. */
export function getByConcern(concern: ConcernSlug): Sku[] {
  return skus
    .filter((sku) => sku.concerns.includes(concern))
    .sort((a, b) => a.brand.localeCompare(b.brand));
}

/** Every brand of a molecule, any strength or form, sorted by strength then brand. */
export function getByMolecule(molecule: string): Sku[] {
  const wanted = molecule.trim().toLowerCase();
  return skus
    .filter((sku) => sku.molecule.toLowerCase() === wanted)
    .sort((a, b) => a.strength.localeCompare(b.strength) || a.brand.localeCompare(b.brand));
}

/** Same molecule, strength and form, excluding the SKU itself, cheapest first. */
export function getSubstitutes(slug: string): Sku[] {
  const sku = bySlug.get(slug);
  if (!sku) return [];
  return sku.substitutes
    .map((other) => bySlug.get(other))
    .filter((other): other is Sku => other !== undefined)
    .sort((a, b) => a.mrp - b.mrp);
}

/** Distinct molecules with how many medicines carry each, alphabetical. */
export function getMolecules(): Array<{ molecule: string; count: number }> {
  const counts = new Map<string, number>();
  for (const sku of skus) counts.set(sku.molecule, (counts.get(sku.molecule) ?? 0) + 1);
  return [...counts.entries()]
    .map(([molecule, count]) => ({ molecule, count }))
    .sort((a, b) => a.molecule.localeCompare(b.molecule));
}

/** Listing order for /medicines: concern, then brand. */
export function getAllSorted(): Sku[] {
  const order = Object.keys(concernBySlug) as ConcernSlug[];
  return [...skus].sort((a, b) => {
    const ca = order.indexOf(a.concerns[0]);
    const cb = order.indexOf(b.concerns[0]);
    return ca - cb || a.brand.localeCompare(b.brand);
  });
}
