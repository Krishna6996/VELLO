"use client";

import { MedicineLine } from "@/components/catalog/MedicineCard";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { FormIcon } from "@/components/vocabulary/FormIcon";
import { IconWell } from "@/components/vocabulary/Glyph";
import type { ResolvedLine } from "@/lib/cart";
import { rupees } from "@/lib/format";

interface CartLineRowProps {
  line: ResolvedLine;
  /** Omit to render read-only, as on the checkout page. */
  onQtyChange?: (qty: number) => void;
  onRemove?: () => void;
}

/** Form well, brand, molecule line, stepper, line price. Same anatomy as the card. */
export function CartLineRow({ line, onQtyChange, onRemove }: CartLineRowProps) {
  const { sku, qty } = line;
  return (
    <li className="flex gap-3 py-4">
      <IconWell>
        <FormIcon form={sku.form} />
      </IconWell>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-card text-ink">{sku.brand}</span>
            <MedicineLine sku={sku} />
          </div>
          <span data-pseudo-skip className="shrink-0 text-price text-ink tabular-nums">
            {rupees(sku.mrp * qty)}
          </span>
        </div>
        {onQtyChange ? (
          <div className="flex items-center justify-between gap-3">
            <QuantityStepper value={qty} onChange={onQtyChange} label={`Quantity, ${sku.brand}`} />
            {onRemove ? (
              <button
                type="button"
                onClick={onRemove}
                className="inline-flex min-h-11 items-center px-2 text-row font-medium text-primary hover:text-primary-pressed"
              >
                Remove
              </button>
            ) : null}
          </div>
        ) : (
          <span data-pseudo-skip className="text-row text-ink-muted">
            {qty} × {rupees(sku.mrp)}
          </span>
        )}
      </div>
    </li>
  );
}
