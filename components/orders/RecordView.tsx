"use client";

import Link from "next/link";
import { CartLineRow } from "@/components/cart/CartLineRow";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TotalsBlock } from "@/components/ui/TotalsBlock";
import { VerificationSeal } from "@/components/vocabulary/VerificationSeal";
import { cartTotals } from "@/lib/cart";
import { formatDate, formatDateTime, rupees } from "@/lib/format";
import { PHARMACIST, orderLines, verifiedAt } from "@/lib/order-view";
import { useOrders } from "@/lib/orders";
import { useOrdersHydrated } from "@/lib/use-hydrated";

const licence = [
  "Dispensed by Sharma Medicos, B-12, Model Town, Ludhiana 141002. Drug licence no. PB-LDH-20/21-XXXXX.",
  "Pharmacist-in-charge: Anil Mehta, Registered Pharmacist, Reg no. PB-45821.",
];

/** A printable record of what was dispensed, by whom, under which licence. */
export function RecordView({ id }: { id: string }) {
  const hydrated = useOrdersHydrated();
  const order = useOrders((state) => state.orders.find((o) => o.id === id));

  if (!hydrated) {
    return (
      <div aria-hidden="true" className="h-40 rounded-card border border-hairline bg-surface" />
    );
  }
  if (!order) {
    return (
      <p className="text-body text-ink-secondary">
        We can&apos;t find this order on this device. If you placed it from another phone, open the
        link we sent there.
      </p>
    );
  }

  const lines = orderLines(order);
  const totals = cartTotals(lines);
  const verifiedDate = formatDate(verifiedAt(order));

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-h1 text-ink">Dispensing record</h1>
        <p className="text-body text-ink-secondary">
          Order {order.id} · placed {formatDateTime(order.createdAt)}
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-[200px_1fr] md:items-start">
        <div className="w-40 md:w-50">
          <VerificationSeal name={PHARMACIST.name} reg={PHARMACIST.reg} date={verifiedDate} />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-body text-ink">
            Checked by {PHARMACIST.name}, Registered Pharmacist, Reg no. {PHARMACIST.reg}, on{" "}
            {verifiedDate}.
          </p>
          {licence.map((line) => (
            <p key={line} className="text-row text-ink-secondary">
              {line}
            </p>
          ))}
        </div>
      </div>

      <Card className="flex flex-col gap-5">
        <ul className="flex flex-col divide-y divide-divider">
          {lines.map((line) => (
            <CartLineRow key={line.slug} line={line} />
          ))}
        </ul>
        <dl className="grid gap-3 text-row md:grid-cols-[140px_1fr]">
          <dt className="text-ink-muted">Delivery to</dt>
          <dd className="text-ink">
            {order.address.name}, {order.address.address}, {order.address.pincode}
          </dd>
        </dl>
        <TotalsBlock
          rows={[
            { label: "Medicines", value: rupees(totals.items) },
            { label: "Delivery", value: rupees(totals.delivery) },
          ]}
          total={{ label: "To pay", value: rupees(totals.toPay) }}
          footnote="GST invoice sent after delivery. No hidden charges."
        />
      </Card>

      <div className="flex flex-col gap-3 print:hidden md:flex-row md:items-center md:gap-6">
        <Button variant="secondary" onClick={() => window.print()}>
          Print or save as PDF
        </Button>
        <Link
          href={`/orders/${order.id}`}
          className="inline-flex min-h-11 items-center text-body font-medium text-primary hover:text-primary-pressed"
        >
          Order {order.id}
        </Link>
      </div>
    </div>
  );
}
