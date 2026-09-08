"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { cx } from "@/lib/cx";

const KEY = "vello-pseudo-locale";
const EVENT = "vello:pseudo-locale";
const processed = new WeakSet<Text>();

/** Lengthens a string by about 30% and wraps it in brackets, as Hindi or Punjabi would. */
export function pseudo(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return text;
  const extra = Math.max(1, Math.ceil(trimmed.length * 0.3));
  // Padding in short words, the way Hindi and Punjabi actually grow, so lines can still wrap.
  const words: string[] = [];
  for (let left = extra; left > 0; left -= 4) words.push("ॲ".repeat(Math.min(4, left)));
  return text.replace(trimmed, `[${trimmed} ${words.join(" ")}]`);
}

function walk(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest("script, style, noscript, svg, [data-pseudo-skip]"))
        return NodeFilter.FILTER_REJECT;
      return node.nodeValue?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    if (processed.has(node)) continue;
    node.nodeValue = pseudo(node.nodeValue ?? "");
    processed.add(node);
  }
  for (const input of root instanceof Element || root instanceof Document
    ? root.querySelectorAll<HTMLInputElement>("input[placeholder]")
    : []) {
    if (!input.dataset.pseudoDone) {
      input.placeholder = pseudo(input.placeholder);
      input.dataset.pseudoDone = "1";
    }
  }
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

function read(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Development only. Lengthens every string on the page by 30% so cards,
 * buttons and tiles can be checked against Hindi and Punjabi before they exist.
 */
export function PseudoLocale() {
  const on = useSyncExternalStore(subscribe, read, () => false);
  const pathname = usePathname();

  useEffect(() => {
    if (!on) return;
    walk(document.body);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) walk(node);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [on, pathname]);

  function toggle() {
    const next = !on;
    try {
      localStorage.setItem(KEY, next ? "1" : "0");
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event(EVENT));
    if (!next) window.location.reload();
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      data-pseudo-skip
      onClick={toggle}
      className={cx(
        "inline-flex min-h-11 items-center gap-3 text-body text-ink-secondary hover:text-ink",
      )}
    >
      <span>Pseudo-locale (development only)</span>
      <span
        aria-hidden="true"
        className={cx(
          "motion-surface relative inline-flex h-6 w-10 shrink-0 items-center rounded-pill border",
          on ? "border-primary bg-primary" : "border-hairline bg-surface",
        )}
      >
        <span
          className={cx(
            "absolute top-0.5 size-4.5 rounded-pill",
            on ? "left-5 bg-surface" : "left-0.5 bg-ink-muted",
          )}
        />
      </span>
    </button>
  );
}
