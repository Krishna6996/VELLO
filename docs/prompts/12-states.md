# Prompt 12: empty and failure states

Read docs/design-system.md section 12 item 9, docs/copy-deck.md (states section). Plan first, then build.

Write the hard states before polishing the happy ones. Each state is one Card: a plain sentence saying what happened, one sentence saying what happens next, and at most one action. No illustration on catalog, search, cart or checkout states. A spot illustration is allowed on the empty cart and on delivered.

States to build, copy from the deck:
1. Prescription rejected (order status): reason in plain words (unreadable, missing doctor details, medicine not on it, expired), what to do, a "Send a new prescription on WhatsApp" button, and the deck's line that nothing has been charged.
2. On hold, medicine not in stock at the pharmacy: which line, the pharmacist's suggested equivalent as a SubstitutionLadder row, "Yes, use this" and "No, cancel that line" as two identical-weight buttons, and the line that the price shown is the printed MRP.
3. Delivery delayed: the new time, the rider's first name, no apology paragraph.
4. Pincode not serviceable (checkout): the deck's line, WhatsAppOrderCard in the not-serviceable context.
5. Search empty (already built): verify it matches the deck.
6. Out of stock (product page, already built): verify.
7. Cart empty: the deck's line, a quiet link to Medicines, one spot illustration.
8. Upload failed: file type or size, what to do, no error colour.
9. Offline: a one-line bar under the header, hairline, canvas background, "You're offline. We'll retry when you're back."
10. 404: "We don't have a page here." One link home, one search field.

When done, show every state on /styleguide/states and answer the honesty test for state 2.
