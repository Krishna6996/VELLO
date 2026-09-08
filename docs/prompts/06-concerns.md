# Prompt 06: concern hubs and the catalog listing

Read docs/copy-deck.md (concerns section), docs/catalog-seed.md, docs/design-system.md section 7. Plan first, then build.

1. app/concerns/page.tsx: the eight ConcernTiles, one line each, nothing else above the footer.
2. app/concerns/[slug]/page.tsx: ConcernIcon at 44px, title as h1, the deck's two-sentence intro for that concern (plain, no medical claims, no drug names), then a MedicineList of that concern's SKUs in a single column, then a "Guides for [concern]" section with GuideCards, then one ReassuranceBlock with the deck's discreet-packaging line on sexual-health, mind-sleep and periods only.
3. A spot illustration is allowed on the concern hub only at the very bottom, above the footer, drawn per section 7: a domestic Indian moment matched to the concern (a steel tumbler and a tablet on a steel plate for diabetes; a phone on a bedside table with a glass of water for mind-sleep). One per hub, single stroke, one amber accent. Skip it if you cannot draw it well; write a PhotoPlaceholder caption instead.
4. Metadata per concern.

Constraints: no drug is named or recommended in the concern intro. The hub describes the condition and the service, then lists what we stock. No banners, no "shop now".

When done, show diabetes and sexual-health hubs. Answer the dignity test specifically for the sexual-health hub.
