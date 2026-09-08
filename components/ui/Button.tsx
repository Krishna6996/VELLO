import type { ButtonHTMLAttributes } from "react";
import { cx } from "@/lib/cx";

export type ButtonVariant = "primary" | "secondary" | "quiet";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  /** Replaces the label with "Working". No spinner. */
  loading?: boolean;
}

const base =
  "motion-bg inline-flex min-h-(--control-h) items-center justify-center gap-2 rounded-input px-4 py-3 text-center text-button disabled:cursor-default";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-surface hover:bg-primary-pressed disabled:bg-primary disabled:hover:bg-primary",
  secondary: "border border-hairline bg-surface text-ink hover:bg-sage disabled:hover:bg-surface",
  quiet: "px-2 text-primary hover:text-primary-pressed disabled:hover:text-primary",
};

/** Class list for elements that should look like a Button, such as a Link. */
export function buttonClasses(variant: ButtonVariant = "primary", fullWidth = false): string {
  return cx(base, variants[variant], fullWidth ? "w-full" : "w-full md:w-auto");
}

export function Button({
  variant = "primary",
  fullWidth = false,
  loading = false,
  disabled,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(buttonClasses(variant, fullWidth), className)}
      {...rest}
    >
      {loading ? "Working" : children}
    </button>
  );
}
