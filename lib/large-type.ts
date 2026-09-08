import { useSyncExternalStore } from "react";

import { LARGE_TYPE_CLASS, LARGE_TYPE_KEY } from "@/lib/large-type-boot";

const EVENT = "vello:large-type";

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function read(): boolean {
  return document.documentElement.classList.contains(LARGE_TYPE_CLASS);
}

export function setLargeType(on: boolean): void {
  document.documentElement.classList.toggle(LARGE_TYPE_CLASS, on);
  try {
    localStorage.setItem(LARGE_TYPE_KEY, on ? "1" : "0");
  } catch {
    // Storage may be unavailable; the class still applies for this page.
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Whether large type is on. False during SSR. */
export function useLargeType(): [boolean, (on: boolean) => void] {
  const on = useSyncExternalStore(subscribe, read, () => false);
  return [on, setLargeType];
}
