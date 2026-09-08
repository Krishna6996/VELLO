import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { ReassuranceBlock } from "@/components/ui/ReassuranceBlock";
import { Timeline } from "@/components/ui/Timeline";
import { VerificationSeal } from "@/components/vocabulary/VerificationSeal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How Vello works",
  description:
    "Search a medicine or send a prescription. A registered pharmacist checks it. Delivered in hours, exactly as prescribed, from a licensed local pharmacy.",
  path: "/how-it-works",
});

const steps = [
  {
    label: "Search a medicine or send a prescription",
    sub: "On the website or on WhatsApp. Either is fine.",
  },
  {
    label: "A registered pharmacist checks it",
    sub: "Every prescription order is verified by a licensed pharmacist before anything is dispensed. You'll see their name and registration number.",
  },
  {
    label: "Delivered in hours, exactly as prescribed",
    sub: "From a licensed local pharmacy, in plain packaging. Nothing is swapped without your OK.",
  },
];

const licence = [
  "Dispensed by Sharma Medicos, B-12, Model Town, Ludhiana 141002. Drug licence no. PB-LDH-20/21-XXXXX.",
  "Pharmacist-in-charge: Anil Mehta, Registered Pharmacist, Reg no. PB-45821.",
  "Grievance officer: [name], grievance@vello.in. We respond within 48 hours.",
  "[Legal entity name] Private Limited. Registered office: DLF Prime Tower, Okhla, New Delhi.",
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto flex w-full max-w-page flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-16 lg:px-12">
      <h1 className="text-h1 text-ink">How Vello works</h1>

      <Timeline steps={steps} current={2} className="md:hidden" />
      <Timeline steps={steps} current={2} orientation="horizontal" className="hidden md:flex" />

      <section aria-labelledby="pharmacist-head" className="flex flex-col gap-5">
        <h2 id="pharmacist-head" className="text-section text-ink">
          The pharmacist
        </h2>
        <Card className="flex max-w-list flex-col gap-5 md:flex-row md:items-center md:gap-8">
          <div className="w-30 shrink-0">
            <VerificationSeal name="Anil Mehta" reg="PB-45821" date="8 Sep 2026" />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-body text-ink">
              Every prescription order is verified by a licensed pharmacist before anything is
              dispensed. You&apos;ll see their name and registration number.
            </p>
            <p className="text-row text-ink-secondary">
              Pharmacist-in-charge: Anil Mehta, Registered Pharmacist, Reg no. PB-45821.
            </p>
          </div>
        </Card>
      </section>

      <section aria-labelledby="price-head" className="flex flex-col gap-5">
        <h2 id="price-head" className="text-section text-ink">
          The price
        </h2>
        <ReassuranceBlock className="max-w-list">
          Prices are printed MRPs. GST invoice sent after delivery. No hidden charges.
        </ReassuranceBlock>
      </section>

      <section aria-labelledby="licence-head" className="flex flex-col gap-5">
        <h2 id="licence-head" className="text-section text-ink">
          The licence
        </h2>
        <div className="flex max-w-list flex-col gap-3">
          {licence.map((line) => (
            <p key={line} className="text-body text-ink-secondary">
              {line}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
