import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

interface ReassuranceBlockProps {
  /** One sentence of specific truth. */
  children: ReactNode;
  /** A small mark on the left, 20px. Defaults to a plain check ring. */
  mark?: ReactNode;
  className?: string;
}

function CheckRing() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      className="stroke-primary"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );
}

/** Sage block, 14px radius, small mark on the left, one sentence. */
export function ReassuranceBlock({ children, mark, className }: ReassuranceBlockProps) {
  return (
    <div className={cx("flex items-start gap-3 rounded-card bg-sage p-4", className)}>
      <span className="mt-0.5 shrink-0" aria-hidden="true">
        {mark ?? <CheckRing />}
      </span>
      <p className="text-body text-ink">{children}</p>
    </div>
  );
}
