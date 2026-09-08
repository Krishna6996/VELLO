import { moleculeSlug } from "@/lib/catalog/molecule-slug";
import { skus } from "@/lib/catalog/seed";
import type { Sku } from "@/lib/catalog/types";

export { moleculeSlug };

export interface MoleculePage {
  slug: string;
  molecule: string;
  skus: Sku[];
}

const pages = new Map<string, MoleculePage>();
for (const sku of skus) {
  const slug = moleculeSlug(sku.molecule);
  const page = pages.get(slug) ?? { slug, molecule: sku.molecule, skus: [] };
  page.skus.push(sku);
  pages.set(slug, page);
}

export function getMoleculePages(): MoleculePage[] {
  return [...pages.values()].sort((a, b) => a.molecule.localeCompare(b.molecule));
}

export function getMoleculePage(slug: string): MoleculePage | undefined {
  return pages.get(slug);
}

export interface StrengthGroup {
  key: string;
  strength: string;
  form: Sku["form"];
  /** Cheapest first. */
  skus: Sku[];
}

/** Brands grouped by strength and form, each group cheapest first. */
export function groupByStrength(list: readonly Sku[]): StrengthGroup[] {
  const groups = new Map<string, StrengthGroup>();
  for (const sku of list) {
    const key = `${sku.strength}|${sku.form}`;
    const group = groups.get(key) ?? { key, strength: sku.strength, form: sku.form, skus: [] };
    group.skus.push(sku);
    groups.set(key, group);
  }
  return [...groups.values()]
    .map((group) => ({ ...group, skus: [...group.skus].sort((a, b) => a.mrp - b.mrp) }))
    .sort((a, b) => a.strength.localeCompare(b.strength, undefined, { numeric: true }));
}
