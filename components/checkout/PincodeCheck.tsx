"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { WhatsAppOrderCard } from "@/components/whatsapp/WhatsAppOrderCard";
import { isServiceable, isValidPincode } from "@/lib/pincodes";

export type PincodeStatus = "unchecked" | "serviceable" | "not-serviceable";

interface PincodeCheckProps {
  value: string;
  onChange: (value: string) => void;
  status: PincodeStatus;
  onStatus: (status: PincodeStatus) => void;
  error?: string;
}

export function checkPincode(value: string): PincodeStatus {
  if (!isValidPincode(value)) return "unchecked";
  return isServiceable(value) ? "serviceable" : "not-serviceable";
}

/** A pincode field, a check button, and one line of status in the voice. */
export function PincodeCheck({ value, onChange, status, onStatus, error }: PincodeCheckProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <Input
          label="Pincode"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={6}
          value={value}
          error={error}
          onChange={(event) => {
            onChange(event.target.value.replace(/\D/g, "").slice(0, 6));
            onStatus("unchecked");
          }}
          className="md:w-48"
        />
        <Button
          variant="secondary"
          onClick={() => onStatus(checkPincode(value))}
          disabled={!isValidPincode(value)}
          className="md:mb-0"
        >
          Check my pincode
        </Button>
      </div>
      {status === "serviceable" ? (
        <p role="status" className="text-row text-ink-secondary">
          We deliver here. Today by 8 pm if you order before 4 pm.
        </p>
      ) : null}
      {status === "not-serviceable" ? (
        <div role="status">
          <WhatsAppOrderCard context={{ kind: "not-serviceable", pincode: value }} />
        </div>
      ) : null}
    </div>
  );
}
