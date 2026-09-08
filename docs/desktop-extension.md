# Desktop extension to the Vello design system

Applies at 768px and above. Mobile values in docs/design-system.md stay as written below 768px.

## Layout
- Content container: max-width 1120px, centered. Gutters 24px (mobile), 40px (tablet), 48px (desktop).
- 12-column grid, 24px gap. Text measure never exceeds 68ch. Article measure 62ch.
- Sections are separated by space, not by background changes. A section may sit on Sage tint (#E4F0EA) at most once per page.
- Two-column hero on desktop (7/5 split): statement and search on the left, one illustration on the right. Stacks on mobile with the illustration below the search field.
- Header: 64px tall, hairline below, canvas background, sticky. Search field lives in the header on every page except the landing hero, where the hero field is primary and the header field is hidden until scroll passes the hero.

## Type scale (desktop / mobile)
- Hero statement: 52px / 26px, weight 800, letter-spacing -0.02em, leading 1.08
- Page title h1: 34px / 22px, weight 700, leading 1.15
- Section head: 24px / 16px, weight 700
- Card title: 16px / 15px, weight 700
- Body: 16px / 13.5px, weight 400, leading 1.6
- Article body: 17px / 15px, leading 1.75, Plus Jakarta Sans
- Article headline: 38px / 29px Fraunces 500, leading 1.2
- Article subhead: 24px / 20px Fraunces 500
- Label: 13px / 12px, weight 600, Ink muted
- Price inline: 16px / 15px weight 700; hero price 28px / 24px weight 800
- Buttons: 16px label, weight 600, 48px tall on desktop, 52px on mobile, full-width on mobile, natural width on desktop

## Spacing at desktop
- Section gap: 96px between landing sections, 64px on inner pages.
- Hero top padding: 88px. Hero bottom padding: 72px.
- Card padding: 20px. Hero and feature cards: 32px.

## Components at desktop
- Medicine card: same anatomy, one row; on listing pages, cards stack vertically in a single column at max-width 720px. No grids of medicine cards anywhere. A list is calmer and reads better than a grid.
- Concern tiles: 4 across on desktop, 2 across on mobile, 1.5px hairline, sage icon well, title and one line. Hover: border becomes Primary. No lift, no shadow.
- Timeline: horizontal on desktop for the how-it-works section only; vertical everywhere else.
- Footer: 3 columns. Column 1 wordmark and one line. Column 2 links. Column 3 the licence block: drug licence number, pharmacist-in-charge with registration number, grievance officer, registered office. This block is the trust page's summary and is never hidden behind a link.

## Motion (see prompt 11)
- 180 to 240ms, cubic-bezier(0.2, 0, 0, 1), opacity and 4 to 8px translate only.
- One orchestrated moment per page. On the landing page it is the pharmacist seal stamping once when the how-it-works section enters the viewport.
