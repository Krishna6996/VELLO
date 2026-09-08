import type { Metadata } from "next";
import Link from "next/link";
import { MotionDemos } from "./MotionDemos";

export const metadata: Metadata = {
  title: "Motion · Styleguide",
};

export default function MotionPage() {
  return (
    <div className="mx-auto flex w-full max-w-page flex-col gap-8 px-6 py-12 md:px-10 md:py-16 lg:px-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-h1 text-ink">Motion</h1>
        <p className="max-w-measure text-body text-ink-muted">
          Every permitted transition, from lib/motion.ts. Opacity, a 4 to 8px translate,
          border-colour and background-colour. The seal and the dose dots are the two exceptions,
          each once. Under reduced motion every duration is zero.
        </p>
        <Link
          href="/styleguide"
          className="inline-flex min-h-11 items-center self-start text-row font-medium text-primary hover:text-primary-pressed"
        >
          Styleguide
        </Link>
      </header>
      <MotionDemos />
    </div>
  );
}
