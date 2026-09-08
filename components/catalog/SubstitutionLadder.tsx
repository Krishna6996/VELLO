"use client";

import { useState } from "react";
import { RadioGroup, RadioRow } from "@/components/ui/RadioRow";
import type { Sku } from "@/lib/catalog/types";
import { medicineLine, rupees } from "@/lib/format";

interface SubstitutionLadderProps {
  /** The brand the doctor wrote. Always listed first. */
  prescribed: Sku;
  /** Chemically equivalent options, cheapest first. */
  substitutes: readonly Sku[];
  /** Controlled selection; when omitted the ladder keeps its own, starting with none. */
  value?: string;
  onValueChange?: (slug: string) => void;
  ariaLabel?: string;
}

/**
 * The doctor's brand at the top, then equivalents sorted by price. Every row
 * has identical weight. Nothing is preselected, nothing is recommended, and
 * no saving is calculated: the choice is the patient's.
 */
export function SubstitutionLadder({
  prescribed,
  substitutes,
  value,
  onValueChange,
  ariaLabel = "Same molecule, other brands",
}: SubstitutionLadderProps) {
  const [internal, setInternal] = useState<string>("");
  const selected = value ?? internal;
  const rows = [prescribed, ...substitutes];

  function handleChange(slug: string) {
    setInternal(slug);
    onValueChange?.(slug);
  }

  return (
    <RadioGroup value={selected} onValueChange={handleChange} aria-label={ariaLabel}>
      {rows.map((sku) => (
        <RadioRow
          key={sku.slug}
          value={sku.slug}
          label={sku.brand}
          description={medicineLine(sku.molecule, sku.strength, sku.form, sku.packLabel)}
          trailing={sku.inStock ? rupees(sku.mrp) : "Not in stock right now"}
        />
      ))}
    </RadioGroup>
  );
}
