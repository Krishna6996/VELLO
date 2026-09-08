"use client";

import { Button, buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RadioGroup, RadioRow } from "@/components/ui/RadioRow";
import type { Sku } from "@/lib/catalog/types";
import { formatDateTime, medicineLine, rupees } from "@/lib/format";
import type { RejectionReason } from "@/lib/orders";
import { buildRxLink } from "@/lib/whatsapp";

/**
 * Each hard state is one Card: what happened, what happens next, at most one
 * action. No illustration, no apology paragraph, no colour.
 */

interface RejectedCardProps {
  reason: RejectionReason;
  orderId: string;
  pincode?: string;
}

export function RejectedCard({ reason, orderId, pincode }: RejectedCardProps) {
  return (
    <Card className="flex max-w-list flex-col gap-4">
      <p className="text-body text-ink">
        We couldn&apos;t dispense this order because {reason}. Nothing has been charged. Send a
        clearer prescription on WhatsApp and a pharmacist will look at it right away.
      </p>
      <div>
        <a
          href={buildRxLink({ pincode, reference: orderId })}
          target="_blank"
          rel="noopener"
          className={buttonClasses("primary")}
        >
          Send a new prescription on WhatsApp
        </a>
      </div>
    </Card>
  );
}

interface OnHoldCardProps {
  held: Sku;
  substitute: Sku;
  onAccept: () => void;
  onDecline: () => void;
}

export function OnHoldCard({ held, substitute, onAccept, onDecline }: OnHoldCardProps) {
  return (
    <Card className="flex max-w-list flex-col gap-5">
      <p className="text-body text-ink">
        {held.brand} isn&apos;t in stock at the pharmacy right now. The pharmacist suggests{" "}
        {substitute.brand}, the same molecule at the same strength, at its printed MRP.
      </p>
      <RadioGroup value={substitute.slug} aria-label="Suggested equivalent">
        <RadioRow
          value={substitute.slug}
          label={substitute.brand}
          description={medicineLine(
            substitute.molecule,
            substitute.strength,
            substitute.form,
            substitute.packLabel,
          )}
          trailing={rupees(substitute.mrp)}
        />
      </RadioGroup>
      <div className="grid gap-3 md:grid-cols-2">
        <Button variant="secondary" fullWidth onClick={onAccept}>
          Yes, use this
        </Button>
        <Button variant="secondary" fullWidth onClick={onDecline}>
          No, cancel that line
        </Button>
      </div>
      <p className="text-legal text-ink-muted">The price shown is the printed MRP.</p>
    </Card>
  );
}

interface DelayedCardProps {
  newTime: string;
  rider: string;
}

export function DelayedCard({ newTime, rider }: DelayedCardProps) {
  return (
    <Card className="max-w-list">
      <p className="text-body text-ink">
        Running late. New time: {formatDateTime(newTime)}. {rider} will call when close.
      </p>
    </Card>
  );
}
