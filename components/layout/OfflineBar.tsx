"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void): () => void {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}

function isOffline(): boolean {
  return !navigator.onLine;
}

interface OfflineBarProps {
  /** Shows the bar regardless of the connection, for the styleguide. */
  forceVisible?: boolean;
}

/** One line under the header: hairline, canvas, no colour. */
export function OfflineBar({ forceVisible = false }: OfflineBarProps) {
  const offline = useSyncExternalStore(subscribe, isOffline, () => false);
  if (!offline && !forceVisible) return null;
  return (
    <div role="status" className="border-b border-hairline bg-canvas">
      <p className="mx-auto w-full max-w-page px-6 py-2.5 text-row text-ink-secondary md:px-10 lg:px-12">
        You&apos;re offline. We&apos;ll retry when you&apos;re back.
      </p>
    </div>
  );
}
