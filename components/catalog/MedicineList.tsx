import { MedicineCard } from "@/components/catalog/MedicineCard";
import type { Sku } from "@/lib/catalog/types";
import { cx } from "@/lib/cx";

interface MedicineListProps {
  skus: readonly Sku[];
  className?: string;
  ariaLabel?: string;
}

/** A single column, never a grid. A list is calmer and reads better. */
export function MedicineList({ skus, className, ariaLabel }: MedicineListProps) {
  return (
    <ul aria-label={ariaLabel} className={cx("flex w-full max-w-list flex-col gap-3", className)}>
      {skus.map((sku) => (
        <li key={sku.slug}>
          <MedicineCard sku={sku} />
        </li>
      ))}
    </ul>
  );
}
