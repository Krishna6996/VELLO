"use client";

import { useState } from "react";
import { FadeSwap } from "@/components/motion/FadeSwap";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ReassuranceBlock } from "@/components/ui/ReassuranceBlock";
import { useCart } from "@/lib/cart";
import type { Sku } from "@/lib/catalog/types";
import { rupees } from "@/lib/format";
import { buildOrderLink } from "@/lib/whatsapp";

interface PriceCardProps {
  sku: Sku;
  qty: number;
  onQtyChange: (qty: number) => void;
}

/**
 * Price at 28px, the pack under it, a stepper, Add to order, Order on WhatsApp,
 * then one sentence of reassurance. Out of stock removes Add; WhatsApp stays.
 */
export function PriceCard({ sku, qty, onQtyChange }: PriceCardProps) {
  const add = useCart((state) => state.add);
  const [addedFor, setAddedFor] = useState<string | null>(null);
  const added = addedFor === `${sku.slug}:${qty}`;
  const whatsapp = buildOrderLink([{ brand: sku.brand, strength: sku.strength, qty }]);

  function handleAdd() {
    add(sku.slug, qty);
    setAddedFor(`${sku.slug}:${qty}`);
  }

  return (
    <Card className="flex flex-col gap-5">
      {sku.inStock ? (
        <div className="flex flex-col gap-1">
          <FadeSwap watch={sku.slug} className="text-price-hero text-ink tabular-nums" skipPseudo>
            {rupees(sku.mrp)}
          </FadeSwap>
          <FadeSwap watch={sku.slug} className="text-row text-ink-muted">
            per {sku.packLabel}
          </FadeSwap>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <FadeSwap watch={sku.slug} className="text-card text-ink">
            Not in stock right now
          </FadeSwap>
          <p className="text-body text-ink-secondary">
            Send it on WhatsApp and we&apos;ll tell you when it&apos;s back, or pick an equivalent
            below.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <QuantityStepper value={qty} onChange={onQtyChange} label={`Quantity, ${sku.brand}`} />
        {sku.inStock ? (
          <Button fullWidth onClick={handleAdd}>
            {added ? "Added to order" : "Add to order"}
          </Button>
        ) : null}
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener"
          className={buttonClasses("secondary", true)}
        >
          Order on WhatsApp
        </a>
      </div>

      <ReassuranceBlock>
        {sku.rxRequired
          ? "This is a Schedule H medicine. A registered pharmacist checks your prescription before we dispense. You can upload it at checkout or send it on WhatsApp."
          : "No prescription needed. A pharmacist still checks every order."}
      </ReassuranceBlock>
    </Card>
  );
}
