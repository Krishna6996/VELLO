"use client";

import { useState } from "react";

interface ShareLinkProps {
  title: string;
}

/** One quiet text link. Uses the device's share sheet where it exists, else copies the link. */
export function ShareLink({ title }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // The person closed the sheet; nothing to do.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex min-h-11 items-center px-1 text-body font-medium text-primary hover:text-primary-pressed"
    >
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
