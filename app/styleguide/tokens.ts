import { rupees } from "@/lib/format";

/**
 * Documentation of the tokens declared in app/globals.css, for /styleguide.
 * The CSS is the source of truth; this table exists so hex values and roles
 * can be printed beside each swatch and checked against the spec.
 */

export interface ColourToken {
  name: string;
  hex: string;
  role: string;
}

export const colourTokens: readonly ColourToken[] = [
  {
    name: "canvas",
    hex: "#FAF8F5",
    role: "Every page background. Warm off-white, never pure white.",
  },
  {
    name: "surface",
    hex: "#FFFDF9",
    role: "Cards, inputs, sheets. A half-step brighter than canvas.",
  },
  { name: "primary", hex: "#0F6E56", role: "Actions, key accents, all icon linework." },
  { name: "primary-pressed", hex: "#0B5843", role: "Hover and active." },
  {
    name: "sage",
    hex: "#E4F0EA",
    role: "Secondary surfaces, selected state, icon wells, reassurance blocks.",
  },
  { name: "ink", hex: "#1E2A28", role: "Primary text. Near-black, green undertone." },
  { name: "ink-secondary", hex: "#3D4B47", role: "Body copy inside cards." },
  { name: "ink-muted", hex: "#6B7A74", role: "Labels, metadata, molecule and strength lines." },
  { name: "ink-faint", hex: "#9AA5A0", role: "Placeholders, legal, disabled." },
  { name: "hairline", hex: "#E3DED5", role: "Card borders, 1px." },
  { name: "divider", hex: "#E8E3DA", role: "Dividers between rows." },
  { name: "amber", hex: "#D98E32", role: "Sparingly. Refill nudges and time-based warmth only." },
  { name: "amber-tint", hex: "#FBF3E6", role: "The refill card background only." },
  { name: "amber-border", hex: "#ECD9BC", role: "The refill card border only." },
  {
    name: "amber-ink",
    hex: "#B0761F",
    role: "Time text such as “Runs out in 6 days”. Passes contrast on cream.",
  },
  { name: "dose-morning", hex: "#EEC27E", role: "Dose glyph, morning. Only inside DoseGlyphs." },
  {
    name: "dose-afternoon",
    hex: "#8FA69E",
    role: "Dose glyph, afternoon. Only inside DoseGlyphs.",
  },
  { name: "dose-night", hex: "#3A5A50", role: "Dose glyph, night. Only inside DoseGlyphs." },
  { name: "dose-empty", hex: "#C2BCB0", role: "Empty dose ring, 1.5px." },
  { name: "ring", hex: "#E0DBD1", role: "Timeline future ring and connector." },
];

export interface RadiusToken {
  name: string;
  px: number;
  use: string;
}

export const radiusTokens: readonly RadiusToken[] = [
  { name: "input", px: 12, use: "Inputs and buttons" },
  { name: "well", px: 12, use: "Icon wells" },
  { name: "card", px: 14, use: "Cards" },
  { name: "hero", px: 18, use: "Hero and feature cards, sheets" },
  { name: "shell", px: 28, use: "Phone shell in presentation only" },
  { name: "pill", px: 99, use: "Pills and tabs" },
];

/** Steps the design system uses on the 4px grid, mobile then desktop. */
export const spacingSteps: readonly number[] = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28];
export const desktopSpacingSteps: readonly number[] = [32, 40, 48, 64, 72, 88, 96];

export interface TypeToken {
  name: string;
  utility: string;
  desktop: string;
  mobile: string;
  weight: number;
  leading: string;
  tracking?: string;
  sample: string;
}

export const typeTokens: readonly TypeToken[] = [
  {
    name: "Wordmark",
    utility: "text-wordmark",
    desktop: "24px",
    mobile: "24px",
    weight: 800,
    leading: "1",
    tracking: "-0.03em",
    sample: "Vello",
  },
  {
    name: "Hero statement",
    utility: "text-hero",
    desktop: "52px",
    mobile: "26px",
    weight: 800,
    leading: "1.08",
    tracking: "-0.02em",
    sample: "Medicine, exactly as prescribed.",
  },
  {
    name: "Page title",
    utility: "text-h1",
    desktop: "34px",
    mobile: "22px",
    weight: 700,
    leading: "1.15",
    sample: "How Vello works",
  },
  {
    name: "Section head",
    utility: "text-section",
    desktop: "24px",
    mobile: "16px",
    weight: 700,
    leading: "1.25",
    sample: "What we're here for",
  },
  {
    name: "Card title",
    utility: "text-card",
    desktop: "16px",
    mobile: "15px",
    weight: 700,
    leading: "1.3",
    sample: "Prefer WhatsApp?",
  },
  {
    name: "Body",
    utility: "text-body",
    desktop: "16px",
    mobile: "13.5px",
    weight: 400,
    leading: "1.6",
    sample:
      "Delivered in hours from a licensed pharmacy near you. A registered pharmacist checks every order. Prices are printed MRPs.",
  },
  {
    name: "Article body",
    utility: "text-article",
    desktop: "17px",
    mobile: "16px",
    weight: 400,
    leading: "1.75",
    sample:
      "This guide is for understanding, not for deciding treatment. Your doctor knows your history; follow what they wrote.",
  },
  {
    name: "Label",
    utility: "text-label",
    desktop: "13px",
    mobile: "12px",
    weight: 600,
    leading: "1.4",
    sample: "Same molecule, other brands",
  },
  {
    name: "Legal",
    utility: "text-legal",
    desktop: "12px",
    mobile: "12px",
    weight: 400,
    leading: "1.5",
    sample: "GST invoice sent after delivery. No hidden charges.",
  },
  {
    name: "Price inline",
    utility: "text-price",
    desktop: "16px",
    mobile: "15px",
    weight: 700,
    leading: "1.2",
    sample: rupees(3650),
  },
  {
    name: "Price hero",
    utility: "text-price-hero",
    desktop: "28px",
    mobile: "24px",
    weight: 800,
    leading: "1.1",
    sample: rupees(3650),
  },
  {
    name: "Button label",
    utility: "text-button",
    desktop: "16px",
    mobile: "16px",
    weight: 600,
    leading: "1",
    sample: "Add to order",
  },
  {
    name: "Input text",
    utility: "text-input",
    desktop: "15px",
    mobile: "15px",
    weight: 400,
    leading: "1.4",
    sample: "Search a medicine or molecule",
  },
  {
    name: "Row",
    utility: "text-row",
    desktop: "14px",
    mobile: "14px",
    weight: 400,
    leading: "1.5",
    sample: "GST invoice sent after delivery. No hidden charges.",
  },
  {
    name: "Article headline (Fraunces)",
    utility: "text-article-headline font-editorial",
    desktop: "38px",
    mobile: "29px",
    weight: 500,
    leading: "1.2",
    sample: "What metformin does, and what it doesn't",
  },
  {
    name: "Article subhead (Fraunces)",
    utility: "text-article-subhead font-editorial",
    desktop: "24px",
    mobile: "20px",
    weight: 500,
    leading: "1.25",
    sample: "Why a pharmacist checks your prescription",
  },
  {
    name: "Medicine line",
    utility: "text-meta",
    desktop: "13px",
    mobile: "12.5px",
    weight: 400,
    leading: "1.5",
    sample: "Metformin 500mg · SR tablet · strip of 20",
  },
];
