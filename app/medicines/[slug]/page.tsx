import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/structured-data";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/product/ProductView";
import { BlisterStrip } from "@/components/vocabulary/BlisterStrip";
import { DoseGlyphs } from "@/components/vocabulary/DoseGlyphs";
import { FormIcon } from "@/components/vocabulary/FormIcon";
import { RxMark } from "@/components/vocabulary/RxMark";
import { concernBySlug } from "@/lib/catalog/concerns";
import { getAll, getBySlug, getSubstitutes } from "@/lib/catalog/queries";
import type { Sku } from "@/lib/catalog/types";
import { medicineLine } from "@/lib/format";
import { getGuidesForConcerns } from "@/lib/guides";
import { GuideCard } from "@/components/guides/GuideCard";

export function generateStaticParams() {
  return getAll().map((sku) => ({ slug: sku.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/medicines/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const sku = getBySlug(slug);
  if (!sku) return {};
  const what = sku.strength
    ? `${sku.molecule.toLowerCase()} ${sku.strength}`
    : sku.molecule.toLowerCase();
  return pageMetadata({
    title: `${sku.brand} (${what})`,
    description: sku.description,
    path: `/medicines/${slug}`,
  });
}

const blisterForms = new Set<Sku["form"]>(["tablet", "sr-tablet", "capsule"]);

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-3">
      <h2 id={id} className="text-section text-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex max-w-measure list-disc flex-col gap-1.5 pl-5 text-body text-ink-secondary marker:text-ink-muted">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default async function MedicinePage({ params }: PageProps<"/medicines/[slug]">) {
  const { slug } = await params;
  const sku = getBySlug(slug);
  if (!sku) notFound();

  const concern = concernBySlug[sku.concerns[0]];
  const substitutes = getSubstitutes(sku.slug);
  const guides = (await getGuidesForConcerns(sku.concerns)).slice(0, 2);

  const header = (
    <div className="flex flex-col gap-4">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 text-row text-ink-muted">
          <li>
            <Link href="/medicines" className="inline-flex min-h-11 items-center hover:text-ink">
              Medicines
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link
              href={`/concerns/${concern.slug}`}
              className="inline-flex min-h-11 items-center hover:text-ink"
            >
              {concern.title}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="inline-flex min-h-11 items-center">
            {sku.brand}
          </li>
        </ol>
      </nav>
      <div className="flex flex-col gap-2">
        <h1 className="text-h1 text-ink">{sku.brand}</h1>
        <p className="text-body text-ink-muted">
          {medicineLine(sku.molecule, sku.strength, sku.form, sku.packLabel)}
        </p>
      </div>
      {sku.schedule !== "OTC" ? <RxMark schedule={sku.schedule} /> : null}
    </div>
  );

  const visual = blisterForms.has(sku.form) ? (
    <div className="rounded-hero border border-hairline bg-surface p-6 md:p-8">
      <BlisterStrip brand={sku.brand} molecule={sku.molecule} />
    </div>
  ) : (
    <div className="flex size-40 items-center justify-center rounded-hero bg-sage">
      <span className="block size-24">
        <FormIcon form={sku.form} />
      </span>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-page px-6 py-10 md:px-10 md:py-16 lg:px-12">
      <JsonLd data={productJsonLd(sku)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Medicines", path: "/medicines" },
          { name: concern.title, path: `/concerns/${concern.slug}` },
          { name: sku.brand, path: `/medicines/${sku.slug}` },
        ])}
      />
      <ProductView sku={sku} substitutes={substitutes} header={header} visual={visual}>
        <Section id="about" title="About">
          <p className="max-w-measure text-body text-ink-secondary">{sku.description}</p>
        </Section>
        <Section id="how-to-take" title="How to take">
          {sku.regimen ? (
            <DoseGlyphs pattern={sku.regimen.pattern} note={sku.regimen.note} />
          ) : null}
          <p className="max-w-measure text-body text-ink-secondary">{sku.howToTake}</p>
        </Section>
        {sku.sideEffects.length > 0 ? (
          <Section id="side-effects" title="Side effects">
            <Bullets items={sku.sideEffects} />
          </Section>
        ) : null}
        {sku.warnings.length > 0 ? (
          <Section id="warnings" title="Warnings">
            <Bullets items={sku.warnings} />
          </Section>
        ) : null}
        <Section id="storage" title="Storage">
          <p className="max-w-measure text-body text-ink-secondary">{sku.storage}</p>
        </Section>
        <Section id="manufacturer" title="Manufacturer">
          <p className="max-w-measure text-body text-ink-secondary">{sku.manufacturer}</p>
        </Section>
        {guides.length > 0 ? (
          <Section id="guides" title={`Guides for ${concern.title.toLowerCase()}`}>
            <ul className="grid gap-3 md:grid-cols-2">
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
          </Section>
        ) : null}
      </ProductView>
    </div>
  );
}
