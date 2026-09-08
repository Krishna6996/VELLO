"use client";

import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { selectedEdge } from "@/components/ui/Card";
import { cx } from "@/lib/cx";

type RadioGroupProps = ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>;

/** Wraps Radix RadioGroup.Root. Pass aria-label or aria-labelledby. */
export function RadioGroup({ className, ...rest }: RadioGroupProps) {
  return <RadixRadioGroup.Root className={cx("flex flex-col gap-3", className)} {...rest} />;
}

interface RadioRowProps {
  value: string;
  label: string;
  /** One line under the label, in Ink muted. */
  description?: string;
  /** Right-aligned content, for example a price. Same weight as the label. */
  trailing?: ReactNode;
  disabled?: boolean;
}

/**
 * A full-width choice row. Every option carries identical weight; selection is
 * a filled radio and a 1.5px Primary edge, and nothing else changes.
 */
export function RadioRow({ value, label, description, trailing, disabled }: RadioRowProps) {
  return (
    <RadixRadioGroup.Item
      value={value}
      disabled={disabled}
      className={cx(
        "group flex w-full items-center gap-3 rounded-card border border-hairline bg-surface p-4 text-left text-ink md:p-5",
        "data-[state=checked]:border-primary",
        selectedEdge,
        "after:hidden data-[state=checked]:after:block",
      )}
    >
      <span
        aria-hidden="true"
        className="flex size-5 shrink-0 items-center justify-center rounded-pill border-[1.5px] border-ink-faint bg-surface group-data-[state=checked]:border-primary group-data-[state=checked]:bg-primary"
      >
        <RadixRadioGroup.Indicator className="block size-2 rounded-pill bg-surface" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-body font-medium">{label}</span>
        {description ? <span className="text-row text-ink-muted">{description}</span> : null}
      </span>
      {trailing ? <span className="shrink-0 text-body font-medium">{trailing}</span> : null}
    </RadixRadioGroup.Item>
  );
}
