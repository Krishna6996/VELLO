# Prompt 03: the landing page

Read docs/product-brief.md, docs/copy-deck.md (landing section), docs/design-system.md and docs/desktop-extension.md in full. Plan first with an ASCII wireframe for desktop and mobile, then build.

Build app/page.tsx. The landing page has to do three things in five seconds: say what Vello is, let someone search a medicine, offer WhatsApp as the other door. Everything else is secondary and quiet.

Sections, in order, with copy taken verbatim from docs/copy-deck.md:

1. Hero. Two columns on desktop (7/5), stacked on mobile. Left: the hero statement (52px/800), the two-line sub, then the SearchField as a large hero variant (56px tall, 12px radius, surface fill, 1px hairline, focus 1.5px Primary; placeholder from the deck), then the WhatsApp line as a quiet text link. Right: the BlisterStrip for Glycomet 500 SR with a small caption "Exactly what was prescribed" under it. MoleculeTexture at 5% behind the hero only. No gradient, no blob, no photo. The header's search field is hidden while the hero field is in view and appears on scroll.
2. Concerns. Section head from the deck. Eight ConcernTiles, 4 across on desktop, 2 on mobile: sage icon well, title, one plain line. Each links to /concerns/[slug]. Hover: border to Primary, nothing else.
3. How it works. A horizontal Timeline on desktop with three steps from the deck. Step 2 renders the VerificationSeal (Anil Mehta, PB-45821) beside its text. Wrap the seal in a motion component that stamps once when the section enters the viewport: opacity 0 to 1, scale 1.06 to 1, rotation from 12 degrees to its resting 7, 240ms, calm easing, runs once, instant under reduced motion. This is the only orchestrated motion on the page.
4. Honesty, shown not told. A section head from the deck, then one real MedicineCard (Glycomet 500 SR) followed by the SubstitutionLadder for it: the doctor's brand at the top, then chemically equivalent options sorted by price, each a RadioRow-style row with brand, molecule line and price, and one plain sentence from the deck above the ladder. No option is preselected. No "recommended". No savings percentage.
5. Guides. Section head from the deck, three GuideCards (Fraunces title, one-line excerpt, byline "Dr. Achal, MBBS", reading time). Pull from content/guides; if there are fewer than three, render the three titles listed in the deck as stubs that link to /guides.
6. WhatsApp. One Card, not a bubble: the deck's WhatsApp heading and line, a primary Button "Send prescription on WhatsApp" that opens lib/whatsapp.buildRxLink(), and on desktop a small QR (generate with a tiny QR lib, 120px, Primary on surface) to scan.
7. Footer from the shell.

Layout rules: 96px between sections on desktop, 64px on mobile. Max container 1120px. Only the honesty section may sit on sage; the rest is canvas. No section carries an eyebrow label. No numbered markers except inside the Timeline.

Motion rules: the seal stamp is the only entrance animation. Nothing fades up on scroll. Hover states change border colour only.

When done: screenshot-describe at 1280 and 390, then answer the three tests. Then remove one element from the page and tell me which one you removed.
