import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/guides/mdx-components";
import { ShareLink } from "@/components/guides/ShareLink";
import { formatDate } from "@/lib/format";
import { getGuideBySlug, getGuides } from "@/lib/guides";

export async function generateStaticParams() {
  return (await getGuides()).map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return {};
  return { title: `${guide.title} · Vello`, description: guide.excerpt };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  const { content } = await compileMDX({ source: guide.body, components: mdxComponents });

  return (
    <article className="mx-auto w-full max-w-article px-6.5 py-10 md:px-0 md:py-16">
      <header className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-editorial text-article-headline text-ink">{guide.title}</h1>
          <ShareLink title={guide.title} />
        </div>
        <p className="text-article text-ink-secondary">{guide.excerpt}</p>
        <p className="border-y border-hairline py-3 text-row text-ink-muted">
          Written by {guide.author}, {guide.authorReg}. Reviewed by {guide.reviewer},{" "}
          {guide.reviewerReg}. Published {formatDate(guide.published)}. Updated{" "}
          {formatDate(guide.updated)}.
        </p>
      </header>

      <div className="mt-6">{content}</div>

      <section aria-labelledby="sources-head" className="mt-12">
        <h2 id="sources-head" className="mb-3 font-editorial text-article-subhead text-ink">
          Sources
        </h2>
        <ol className="list-decimal pl-6 text-row text-ink-secondary marker:text-ink-muted">
          {guide.sources.map((source) => (
            <li key={source} className="my-1.5">
              {source}
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-10 border-t border-hairline pt-4 text-legal text-ink-faint">
        This guide is for understanding, not for deciding treatment. Your doctor knows your history;
        follow what they wrote.
      </p>
    </article>
  );
}
