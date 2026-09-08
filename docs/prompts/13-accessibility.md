# Prompt 13: accessibility, large type, text growth

Read docs/design-system.md section 12 items 5 and 6. Plan first, then build.

1. Large-type mode: a toggle in the footer and in the header Sheet on mobile, persisted in localStorage, applied as a class on html. Body goes to 17px, card title to 17px, dose dots to 14px, buttons to 56px, medicine line to 14px. Nothing overflows; nothing truncates. Test every page.
2. Every hit target 44px minimum, including quiet text links (add padding, not visual size).
3. Focus: 2px Primary ring, 2px offset, on every interactive element, visible on canvas and on sage.
4. Contrast audit: list every text colour on every background it appears on with its ratio. Fix anything under 4.5:1 at body size or 3:1 at headline size.
5. Text growth: add a dev-only "pseudo-locale" toggle that lengthens every string by 30% and wraps it in brackets. Fix every card, button and tile that breaks. Set leading on headlines to tolerate Devanagari and Gurmukhi ascenders (minimum 1.25 on Fraunces, 1.15 on Jakarta at hero size).
6. Screen reader pass: landmarks, heading order, form labels, error announcements, the Timeline as an ordered list with aria-current on the current step, the seal with an aria-label naming the pharmacist and date, DoseGlyphs with the caption as the accessible name.
7. Keyboard: the whole checkout completes without a mouse.

When done, report the contrast table and the list of components that broke under pseudo-locale and how you fixed them.
