import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Pill } from "@/components/ui/Pill";
import { ReassuranceBlock } from "@/components/ui/ReassuranceBlock";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Timeline } from "@/components/ui/Timeline";
import { TotalsBlock } from "@/components/ui/TotalsBlock";
import { rupees } from "@/lib/format";
import { FamilyTabs, PaymentRows, SheetExample, SlotRows } from "./Interactive";
import { Example, Section } from "./Section";

const orderSteps = [
  { label: "Prescription being checked" },
  { label: "Verified by pharmacist", sub: "Anil Mehta, Reg no. PB-45821" },
  { label: "Packed at Sharma Medicos" },
  { label: "Out for delivery" },
  { label: "Delivered" },
];

export function Primitives() {
  return (
    <>
      <Section
        id="buttons"
        title="Button"
        note="Flat fills, 12px radius, 16px/600 label. 52px tall on mobile, 48px on desktop. Loading replaces the label with “Working”; there is no spinner."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Example label="Variants">
            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
              <Button>Add to order</Button>
              <Button variant="secondary">Order on WhatsApp</Button>
              <Button variant="quiet">I&apos;ll send it on WhatsApp instead</Button>
            </div>
          </Example>
          <Example label="Loading, disabled, full width">
            <div className="flex flex-col gap-3">
              <Button loading>Place order</Button>
              <Button disabled variant="secondary">
                Check my pincode
              </Button>
              <Button fullWidth>Continue to checkout</Button>
            </div>
          </Example>
        </div>
      </Section>

      <Section
        id="fields"
        title="Input, Textarea, Select"
        note="Surface fill, 1px hairline, 12px radius, 15px text. Focus is a 1.5px Primary border. Error is a 1.5px Ink border and one line below in Ink secondary. No red anywhere."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Input label="Pincode" inputMode="numeric" placeholder="141002" />
          <Input
            label="Pincode"
            inputMode="numeric"
            defaultValue="110001"
            error="We don't deliver to 110001 yet. Send your prescription on WhatsApp and we'll tell you as soon as we do."
          />
          <Select label="Delivery slot" defaultValue="today">
            <option value="today">Today, by 8 pm</option>
            <option value="tomorrow">Tomorrow, 10 am to 1 pm</option>
          </Select>
          <Textarea
            label="Note for the pharmacist"
            hint="If it's missing, the pharmacist will message you before doing anything."
          />
        </div>
      </Section>

      <Section
        id="cards"
        title="Card, Pill"
        note="Surface, 1px hairline, 14px radius, 16px padding (20px on desktop). Selected is a 1.5px Primary edge drawn without moving anything."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="flex flex-col gap-2">
            <p className="text-card text-ink">Prefer WhatsApp?</p>
            <p className="text-body text-ink-secondary">
              Send a photo of your prescription or just the names. A pharmacist replies within 15
              minutes, 8 am to 10 pm.
            </p>
          </Card>
          <Card selected className="flex flex-col gap-2">
            <p className="text-card text-ink">Prefer WhatsApp?</p>
            <p className="text-body text-ink-secondary">
              Send a photo of your prescription or just the names. A pharmacist replies within 15
              minutes, 8 am to 10 pm.
            </p>
          </Card>
          <Card hero className="flex flex-col gap-3">
            <p className="text-card text-ink">Hero card, 18px radius</p>
            <div className="flex flex-wrap gap-2">
              <Pill>Same molecule</Pill>
              <Pill>Plain packaging</Pill>
            </div>
          </Card>
        </div>
      </Section>

      <Section
        id="choice-rows"
        title="RadioRow"
        note="Every option carries identical weight. UPI and cash on delivery are equals; selection is a filled radio and a 1.5px Primary edge, nothing more."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Example label="Payment">
            <PaymentRows />
          </Example>
          <Example label="Delivery, with a trailing price">
            <SlotRows />
          </Example>
        </div>
      </Section>

      <Section
        id="tabs"
        title="Tabs"
        note="Pill tabs with a 24px initial avatar for family tabs. Selected is a solid Primary pill with Surface text. Switching swaps the regimen and the dose glyphs."
      >
        <FamilyTabs />
      </Section>

      <Section
        id="sheet"
        title="Sheet"
        note="Radix Dialog. Surface, a hairline, 18px radius on the open edge, no shadow."
      >
        <SheetExample />
      </Section>

      <Section
        id="blocks"
        title="ReassuranceBlock, TotalsBlock"
        note="Sage block with a small mark and one sentence of specific truth. Totals: 14px rows, hairline above the bold total, a faint footnote, and never a promo code field."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <ReassuranceBlock>
              This is a Schedule H medicine. A registered pharmacist checks your prescription before
              we dispense. You can upload it at checkout or send it on WhatsApp.
            </ReassuranceBlock>
            <ReassuranceBlock>
              No prescription needed. A pharmacist still checks every order.
            </ReassuranceBlock>
          </div>
          <TotalsBlock
            rows={[
              { label: "Medicines", value: rupees(3650) },
              { label: "Delivery", value: rupees(2500) },
            ]}
            total={{ label: "To pay", value: rupees(6150) }}
            footnote="GST invoice sent after delivery. No hidden charges."
          />
        </div>
      </Section>

      <Section
        id="timeline"
        title="Timeline"
        note="22px nodes. Done is filled with a check, current is filled with a 5px sage halo, future is a 2px ring on canvas. Vertical by default; horizontal for how-it-works on desktop."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <Example label="Vertical">
            <Timeline steps={orderSteps} current={1} />
          </Example>
          <Example label="Horizontal">
            <Timeline steps={orderSteps.slice(0, 3)} current={1} orientation="horizontal" />
          </Example>
        </div>
      </Section>

      <Section
        id="placeholder"
        title="PhotoPlaceholder"
        note="Stands in for a photograph until the real one is shot. The caption says exactly what belongs there; the second line names the art direction."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <PhotoPlaceholder caption="A steel tumbler beside a strip of tablets on a kitchen counter, morning light" />
          <PhotoPlaceholder
            aspect="3/2"
            caption="A doorstep handover: plain paper package passing from a rider's hand to a parent's"
          />
        </div>
      </Section>
    </>
  );
}
