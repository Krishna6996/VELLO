import { useId, type InputHTMLAttributes } from "react";
import { Field, describedBy, fieldClasses } from "@/components/ui/field";
import { cx } from "@/lib/cx";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  hint?: string;
  error?: string;
  id?: string;
}

export function Input({ label, hint, error, id, className, ...rest }: InputProps) {
  const generated = useId();
  const inputId = id ?? generated;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  return (
    <Field id={inputId} label={label} hint={hint} error={error} hintId={hintId} errorId={errorId}>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint, error, hintId, errorId)}
        className={cx(fieldClasses(Boolean(error), "h-13 md:h-12"), className)}
        {...rest}
      />
    </Field>
  );
}
