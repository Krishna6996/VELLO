import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ConcernFilter } from "@/components/catalog/ConcernFilter";
import { GuideCard } from "@/components/guides/GuideCard";
import { concernSlugs } from "@/lib/catalog/concerns";
import type { ConcernSlug } from "@/lib/catalog/types";
import { getGuides, getGuidesForConcern } from "@/lib/guides";

export const metadata: Metadata = pageMetadata({
  title: "Guides",
  description: "Guides, written by doctors, reviewed by doctors.",
  path: "/guides",
});

function isConcern(value: string | string[] | undefined): value is ConcernSlug {
  return typeof value === "string" && (concernSlugs as readonly string[]).includes(value);
}

export default async function GuidesPage({ searchParams }: PageProps<"/guides">) {
  const params = await searchParams;
  const selected = isConcern(params.concern) ? params.concern : undefined;
  const guides = selected ? await getGuidesForConcern(selected) : await getGuides();

  return (
    <div className="mx-auto flex w-full max-w-page flex-col gap-8 px-6 py-10 md:px-10 md:py-16 lg:px-12">
      <h1 className="text-h1 text-ink">Guides</h1>
      <ConcernFilter basePath="/guides" selected={selected} />
      <ul className="flex w-full max-w-list flex-col gap-3" aria-label="Guides">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <GuideCard
              title={guide.title}
              href={`/guides/${guide.slug}`}
              excerpt={guide.excerpt}
              byline={guide.byline}
              readingMinutes={guide.readingMinutes}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
