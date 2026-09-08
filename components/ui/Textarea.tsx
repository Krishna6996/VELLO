import { useId, type TextareaHTMLAttributes } from "react";
import { Field, describedBy, fieldClasses } from "@/components/ui/field";
import { cx } from "@/lib/cx";

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  label: string;
  hint?: string;
  error?: string;
  id?: string;
}

export function Textarea({ label, hint, error, id, className, rows = 3, ...rest }: TextareaProps) {
  const generated = useId();
  const textareaId = id ?? generated;
  const hintId = `${textareaId}-hint`;
  const errorId = `${textareaId}-error`;

  return (
    <Field
      id={textareaId}
      label={label}
      hint={hint}
      error={error}
      hintId={hintId}
      errorId={errorId}
    >
      <textarea
        id={textareaId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint, error, hintId, errorId)}
        className={cx(fieldClasses(Boolean(error), "min-h-24 resize-y py-3"), className)}
        {...rest}
      />
    </Field>
  );
}
