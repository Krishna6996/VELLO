import Link from "next/link";
import { ConcernTile } from "@/components/catalog/ConcernTile";
import { MedicineCard } from "@/components/catalog/MedicineCard";
import { SubstitutionLadder } from "@/components/catalog/SubstitutionLadder";
import { GuideCard } from "@/components/guides/GuideCard";
import { HeroSearchSentinel } from "@/components/landing/HeroSearchSentinel";
import { StampIn } from "@/components/motion/StampIn";
import { SearchField } from "@/components/ui/SearchField";
import { Timeline } from "@/components/ui/Timeline";
import { BlisterStrip } from "@/components/vocabulary/BlisterStrip";
import { MoleculeTexture } from "@/components/vocabulary/MoleculeTexture";
import { VerificationSeal } from "@/components/vocabulary/VerificationSeal";
import { WhatsAppOrderCard } from "@/components/whatsapp/WhatsAppOrderCard";
import { concerns } from "@/lib/catalog/concerns";
import { getBySlug, getSubstitutes } from "@/lib/catalog/queries";
import { getGuides } from "@/lib/guides";

const container = "mx-auto w-full max-w-page px-6 md:px-10 lg:px-12";

const howItWorks = [
  {
    label: "Search a medicine or send a prescription",
    sub: "On the website or on WhatsApp. Either is fine.",
  },
  {
    label: "A registered pharmacist checks it",
    sub: "Every prescription order is verified by a licensed pharmacist before anything is dispensed. You'll see their name and registration number.",
    aside: (
      <StampIn className="w-30">
        <VerificationSeal name="Anil Mehta" reg="PB-45821" date="8 Sep 2026" />
      </StampIn>
    ),
  },
  {
    label: "Delivered in hours, exactly as prescribed",
    sub: "From a licensed local pharmacy, in plain packaging. Nothing is swapped without your OK.",
  },
];

const guideStubs = [
  "What metformin does, and what it doesn't",
  "Why a pharmacist checks your prescription",
  "Reading a blood pressure number",
];

export default async function Home() {
  const glycomet = getBySlug("glycomet-500-sr");
  const substitutes = getSubstitutes("glycomet-500-sr");
  const guides = (await getGuides()).slice(0, 3);

  return (
    <div className="flex flex-col gap-16 pb-16 md:gap-24 md:pb-24">
      <section className="relative overflow-hidden" aria-labelledby="hero-statement">
        <MoleculeTexture />
        <div
          className={`${container} relative grid gap-10 pt-12 pb-4 md:grid-cols-12 md:items-center md:gap-6 md:pt-22 md:pb-18`}
        >
          <div className="flex flex-col gap-6 md:col-span-7">
            <h1 id="hero-statement" className="max-w-measure text-hero text-ink">
              Medicine, exactly as prescribed.
            </h1>
            <p className="max-w-measure text-body text-ink-secondary">
              Delivered in hours from a licensed pharmacy near you. A registered pharmacist checks
              every order. Prices are printed MRPs.
            </p>
            <div className="flex flex-col gap-3">
              <SearchField
                id="hero-search"
                variant="hero"
                placeholder="Search a medicine, a molecule or a brand. Glycomet, metformin, Telma 40"
                className="w-full md:max-w-xl"
              />
              <HeroSearchSentinel />
              <Link
                href="/whatsapp"
                className="inline-flex min-h-11 items-center self-start text-body font-medium text-primary hover:text-primary-pressed"
              >
                Or send your prescription on WhatsApp
              </Link>
            </div>
          </div>
          <div className="rounded-hero border border-hairline bg-surface p-6 md:col-span-5 md:p-8">
            <BlisterStrip brand="Glycomet 500 SR" molecule="Metformin hydrochloride" />
          </div>
        </div>
      </section>

      <section className={`${container} flex flex-col gap-6`} aria-labelledby="concerns-head">
        <h2 id="concerns-head" className="text-section text-ink">
          What we&apos;re here for
        </h2>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {concerns.map((concern) => (
            <li key={concern.slug} className="flex">
              <ConcernTile concern={concern} className="flex-1" />
            </li>
          ))}
        </ul>
      </section>

      <section className={`${container} flex flex-col gap-8`} aria-labelledby="how-head">
        <h2 id="how-head" className="text-section text-ink">
          How it works
        </h2>
        <Timeline steps={howItWorks} current={2} className="md:hidden" />
        <Timeline
          steps={howItWorks}
          current={2}
          orientation="horizontal"
          className="hidden md:flex"
        />
      </section>

      {glycomet ? (
        <section className="bg-sage py-16 md:py-24" aria-labelledby="honesty-head">
          <div className={`${container} flex flex-col gap-8`}>
            <h2 id="honesty-head" className="max-w-measure text-section text-ink">
              The medicine your doctor wrote. Then the choice is yours.
            </h2>
            <div className="grid gap-8 md:grid-cols-12">
              <div className="flex flex-col gap-4 md:col-span-5">
                <MedicineCard sku={glycomet} />
                <p className="text-body text-ink-secondary">
                  Your doctor prescribed Glycomet 500 SR. The medicines below contain the same
                  molecule at the same strength. Pharmacists consider them equivalent. Pick
                  whichever you want, or keep what was written.
                </p>
              </div>
              <div className="flex flex-col gap-4 md:col-span-7">
                <SubstitutionLadder prescribed={glycomet} substitutes={substitutes} />
                <p className="text-legal text-ink-muted">
                  Prices are printed MRPs. What you see is what you pay.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className={`${container} flex flex-col gap-6`} aria-labelledby="guides-head">
        <h2 id="guides-head" className="text-section text-ink">
          Guides, written by doctors, reviewed by doctors
        </h2>
        <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
          {guides.length >= 3
            ? guides.map((guide) => (
                <li key={guide.slug} className="flex">
                  <GuideCard
                    title={guide.title}
                    href={`/guides/${guide.slug}`}
                    excerpt={guide.excerpt}
                    byline={guide.byline}
                    readingMinutes={guide.readingMinutes}
                    className="flex-1"
                  />
                </li>
              ))
            : guideStubs.map((title) => (
                <li key={title} className="flex">
                  <GuideCard
                    title={title}
                    href="/guides"
                    byline="Dr. Achal, MBBS"
                    className="flex-1"
                  />
                </li>
              ))}
        </ul>
      </section>

      <section className={container} aria-label="WhatsApp">
        <WhatsAppOrderCard context={{ kind: "landing" }} />
      </section>
    </div>
  );
}
