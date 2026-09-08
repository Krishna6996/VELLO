"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { CartLineRow } from "@/components/cart/CartLineRow";
import { PincodeCheck, checkPincode, type PincodeStatus } from "@/components/checkout/PincodeCheck";
import { RxUpload } from "@/components/checkout/RxUpload";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { RadioGroup, RadioRow } from "@/components/ui/RadioRow";
import { ReassuranceBlock } from "@/components/ui/ReassuranceBlock";
import { Textarea } from "@/components/ui/Textarea";
import { TotalsBlock } from "@/components/ui/TotalsBlock";
import { cartTotals, resolveLines, useCart } from "@/lib/cart";
import { useCartSheet } from "@/lib/cart-sheet";
import { rupees } from "@/lib/format";
import { newOrderId, useOrders, type DeliverySlot, type PaymentMethod } from "@/lib/orders";
import { isValidPincode } from "@/lib/pincodes";
import { useCartHydrated } from "@/lib/use-hydrated";
import { buildRxLink } from "@/lib/whatsapp";

interface Errors {
  name?: string;
  phone?: string;
  address?: string;
  pincode?: string;
  slot?: string;
  payment?: string;
}

function SectionCard({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <Card className="flex flex-col gap-5">
      <h2 id={id} className="text-section text-ink">
        {title}
      </h2>
      {children}
    </Card>
  );
}

