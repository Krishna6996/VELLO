"use client";

import { useState, type ReactNode } from "react";
import { SubstitutionLadder } from "@/components/catalog/SubstitutionLadder";
import { PriceCard } from "@/components/product/PriceCard";
import type { Sku } from "@/lib/catalog/types";
import { cx } from "@/lib/cx";
import { formLabel } from "@/lib/format";

interface ProductViewProps {
  sku: Sku;
  substitutes: readonly Sku[];
  /** Breadcrumb, brand, molecule line, ℞. Server-rendered. */
  header: ReactNode;
  /** The blister strip or the large form icon. Server-rendered. */
  visual: ReactNode;
  /** About, How to take and the other sections. Server-rendered. */
  children: ReactNode;
}

/**
 * Desktop 7/5, mobile stacked. Choosing a ladder row swaps the SKU the price
 * card is for. Nothing is preselected. When the medicine is out of stock and a
 * substitute is in, the ladder moves above the fold on mobile.
 */
export function ProductView({ sku, substitutes, header, visual, children }: ProductViewProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [qty, setQty] = useState(1);
  const selected = substitutes.find((s) => s.slug === selectedSlug) ?? sku;
  const ladderFirst = !sku.inStock && substitutes.some((s) => s.inStock);
  const hasLadder = substitutes.length > 0;

  const ladder = hasLadder ? (
    <section
      aria-labelledby="substitution-head"
      className={cx(
        "flex flex-col gap-4 md:col-span-7",
        ladderFirst ? "order-4 md:order-6" : "order-6",
      )}
    >
      <h2 id="substitution-head" className="text-section text-ink">
        Same molecule, other brands
      </h2>
      <p className="max-w-measure text-body text-ink-secondary">
        These contain {sku.molecule.toLowerCase()} {sku.strength} in the same form. Pharmacists
        consider them equivalent. Your doctor&apos;s brand is listed first. The choice is yours.
      </p>
      <SubstitutionLadder
        prescribed={sku}
        substitutes={substitutes}
        value={selectedSlug}
        onValueChange={(slug) => {
          setSelectedSlug(slug);
          setQty(1);
        }}
        ariaLabel={`Same molecule, other brands of ${sku.molecule.toLowerCase()} ${sku.strength} ${formLabel(sku.form)}`}
      />
    </section>
  ) : null;

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-8 md:gap-y-12">
      <div className="order-1 md:col-span-7">{header}</div>
      <div className="order-2 md:col-span-7">{visual}</div>

      <aside
        aria-label="Price and ordering"
        className="order-3 md:order-none md:col-span-5 md:col-start-8 md:row-span-4 md:row-start-1 md:self-stretch"
      >
        <div className="flex flex-col gap-3 md:sticky md:top-20">
          <PriceCard sku={selected} qty={qty} onQtyChange={setQty} />
          <p className="text-legal text-ink-faint">
            Prices are printed MRPs. GST invoice sent after delivery. No hidden charges.
          </p>
        </div>
      </aside>

      <div className="order-5 flex flex-col gap-10 md:col-span-7">{children}</div>
      {ladder}
    </div>
  );
}
