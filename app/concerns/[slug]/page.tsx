import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MedicineList } from "@/components/catalog/MedicineList";
import { GuideCard } from "@/components/guides/GuideCard";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { ReassuranceBlock } from "@/components/ui/ReassuranceBlock";
import { ConcernIcon } from "@/components/vocabulary/ConcernIcon";
import { IconWell } from "@/components/vocabulary/Glyph";
import { concernBySlug, concernSlugs } from "@/lib/catalog/concerns";
import { getByConcern, getGuidesForConcern } from "@/lib/catalog/queries";
import { spotCaptions } from "@/lib/catalog/spot-captions";
import type { ConcernSlug } from "@/lib/catalog/types";

/** Where a counter can make someone feel watched, the hub says so in one line. */
const discreet = new Set<ConcernSlug>(["sexual-health", "mind-sleep", "periods"]);

function isConcern(slug: string): slug is ConcernSlug {
  return (concernSlugs as readonly string[]).includes(slug);
}

export function generateStaticParams() {
  return concernSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/concerns/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isConcern(slug)) return {};
  const concern = concernBySlug[slug];
  return { title: `${concern.title} · Vello`, description: concern.intro };
}

export default async function ConcernPage({ params }: PageProps<"/concerns/[slug]">) {
  const { slug } = await params;
  if (!isConcern(slug)) notFound();
  const concern = concernBySlug[slug];
  const skus = getByConcern(slug);
  const guides = getGuidesForConcern(slug);

  return (
    <div className="mx-auto flex w-full max-w-page flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-16 lg:px-12">
      <header className="flex flex-col gap-5">
        <IconWell>
          <ConcernIcon concern={slug} />
        </IconWell>
        <div className="flex flex-col gap-3">
          <h1 className="text-h1 text-ink">{concern.title}</h1>
          <p className="max-w-measure text-body text-ink-secondary">{concern.intro}</p>
        </div>
      </header>

      <MedicineList skus={skus} ariaLabel={`Medicines for ${concern.title.toLowerCase()}`} />

      {guides.length > 0 ? (
        <section aria-labelledby="guides-head" className="flex flex-col gap-6">
          <h2 id="guides-head" className="text-section text-ink">
            Guides for {concern.title.toLowerCase()}
          </h2>
          <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
            {guides.map((guide) => (
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
            ))}
          </ul>
        </section>
      ) : null}

      {discreet.has(slug) ? (
        <ReassuranceBlock className="max-w-list">
          Plain packaging. No medicine names on the outside, no Vello branding on the box.
        </ReassuranceBlock>
      ) : null}

      <PhotoPlaceholder caption={spotCaptions[slug]} aspect="16/9" className="max-w-list" />
    </div>
  );
}
