import type { Metadata } from "next";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Timeline } from "@/components/ui/Timeline";
import { QrCode } from "@/components/whatsapp/QrCode";
import { buildRxLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Order on WhatsApp · Vello",
  description:
    "Send a photo of your prescription or just the names. A pharmacist replies within 15 minutes, 8 am to 10 pm.",
};

const whatYouCanSend = [
  "A photo of your prescription",
  "A list of medicine names",
  "A question for the pharmacist",
];

const nextSteps = [
  { label: "We reply within 15 minutes, 8 am to 10 pm" },
  { label: "A pharmacist checks the prescription" },
  { label: "You confirm the order and the price" },
  { label: "Delivered in hours" },
];

export default function WhatsAppPage() {
  const href = buildRxLink();

  return (
    <div className="mx-auto flex w-full max-w-page flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-16 lg:px-12">
      <div className="flex w-full max-w-list flex-col gap-8">
        <h1 className="text-h1 text-ink">Order on WhatsApp</h1>

        <ul className="flex flex-col gap-3" aria-label="What you can send">
          {whatYouCanSend.map((row) => (
            <li key={row}>
              <Card className="text-body font-medium text-ink">{row}</Card>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <div>
            <a href={href} target="_blank" rel="noopener" className={buttonClasses("primary")}>
              Open WhatsApp
            </a>
          </div>
          <figure className="hidden flex-col items-center gap-2 md:flex">
            <QrCode value={href} size={120} label="QR code that opens WhatsApp" />
            <figcaption className="text-legal text-ink-muted">Scan to open WhatsApp</figcaption>
          </figure>
        </div>
      </div>

      <section aria-labelledby="next-head" className="flex w-full max-w-list flex-col gap-6">
        <h2 id="next-head" className="text-section text-ink">
          How it works
        </h2>
        <Timeline steps={nextSteps} current={nextSteps.length - 1} />
        <p className="text-body text-ink-secondary">Pharmacy hours: 8 am to 10 pm, every day.</p>
      </section>
    </div>
  );
}
