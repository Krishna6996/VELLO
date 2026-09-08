# Final review before the draft is done

- The landing page passes the five-second test with the right half of the hero covered.
- Every medicine anywhere on the site shows its molecule line.
- Every price is a plain rupee figure with nothing beside it.
- The sexual-health hub and the diabetes hub are indistinguishable in layout, weight and tone.
- The two payment rows and the two delivery rows are identical in weight.
- The seal appears at most once per page and stamps once.
- Nothing on the page moves on scroll except the seal.
- No hex outside the token set, no shadow except under the blister strip, no #FFFFFF.
- Large type plus pseudo-locale does not break checkout at 390px.
- Every string on the site is in docs/copy-deck.md.
- Lighthouse performance and accessibility at 95 or above on landing, product and guide.
- The one thing a friend would describe after using it is the stamp.

## After the draft: the next three moves

1. Replace the seed with Postgres (Mumbai region) and the Rx upload with real storage; keep the same lib/catalog interface so nothing above it changes.
2. WhatsApp Business API via Interakt or AiSensy so the pharmacist's replies and order updates come from the same number the site links to.
3. The regimen-as-home idea from your spec (section 12, item 2) becomes the logged-in home once accounts exist: today's doses, two names, search demoted to a field. That is the retention product; the website you're building now is the front door to it.
