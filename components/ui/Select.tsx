import { useId, type SelectHTMLAttributes } from "react";
import { Field, describedBy, fieldClasses } from "@/components/ui/field";
import { cx } from "@/lib/cx";

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  label: string;
  hint?: string;
  error?: string;
  id?: string;
}

export function Select({ label, hint, error, id, className, children, ...rest }: SelectProps) {
  const generated = useId();
  const selectId = id ?? generated;
  const hintId = `${selectId}-hint`;
  const errorId = `${selectId}-error`;

  return (
    <Field id={selectId} label={label} hint={hint} error={error} hintId={hintId} errorId={errorId}>
      <div className="relative">
        <select
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(hint, error, hintId, errorId)}
          className={cx(
            fieldClasses(Boolean(error), "h-(--control-h) appearance-none pr-10"),
            className,
          )}
          {...rest}
        >
          {children}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 stroke-primary"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 10l5 5 5-5" />
        </svg>
      </div>
    </Field>
  );
}
