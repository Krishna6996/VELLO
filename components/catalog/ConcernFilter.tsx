import Link from "next/link";
import { concerns } from "@/lib/catalog/concerns";
import type { ConcernSlug } from "@/lib/catalog/types";
import { cx } from "@/lib/cx";

interface ConcernFilterProps {
  /** Base path the filter links to, e.g. "/medicines". */
  basePath: string;
  selected?: ConcernSlug;
}

const pill =
  "motion-surface inline-flex min-h-11 items-center rounded-pill border px-4 text-row font-semibold";

/** Pill tabs as links, so a filtered list has a URL. Selected is a solid Primary pill. */
export function ConcernFilter({ basePath, selected }: ConcernFilterProps) {
  return (
    <nav aria-label="Filter by concern">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href={basePath}
            aria-current={selected ? undefined : "page"}
            className={cx(
              pill,
              selected
                ? "border-hairline bg-surface text-ink-secondary hover:border-primary"
                : "border-primary bg-primary text-surface",
            )}
          >
            All
          </Link>
        </li>
        {concerns.map((concern) => {
          const active = concern.slug === selected;
          return (
            <li key={concern.slug}>
              <Link
                href={`${basePath}?concern=${concern.slug}`}
                aria-current={active ? "page" : undefined}
                className={cx(
                  pill,
                  active
                    ? "border-primary bg-primary text-surface"
                    : "border-hairline bg-surface text-ink-secondary hover:border-primary",
                )}
              >
                {concern.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
