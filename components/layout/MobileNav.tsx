"use client";

import Link from "next/link";
import { useState } from "react";
import { LargeTypeToggle } from "@/components/layout/LargeTypeToggle";
import { Sheet } from "@/components/ui/Sheet";
import type { NavLink } from "@/components/layout/nav";
import { cx } from "@/lib/cx";

interface MobileNavProps {
  links: readonly NavLink[];
  /** Show the menu on desktop too, when the inline nav doesn't fit. */
  alwaysVisible?: boolean;
}

export function MobileNav({ links, alwaysVisible = false }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cx(
          "-mr-2 inline-flex size-11 items-center justify-center rounded-input text-primary hover:bg-sage",
          !alwaysVisible && "lg:hidden",
        )}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M4 8h16M4 16h16" />
        </svg>
      </button>

      <Sheet open={open} onOpenChange={setOpen} title="Vello">
        <nav aria-label="Main">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href} className="border-b border-divider last:border-b-0">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center text-body font-medium text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-2 border-t border-divider pt-2">
          <LargeTypeToggle />
        </div>
      </Sheet>
    </>
  );
}
