import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MedicineList } from "@/components/catalog/MedicineList";
import { JsonLd } from "@/components/seo/JsonLd";
import { leaflets } from "@/lib/catalog/leaflets";
import { getMoleculePage, getMoleculePages, groupByStrength } from "@/lib/catalog/molecules";
import { formLabel } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return getMoleculePages().map((page) => ({ molecule: page.slug }));
}

function sentenceCase(molecule: string): string {
  const second = molecule.charAt(1);
  return second && second === second.toLowerCase()
    ? molecule.charAt(0).toLowerCase() + molecule.slice(1)
    : molecule;
}

export async function generateMetadata({
  params,
}: PageProps<"/molecules/[molecule]">): Promise<Metadata> {
  const { molecule } = await params;
  const page = getMoleculePage(molecule);
  if (!page) return {};
  const brands = page.skus.map((sku) => sku.brand).join(", ");
  return pageMetadata({
    title: page.molecule,
    description: `${leaflets[page.molecule]?.about ?? ""} Brands we stock: ${brands}.`.trim(),
    path: `/molecules/${page.slug}`,
  });
}

export default async function MoleculePage({ params }: PageProps<"/molecules/[molecule]">) {
  const { molecule } = await params;
  const page = getMoleculePage(molecule);
  if (!page) notFound();

  const leaflet = leaflets[page.molecule];
  const groups = groupByStrength(page.skus);
  const brandCount = new Set(page.skus.map((sku) => sku.brand)).size;
  const strengthCount = new Set(page.skus.map((sku) => sku.strength || sku.form)).size;
  const name = sentenceCase(page.molecule);

  return (
    <div className="mx-auto flex w-full max-w-page flex-col gap-12 px-6 py-10 md:gap-16 md:px-10 md:py-16 lg:px-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Medicines", path: "/medicines" },
          { name: page.molecule, path: `/molecules/${page.slug}` },
        ])}
      />
      <header className="flex flex-col gap-5">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 text-row text-ink-muted">
            <li>
              <Link href="/medicines" className="inline-flex min-h-11 items-center hover:text-ink">
                Medicines
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" className="inline-flex min-h-11 items-center">
              {page.molecule}
            </li>
          </ol>
        </nav>
        <h1 className="text-h1 text-ink">{page.molecule}</h1>
        <div className="flex max-w-measure flex-col gap-4 text-body text-ink-secondary">
          {leaflet ? <p>{leaflet.about}</p> : null}
          <p>
            We stock {brandCount} {brandCount === 1 ? "brand" : "brands"} of {name}, in{" "}
            {strengthCount} {strengthCount === 1 ? "strength" : "strengths"}. Brands at the same
            strength and in the same form contain the same molecule; pharmacists consider them
            equivalent. Prices are printed MRPs, listed lowest first.
          </p>
        </div>
      </header>

      {groups.map((group) => (
        <section
          key={group.key}
          aria-labelledby={`group-${group.key}`}
          className="flex flex-col gap-5"
        >
          <h2 id={`group-${group.key}`} className="text-section text-ink">
            {page.molecule}
            {group.strength ? ` ${group.strength}` : ""} · {formLabel(group.form)}
          </h2>
          <MedicineList
            skus={group.skus}
            ariaLabel={`${page.molecule} ${group.strength} ${formLabel(group.form)}`}
          />
        </section>
      ))}
    </div>
  );
}
