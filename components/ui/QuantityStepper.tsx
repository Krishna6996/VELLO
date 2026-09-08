"use client";

import { cx } from "@/lib/cx";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** Read to screen readers as the group's name, for example "Quantity, Glycomet 500 SR". */
  label?: string;
  className?: string;
}

const control =
  "inline-flex size-11 items-center justify-center rounded-input text-primary hover:bg-sage disabled:text-ink-faint disabled:hover:bg-surface";

/** Two 44px controls and the number between them. No free-text entry to mistype. */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  label = "Quantity",
  className,
}: QuantityStepperProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cx(
        "inline-flex items-center rounded-input border border-hairline bg-surface",
        className,
      )}
    >
      <button
        type="button"
        aria-label="One fewer"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={control}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M6 12h12" />
        </svg>
      </button>
      <output
        aria-live="polite"
        className="min-w-8 text-center text-body font-medium text-ink tabular-nums"
      >
        {value}
      </output>
      <button
        type="button"
        aria-label="One more"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={control}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M12 6v12M6 12h12" />
        </svg>
      </button>
    </div>
  );
}
