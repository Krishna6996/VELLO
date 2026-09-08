# Vello — Design System & Art Direction Spec
*Consumer medicine-delivery product for India. Copy this whole file as the brief for a new iteration.*

---

## 1. The one-line brief

Vello closes the gap between a doctor's prescription and actually having the medicine in your hand. It delivers from trusted local pharmacies within hours, dispenses **exactly** what was prescribed (never a silent brand swap), has a licensed pharmacist verify every order, and looks after the patient afterwards (leaflets, dose reminders, refills).

**The design must communicate: calm, honest, safe, unembarrassing.**

## 2. Brand personality

Calm · clinical but warm · honest · quietly premium · human.

> A competent friend in healthcare. Never a bazaar. Never a hospital.

Three tests every screen must pass:
1. **The dignity test** — could someone hold this open on a bus without embarrassment?
2. **The honesty test** — is the price and the substitution choice stated plainly, with nothing engineered to push a decision?
3. **The calm test** — remove one more element. Does the screen still work? Then remove it.

---

## 3. Colour

| Role | Hex | Use |
|---|---|---|
| Canvas | `#FAF8F5` | Every app background. Warm off-white, never pure white. |
| Surface | `#FFFDF9` | Cards, inputs, sheets — a half-step brighter than canvas. |
| Desk (outside the phone) | `#ECE9E3` | Presentation canvas only, not in-product. |
| Primary | `#0F6E56` | Actions, key accents, all icon linework. |
| Primary pressed | `#0B5843` | Hover / active. |
| Sage tint | `#E4F0EA` | Secondary surfaces, selected state, icon wells, reassurance blocks. |
| Ink | `#1E2A28` | Primary text. Near-black, green undertone. |
| Ink secondary | `#3D4B47` | Body copy inside cards. |
| Ink muted | `#6B7A74` | Labels, metadata, molecule + strength lines. |
| Ink faint | `#9AA5A0` | Placeholders, legal, disabled. |
| Hairline | `#E3DED5` | Card borders (1px). Dividers `#E8E3DA`. |
| Amber | `#D98E32` | **Sparingly.** Refill nudges and time-based warmth only. |
| Amber tint / border | `#FBF3E6` / `#ECD9BC` | The refill card only. |
| Amber ink | `#B0761F` | "Runs out in 6 days" text — passes contrast on cream. |

**Rules.** No red. No medical blue. No gradients. Amber never means urgency, discount or error — it means *time*. Max one amber element per screen. Never use alpha-muted or `color-mix` text — full-opacity ink only, 4.5:1 minimum.

## 4. Typography

- **UI: Plus Jakarta Sans** (fallback Inter). Weights 400 / 500 / 600 / 700 / 800.
- **Editorial: Fraunces** — headlines, section heads and pull quotes in articles ONLY, plus the ℞ glyph. Weight 500–600.
- **Sentence case everywhere.** Never ALL-CAPS, never Title Case. The only exception is engraved/stamped type inside the verification seal and blister-strip artwork, where caps are physically correct.

| Token | Size / weight / leading |
|---|---|
| Wordmark | 38–40px / 800 / `-0.03em` |
| Screen hero | 26px / 800 / `-0.01em` |
| Screen title (h1) | 21–22px / 700 |
| Section head | 16px / 700 |
| Card title | 14.5–15px / 700 |
| Body | 13–13.5px / 400 / 1.6–1.65 |
| Article body | 15px / 400 / **1.75** |
| Article headline | 29px Fraunces / 500 / 1.25 |
| Article subhead | 20px Fraunces / 500 |
| Label / eyebrow | 11.5–13px / 600, ink muted |
| Legal / footnote | 12px / 400, ink faint |
| Price | 14–15px / 700 inline, 24px / 800 on hero |

`text-wrap: pretty` on every multi-line paragraph and headline.

## 5. Space, shape, elevation

- **4px base grid.** Real steps used: 2 / 4 / 6 / 8 / 10 / 12 / 14 / 16 / 18 / 20 / 22 / 24 / 28.
- **Screen gutter: 24px** (26px in the article, for reading measure). Section gap 16–20px. Card padding 14–16px; hero cards 24px.
- **Radii:** input & button 12px · card 14px · hero / feature 18px · phone shell 28px · pill 99px · icon well 11–12px.
- **Borders, not shadows.** 1px `#E3DED5`; selected = 1.5px `#0F6E56`. The only permitted shadows are the presentation phone shell (`0 2px 12px rgba(30,42,40,0.06)`) and a 3–4px drop under the blister-strip illustration. No inner shadows, no glows.
- Buttons are flat fills, 15–16px padding, 16px/600 label, full-width for primary CTAs.

---

## 6. The medicine card — the product's core object

