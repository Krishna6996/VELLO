# Prompt 08: the WhatsApp door

Read docs/copy-deck.md (WhatsApp section). Plan first, then build.

WhatsApp is the second front door, not a support widget. Build it as a first-class path.

1. lib/whatsapp.ts: number from NEXT_PUBLIC_WA_NUMBER. buildRxLink(context?) and buildOrderLink(lines, pincode?) return wa.me URLs with the deck's prefilled messages, URL-encoded, under 500 characters. On desktop the same URL is rendered as a QR beside the button wherever the button appears alone.
2. app/whatsapp/page.tsx (linked from the header "WhatsApp" link): h1 from the deck, three RadioRow-style cards (not radio, just rows) explaining what you can send: a photo of a prescription, a list of medicine names, a question for the pharmacist. One primary Button "Open WhatsApp" and the QR on desktop. Below, the deck's "what happens next" Timeline: we reply within 15 minutes in pharmacy hours, a pharmacist checks the prescription, you confirm the order and price, it's delivered. Then the deck's pharmacy hours line.
3. The WhatsAppOrderCard used on the landing page, the search empty state, the out-of-stock state, the not-serviceable state and the cart: same component, copy varies by context prop.
4. Header: "WhatsApp" stays a plain text link. No green, no logo bubble, no floating button anywhere.

When done, show the /whatsapp page and every context of WhatsAppOrderCard side by side on /styleguide. Answer the calm test.
