"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { RadioGroup, RadioRow } from "@/components/ui/RadioRow";
import { Sheet } from "@/components/ui/Sheet";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/Tabs";
import { DoseGlyphs } from "@/components/vocabulary/DoseGlyphs";
import { Example } from "./Section";

export function PaymentRows() {
  const [value, setValue] = useState("cod");
  return (
    <RadioGroup value={value} onValueChange={setValue} aria-label="Payment">
      <RadioRow value="cod" label="Pay on delivery (cash or UPI)" />
      <RadioRow value="upi" label="Pay by UPI link after the pharmacist verifies" />
    </RadioGroup>
  );
}

export function SlotRows() {
  const [value, setValue] = useState("today");
  return (
    <RadioGroup value={value} onValueChange={setValue} aria-label="Delivery slot">
      <RadioRow value="today" label="Today, by 8 pm" trailing="₹25.00" />
      <RadioRow value="tomorrow" label="Tomorrow, 10 am to 1 pm" trailing="₹25.00" />
    </RadioGroup>
  );
}

export function FamilyTabs() {
  return (
    <Tabs defaultValue="ramesh">
      <TabList aria-label="Family">
        <Tab value="ramesh" label="Ramesh Kumar" initial="R" />
        <Tab value="sunita" label="Sunita Devi" initial="S" />
      </TabList>
      <TabPanel value="ramesh" className="flex flex-col gap-2">
        <p className="text-body text-ink">Glycomet 500 SR</p>
        <DoseGlyphs pattern="1-0-1" note="after food" />
      </TabPanel>
      <TabPanel value="sunita" className="flex flex-col gap-2">
        <p className="text-body text-ink">Thyronorm 50 mcg</p>
        <DoseGlyphs pattern="1-0-0" note="empty stomach" />
      </TabPanel>
    </Tabs>
  );
}

export function SheetExample() {
  const [open, setOpen] = useState(false);
  return (
    <Example label="Sheet: bottom on mobile, right panel from 768px">
      <div>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Your order
        </Button>
      </div>
      <Sheet open={open} onOpenChange={setOpen} title="Your order">
        <div className="flex flex-col gap-2">
          <p className="text-card text-ink">Nothing here yet.</p>
          <p className="text-body text-ink-secondary">
            Search a medicine or send a prescription on WhatsApp.
          </p>
        </div>
      </Sheet>
    </Example>
  );
}
