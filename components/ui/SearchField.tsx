"use client";

import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { MedicineCard } from "@/components/catalog/MedicineCard";
import { ConcernIcon } from "@/components/vocabulary/ConcernIcon";
import { IconWell } from "@/components/vocabulary/Glyph";
import type { Concern, Sku } from "@/lib/catalog/types";
import { cx } from "@/lib/cx";
import { search, type MoleculeResult } from "@/lib/search";

interface SearchFieldProps {
  placeholder: string;
  /** header: 44px in the sticky header. hero: 56px, the landing page's primary action. */
  variant?: "header" | "hero";
  id?: string;
  className?: string;
}

type Option =
  | { kind: "brand"; key: string; href: string; sku: Sku }
  | { kind: "molecule"; key: string; href: string; molecule: MoleculeResult }
  | { kind: "concern"; key: string; href: string; concern: Concern };

const LIMITS = { brands: 5, molecules: 3, concerns: 2 } as const;

function searchHref(query: string): string {
  return `/search?q=${encodeURIComponent(query.trim())}`;
}

function subscribeToHistory(onChange: () => void): () => void {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function readLocationSearch(): string {
  return window.location.search;
}

/**
 * The search field, with results from the second character. Results replace
 * instantly, grouped as Brands, Molecules and Concerns. Arrows move, Enter
 * follows, Escape closes; Enter with nothing highlighted opens /search.
 */
export function SearchField({
  placeholder,
  variant = "header",
  id = "header-search",
  className,
}: SearchFieldProps) {
  const router = useRouter();
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);
  const [typed, setTyped] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  // Until something is typed, a /search page fills the field from its URL. It never clears itself.
  const locationSearch = useSyncExternalStore(subscribeToHistory, readLocationSearch, () => "");
  const urlQuery =
    pathname === "/search" ? (new URLSearchParams(locationSearch).get("q") ?? "") : "";
  const query = typed ?? urlQuery;
  const setQuery = setTyped;

  const results = useMemo(
    () => (query.trim().length >= 2 ? search(query, LIMITS.brands) : null),
    [query],
  );

  const options = useMemo<Option[]>(() => {
    if (!results) return [];
    return [
      ...results.brands.slice(0, LIMITS.brands).map<Option>((sku) => ({
        kind: "brand",
        key: `b-${sku.slug}`,
        href: `/medicines/${sku.slug}`,
        sku,
      })),
      ...results.molecules.slice(0, LIMITS.molecules).map<Option>((molecule) => ({
        kind: "molecule",
        key: `m-${molecule.molecule}`,
        href: searchHref(molecule.molecule),
        molecule,
      })),
      ...results.concerns.slice(0, LIMITS.concerns).map<Option>((concern) => ({
        kind: "concern",
        key: `c-${concern.slug}`,
        href: `/concerns/${concern.slug}`,
        concern,
      })),
    ];
  }, [results]);

  const listId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${index}`;
  const showPopover = open && results !== null;

  function go(href: string) {
    setOpen(false);
    setActive(-1);
    router.push(href);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (active >= 0 && options[active]) {
      go(options[active].href);
      return;
    }
    if (query.trim().length === 0) return;
    go(searchHref(query));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!results) return;
      setOpen(true);
      setActive((current) => (options.length ? (current + 1) % options.length : -1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!results) return;
      setOpen(true);
      setActive((current) =>
        options.length ? (current <= 0 ? options.length - 1 : current - 1) : -1,
      );
    } else if (event.key === "Escape") {
      if (showPopover) {
        event.preventDefault();
        setOpen(false);
        setActive(-1);
      }
    }
  }

  return (
    <Popover.Root open={showPopover} onOpenChange={setOpen}>
      <Popover.Anchor asChild>
        <form
          ref={formRef}
          role="search"
          action="/search"
          method="get"
          onSubmit={handleSubmit}
          className={cx("flex items-center", className)}
        >
          <label htmlFor={id} className="sr-only">
            Search
          </label>
          <input
            id={id}
            type="search"
            name="q"
            value={query}
            placeholder={placeholder}
            autoComplete="off"
            role="combobox"
            aria-expanded={showPopover}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={active >= 0 && showPopover ? optionId(active) : undefined}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(-1);
              setOpen(event.target.value.trim().length >= 2);
            }}
            onFocus={() => {
              if (query.trim().length >= 2) setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            className={cx(
              "w-full rounded-input border border-hairline bg-surface text-ink focus:border-primary focus:outline focus:outline-[1.5px] focus:-outline-offset-[1.5px] focus:outline-primary [&::-webkit-search-cancel-button]:hidden",
              variant === "hero" ? "h-14 px-4 text-input" : "h-11 px-3.5 text-body",
            )}
          />
        </form>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          collisionPadding={16}
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
          onInteractOutside={(event) => {
            if (formRef.current?.contains(event.target as Node)) event.preventDefault();
          }}
          className="z-30 w-[var(--radix-popover-trigger-width)] min-w-80 rounded-card border border-hairline bg-surface p-2 md:w-[max(var(--radix-popover-trigger-width),400px)]"
        >
          {results ? (
            <div
              id={listId}
              role="listbox"
              aria-label="Search results"
              className="flex max-h-[70vh] flex-col gap-2 overflow-y-auto"
            >
              {results.empty ? (
                <p className="px-3 py-2.5 text-body text-ink-secondary">
                  We don&apos;t stock {results.query} yet.
                </p>
              ) : null}
              <Group label="Brands" show={results.brands.length > 0}>
                {options
                  .map((option, index) => ({ option, index }))
                  .filter(({ option }) => option.kind === "brand")
                  .map(({ option, index }) =>
                    option.kind === "brand" ? (
                      <MedicineCard
                        key={option.key}
                        sku={option.sku}
                        compact
                        role="option"
                        tabIndex={-1}
                        id={optionId(index)}
                        active={index === active}
                        onMouseEnter={() => setActive(index)}
                      />
                    ) : null,
                  )}
              </Group>
              <Group label="Molecules" show={results.molecules.length > 0}>
                {options
                  .map((option, index) => ({ option, index }))
                  .filter(({ option }) => option.kind === "molecule")
                  .map(({ option, index }) =>
                    option.kind === "molecule" ? (
                      <Row
                        key={option.key}
                        href={option.href}
                        id={optionId(index)}
                        active={index === active}
                        onMouseEnter={() => setActive(index)}
                      >
                        <span className="text-body text-ink">
                          {option.molecule.molecule} · {option.molecule.count}{" "}
                          {option.molecule.count === 1 ? "medicine" : "medicines"}
                        </span>
                      </Row>
                    ) : null,
                  )}
              </Group>
              <Group label="Concerns" show={results.concerns.length > 0}>
                {options
                  .map((option, index) => ({ option, index }))
                  .filter(({ option }) => option.kind === "concern")
                  .map(({ option, index }) =>
                    option.kind === "concern" ? (
                      <Row
                        key={option.key}
                        href={option.href}
                        id={optionId(index)}
                        active={index === active}
                        onMouseEnter={() => setActive(index)}
                      >
                        <IconWell>
                          <ConcernIcon concern={option.concern.slug} />
                        </IconWell>
                        <span className="text-body text-ink">{option.concern.title}</span>
                      </Row>
                    ) : null,
                  )}
              </Group>
            </div>
          ) : null}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function Group({ label, show, children }: { label: string; show: boolean; children: ReactNode }) {
  if (!show) return null;
  return (
    <div role="group" aria-label={label} className="flex flex-col gap-0.5">
      <p aria-hidden="true" className="px-3 pt-1.5 pb-1 text-label text-ink-muted">
        {label}
      </p>
      {children}
    </div>
  );
}

interface RowProps {
  href: string;
  id: string;
  active: boolean;
  onMouseEnter: () => void;
  children: ReactNode;
}

function Row({ href, id, active, onMouseEnter, children }: RowProps) {
  return (
    <Link
      href={href}
      id={id}
      role="option"
      tabIndex={-1}
      aria-selected={active}
      onMouseEnter={onMouseEnter}
      className={cx(
        "flex min-h-11 items-center gap-3 rounded-well px-3 py-2 hover:bg-sage",
        active && "bg-sage",
      )}
    >
      {children}
    </Link>
  );
}
