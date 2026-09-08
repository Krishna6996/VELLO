# Prompt 00: scaffold, tokens, fonts, shell

Read docs/design-system.md, docs/desktop-extension.md and docs/product-brief.md in full before doing anything.

Set up the Vello website repo. Plan first, then build.

1. Next.js (latest stable, App Router), TypeScript strict, pnpm, ESLint, Prettier. Remove all boilerplate.
2. Tailwind v4. In app/globals.css declare every token from the design system under @theme: colours (canvas, surface, primary, primary-pressed, sage, ink, ink-secondary, ink-muted, ink-faint, hairline, divider, amber, amber-tint, amber-border, amber-ink), radii (input 12px, card 14px, hero 18px, shell 28px, pill 99px, well 12px), spacing steps on the 4px grid, font families, and the type scale from docs/desktop-extension.md as named utilities (text-hero, text-h1, text-section, text-card, text-body, text-article, text-label, text-legal, text-price). Add `text-wrap: pretty` to headings and paragraphs globally.
3. Fonts via next/font/google: Plus Jakarta Sans (400, 500, 600, 700, 800) and Fraunces (500, 600, with optical size axis). Expose as CSS variables --font-ui and --font-editorial.
4. lib/motion.ts exporting duration tokens (fast 0.18, base 0.22, slow 0.24) and the calm easing [0.2, 0, 0, 1], plus a useCalmMotion hook that returns instant values when prefers-reduced-motion is set.
5. lib/format.ts: rupees(paise) → "₹36.50", packLabel, doseCaption("1-0-1", "after food") → "1–0–1 · after food".
6. app/layout.tsx with the Header and Footer components (build them now, real content):
   - Header: 64px, sticky, canvas background, hairline below. Left: wordmark "Vello" (38px/800/-0.03em scaled to 24px in the header). Centre: nav links "Medicines", "Concerns", "How it works", "Guides". Right: a SearchField (placeholder from docs/copy-deck.md) and a text link "WhatsApp". On mobile the nav collapses into a Sheet; the search field stays visible.
   - Footer per docs/desktop-extension.md: three columns; column 3 is the licence block using the reference data in docs/design-system.md section 11 and the copy deck's footer strings.
7. A /styleguide route (not linked from nav) that renders every token: colour swatches with hex and role, the type scale with sample strings from the copy deck, radii, spacing, and a paragraph at each text size on canvas and on surface. I will use this page to check every later prompt against the spec.
8. Scripts: dev, build, typecheck, lint.

Do not build any page content yet beyond the shell and the styleguide. Do not install any UI kit. Do not add placeholder pages with lorem ipsum.

When done, tell me what tokens you declared and screenshot-describe the styleguide. Then answer the three tests for the header and footer.
