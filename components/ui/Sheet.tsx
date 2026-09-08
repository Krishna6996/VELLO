"use client";

import { useEffect, useId, useRef, type MouseEvent, type ReactNode } from "react";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * Bottom sheet on mobile, right panel from 768px. Surface, hairline, 18px
 * radius on the open edge, no shadow. Built on the native dialog element so
 * focus, Escape and the top layer come from the browser.
 */
export function Sheet({ open, onClose, title, children }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="fixed inset-x-0 top-auto bottom-0 m-0 max-h-[85vh] w-full max-w-none rounded-t-hero border-t border-hairline bg-surface p-0 text-ink backdrop:bg-ink/20 open:flex open:flex-col md:inset-y-0 md:right-0 md:left-auto md:h-full md:max-h-none md:w-90 md:rounded-l-hero md:rounded-tr-none md:border-t-0 md:border-l"
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-divider px-6">
        <h2 id={titleId} className="text-card text-ink">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
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
        </button>
      </div>
      <div className="overflow-y-auto px-6 py-4">{children}</div>
    </dialog>
  );
}
