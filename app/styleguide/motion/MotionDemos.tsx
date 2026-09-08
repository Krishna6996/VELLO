"use client";

import * as Popover from "@radix-ui/react-popover";
import { useState, type ReactNode } from "react";
import { FadeSwap } from "@/components/motion/FadeSwap";
import { StampIn } from "@/components/motion/StampIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Sheet } from "@/components/ui/Sheet";
import { DoseGlyphs } from "@/components/vocabulary/DoseGlyphs";
import { VerificationSeal } from "@/components/vocabulary/VerificationSeal";
import { cx } from "@/lib/cx";
import { duration, doseStaggerMs } from "@/lib/motion";

function ms(seconds: number): string {
  return `${Math.round(seconds * 1000)}ms`;
}

interface DemoProps {
  title: string;
  spec: string;
  onReplay: () => void;
  children: ReactNode;
}

function Demo({ title, spec, onReplay, children }: DemoProps) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-card text-ink">{title}</h2>
          <p className="text-legal text-ink-muted">{spec}</p>
        </div>
        <Button variant="quiet" onClick={onReplay}>
          Replay
        </Button>
      </div>
      <div className="flex min-h-24 items-center">{children}</div>
    </Card>
  );
}

export function MotionDemos() {
  const [pressed, setPressed] = useState(false);
  const [selected, setSelected] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [swap, setSwap] = useState(0);
  const [sealKey, setSealKey] = useState(0);
  const [doseKey, setDoseKey] = useState(0);

  const prices = ["₹36.50", "₹9.20", "₹34.00"];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Demo
        title="Button: background-colour"
        spec={`${ms(duration.hover)}, calm easing. Nothing else moves.`}
        onReplay={() => setPressed((value) => !value)}
      >
        <Button className={cx(pressed && "bg-primary-pressed")}>Add to order</Button>
      </Demo>

      <Demo
        title="Card: border-colour"
        spec={`${ms(duration.hover)}, calm easing. No lift, no shadow.`}
        onReplay={() => setSelected((value) => !value)}
      >
        <Card className={cx("w-full", selected && "border-primary")}>
          <p className="text-card text-ink">Prefer WhatsApp?</p>
        </Card>
      </Demo>

      <Demo
        title="Sheet: opacity and 8px"
        spec={`${ms(duration.base)}, calm easing. Closing is instant.`}
        onReplay={() => setSheetOpen(true)}
      >
        <Button variant="secondary" onClick={() => setSheetOpen(true)}>
          Your order
        </Button>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen} title="Your order">
          <p className="text-body text-ink-secondary">
            Search a medicine or send a prescription on WhatsApp.
          </p>
        </Sheet>
      </Demo>

      <Demo
        title="Popover: opacity and 4px"
        spec={`${ms(duration.fast)}, calm easing.`}
        onReplay={() => setPopoverOpen((value) => !value)}
      >
        <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
          <Popover.Trigger asChild>
            <Button variant="secondary">Search</Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              align="start"
              sideOffset={6}
              className="z-30 w-72 rounded-card border border-hairline bg-surface p-4 data-[state=open]:animate-[popover-in_var(--motion-fast)_var(--motion-ease)_both]"
            >
              <p className="text-body text-ink">Metformin · 7 medicines</p>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </Demo>

      <Demo
        title="Changed text: opacity"
        spec={`${ms(duration.fast)}, on the text that changed only.`}
        onReplay={() => setSwap((value) => value + 1)}
      >
        <FadeSwap watch={swap} className="text-price-hero text-ink tabular-nums">
          {prices[swap % prices.length]}
        </FadeSwap>
      </Demo>

      <Demo
        title="Dose glyphs filling"
        spec={`Each dot scales 0 to 1 over ${ms(duration.fast)}, ${doseStaggerMs}ms apart, once.`}
        onReplay={() => setDoseKey((value) => value + 1)}
      >
        <DoseGlyphs key={doseKey} pattern="1-1-1" note="after food" />
      </Demo>

      <Demo
        title="The seal stamping"
        spec={`Opacity, scale 1.06 to 1, rotation 12° to 7°, ${ms(duration.slow)}, once. The one orchestrated moment.`}
        onReplay={() => setSealKey((value) => value + 1)}
      >
        <StampIn key={sealKey} immediate className="w-30">
          <VerificationSeal name="Anil Mehta" reg="PB-45821" date="8 Sep 2026" />
        </StampIn>
      </Demo>
    </div>
  );
}
