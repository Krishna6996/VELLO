import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { QrCode } from "@/components/whatsapp/QrCode";
import type { Sku } from "@/lib/catalog/types";
import { cx } from "@/lib/cx";
import {
  buildNotServiceableLink,
  buildOrderLink,
  buildRxLink,
  buildSearchMissLink,
  type OrderLine,
} from "@/lib/whatsapp";

export type WhatsAppContext =
  | { kind: "landing" }
  | { kind: "search-miss"; query: string }
  | { kind: "out-of-stock"; sku: Sku; qty?: number }
  | { kind: "not-serviceable"; pincode: string }
  | { kind: "cart"; lines: readonly OrderLine[]; pincode?: string };

interface WhatsAppOrderCardProps {
  context: WhatsAppContext;
  /** Renders the heading as this level. Defaults to h2. */
  headingLevel?: "h1" | "h2";
  className?: string;
}

interface CardCopy {
  heading?: string;
  line: string;
  button: string;
  href: string;
}

const replyLine =
  "Send a photo of your prescription or just the names. A pharmacist replies within 15 minutes, 8 am to 10 pm.";

function copyFor(context: WhatsAppContext): CardCopy {
  switch (context.kind) {
    case "landing":
      return {
        heading: "Prefer WhatsApp?",
        line: replyLine,
        button: "Send prescription on WhatsApp",
        href: buildRxLink(),
      };
    case "search-miss":
      return {
        heading: `We don't stock ${context.query} yet.`,
        line: "Send your prescription on WhatsApp and a pharmacist will try to source it for you.",
        button: "Send on WhatsApp",
        href: buildSearchMissLink(context.query),
      };
    case "out-of-stock":
      return {
        line: "Not in stock right now. Send it on WhatsApp and we'll tell you when it's back, or pick an equivalent below.",
        button: "Order on WhatsApp",
        href: buildOrderLink([
          { brand: context.sku.brand, strength: context.sku.strength, qty: context.qty ?? 1 },
        ]),
      };
    case "not-serviceable":
      return {
        line: `We don't deliver to ${context.pincode} yet. Send your prescription on WhatsApp and we'll tell you as soon as we do.`,
        button: "Send on WhatsApp",
        href: buildNotServiceableLink(context.pincode),
      };
    case "cart":
      return {
        heading: "Prefer WhatsApp?",
        line: replyLine,
        button: "Order this on WhatsApp",
        href: buildOrderLink(context.lines, context.pincode),
      };
  }
}

/**
 * The second front door. One Card, not a bubble: heading, one line, a primary
 * button, and on desktop a QR to scan. Copy varies by context.
 */
export function WhatsAppOrderCard({
  context,
  headingLevel = "h2",
  className,
}: WhatsAppOrderCardProps) {
  const copy = copyFor(context);
  const Heading = headingLevel;
  return (
    <Card
      hero
      className={cx("flex flex-col gap-6 md:flex-row md:items-center md:gap-10", className)}
    >
      <div className="flex flex-1 flex-col gap-4">
        {copy.heading ? <Heading className="text-section text-ink">{copy.heading}</Heading> : null}
        <p className="max-w-measure text-body text-ink-secondary">{copy.line}</p>
        <div>
          <a href={copy.href} target="_blank" rel="noopener" className={buttonClasses("primary")}>
            {copy.button}
          </a>
        </div>
      </div>
      <figure className="hidden shrink-0 flex-col items-center gap-2 md:flex">
        <QrCode value={copy.href} size={120} label="QR code that opens WhatsApp" />
        <figcaption className="text-legal text-ink-muted">Scan to open WhatsApp</figcaption>
      </figure>
    </Card>
  );
}
