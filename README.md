# Vello website kit

Drop the contents of this folder into the root of your Vello repo, open the repo in Cursor, and paste KICKOFF-PROMPT.md into a new Agent chat. That is the one prompt. After each step Cursor stops; say "next" to continue, or "run all" to let it go.

## Put it in place

The folder has a hidden `.cursor` directory, so copy with the dot:

```
cp -R vello-kit/. ~/path/to/vello/
```

Then in Cursor: open the repo, new Agent chat, strongest model, paste the contents of KICKOFF-PROMPT.md.

## What's inside

- `KICKOFF-PROMPT.md`: the single prompt.
- `.cursor/rules/`: three always-on rules files (design system, engineering conventions, voice). Add a line here whenever Cursor does something you had to delete; they are living files.
- `docs/design-system.md`: your spec, verbatim. Source of truth.
- `docs/desktop-extension.md`: the desktop scale, layout and motion rules the spec did not cover.
- `docs/product-brief.md`: what Vello is, who it is for, launch scope, the three tests, non-goals.
- `docs/catalog-seed.md`: concern list, SKU schema, seed examples for the small stock.
- `docs/copy-deck.md`: every string on the site. Cursor uses these verbatim.
- `docs/prompts/00..15`: the build sequence. `docs/prompts/README.md` has what to check after each one.
- `docs/reference/`: the Hims/Ro/Alto stigma notes and the final checklist.

## Two blanks to fill before you start

1. `docs/copy-deck.md`, footer block: the legal entity name and the grievance officer.
2. Launch city. The spec's reference data is Sharma Medicos, Model Town, Ludhiana. If you are launching elsewhere, change the pharmacy, pharmacist and pincodes in `docs/design-system.md` section 11, `docs/copy-deck.md` and `docs/catalog-seed.md` together.

## While it runs

- Keep the dev server open at 390px and 1280px and look at every step before saying "next".
- Anything Cursor adds that a prompt did not ask for gets deleted, and a line goes into `.cursor/rules/vello-design.mdc`.
- If a step comes out under half right, start a fresh chat, paste the kickoff prompt again, and say "resume from docs/prompts/NN".
- Needs pnpm and Node 20+. If you would rather use npm, change "Use pnpm" in the kickoff prompt and "pnpm" in `.cursor/rules/vello-engineering.mdc`.
