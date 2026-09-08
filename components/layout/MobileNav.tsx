"use client";

import Link from "next/link";
import { useState } from "react";
import { Sheet } from "@/components/ui/Sheet";
import type { NavLink } from "@/components/layout/nav";

interface MobileNavProps {
  links: readonly NavLink[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-input text-primary hover:bg-sage md:hidden"
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
      </Sheet>
    </>
  );
}
