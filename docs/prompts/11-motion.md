# Prompt 11: motion system and the signature moment

Read docs/design-system.md section 12 item 1, docs/desktop-extension.md (Motion), lib/motion.ts. Plan first, then build.

Audit every transition in the codebase and bring it onto the system.

1. lib/motion.ts is the only source of durations and easing. Replace any inline values.
2. Permitted: opacity, translateY of 4 to 8px, border-colour, background-colour. Forbidden: scale on hover, bounce, spring with overshoot, shimmer skeletons, parallax, scroll-linked effects, staggered fade-ups on sections.
3. Exceptions, each exactly once per page where it appears: the VerificationSeal stamp (scale 1.06 to 1, rotate 12 to 7 degrees, opacity, 240ms, once); DoseGlyphs filling (each dot's fill scales 0 to 1 over 180ms with a 40ms stagger, once, on first render only).
4. Sheet: opens with opacity + 8px translate, 220ms. Popover: opacity + 4px, 180ms. Route changes: no transition. Buttons: background-colour 160ms. Cards: border-colour 160ms.
5. Loading: no spinners anywhere. Buttons show "Working" as the label. Lists show static hairline-coloured bars (no animation) if data is not yet available.
6. prefers-reduced-motion: every duration becomes 0 and the seal and dots render in their final state.
7. Add a /styleguide/motion page that demonstrates each permitted transition with a replay button.

When done, list every component you changed and every animation you removed.
