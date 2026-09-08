import { resolveLines, type ResolvedLine } from "@/lib/cart";
import { parseDosePattern } from "@/components/vocabulary/DoseGlyphs";
import type { Order, OrderStatus } from "@/lib/orders";

export const PHARMACIST = { name: "Anil Mehta", reg: "PB-45821" } as const;
export const PHARMACY = "Sharma Medicos";
export const RIDER = "Gurpreet";

/** Deck sub-lines by status. */
export const statusLine: Record<OrderStatus, string> = {
  checking: "A registered pharmacist is checking your prescription.",
  verified: "Verified. Being packed now.",
  packing: `Being packed at ${PHARMACY}.`,
  "out-for-delivery": `${RIDER} is on the way.`,
  delivered: "Delivered.",
  rejected: "We couldn't dispense this order.",
  "on-hold": "One item needs your OK.",
};

export const timelineLabels = [
  "Prescription being checked",
  "Verified by pharmacist",
  `Packed at ${PHARMACY}`,
  "Out for delivery",
  "Delivered",
] as const;

/** Index of the current timeline node; 5 means every node is done. */
export function currentStep(status: OrderStatus): number {
  switch (status) {
    case "checking":
    case "rejected":
    case "on-hold":
      return 0;
    case "verified":
      return 1;
    case "packing":
      return 2;
    case "out-for-delivery":
      return 3;
    case "delivered":
      return 5;
  }
}

/** Draft timestamps: each stage a plausible number of minutes after the order. */
const stageMinutes = [0, 12, 31, 68, 124] as const;

export function stageTime(order: Order, index: number): string {
  const created = new Date(order.createdAt).getTime();
  return new Date(created + stageMinutes[index] * 60_000).toISOString();
}

export function verifiedAt(order: Order): string {
  return stageTime(order, 1);
}

/** Days until the first medicine to run out does, from pack size, quantity and regimen. */
export function refillDays(lines: readonly ResolvedLine[]): number {
  const days = lines.flatMap((line) => {
    const { sku, qty } = line;
    if (!sku.regimen) return [];
    const perDay = parseDosePattern(sku.regimen.pattern).filter(Boolean).length;
    if (perDay === 0 || sku.form === "drops" || sku.form === "cream" || sku.form === "gel")
      return [];
    return [Math.floor((sku.packUnits * qty) / perDay)];
  });
  if (days.length === 0) return 26;
  return Math.max(1, Math.min(...days) - 2);
}

export function orderLines(order: Order): ResolvedLine[] {
  return resolveLines(order.lines);
}
