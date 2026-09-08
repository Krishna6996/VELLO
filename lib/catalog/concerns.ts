import type { Concern, ConcernSlug } from "@/lib/catalog/types";

/** Copy from docs/copy-deck.md (landing: concerns, concern hubs). */
export const concerns: readonly Concern[] = [
  {
    slug: "diabetes",
    title: "Diabetes",
    line: "Monthly refills that arrive before you run out.",
    intro:
      "Most people with diabetes take the same one or two medicines every day for years. We keep them in stock, deliver them before you run out, and dispense exactly what your doctor wrote.",
    keywords: ["sugar", "blood sugar", "diabetic", "diabetes", "glucose", "insulin", "hba1c"],
  },
  {
    slug: "blood-pressure",
    title: "Blood pressure and heart",
    line: "The same medicines, the same day each month.",
    intro:
      "Blood pressure medicines work when they're taken every day without gaps. We deliver the same brand, the same strength, on the same day each month.",
    keywords: [
      "bp",
      "blood pressure",
      "hypertension",
      "heart",
      "cholesterol",
      "cardiac",
      "pressure",
    ],
  },
  {
    slug: "thyroid",
    title: "Thyroid",
    line: "One tablet a day, never a gap.",
    intro:
      "Thyroid medicine is usually one small tablet, taken on an empty stomach, for life. We make sure it's there on time.",
    keywords: ["thyroid", "tsh", "hypothyroid", "thyroxine"],
  },
  {
    slug: "skin-hair",
    title: "Skin and hair",
    line: "What the dermatologist wrote, delivered plainly packed.",
    intro:
      "Skin and hair prescriptions are as ordinary as any other. We deliver them in plain packaging and never comment.",
    keywords: [
      "skin",
      "hair",
      "hair fall",
      "hair loss",
      "acne",
      "pimples",
      "fungal",
      "itch",
      "rash",
      "dermatologist",
    ],
  },
  {
    slug: "sexual-health",
    title: "Sexual health",
    line: "Common, treatable, and no one's business but yours.",
    intro:
      "Sexual health conditions are common and treatable. You'll see the same calm page, the same pharmacist check and the same plain packaging as for anything else we deliver.",
    keywords: ["sexual health", "sex", "erectile", "ed", "premature", "performance", "intimacy"],
  },
  {
    slug: "mind-sleep",
    title: "Mind and sleep",
    line: "Prescriptions filled without a second look.",
    intro:
      "Prescriptions for mood, anxiety and sleep are filled here without a second look. Your pharmacist checks them like any other, and your order is packed plainly.",
    keywords: [
      "sleep",
      "insomnia",
      "anxiety",
      "depression",
      "mood",
      "stress",
      "mental health",
      "psychiatrist",
    ],
  },
  {
    slug: "periods",
    title: "Periods and women's health",
    line: "Ask plainly. We answer plainly.",
    intro:
      "Period pain, irregular cycles, supplements in pregnancy. We stock the ordinary things and answer questions plainly.",
    keywords: [
      "periods",
      "period pain",
      "cramps",
      "menstrual",
      "pregnancy",
      "women",
      "contraceptive",
      "iron",
    ],
  },
  {
    slug: "everyday",
    title: "Everyday health",
    line: "Fever, cold, vitamins, first aid. The ordinary shelf.",
    intro:
      "Fever, cold, allergy, acidity, cuts. The shelf every home needs, delivered when you'd rather not step out.",
    keywords: [
      "fever",
      "cold",
      "cough",
      "allergy",
      "acidity",
      "gas",
      "pain",
      "vitamin",
      "first aid",
      "headache",
      "loose motion",
    ],
  },
];

export const concernBySlug: Record<ConcernSlug, Concern> = Object.fromEntries(
  concerns.map((concern) => [concern.slug, concern]),
) as Record<ConcernSlug, Concern>;

export const concernSlugs: readonly ConcernSlug[] = concerns.map((concern) => concern.slug);
