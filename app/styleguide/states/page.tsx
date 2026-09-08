import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBySlug, getSubstitutes } from "@/lib/catalog/queries";
import { StateDemos } from "./StateDemos";

export const metadata: Metadata = {
  title: "States · Styleguide",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/** The demo's new delivery time: this evening at 7:45 pm. Computed once, outside render. */
const demoDelay = new Date();
demoDelay.setHours(19, 45, 0, 0);
const demoDelayIso = demoDelay.toISOString();

export default function StatesPage() {
  const held = getBySlug("glycomet-500-sr");
  const substitute = held ? getSubstitutes(held.slug).find((s) => s.inStock) : undefined;
  const outOfStock = getBySlug("glycomet-850");
  if (!held || !substitute || !outOfStock) notFound();

  return (
    <div className="mx-auto flex w-full max-w-page flex-col gap-10 px-6 py-12 md:px-10 md:py-16 lg:px-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-h1 text-ink">States</h1>
        <p className="max-w-measure text-body text-ink-muted">
          Every empty and failure state. Each is one Card: what happened, what happens next, at most
          one action. No illustration on catalog, search, cart or checkout; a spot illustration only
          on the empty cart and on delivered.
        </p>
        <Link
          href="/styleguide"
          className="inline-flex min-h-11 items-center self-start text-row font-medium text-primary hover:text-primary-pressed"
        >
          Styleguide
        </Link>
      </header>
      <StateDemos
        held={held}
        substitute={substitute}
        outOfStock={outOfStock}
        delayedUntil={demoDelayIso}
      />
    </div>
  );
}
