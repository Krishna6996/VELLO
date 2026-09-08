# Prompt 09: order status and the seal

Read docs/copy-deck.md (order section), docs/design-system.md section 7 and 10, lib/orders.ts. Plan first, then build.

Build app/orders/[id]/page.tsx.

1. h1: "Order VL-20817" with the deck's sub-line by status. Statuses: checking, verified, packing, out-for-delivery, delivered, rejected, on-hold.
2. A vertical Timeline with the deck's labels: Prescription being checked → Verified by pharmacist → Packed at [pharmacy] → Out for delivery → Delivered. Current node has the sage halo; future labels drop to Ink faint. Each done node has a timestamp line at 12px faint.
3. When status is verified or later, render the VerificationSeal beside the "Verified by pharmacist" node with the pharmacist's name, registration number and date, and the deck's verification sentence under it. This is the single motion moment on the page: the seal stamps in once on first render, per lib/motion.ts.
4. Out-for-delivery renders the RiderGlyph beside its node with the deck's line. Delivered renders the BlisterStrip and the deck's aftercare card: leaflet link, "Set dose reminders" (stub), "Refill in 26 days" as the one amber element on the page.
5. A Card with the order lines, address, slot, payment method, and the TotalsBlock. A quiet link "Download dispensing record" that renders the seal, pharmacist details, pharmacy licence and lines as a printable page at /orders/[id]/record.
6. A dev-only status switcher at the bottom (hidden in production) so every state can be reviewed.
7. Rejected and on-hold: see prompt 12; stub them now with the deck's one-line copy.

When done, show all seven states. Answer: does the seal read as a rubber stamp your family chemist would own, or as a badge? If badge, fix it.
