import { cx } from "@/lib/cx";

export interface TotalsRow {
  label: string;
  value: string;
}

interface TotalsBlockProps {
  rows: readonly TotalsRow[];
  total: TotalsRow;
  /** The 12px faint line under the total, for example the GST sentence. */
  footnote: string;
  className?: string;
}

/**
 * Surface card. Rows at 14px, a hairline above the bold total row, then a
 * faint footnote. There is no promo code field and there never will be.
 */
export function TotalsBlock({ rows, total, footnote, className }: TotalsBlockProps) {
  return (
    <div className={cx("rounded-card border border-hairline bg-surface p-4 md:p-5", className)}>
      <dl className="flex flex-col gap-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4">
            <dt className="text-row text-ink-secondary">{row.label}</dt>
            <dd data-pseudo-skip className="text-row text-ink-secondary tabular-nums">
              {row.value}
            </dd>
          </div>
        ))}
        <div className="mt-1 flex items-baseline justify-between gap-4 border-t border-hairline pt-3">
          <dt className="text-row font-bold text-ink">{total.label}</dt>
          <dd data-pseudo-skip className="text-price text-ink tabular-nums">
            {total.value}
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-legal text-ink-muted">{footnote}</p>
    </div>
  );
}