export function CheckoutForm() {
  const router = useRouter();
  const hydrated = useCartHydrated();
  const rawLines = useCart((state) => state.lines);
  const clearCart = useCart((state) => state.clear);
  const placeOrder = useOrders((state) => state.place);
  const openCart = useCartSheet((state) => state.setOpen);

  const lines = resolveLines(rawLines);
  const totals = cartTotals(lines);

  const draftId = useRef<string | null>(null);
  function draft(): string {
    draftId.current ??= newOrderId();
    return draftId.current;
  }

  const [files, setFiles] = useState<File[]>([]);
  const [rxViaWhatsApp, setRxViaWhatsApp] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<PincodeStatus>("unchecked");
  const [slot, setSlot] = useState<DeliverySlot | "">("");
  const [payment, setPayment] = useState<PaymentMethod | "">("");
  const [errors, setErrors] = useState<Errors>({});
  const [placing, setPlacing] = useState(false);

  function clearError(key: keyof Errors) {
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current));
  }

  if (!hydrated) {
    return (
      <div aria-hidden="true" className="h-40 rounded-card border border-hairline bg-surface" />
    );
  }

  if (lines.length === 0) {
    return (
      <Card className="flex flex-col gap-3">
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
      </Card>
    );
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = "Add your name so the rider knows who to ask for.";
    if (!/^\d{10}$/.test(phone.replace(/\D/g, "")))
      next.phone = "Add a 10-digit phone number so the pharmacist can reach you.";
    if (!address.trim()) next.address = "Add the address, with a landmark if it helps.";
    if (!isValidPincode(pincode)) next.pincode = "Add a 6-digit pincode.";
    if (!slot) next.slot = "Choose a delivery slot.";
    if (!payment) next.payment = "Choose how you'll pay.";
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    const status = checkPincode(pincode);
    setPincodeStatus(status);
    if (Object.keys(next).length > 0 || status !== "serviceable" || !slot || !payment) return;

    setPlacing(true);
    const order = placeOrder({
      id: draft(),
      lines: rawLines,
      address: {
        name: name.trim(),
        phone: phone.replace(/\D/g, ""),
        address: address.trim(),
        pincode,
      },
      slot,
      payment,
      note: note.trim() || undefined,
      prescription: !totals.needsRx
        ? { via: "none" }
        : rxViaWhatsApp
          ? { via: "whatsapp" }
          : files.length > 0
            ? { via: "upload", files: files.map((file) => file.name) }
            : { via: "none" },
    });
    clearCart();
    router.push(`/orders/${order.id}`);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <SectionCard id="your-order" title="Your order">
        <ul className="flex flex-col divide-y divide-divider">
          {lines.map((line) => (
            <CartLineRow key={line.slug} line={line} />
          ))}
        </ul>
        <button
          type="button"
          onClick={() => openCart(true)}
          className="inline-flex min-h-11 items-center self-start text-body font-medium text-primary hover:text-primary-pressed"
        >
          Change
        </button>
      </SectionCard>

      {totals.needsRx ? (
        <SectionCard id="your-prescription" title="Your prescription">
          <ReassuranceBlock>
            Why we need this: these are Schedule H medicines. A registered pharmacist checks your
            prescription before we dispense.
          </ReassuranceBlock>
          {rxViaWhatsApp ? (
            <p className="text-body text-ink-secondary">
              You&apos;ll send it on WhatsApp. The pharmacist will look for it before checking the
              order.
            </p>
          ) : (
            <RxUpload files={files} onChange={setFiles} />
          )}
          <div className="flex flex-col gap-2">
            {!rxViaWhatsApp ? (
              <a
                href={buildRxLink({ pincode: pincode || undefined })}
                target="_blank"
                rel="noopener"
                onClick={(event) => {
                  event.preventDefault();
                  window.open(
                    buildRxLink({ pincode: pincode || undefined, reference: draft() }),
                    "_blank",
                    "noopener",
                  );
                  setRxViaWhatsApp(true);
                }}
                className="inline-flex min-h-11 items-center self-start text-body font-medium text-primary hover:text-primary-pressed"
              >
                I&apos;ll send it on WhatsApp instead
              </a>
            ) : null}
            <p className="text-row text-ink-muted">
              If it&apos;s missing, the pharmacist will message you before doing anything.
            </p>
          </div>
        </SectionCard>
      ) : null}

      <SectionCard id="delivery" title="Delivery">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Name"
            autoComplete="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              clearError("name");
            }}
            error={errors.name}
          />
          <Input
            label="Phone"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
              clearError("phone");
            }}
            error={errors.phone}
          />
        </div>
        <Textarea
          label="Delivery address"
          autoComplete="street-address"
          rows={3}
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
            clearError("address");
          }}
          error={errors.address}
        />
        <PincodeCheck
          value={pincode}
          onChange={(value) => {
            setPincode(value);
            clearError("pincode");
          }}
          status={pincodeStatus}
          onStatus={setPincodeStatus}
          error={errors.pincode}
        />
        <Textarea
          label="Note for the pharmacist"
          rows={2}
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <div className="flex flex-col gap-2">
          <p id="slot-label" className="text-label text-ink-muted">
            Delivery slot
          </p>
          <RadioGroup
            aria-labelledby="slot-label"
            value={slot}
            onValueChange={(value) => {
              setSlot(value as DeliverySlot);
              clearError("slot");
            }}
          >
            <RadioRow value="today" label="Today, by 8 pm" />
            <RadioRow value="tomorrow" label="Tomorrow, 10 am to 1 pm" />
          </RadioGroup>
          {errors.slot ? <p className="text-row text-ink-secondary">{errors.slot}</p> : null}
        </div>
      </SectionCard>

      <SectionCard id="payment" title="Payment">
        <RadioGroup
          aria-labelledby="payment"
          value={payment}
          onValueChange={(value) => {
            setPayment(value as PaymentMethod);
            clearError("payment");
          }}
        >
          <RadioRow value="cod" label="Pay on delivery (cash or UPI)" />
          <RadioRow
            value="upi-after-check"
            label="Pay by UPI link after the pharmacist verifies"
            description="We never charge before a pharmacist has checked your prescription."
          />
        </RadioGroup>
        {errors.payment ? <p className="text-row text-ink-secondary">{errors.payment}</p> : null}
      </SectionCard>

      <div className="flex flex-col gap-4">
        <TotalsBlock
          rows={[
            { label: "Medicines", value: rupees(totals.items) },
            { label: "Delivery", value: rupees(totals.delivery) },
          ]}
          total={{ label: "To pay", value: rupees(totals.toPay) }}
          footnote="GST invoice sent after delivery. No hidden charges."
        />
        <Button type="submit" fullWidth loading={placing}>
          Place order
        </Button>
        <p className="text-legal text-ink-faint">
          By placing this order you agree that Vello and the dispensing pharmacy may store your
          prescription to fulfil it.{" "}
          <Link
            href="/privacy"
            className="text-ink-muted underline underline-offset-2 hover:text-ink"
          >
            Read how we handle health data.
          </Link>
        </p>
      </div>
    </form>
  );
}
