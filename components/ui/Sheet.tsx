"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** One sentence read to screen readers under the title. Rendered when given. */
  description?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Bottom sheet on mobile, right panel from 768px. Surface, a hairline, 18px
 * radius on the open edge, no shadow.
 */
export function Sheet({ open, onOpenChange, title, description, children, className }: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-ink/20" />
        <Dialog.Content
          {...(description ? {} : { "aria-describedby": undefined })}
          className={cx(
            "fixed inset-x-0 bottom-0 z-30 flex max-h-[85vh] flex-col border-t border-hairline bg-surface text-ink rounded-t-hero",
            "md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-90 md:rounded-l-hero md:rounded-tr-none md:border-t-0 md:border-l",
            className,
          )}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-divider px-6">
            <Dialog.Title className="text-card text-ink">{title}</Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="-mr-3 inline-flex size-11 items-center justify-center rounded-input text-primary hover:bg-sage"
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
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </Dialog.Close>
          </div>
          {description ? (
            <Dialog.Description className="px-6 pt-4 text-body text-ink-secondary">
              {description}
            </Dialog.Description>
          ) : null}
          <div className="overflow-y-auto px-6 py-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
