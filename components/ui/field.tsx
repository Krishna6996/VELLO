import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Shared field chrome for Input, Textarea and Select.
 * Focus: 1.5px Primary. Error: 1.5px Ink plus a one-line message. Never red.
 * The 1.5px edge is drawn with an inset outline so the layout never shifts.
 */
export function fieldClasses(invalid: boolean, extra?: string): string {
  return cx(
    "w-full rounded-input border bg-surface px-3.5 text-input text-ink",
    "focus:border-primary focus:outline focus:outline-[1.5px] focus:-outline-offset-[1.5px] focus:outline-primary",
    invalid
      ? "border-ink outline outline-[1.5px] -outline-offset-[1.5px] outline-ink"
      : "border-hairline",
    extra,
  );
}

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  hintId: string;
  errorId: string;
  children: ReactNode;
}

export function Field({ id, label, hint, error, hintId, errorId, children }: FieldProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-label text-ink-muted">
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="text-row text-ink-secondary">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-row text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(
  hint: string | undefined,
  error: string | undefined,
  hintId: string,
  errorId: string,
) {
  if (error) return errorId;
  if (hint) return hintId;
  return undefined;
}
