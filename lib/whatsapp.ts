/**
 * The WhatsApp door. Prefilled messages come from docs/copy-deck.md and give
 * the pharmacist everything they need in the first line. URLs stay under 500
 * characters.
 */

const FALLBACK_NUMBER = "919876543210";

export function whatsappNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WA_NUMBER ?? FALLBACK_NUMBER;
  return raw.replace(/\D/g, "");
}

const MAX_URL = 500;

export function waLink(message: string): string {
  const base = `https://wa.me/${whatsappNumber()}?text=`;
  let text = message.trim();
  let url = base + encodeURIComponent(text);
  while (url.length > MAX_URL && text.length > 20) {
    text = `${text.slice(0, text.length - 12).trimEnd()}…`;
    url = base + encodeURIComponent(text);
  }
  return url;
}

function pincodeOr(pincode?: string): string {
  return pincode?.trim() ? pincode.trim() : "will share";
}

export interface OrderLine {
  brand: string;
  strength: string;
  qty: number;
}

/** "Hi Vello, I'd like to send a prescription for delivery. Pincode: {pincode or "will share"}." */
export function buildRxLink(context?: { pincode?: string; reference?: string }): string {
  const ref = context?.reference ? ` Ref: ${context.reference}.` : "";
  return waLink(
    `Hi Vello, I'd like to send a prescription for delivery. Pincode: ${pincodeOr(context?.pincode)}.${ref}`,
  );
}

/** "Hi Vello, I'd like to order: {brand} {strength} × {qty}; … Pincode: … Please confirm price and delivery time." */
export function buildOrderLink(lines: readonly OrderLine[], pincode?: string): string {
  const items = lines
    .map((line) => `${line.brand}${line.strength ? ` ${line.strength}` : ""} × ${line.qty}`)
    .join("; ");
  return waLink(
    `Hi Vello, I'd like to order: ${items}. Pincode: ${pincodeOr(pincode)}. Please confirm price and delivery time.`,
  );
}

/** "Hi Vello, do you stock {query}? I can send the prescription." */
export function buildSearchMissLink(query: string): string {
  return waLink(`Hi Vello, do you stock ${query.trim()}? I can send the prescription.`);
}

/** "Hi Vello, I'm at pincode {pincode}. Can you deliver here, or tell me when you can?" */
export function buildNotServiceableLink(pincode: string): string {
  return waLink(
    `Hi Vello, I'm at pincode ${pincode.trim()}. Can you deliver here, or tell me when you can?`,
  );
}
