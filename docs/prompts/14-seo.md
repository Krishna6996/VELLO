# Prompt 14: SEO, metadata, structured data

Read docs/product-brief.md. Plan first, then build.

1. Route slugs: /medicines/[brand-strength-form] (glycomet-500-sr), /molecules/[molecule] (new: a page per molecule listing every brand we stock, with a two-paragraph plain intro in the voice and the substitution ladder; this is the highest-intent search page we have), /concerns/[slug], /guides/[slug], /whatsapp, /how-it-works (new: the three-step Timeline, the pharmacist block, the price-honesty block, the licence block), /about (new: who we are, the pharmacy we dispense from, the pharmacist-in-charge, from the deck), /privacy, /terms, /returns, /shipping, /grievance (from the deck's legal section; short, plain, real).
2. Metadata on every route: title, description, canonical, openGraph. OG images generated with next/og from tokens: canvas background, wordmark, the page title in Jakarta 800, the molecule line where relevant. No photos, no gradients.
3. JSON-LD: Organization (with the licence details and address), Product with Offer (price as MRP in INR, availability), Article (author, reviewer via "reviewedBy" where supported, datePublished, dateModified), BreadcrumbList on medicine, molecule and guide pages.
4. app/sitemap.ts and app/robots.ts. Exclude /styleguide, /checkout, /orders.
5. Lighthouse at 1280 and 390 on the landing page, a product page and a guide: report the four scores and fix anything under 95 on performance and accessibility.

When done, show the /molecules/metformin page and the OG image for it.
