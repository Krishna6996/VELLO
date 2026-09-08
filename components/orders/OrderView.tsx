"use client";

import Link from "next/link";
import { CartLineRow } from "@/components/cart/CartLineRow";
import { DelayedCard, OnHoldCard, RejectedCard } from "@/components/orders/OrderStates";
import { StampIn } from "@/components/motion/StampIn";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Timeline, type TimelineStep } from "@/components/ui/Timeline";
import { TotalsBlock } from "@/components/ui/TotalsBlock";
import { BlisterStrip } from "@/components/vocabulary/BlisterStrip";
import { IconWell } from "@/components/vocabulary/Glyph";
import { RiderGlyph } from "@/components/vocabulary/RiderGlyph";
import { VerificationSeal } from "@/components/vocabulary/VerificationSeal";
import { cartTotals } from "@/lib/cart";
import { formatDate, formatDateTime, rupees } from "@/lib/format";
import {
  PHARMACIST,
  RIDER,
  currentStep,
  orderLines,
  refillDays,
  stageTime,
  statusLine,
  timelineLabels,
  verifiedAt,
} from "@/lib/order-view";
import { getBySlug, getSubstitutes } from "@/lib/catalog/queries";
import {
  rejectionReasons,
  useOrders,
  type Order,
  type OrderStatus,
  type RejectionReason,
} from "@/lib/orders";
import { useOrdersHydrated } from "@/lib/use-hydrated";

const statuses: readonly OrderStatus[] = [
  "checking",
  "verified",
  "packing",
  "out-for-delivery",
  "delivered",
  "rejected",
  "on-hold",
];

const slotLabel = { today: "Today, by 8 pm", tomorrow: "Tomorrow, 10 am to 1 pm" } as const;
const paymentLabel = {
  cod: "Pay on delivery (cash or UPI)",
  "upi-after-check": "Pay by UPI link after the pharmacist verifies",
} as const;

function prescriptionLabel(order: Order): string {
  switch (order.prescription.via) {
    case "upload":
      return `Uploaded (${order.prescription.files.length} ${order.prescription.files.length === 1 ? "file" : "files"})`;
    case "whatsapp":
      return "Sent on WhatsApp";
    case "none":
      return "Not yet received";
  }
}

function NotFound() {
  return (
    <Card className="flex flex-col gap-3">
      <p className="text-body text-ink-secondary">
        We can&apos;t find this order on this device. If you placed it from another phone, open the
        link we sent there.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center self-start text-body font-medium text-primary hover:text-primary-pressed"
      >
        Vello
      </Link>
    </Card>
  );
}

