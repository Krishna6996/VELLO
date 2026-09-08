# Prompt 04: search

Read docs/copy-deck.md (search section) and lib/search.ts. Plan first, then build.

1. SearchField (used in the header and as the hero variant): as you type from the second character, a results Popover (Radix) grouped as Brands, Molecules, Concerns. Each brand result is a compact MedicineCard row; each molecule result reads "Metformin · 6 medicines"; each concern result is the title with its icon. Keyboard: arrows, enter, escape. Enter on the field with no selection goes to /search?q=.
2. /search page: the query echoed as the h1 in the voice ("Results for metformin"), the grouped results as full MedicineCards in a single column, and the molecule and concern matches as pills above the list.
3. Empty state from the deck: we don't stock this yet, send your prescription on WhatsApp and we'll try to source it. Button "Send on WhatsApp" opens lib/whatsapp.buildRxLink(query). Call logUnmatched(query). No illustration here; search is a working surface.
4. Search must find: brands with typos, molecules, strengths ("telma 40"), and concern words ("sugar", "bp", "thyroid").

Constraints: no spinner; results replace instantly. No "Popular searches" section. No recent searches. The field never clears on navigation.

When done, show the popover mid-typing "metfo" and the empty state for "wegovy". Answer the three tests.
