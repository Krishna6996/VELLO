import Link from "next/link";
import { ConcernIcon } from "@/components/vocabulary/ConcernIcon";
import { IconWell } from "@/components/vocabulary/Glyph";
import type { Concern } from "@/lib/catalog/types";
import { cx } from "@/lib/cx";

interface ConcernTileProps {
  concern: Concern;
  className?: string;
}

/**
 * Sage icon well, title, one plain line. Every concern gets the same tile,
 * the same weight and the same hover; any difference would be the stigma.
 */
export function ConcernTile({ concern, className }: ConcernTileProps) {
  return (
    <Link
      href={`/concerns/${concern.slug}`}
      className={cx(
        "flex flex-col gap-4 rounded-card border-[1.5px] border-hairline bg-surface p-4 text-ink hover:border-primary md:p-5",
        className,
      )}
    >
      <IconWell>
        <ConcernIcon concern={concern.slug} />
      </IconWell>
      <span className="flex flex-col gap-1">
        <span className="text-card text-ink">{concern.title}</span>
        <span className="text-row text-ink-muted">{concern.line}</span>
      </span>
    </Link>
  );
}
