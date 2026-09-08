"use client";

import { useEffect, useRef } from "react";

export const HERO_SEARCH_ATTRIBUTE = "data-hero-search";

/**
 * Sits beside the hero search field. While the hero field is on screen the
 * header's field is hidden, so there is one search field in view at a time.
 */
export function HeroSearchSentinel() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const root = document.documentElement;
    const observer = new IntersectionObserver(
      ([entry]) => {
        root.setAttribute(HERO_SEARCH_ATTRIBUTE, entry.isIntersecting ? "visible" : "hidden");
      },
      { rootMargin: "-64px 0px 0px 0px" },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      root.removeAttribute(HERO_SEARCH_ATTRIBUTE);
    };
  }, []);

  return <span ref={ref} aria-hidden="true" className="block h-px w-px" />;
}
