import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getBySlug } from "@/lib/catalog/queries";
import type { Sku } from "@/lib/catalog/types";

export interface CartLine {
  slug: string;
  qty: number;
}

export const DELIVERY_PAISE = 2500;
export const MAX_QTY = 10;

interface CartState {
  lines: CartLine[];
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
}

function clampQty(qty: number): number {
  return Math.min(MAX_QTY, Math.max(1, Math.round(qty)));
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (slug, qty = 1) =>
        set((state) => {
          const existing = state.lines.find((line) => line.slug === slug);
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.slug === slug ? { ...line, qty: clampQty(line.qty + qty) } : line,
              ),
            };
          }
          return { lines: [...state.lines, { slug, qty: clampQty(qty) }] };
        }),
      remove: (slug) =>
        set((state) => ({ lines: state.lines.filter((line) => line.slug !== slug) })),
      setQty: (slug, qty) =>
        set((state) => ({
          lines:
            qty <= 0
              ? state.lines.filter((line) => line.slug !== slug)
              : state.lines.map((line) =>
                  line.slug === slug ? { ...line, qty: clampQty(qty) } : line,
                ),
        })),
      clear: () => set({ lines: [] }),
    }),
    { name: "vello-cart", version: 1 },
  ),
);

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
