"use client";

import { useLargeType } from "@/lib/large-type";
import { cx } from "@/lib/cx";

/** A switch, not a link: "Large type", pressed when on. */
export function LargeTypeToggle({ className }: { className?: string }) {
  const [on, setOn] = useLargeType();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className={cx(
        "inline-flex min-h-11 items-center gap-3 text-body text-ink-secondary hover:text-ink",
        className,
      )}
    >
      <span>Large type</span>
      <span
        aria-hidden="true"
        className={cx(
          "motion-surface relative inline-flex h-6 w-10 shrink-0 items-center rounded-pill border",
          on ? "border-primary bg-primary" : "border-hairline bg-surface",
        )}
      >
        <span
          className={cx(
            "absolute top-0.5 size-4.5 rounded-pill",
            on ? "left-5 bg-surface" : "left-0.5 bg-ink-muted",
          )}
        />
      </span>
    </button>
  );
}
