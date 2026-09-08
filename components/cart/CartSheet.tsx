"use client";

import Link from "next/link";
import { CartLineRow } from "@/components/cart/CartLineRow";
import { buttonClasses } from "@/components/ui/Button";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { ReassuranceBlock } from "@/components/ui/ReassuranceBlock";
import { Sheet } from "@/components/ui/Sheet";
import { TotalsBlock } from "@/components/ui/TotalsBlock";
import { useCart } from "@/lib/cart";
import { cartTotals, resolveLines } from "@/lib/cart-lines";
import { useCartSheet } from "@/lib/cart-sheet";
import { rupees } from "@/lib/format";
import { buildOrderLink } from "@/lib/whatsapp";

/** The cart. No suggested items, no "add more for free delivery", ever. */
export function CartSheet() {
  const { open, setOpen } = useCartSheet();
  const rawLines = useCart((state) => state.lines);
  const setQty = useCart((state) => state.setQty);
  const remove = useCart((state) => state.remove);
  const lines = resolveLines(rawLines);
  const totals = cartTotals(lines);

  return (
    <Sheet open={open} onOpenChange={setOpen} title="Your order">
      {lines.length === 0 ? (
        <div className="flex flex-col gap-3">
          <p className="text-card text-ink">Nothing here yet.</p>
          <p className="text-body text-ink-secondary">
            Search a medicine or send a prescription on WhatsApp.
          </p>
          <Link
            href="/medicines"
            onClick={() => setOpen(false)}
            className="inline-flex min-h-11 items-center self-start text-body font-medium text-primary hover:text-primary-pressed"
          >
            Medicines
          </Link>
          <PhotoPlaceholder
            aspect="4/3"
            caption="A folded prescription on a kitchen table beside a pair of reading glasses"
            className="mt-2"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <ul className="flex flex-col divide-y divide-divider">
            {lines.map((line) => (
              <CartLineRow
                key={line.slug}
                line={line}
                onQtyChange={(qty) => setQty(line.slug, qty)}
                onRemove={() => remove(line.slug)}
              />
            ))}
          </ul>
          {totals.needsRx ? (
            <ReassuranceBlock>
              One or more of these are prescription medicines. You&apos;ll add your prescription at
              checkout, or send it on WhatsApp.
            </ReassuranceBlock>
          ) : null}
          <TotalsBlock
            rows={[
              { label: "Medicines", value: rupees(totals.items) },
              { label: "Delivery", value: rupees(totals.delivery) },
            ]}
            total={{ label: "To pay", value: rupees(totals.toPay) }}
            footnote="GST invoice sent after delivery. No hidden charges."
          />
          <div className="flex flex-col gap-3">
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className={buttonClasses("primary", true)}
            >
              Continue to checkout
            </Link>
            <a
              href={buildOrderLink(
                lines.map((line) => ({
                  brand: line.sku.brand,
                  strength: line.sku.strength,
                  qty: line.qty,
                })),
              )}
              target="_blank"
              rel="noopener"
              className={buttonClasses("secondary", true)}
            >
              Order this on WhatsApp
            </a>
          </div>
        </div>
      )}
    </Sheet>
  );
}