export function OrderView({ id }: { id: string }) {
  const hydrated = useOrdersHydrated();
  const order = useOrders((state) => state.orders.find((o) => o.id === id));
  const setStatus = useOrders((state) => state.setStatus);
  const update = useOrders((state) => state.update);
  const resolveHold = useOrders((state) => state.resolveHold);

  if (!hydrated) {
    return (
      <div aria-hidden="true" className="flex flex-col gap-3">
        <div className="h-4 w-2/3 rounded-none bg-hairline" />
        <div className="h-4 w-1/2 rounded-none bg-hairline" />
        <div className="h-4 w-3/5 rounded-none bg-hairline" />
      </div>
    );
  }
  if (!order) return <NotFound />;

  const lines = orderLines(order);
  const totals = cartTotals(lines);
  const current = currentStep(order.status);
  const verifiedDate = formatDate(verifiedAt(order));
  const first = lines[0];
  const held = order.hold ? getBySlug(order.hold.slug) : undefined;
  const heldSubstitute = order.hold ? getBySlug(order.hold.substitute) : undefined;

  const steps: TimelineStep[] = timelineLabels.map((label, index) => {
    const step: TimelineStep = { label };
    if (index < current) step.time = formatDateTime(stageTime(order, index));
    if (index === 1 && current >= 1 && order.status !== "rejected" && order.status !== "on-hold") {
      step.aside = (
        <span className="flex flex-col gap-3">
          <StampIn immediate className="w-30">
            <VerificationSeal name={PHARMACIST.name} reg={PHARMACIST.reg} date={verifiedDate} />
          </StampIn>
          <span className="block max-w-measure text-row text-ink-secondary">
            Checked by {PHARMACIST.name}, Registered Pharmacist, Reg no. {PHARMACIST.reg}, on{" "}
            {verifiedDate}.
          </span>
        </span>
      );
    }
    if (index === 3 && order.status === "out-for-delivery") {
      step.aside = (
        <span className="flex items-center gap-3">
          <IconWell>
            <RiderGlyph />
          </IconWell>
          <span className="text-row text-ink-secondary">
            {RIDER} is bringing it. Plain packaging.
          </span>
        </span>
      );
    }
    if (index === 4 && order.status === "delivered" && first) {
      step.aside = (
        <span className="flex flex-col gap-5">
          <span className="block max-w-list rounded-hero border border-hairline bg-surface p-6">
            <BlisterStrip brand={first.sku.brand} molecule={first.sku.molecule} />
          </span>
          <Card className="flex max-w-list flex-col gap-3">
            <span className="text-card text-ink">After delivery</span>
            <ul className="flex flex-col divide-y divide-divider">
              {lines.map((line) => (
                <li key={line.slug} className="flex min-h-11 items-center">
                  <Link
                    href={`/medicines/${line.sku.slug}`}
                    className="text-body font-medium text-primary hover:text-primary-pressed"
                  >
                    Leaflet for {line.sku.brand}
                  </Link>
                </li>
              ))}
              <li className="flex min-h-11 items-center text-body text-ink-secondary">
                Set dose reminders
              </li>
              <li className="flex min-h-11 items-center text-body font-medium text-amber-ink">
                Refill in {refillDays(lines)} days
              </li>
            </ul>
          </Card>
        </span>
      );
    }
    return step;
  });

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-h1 text-ink">Order {order.id}</h1>
        <p className="text-body text-ink-secondary">{statusLine[order.status]}</p>
      </header>

      {order.status === "rejected" ? (
        <RejectedCard
          reason={order.rejectionReason ?? "the prescription was too unclear to read"}
          orderId={order.id}
          pincode={order.address.pincode}
        />
      ) : null}

      {order.status === "on-hold" && held && heldSubstitute ? (
        <OnHoldCard
          held={held}
          substitute={heldSubstitute}
          onAccept={() => resolveHold(order.id, true)}
          onDecline={() => resolveHold(order.id, false)}
        />
      ) : null}

      {order.status === "out-for-delivery" && order.delayedUntil ? (
        <DelayedCard newTime={order.delayedUntil} rider={RIDER} />
      ) : null}

      <Timeline steps={steps} current={current} className="max-w-list" />

      <Card className="flex max-w-list flex-col gap-5">
        <h2 className="text-section text-ink">Order details</h2>
        <ul className="flex flex-col divide-y divide-divider">
          {lines.map((line) => (
            <CartLineRow key={line.slug} line={line} />
          ))}
        </ul>
        <dl className="grid gap-3 text-row md:grid-cols-[140px_1fr]">
          <dt className="text-ink-muted">Delivery to</dt>
          <dd className="text-ink">
            {order.address.name}, {order.address.address}, {order.address.pincode}.{" "}
            {order.address.phone}
          </dd>
          <dt className="text-ink-muted">Slot</dt>
          <dd className="text-ink">{slotLabel[order.slot]}</dd>
          <dt className="text-ink-muted">Payment</dt>
          <dd className="text-ink">{paymentLabel[order.payment]}</dd>
          <dt className="text-ink-muted">Prescription</dt>
          <dd className="text-ink">{prescriptionLabel(order)}</dd>
        </dl>
        <TotalsBlock
          rows={[
            { label: "Medicines", value: rupees(totals.items) },
            { label: "Delivery", value: rupees(totals.delivery) },
          ]}
          total={{ label: "To pay", value: rupees(totals.toPay) }}
          footnote="GST invoice sent after delivery. No hidden charges."
        />
        {current >= 1 ? (
          <Link
            href={`/orders/${order.id}/record`}
            className="inline-flex min-h-11 items-center self-start text-body font-medium text-primary hover:text-primary-pressed"
          >
            Download dispensing record
          </Link>
        ) : null}
      </Card>

      {process.env.NODE_ENV === "development" ? (
        <div className="grid max-w-list gap-4 md:grid-cols-2">
          <Select
            label="Status (development only)"
            value={order.status}
            onChange={(event) => {
              const status = event.target.value as OrderStatus;
              if (status === "on-hold" && first) {
                const substitute = getSubstitutes(first.sku.slug).find((s) => s.inStock);
                update(order.id, {
                  status,
                  hold: substitute
                    ? { slug: first.sku.slug, substitute: substitute.slug }
                    : undefined,
                });
                return;
              }
              if (status === "out-for-delivery") {
                update(order.id, {
                  status,
                  delayedUntil: order.delayedUntil,
                });
                return;
              }
              setStatus(order.id, status);
            }}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
          {order.status === "rejected" ? (
            <Select
              label="Reason (development only)"
              value={order.rejectionReason ?? rejectionReasons[0]}
              onChange={(event) =>
                update(order.id, { rejectionReason: event.target.value as RejectionReason })
              }
            >
              {rejectionReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </Select>
          ) : null}
          {order.status === "out-for-delivery" ? (
            <Select
              label="Delay (development only)"
              value={order.delayedUntil ? "delayed" : "on-time"}
              onChange={(event) =>
                update(order.id, {
                  delayedUntil:
                    event.target.value === "delayed"
                      ? new Date(Date.now() + 45 * 60_000).toISOString()
                      : undefined,
                })
              }
            >
              <option value="on-time">on time</option>
              <option value="delayed">delayed</option>
            </Select>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
