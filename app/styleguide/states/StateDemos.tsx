"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { RxUpload, uploadFailedLine } from "@/components/checkout/RxUpload";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { OfflineBar } from "@/components/layout/OfflineBar";
import { DelayedCard, OnHoldCard, RejectedCard } from "@/components/orders/OrderStates";
import { Card } from "@/components/ui/Card";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { WhatsAppOrderCard } from "@/components/whatsapp/WhatsAppOrderCard";
import type { Sku } from "@/lib/catalog/types";
import { RIDER } from "@/lib/order-view";

interface StateDemosProps {
  held: Sku;
  substitute: Sku;
  outOfStock: Sku;
  /** ISO time, computed on the server so the render stays pure. */
  delayedUntil: string;
}

function State({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`state-${n}`} className="flex flex-col gap-4">
      <h2 id={`state-${n}`} className="text-section text-ink">
        {n}. {title}
      </h2>
      {children}
    </section>
  );
}

export function StateDemos({ held, substitute, outOfStock, delayedUntil }: StateDemosProps) {
  const [holdAnswer, setHoldAnswer] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="flex flex-col gap-14">
      <State n={1} title="Prescription rejected">
        <RejectedCard
          reason="the doctor's name or registration number is missing"
          orderId="VL-20817"
          pincode="141002"
        />
      </State>

      <State n={2} title="On hold, medicine not in stock at the pharmacy">
        {holdAnswer ? (
          <Card className="max-w-list">
            <p className="text-body text-ink">{holdAnswer}</p>
          </Card>
        ) : (
          <OnHoldCard
            held={held}
            substitute={substitute}
            onAccept={() => setHoldAnswer("Verified. Being packed now.")}
            onDecline={() =>
              setHoldAnswer("That line has been cancelled. Nothing has been charged for it.")
            }
          />
        )}
      </State>

      <State n={3} title="Delivery delayed">
        <DelayedCard newTime={delayedUntil} rider={RIDER} />
      </State>

      <State n={4} title="Pincode not serviceable">
        <WhatsAppOrderCard context={{ kind: "not-serviceable", pincode: "110001" }} />
      </State>

      <State n={5} title="Search empty">
        <WhatsAppOrderCard context={{ kind: "search-miss", query: "wegovy" }} />
      </State>

      <State n={6} title="Out of stock">
        <WhatsAppOrderCard context={{ kind: "out-of-stock", sku: outOfStock }} />
      </State>

      <State n={7} title="Cart empty">
        <Card className="flex max-w-90 flex-col gap-3">
          <p className="text-card text-ink">Nothing here yet.</p>
          <p className="text-body text-ink-secondary">
            Search a medicine or send a prescription on WhatsApp.
          </p>
          <Link
            href="/medicines"
            className="inline-flex min-h-11 items-center self-start text-body font-medium text-primary hover:text-primary-pressed"
          >
            Medicines
          </Link>
          <PhotoPlaceholder
            aspect="4/3"
            caption="A folded prescription on a kitchen table beside a pair of reading glasses"
            className="mt-2"
          />
        </Card>
      </State>

      <State n={8} title="Upload failed">
        <div className="max-w-list">
          <RxUpload files={files} onChange={setFiles} initialError={uploadFailedLine} />
        </div>
      </State>

      <State n={9} title="Offline">
        <div className="overflow-hidden rounded-card border border-hairline">
          <OfflineBar forceVisible />
        </div>
      </State>

      <State n={10} title="404">
        <NotFoundContent headingLevel="h2" />
      </State>
    </div>
  );
}
