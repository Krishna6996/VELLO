# Prompt 07: cart, prescription upload, checkout

Read docs/copy-deck.md (cart and checkout sections), docs/design-system.md section 10, lib/cart.ts if present. Plan first, then build.

1. lib/cart.ts: zustand store with persist. Lines (sku slug, qty), add, remove, setQty, clear, totals in paise (items, delivery 2500, toPay). A derived `needsRx` flag if any line is prescription-only.
2. Header cart entry: the word "Order" with a count in a sage pill; no basket icon. Opens the cart as a Sheet.
3. Cart Sheet: CartLine rows (FormIcon well, brand, molecule line, qty stepper, line price), a ReassuranceBlock with the deck's Rx line if needsRx, the TotalsBlock, a primary Button "Continue to checkout", and a secondary "Order this on WhatsApp" (lib/whatsapp.buildOrderLink with all lines). Empty state from the deck with a quiet link to /medicines. No suggested items, no "add ₹200 more for free delivery".
4. app/checkout/page.tsx, one page, sections stacked, each a Card:
   a. Your order: the lines, read-only, with a "Change" quiet link that opens the Sheet.
   b. Prescription (only if needsRx): the deck's "why we need this" ReassuranceBlock above a dropzone (RxUpload) that accepts images and PDF, shows a thumbnail with the file name, allows more than one file, and a "I'll send it on WhatsApp instead" quiet link that sets a flag and opens buildRxLink(orderDraftId). The page does not block on this; it explains that the pharmacist will ask if it's missing.
   c. Delivery address: name, phone, address lines, pincode with PincodeCheck (a seeded list of serviceable pincodes for the launch city, 1410xx if we stay with the Ludhiana reference data; the response is a one-line status in the voice, serviceable or not, with the deck's not-serviceable line offering WhatsApp). Delivery slot: RadioRows "Today, by 8 pm" and "Tomorrow, 10 am to 1 pm" with identical weight.
   d. Payment: RadioRows "Pay on delivery (cash or UPI)" and "Pay by UPI link after the pharmacist verifies", identical weight, with the deck's one-line explanation under the second. Nothing is charged on this page.
   e. TotalsBlock, then the primary Button "Place order", then the deck's consent line at 12px faint with a link to the privacy page.
5. On place order: create an order in lib/orders.ts (id VL-xxxxx, lines, address, slot, payment, rxFiles or rxViaWhatsApp, status "checking"), clear the cart, redirect to /orders/[id].

Constraints: no promo code field, no tips, no upsell, no timers, no red. Every input 44px+. Errors are one sentence under the field in Ink secondary.

When done, walk through a cart with one Schedule H item and one OTC item, screenshot each section, and answer the honesty test for the payment section.
