import Link from "next/link";
import type { Sku } from "@/lib/catalog/types";
import { medicineLine, rupees } from "@/lib/format";
import { cx } from "@/lib/cx";
import { FormIcon } from "@/components/vocabulary/FormIcon";
import { IconWell } from "@/components/vocabulary/Glyph";
import { RxMark } from "@/components/vocabulary/RxMark";

interface MedicineCardProps {
  sku: Sku;
  className?: string;
}

/** The molecule line is the honesty promise made visible. It is never omitted. */
export function MedicineLine({ sku, className }: { sku: Sku; className?: string }) {
  return (
    <p className={cx("text-meta text-ink-muted", className)}>
      {medicineLine(sku.molecule, sku.strength, sku.form, sku.packLabel)}
    </p>
  );
}

/**
 * The product's core object (design-system.md §6). Medicine shown typographically:
 * form icon in a sage well, brand, molecule line, ℞ and schedule, plain price.
 */
export function MedicineCard({ sku, className }: MedicineCardProps) {
  return (
    <Link
      href={`/medicines/${sku.slug}`}
      className={cx(
        "flex items-start gap-3 rounded-card border border-hairline bg-surface p-4 text-ink hover:border-primary md:gap-4 md:p-5",
        className,
      )}
    >
      <IconWell>
        <FormIcon form={sku.form} />
      </IconWell>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-card text-ink">{sku.brand}</span>
        <MedicineLine sku={sku} />
        {sku.schedule !== "OTC" ? <RxMark schedule={sku.schedule} className="mt-1" /> : null}
      </span>
      <span className="shrink-0 pt-0.5 text-right">
        {sku.inStock ? (
          <span className="text-price text-ink tabular-nums">{rupees(sku.mrp)}</span>
        ) : (
          <span className="block max-w-24 text-row text-ink-muted">Not in stock right now</span>
        )}
      </span>
    </Link>
  );
}
