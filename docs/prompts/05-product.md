# Prompt 05: product page

Read docs/design-system.md section 6, docs/copy-deck.md (product section), docs/desktop-extension.md, lib/catalog. Plan first, then build.

Build app/medicines/[slug]/page.tsx (statically generated for every SKU).

Layout, desktop 7/5, mobile stacked:
- Left column: breadcrumb (Medicines › Concern › Brand) in Ink muted, then the brand as h1, the molecule + strength + form + pack line directly under it at 16px Ink muted, RxMark + ScheduleTag if prescription-only, then the BlisterStrip for this SKU as the hero object (not for syrups, creams, devices: use the FormIcon at 96px in a sage well instead). Below: sections with plain section heads: About, How to take (with DoseGlyphs if a typical regimen exists in seed, always captioned), Side effects, Warnings, Storage, Manufacturer. Body at 16px, measure 68ch. No accordions; everything is visible.
- Right column (sticky on desktop): a Card with the price at 28px/800, "per strip of 20" under it, a quantity stepper (44px targets), a primary Button "Add to order", a secondary Button "Order on WhatsApp" (lib/whatsapp.buildOrderLink with this SKU and quantity), then a ReassuranceBlock with the deck's Rx line if prescription-only, or the deck's OTC line if not. Below the card: the deck's price-honesty line at 12px faint.
- Substitution ladder: section head from the deck, the sentence of counsel from the deck, then the SubstitutionLadder for this SKU. Choosing a row swaps which SKU the right-column card is for, with a 180ms opacity transition on the changed text only. Nothing preselected.
- Related guides: two GuideCards if any match the SKU's concerns; the section is omitted entirely if none.
- Out of stock: the price card shows "Not in stock right now" and the deck's out-of-stock line, "Order on WhatsApp" stays, "Add to order" is removed (not disabled). If a substitute is in stock, the ladder is moved above the fold on mobile.

Constraints: no reviews, no ratings, no "customers also bought", no images, no tabs. Metadata: title "Glycomet 500 SR (metformin 500mg) · Vello", description from the SKU description.

When done, show Glycomet 500 SR, Tugain 5%, and one out-of-stock SKU. Answer the three tests.