**Deliberately no pack-shot photography.** Photos of boxes turn medicine into merchandise, and Indian packaging is visually loud. Vello shows medicine typographically.

Anatomy, left to right:
1. **Form icon** — 40–44px sage well, radius 11–12px, holding a 24px geometric glyph of the medicine's *real physical form* (tablet, SR tablet, capsule, syrup, drops, cream, inhaler, vial, sachet).
2. **Brand name** — 14.5–15px / 700, largest thing in the card.
3. **Molecule + strength + form + pack** — 12–12.5px muted: `Metformin 500mg · SR tablet · strip of 20`. This line is non-negotiable: naming the molecule is the honesty promise made visible.
4. **℞ pill** — sage capsule with a serif ℞ if prescription-only.
5. **Dose glyphs** — where a regimen is known (see §7).
6. **Price** — plain `₹36.50`, 14–15px / 700, right-aligned. No strikethroughs, no MRP-vs-ours, no percentages.

## 7. Visual vocabulary (this is what makes it Vello and not a generic wellness app)

All illustration and iconography: **single 1.5px stroke, `#0F6E56` line, `#E4F0EA` or `#FFFDF9` fill, geometric, flat.** One amber accent allowed per drawing.

- **Form icons** — the workhorse. Always paired with text, never load-bearing alone.
- **Dose-time glyphs** — three 10–11px dots = morning / afternoon / night, India's `1-0-1` notation made legible. Amber `#EEC27E` (morning), sage-grey `#8FA69E` (afternoon), deep green `#3A5A50` (night); empty = 1.5px `#C2BCB0` ring. Always captioned in words: `1–0–1 · after food`.
- **The ℞ mark** — Fraunces ℞ ligature in a sage pill. Schedule tags (`H`, `H1`) are outlined squares sitting beside it, never alone.
- **Verification seal** — a rubber stamp: two concentric circles, the pharmacist's name and registration number on a `textPath` arc, ℞ centred, "VERIFIED" below, rotated 6–8°, roughened with a subtle `feTurbulence` + `feDisplacementMap`. The Indian rubber stamp is the *native* mark of medical authority — far more trustworthy locally than a checkmark badge. **Max one per screen.**
- **Blister-strip motif** — the hero object on product and delivered states: rounded rectangle, grid of pockets, one pocket drawn as a dashed empty ring (a strip in use), faint engraved brand + molecule text at 6.5px.
- **Rider glyph** — scooter with a delivery box, for the out-for-delivery step.
- **Condition icons** — clinically literate, not decorative: diabetes is a blood drop, thyroid is a butterfly, skin is its layers, everyday health is a sunrise.
- **Molecule texture** — hexagonal chemistry lattice at **5% opacity**, welcome header and dividers only.
- **Spot illustrations** — human domestic moments, in real Indian detail: the steel tumbler, morning chai, a tablet on a steel plate, the doorstep handover, two people reading a leaflet. Allowed on welcome, waitlist, post-delivery, empty states and editorial. **Never** on catalog, search, cart or checkout.

**Never draw:** crosses, stethoscopes, heartbeat lines, shields, mortar-and-pestle, pills spilling from bottles, stock doctors, hospital imagery, 3D renders.

**Photography, where used:** warm, natural, at home, real families, Indian kitchens — never clinics, never studio. Until real photos exist, use a striped placeholder in cream/tan with a monospace caption stating exactly what belongs there, plus a caption line naming the art direction.

---

## 8. Voice

Warm, plain, specific, reassuring. Simple English (readable by someone who reads Hindi or Punjabi more comfortably).

- Say the specific true thing: *"A licensed pharmacist checks every order."* Not *"Quality assured."*
- Explain before you ask: *"Why we need this: these are Schedule H medicines. A licensed pharmacist checks your prescription before we dispense."*
- Give away control: *"Your doctor prescribed Glycomet. These are chemically equivalent — the choice is yours."* · *"Nothing is ordered without your OK."*
- Name real people and places: *Verified by Anil Mehta, Registered Pharmacist, Reg no. PB-45821* · *Packed at Sharma Medicos, Model Town, Ludhiana.*
- Price honesty as copy: *"Prices are printed MRPs. What you see is what you pay."* · *"GST invoice emailed after delivery. No hidden charges."*
- Never: exclamation marks, "Hurry", "Deal", "Save big", "Amazing", emoji, jargon without a plain-language gloss.

## 9. Hard don'ts

No discount badges · no "70% OFF" · no countdown timers · no red urgency · no dense product grids · no medical-blue clichés · no carousels of offers · no dark patterns on substitution · no clutter. **Price honesty IS the design.**

---

## 10. Screen patterns (reuse verbatim)

