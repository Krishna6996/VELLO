"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useCartSheet } from "@/lib/cart-sheet";
import { cx } from "@/lib/cx";
import { useCartHydrated } from "@/lib/use-hydrated";

/** Loaded on first open, so the seed it needs never ships with the header. */
const CartSheet = dynamic(() => import("@/components/cart/CartSheet").then((m) => m.CartSheet), {
  ssr: false,
});

/** The header's cart entry: the word "Order" and a count in a sage pill. No basket. */
export function CartEntry() {
  const hydrated = useCartHydrated();
  const lines = useCart((state) => state.lines);
  const setOpen = useCartSheet((state) => state.setOpen);
  const open = useCartSheet((state) => state.open);
  const [everOpened, setEverOpened] = useState(false);
  const count = hydrated ? lines.reduce((sum, line) => sum + line.qty, 0) : 0;
  const showSheet = open || everOpened;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setEverOpened(true);
          setOpen(true);
        }}
        aria-label={count > 0 ? `Order, ${count} ${count === 1 ? "item" : "items"}` : "Order"}
        className={cx(
          "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-input px-1 text-body font-medium whitespace-nowrap text-ink-secondary hover:text-ink lg:inline-flex",
          count === 0 && "hidden",
        )}
      >
        <span className="hidden lg:inline">Order</span>
        {count > 0 ? (
          <span
            data-pseudo-skip
            className="inline-flex min-h-6 min-w-6 items-center justify-center rounded-pill bg-sage px-2 text-legal font-semibold text-primary tabular-nums"
          >
            {count}
          </span>
        ) : null}
      </button>
      {showSheet ? <CartSheet /> : null}
    </>
  );
}
