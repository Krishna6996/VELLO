import { DELIVERY_PAISE, type CartLine } from "@/lib/cart";
import { getBySlug } from "@/lib/catalog/queries";
import type { Sku } from "@/lib/catalog/types";

/**
 * Joins cart lines to the seed. Kept apart from the store so the header, which
 * only needs a count, never ships the catalog.
 */
export interface ResolvedLine extends CartLine {
  sku: Sku;
}

export interface CartTotals {
  /** Paise. */
  items: number;
  delivery: number;
  toPay: number;
  count: number;
  needsRx: boolean;
}

/** Joins cart lines to the seed. Lines whose SKU no longer exists are dropped. */
export function resolveLines(lines: readonly CartLine[]): ResolvedLine[] {
  return lines.flatMap((line) => {
    const sku = getBySlug(line.slug);
    return sku ? [{ ...line, sku }] : [];
  });
}

export function cartTotals(lines: readonly ResolvedLine[]): CartTotals {
  const items = lines.reduce((sum, line) => sum + line.sku.mrp * line.qty, 0);
  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const delivery = lines.length > 0 ? DELIVERY_PAISE : 0;
  return {
    items,
    delivery,
    toPay: items + delivery,
    count,
    needsRx: lines.some((line) => line.sku.rxRequired),
  };
}
