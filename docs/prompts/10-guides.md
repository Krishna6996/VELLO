# Prompt 10: guides (editorial)

Read docs/design-system.md section 4 and section 10 (Editorial), docs/desktop-extension.md, docs/copy-deck.md (guides section). Plan first, then build.

1. content/guides/*.mdx with frontmatter: title, excerpt, author, authorReg, reviewer, reviewerReg, published, updated, concerns[], sources[]. Write three real guides in the Vello voice, 700 to 900 words each, educational, no drug is recommended, no cure language, every claim sourced to a named guideline or textbook in sources[]: (a) the metformin guide titled per the deck, (b) a guide on what a Schedule H label means and why a pharmacist checks, (c) a guide on reading a blood pressure number. Byline "Dr. Achal, MBBS" as author for the draft; reviewer "Dr. S. Grewal, PB-30412".
2. app/guides/page.tsx: h1 from the deck, GuideCards in a single column at 720px, with a concern pill filter.
3. app/guides/[slug]/page.tsx per the spec: 26px gutter on mobile, 62ch measure on desktop, Fraunces headline 38px/29px, article body 17px/15px at 1.75, Fraunces subheads, a byline block fenced by hairlines above and below (author, reviewer, published, updated), exactly one sage pull quote, sources as a numbered list at the end (numbers are correct here: they are references), then the deck's 12px disclaimer. No ads, no related-product rail, no share buttons except one quiet "Share" text link in the header.
4. MDX components mapped to the type scale. Tables (if any) use hairlines and no zebra striping.
5. Metadata: Article JSON-LD comes in prompt 14; set title and description now.

When done, show one guide at 390 and 1280. Answer: could a 60-year-old read this comfortably on a phone? Then raise the mobile article body to 16px if not.