- **Header:** 24px gutter · `‹` chevron at 22px `#3D4B47` · title 18px/700, or title + 12.5px muted sub-line. Search and article headers substitute a field or a `Share` link on the right.
- **Reassurance block:** sage `#E4F0EA`, radius 12–14px, small mark on the left, one sentence of specific truth. Used on welcome success, cart, checkout, product.
- **Totals block:** white card, rows at 13.5–14px, hairline above the bold `To pay`, then a 12px faint GST/no-hidden-charges line. Never a promo-code field.
- **Timeline:** 22px nodes in a 16px column — done = filled green with a check, current = filled green with a 5px sage halo, future = 2px `#E0DBD1` ring on canvas. 2px connectors, green above the current node, `#E0DBD1` below. Future steps' labels drop to `#9AA5A0`.
- **Choice rows (payment, substitution):** identical weight for every option. UPI and cash on delivery are equals; selection is a filled radio + 1.5px green border, nothing more.
- **Family tabs (caregiver mode):** pill tabs with a 24px initial avatar; the selected tab is a solid green pill. Switching swaps the regimen, the note line and the dose glyphs.
- **Editorial:** narrower gutter, 1.75 leading, Fraunces heads, byline block fenced by hairlines above and below, one sage pull-quote, and a closing 12px disclaimer. No ads, no related-product rail, ever.

## 11. Reference data (keep realistic)

Names Ramesh Kumar, Sunita Devi, Anil Mehta (pharmacist, PB-45821), Dr. S. Grewal (PB-30412), Dr. Achal (MBBS). Medicines Glycomet 500 SR ₹36.50, Glycomet 850 ₹44.20, Glycomet GP 1 ₹98.00, Carbophage SR 500 ₹34.00, Gluformin 500 ₹32.80, Jan Aushadhi Metformin 500 SR ₹9.20, Telma 40 ₹112.00, Thyronorm 50mcg, Ecosprin 75, Becosules Z ₹45.00. Pharmacy Sharma Medicos. Address B-12, Model Town, Ludhiana 141002. Phone +91 98765 43210. Delivery ₹25. Order ids `#VL-20817`.

---

## 12. Where the next iteration should push

Honest gaps in the current set, ranked:

1. **Motion & feedback.** Nothing is specified yet. Define a calm system: 180–240ms `cubic-bezier(0.2,0,0,1)`, opacity + 4–8px translate only, no bounce or scale. The seal should stamp once on verification; the dose dots should fill, not pulse.
2. **The regimen, not the catalog, as home.** Vello's real value is the adherence loop. Consider a home screen that opens on *today's doses* — three dots and two names — with search demoted to a field.
3. **Adherence surfaces.** A weekly dose grid, a "marked as taken" state, a missed-dose recovery flow with correct clinical copy ("don't double up").
4. **Substitution as a decision aid, not a list.** The comparison ladder could carry a plain sentence of *why* the ₹9.20 generic is the same, and what a pharmacist would say — turning the honest list into genuine counsel.
5. **Language.** Hindi and Punjabi. Both are longer than English: build every card and button to grow 30% without breaking, and check Gurmukhi/Devanagari ascenders against the current tight leading.
6. **Accessibility for the actual patient.** Many users are 55+ with diabetic retinopathy. Ship a large-type mode (body to 17px, dose dots to 14px) and never let a hit target fall under 44px.
7. **The caregiver, properly.** Papa and Mummy tabs hint at it; the real product is one person managing three regimens — needs consolidated refill timing, per-person prescription vaults, and delivery to a second address.
8. **Trust artifacts you can keep.** A saved, shareable pharmacist verification record and a downloadable dispensing log make the seal real rather than decorative.
9. **Empty and failure states.** Prescription rejected, medicine out of stock at Sharma Medicos, delivery delayed. Calm honesty is hardest and most valuable here — write these before the happy paths.
10. **One deliberate signature moment.** Right now the design is beautifully restrained but has no single memorable beat. The stamp landing on verification is the strongest candidate: make it *the* thing people describe to a friend.

---

## 13. Implementation notes

- Mobile canvas 390px wide; presentation shell 28px radius, 1px `#DED9D0`, `0 2px 12px rgba(30,42,40,0.06)`.
- All illustration is inline SVG with `viewBox` and `width:100%` so it scales with the card — never fixed pixel heights on drawings that sit in flowing layout.
- Seal and roughened artwork use `feTurbulence` + `feDisplacementMap` at `scale≈1.7`, `baseFrequency≈0.55`; give each filter and `textPath` a unique id when the seal appears more than once on a page.
- Contrast floors: body text 4.5:1, headline-scale 3:1. `#6B7A74` on `#FAF8F5` is the lightest text permitted at body size.
