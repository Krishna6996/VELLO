This folder already contains docs/ and .cursor/rules/. Keep them; nothing in there gets deleted or rewritten unless a prompt says so.

Before writing any code, read in full, in this order: docs/design-system.md, docs/desktop-extension.md, docs/product-brief.md, docs/catalog-seed.md, docs/copy-deck.md, docs/prompts/README.md, docs/reference/hims-ro-alto-notes.md. The three files in .cursor/rules are always on.

Then work through docs/prompts/00-scaffold.md to docs/prompts/15-review.md, in order, one at a time:
- Read the prompt file. Write a short plan (5 to 10 lines). Treat the plan as pre-approved and build it fully in the same turn.
- When scaffolding in prompt 00, this folder is not empty. Scaffold Next.js into it without touching docs/ or .cursor/ (create-next-app in a temporary directory and move the files in, or init manually). Use pnpm.
- Copy comes from docs/copy-deck.md verbatim. If a string you need is missing, write it in the Vello voice and add it to the deck in the same change.
- After each prompt: run pnpm typecheck and pnpm lint, fix everything, commit with the message "prompt NN: <title>", then give me a 5-line summary and the three tests (dignity, honesty, calm) for what you built.
- Then stop and wait for me to say "next". If I say "run all", continue through the remaining prompts without stopping, still committing after each.

Never skip a prompt, never merge two, never add anything a prompt did not ask for. If a prompt conflicts with docs/design-system.md, the design system wins and you tell me where. If you are unsure how something should look, open /styleguide and match it.

Start with docs/prompts/00-scaffold.md now.
