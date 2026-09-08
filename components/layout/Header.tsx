"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { CartEntry } from "@/components/cart/CartEntry";
import { MobileNav } from "@/components/layout/MobileNav";
import { primaryNav, whatsappNav } from "@/components/layout/nav";
import { Wordmark } from "@/components/layout/Wordmark";
import { SearchField } from "@/components/ui/SearchField";
import { cx } from "@/lib/cx";

/**
 * 64px, sticky, canvas, hairline. The nav sits in the middle when it fits and
 * folds into the sheet when it doesn't, so a language 30% longer than English
 * gets the same header without anything overflowing.
 */
export function Header() {
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const observer = useRef<ResizeObserver | null>(null);

  function observe(node: HTMLElement | null) {
    observer.current?.disconnect();
    observer.current = null;
    if (!node) return;
    const measure = () => {
      const list = listRef.current;
      if (!list) return;
      setCollapsed(list.scrollWidth > node.clientWidth + 1);
    };
    observer.current = new ResizeObserver(measure);
    observer.current.observe(node);
    observer.current.observe(document.body);
    measure();
  }

  return (
    <header className="sticky top-0 z-10 border-b border-hairline bg-canvas print:hidden">
      <div className="mx-auto flex h-16 w-full max-w-page items-center gap-3 px-6 md:px-10 lg:gap-6 lg:px-12">
        <Wordmark />

        <nav
          ref={(node) => {
            navRef.current = node;
            observe(node);
          }}
          aria-label="Main"
          aria-hidden={collapsed || undefined}
          className="hidden min-w-0 flex-1 justify-center overflow-hidden lg:flex"
        >
          <ul ref={listRef} className={cx("flex items-center gap-1", collapsed && "invisible")}>
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  tabIndex={collapsed ? -1 : undefined}
                  className="inline-flex min-h-11 items-center rounded-input px-3 text-body font-medium whitespace-nowrap text-ink-secondary hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 lg:flex-none lg:gap-4">
          <SearchField
            placeholder="Search a medicine or molecule"
            className="w-full lg:w-64 [[data-hero-search=visible]_&]:invisible"
          />
          <Link
            href={whatsappNav.href}
            className="hidden min-h-11 shrink-0 items-center text-body font-medium whitespace-nowrap text-primary hover:text-primary-pressed lg:inline-flex"
          >
            {whatsappNav.label}
          </Link>
          <CartEntry />
          <MobileNav links={[...primaryNav, whatsappNav]} alwaysVisible={collapsed} />
        </div>
      </div>
    </header>
  );
}
