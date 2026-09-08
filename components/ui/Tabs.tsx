"use client";

import * as RadixTabs from "@radix-ui/react-tabs";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";

type TabsProps = ComponentPropsWithoutRef<typeof RadixTabs.Root>;
type TabListProps = ComponentPropsWithoutRef<typeof RadixTabs.List>;
type TabPanelProps = ComponentPropsWithoutRef<typeof RadixTabs.Content>;

export function Tabs(props: TabsProps) {
  return <RadixTabs.Root {...props} />;
}

export function TabList({ className, ...rest }: TabListProps) {
  return <RadixTabs.List className={cx("flex flex-wrap gap-2", className)} {...rest} />;
}

interface TabProps {
  value: string;
  label: string;
  /** One letter shown in a 24px avatar, for family tabs. */
  initial?: string;
  disabled?: boolean;
}

/** Pill tab. Selected is a solid Primary pill with Surface text; nothing else changes. */
export function Tab({ value, label, initial, disabled }: TabProps) {
  return (
    <RadixTabs.Trigger
      value={value}
      disabled={disabled}
      className={cx(
        "group inline-flex min-h-11 items-center gap-2 rounded-pill border border-hairline bg-surface py-1.5 pr-4 text-row font-semibold text-ink-secondary md:min-h-10",
        initial ? "pl-1.5" : "pl-4",
        "data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-surface",
      )}
    >
      {initial ? (
        <span
          aria-hidden="true"
          className="flex size-6 items-center justify-center rounded-pill bg-sage text-legal font-semibold text-primary group-data-[state=active]:bg-surface"
        >
          {initial}
        </span>
      ) : null}
      {label}
    </RadixTabs.Trigger>
  );
}

export function TabPanel({ className, ...rest }: TabPanelProps) {
  return <RadixTabs.Content className={cx("pt-4", className)} {...rest} />;
}
