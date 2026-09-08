import { BlisterStrip } from "@/components/vocabulary/BlisterStrip";
import { ConcernIcon, concernSlugs } from "@/components/vocabulary/ConcernIcon";
import { DoseGlyphs } from "@/components/vocabulary/DoseGlyphs";
import { FormIcon, packForms } from "@/components/vocabulary/FormIcon";
import { IconWell } from "@/components/vocabulary/Glyph";
import { MoleculeTexture } from "@/components/vocabulary/MoleculeTexture";
import { RiderGlyph } from "@/components/vocabulary/RiderGlyph";
import { RxMark } from "@/components/vocabulary/RxMark";
import { VerificationSeal } from "@/components/vocabulary/VerificationSeal";
import { Example, Section } from "./Section";

const concernTitles: Record<(typeof concernSlugs)[number], string> = {
  diabetes: "Diabetes",
  "blood-pressure": "Blood pressure and heart",
  thyroid: "Thyroid",
  "skin-hair": "Skin and hair",
  "sexual-health": "Sexual health",
  "mind-sleep": "Mind and sleep",
  periods: "Periods and women's health",
  everyday: "Everyday health",
};

export function Vocabulary() {
  return (
    <>
      <Section
        id="form-icons"
        title="FormIcon"
        note="The medicine's real physical form. 24px glyph, shown bare and in the 44px sage well. Always paired with text, never load-bearing alone."
      >
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
          {packForms.map((form) => (
            <li key={form} className="flex items-center gap-4">
              <span className="block size-6">
                <FormIcon form={form} />
              </span>
              <IconWell>
                <FormIcon form={form} />
              </IconWell>
              <span className="font-mono text-legal text-ink-secondary">{form}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="concern-icons"
        title="ConcernIcon"
        note="Clinically literate, not decorative. The same well, the same weight and the same treatment for every concern; any difference would be the stigma."
      >
        <ul className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {concernSlugs.map((slug) => (
            <li key={slug} className="flex items-center gap-4">
              <span className="block size-6">
                <ConcernIcon concern={slug} />
              </span>
              <IconWell>
                <ConcernIcon concern={slug} />
              </IconWell>
              <span className="text-body text-ink">{concernTitles[slug]}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="dose-glyphs"
        title="DoseGlyphs, RxMark, ScheduleTag"
        note="Three 11px dots for morning, afternoon and night, always captioned in words. The ℞ is Fraunces in a sage pill; schedule tags are outlined squares that only ever sit beside it."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Example label="Dose glyphs">
            <div className="flex flex-col gap-3">
              <DoseGlyphs pattern="1-0-1" note="after food" />
              <DoseGlyphs pattern="1-1-1" note="after food" />
              <DoseGlyphs pattern="0-0-1" note="at bedtime" />
              <DoseGlyphs pattern="1-0-0" note="empty stomach" />
            </div>
          </Example>
          <Example label="Prescription mark">
            <div className="flex flex-wrap items-center gap-4">
              <RxMark />
              <RxMark schedule="H" />
              <RxMark schedule="H1" />
            </div>
          </Example>
        </div>
      </Section>

      <Section
        id="seal"
        title="VerificationSeal"
        note="A rubber stamp, not a badge. Pharmacist on the upper arc, registration and date on the lower, ℞ centred, rotated 7° and roughened. At most one per page; here it is shown twice only to check size."
      >
        <div className="flex flex-wrap items-end gap-10">
          <Example label="120px">
            <div className="w-30">
              <VerificationSeal name="Anil Mehta" reg="PB-45821" date="8 Sep 2026" />
            </div>
          </Example>
          <Example label="200px">
            <div className="w-50">
              <VerificationSeal name="Anil Mehta" reg="PB-45821" date="8 Sep 2026" />
            </div>
          </Example>
        </div>
      </Section>

      <Section
        id="blister"
        title="BlisterStrip, RiderGlyph"
        note="The strip is a strip in use: one pocket empty, drawn as a dashed ring, with the brand and molecule engraved. It carries the only shadow on the site."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <Example label="Blister strip, scales with its card">
            <div className="rounded-hero border border-hairline bg-canvas p-6 md:p-8">
              <BlisterStrip brand="Glycomet 500 SR" molecule="Metformin hydrochloride" />
            </div>
          </Example>
          <Example label="Rider, at 24px and in the well">
            <div className="flex items-center gap-4">
              <span className="block h-6 w-8">
                <RiderGlyph />
              </span>
              <IconWell>
                <RiderGlyph />
              </IconWell>
              <span className="text-body text-ink">Out for delivery</span>
            </div>
          </Example>
        </div>
      </Section>

      <Section
        id="texture"
        title="MoleculeTexture"
        note="Hexagonal chemistry lattice at 5% opacity. Welcome header and dividers only."
      >
        <div className="relative overflow-hidden rounded-hero border border-hairline bg-sage p-8 md:p-12">
          <MoleculeTexture />
          <p className="relative text-section text-ink">Medicine, exactly as prescribed.</p>
        </div>
      </Section>
    </>
  );
}
