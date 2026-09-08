# Prompt 01: primitives and the visual vocabulary

Read docs/design-system.md sections 5, 6, 7 and 10, and docs/desktop-extension.md. Plan first, then build.

Build the UI primitives in components/ui and the visual vocabulary in components/vocabulary. Every component gets a story-like example on /styleguide.

components/ui
- Button: variants primary (flat Primary fill, Surface text), secondary (Surface fill, 1px hairline, Ink text), quiet (text only, Primary). 48px desktop, 52px mobile, 12px radius, 16px/600 label. Full width prop. Loading state is the label replaced by "Working" with no spinner.
- Input, Textarea, Select: Surface fill, 1px hairline, 12px radius, 15px text, focus = 1.5px Primary border, error = 1.5px Ink border plus a one-line message below in Ink secondary. No red anywhere.
- Card: Surface, 1px hairline, 14px radius, 14 to 16px padding (20px desktop). Selected variant: 1.5px Primary.
- Pill: sage capsule, 12px/600 text.
- RadioRow (uses Radix RadioGroup): full-width row, identical weight for every option, filled radio + 1.5px Primary border when selected, nothing else changes.
- Tabs (Radix): pill tabs; selected is a solid Primary pill with Surface text; supports a 24px initial avatar for family tabs.
- Sheet (Radix Dialog): bottom sheet on mobile, right panel on desktop. Surface, 18px radius on the open edge, no shadow, a hairline.
- ReassuranceBlock: sage background, 12 to 14px radius, small mark on the left, one sentence.
- TotalsBlock: white card, rows at 14px, hairline above the bold "To pay" row, then a 12px faint line. No promo code field, ever.
- Timeline: nodes 22px; done = filled Primary with a check; current = filled Primary with a 5px sage halo; future = 2px #E0DBD1 ring on canvas. Connectors 2px, Primary above current, #E0DBD1 below. Vertical by default, horizontal variant for desktop.
- PhotoPlaceholder: striped cream and tan, 12px radius, a monospace caption stating exactly what should be shot, and a second line naming the art direction (warm, natural, at home, Indian kitchen, never a clinic).

components/vocabulary (all inline SVG, viewBox, width 100%, 1.5px stroke Primary, fills sage or surface, geometric and flat)
- FormIcon with a `form` prop: tablet, sr-tablet (tablet with a subtle inner ring), capsule, syrup (bottle), drops, cream (tube), gel, inhaler, vial, sachet, strip (test strip), device (a rounded rectangle with a small screen). 24px glyph designed for a 44px sage well with 12px radius.
- DoseGlyphs: three 11px dots for morning / afternoon / night. Filled colours amber #EEC27E, sage-grey #8FA69E, deep green #3A5A50; empty = 1.5px #C2BCB0 ring. Always rendered with the caption from lib/format.doseCaption beside it. Accepts "1-0-1" style strings.
- RxMark: Fraunces ℞ in a sage pill. ScheduleTag: outlined square with "H" or "H1", only ever rendered beside RxMark.
- VerificationSeal: two concentric circles, pharmacist name and registration number on a textPath arc, ℞ centred, "VERIFIED" below in engraved caps (the one permitted caps usage), rotated 7 degrees, roughened with feTurbulence + feDisplacementMap (scale 1.7, baseFrequency 0.55). Unique filter and textPath ids via useId. Props: name, reg, date. Max one per page.
- BlisterStrip: rounded rectangle, grid of pockets, one pocket drawn as a dashed empty ring, engraved brand and molecule text at 6.5px, a 3 to 4px soft drop shadow (the only permitted shadow). Props: brand, molecule.
- RiderGlyph: scooter with a delivery box.
- ConcernIcon with a `concern` prop per docs/catalog-seed.md: blood drop, pressure gauge arc, butterfly, skin layers, two overlapping circles, crescent moon, a ring of 28 dots with one filled, sunrise.
- MoleculeTexture: hexagonal lattice at 5% opacity for the welcome header and dividers only.

Constraints: no icon library. Draw every glyph. Keep each SVG under 40 lines. Never let a glyph be load-bearing without text beside it.

When done, show all of them on /styleguide at 24px and at 44px well size, plus the seal at 120px and 200px. Answer: which glyph is weakest and why, then redraw that one.
