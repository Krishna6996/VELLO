"use client";

import { CartSheet } from "@/components/cart/CartSheet";
import { cartTotals, resolveLines, useCart } from "@/lib/cart";
import { useCartSheet } from "@/lib/cart-sheet";
import { cx } from "@/lib/cx";
import { useCartHydrated } from "@/lib/use-hydrated";

/** The header's cart entry: the word "Order" and a count in a sage pill. No basket. */
export function CartEntry() {
  const hydrated = useCartHydrated();
  const lines = useCart((state) => state.lines);
  const setOpen = useCartSheet((state) => state.setOpen);
  const count = hydrated ? cartTotals(resolveLines(lines)).count : 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={count > 0 ? `Order, ${count} ${count === 1 ? "item" : "items"}` : "Order"}
        className={cx(
          "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-input px-1 text-body font-medium text-ink-secondary hover:text-ink md:inline-flex",
          count === 0 && "hidden",
        )}
      >
        <span className="hidden md:inline">Order</span>
        {count > 0 ? (
          <span className="inline-flex min-h-6 min-w-6 items-center justify-center rounded-pill bg-sage px-2 text-legal font-semibold text-primary tabular-nums">
            {count}
          </span>
        ) : null}
      </button>
      <CartSheet />
    </>
  );
}
