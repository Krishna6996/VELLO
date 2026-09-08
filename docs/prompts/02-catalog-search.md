# Prompt 02: catalog model, seed, queries, search

Read docs/catalog-seed.md and docs/product-brief.md. Plan first, then build.

1. lib/catalog/types.ts: the SKU type and Concern type exactly as specified in docs/catalog-seed.md. Money in paise as integers.
2. lib/catalog/seed.ts: around 100 SKUs. Start from the examples in docs/catalog-seed.md and fill each concern to 10 to 15 SKUs with realistic Indian brands, molecules, strengths, packs and 2026 MRPs. Every molecule must have at least two brands. Include the four Jan Aushadhi generics. Mark 6 SKUs inStock: false. Write the description, howToTake, sideEffects, warnings and storage fields in the Vello voice: plain, specific, two to three sentences, no medical claims beyond what a leaflet says. Do not invent drugs.
3. lib/catalog/queries.ts: getAll, getBySlug, getByConcern, getByMolecule, getSubstitutes (same molecule, strength and form, excluding self, sorted by price ascending), getRelatedGuides(slug) stub.
4. lib/search.ts using Fuse.js: index brand, molecule, strength, concerns. Weights: brand 0.5, molecule 0.4, concerns 0.1. Threshold tuned so "glycomet", "metformin", "metfromin", "telma", "bp tablet", "thyroid" all return sensible results. Group results as brands, molecules, concerns. Export search(query) and a logUnmatched(query) that appends to .vello/unmatched-queries.json in dev (this is our demand signal for what to stock next).
5. A /medicines route: a single-column MedicineList (max-width 720px) with a concern filter as pill tabs across the top, sorted by concern then brand. Build MedicineCard per docs/design-system.md section 6 with the desktop rules from docs/desktop-extension.md: form icon in a sage well, brand, the molecule + strength + form + pack line in Ink muted (this line is non-negotiable), RxMark + ScheduleTag if prescription-only, price right-aligned. Whole card is a link to the product page. Out of stock: the price is replaced by "Not in stock right now" in Ink muted and the card stays fully readable.

No grids of medicine cards. No images. No badges.

When done, list the molecules with fewer than two brands (there should be none), show the /medicines page, and answer the three tests for MedicineCard.
