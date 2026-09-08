import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MedicineList } from "@/components/catalog/MedicineList";
import { Pill } from "@/components/ui/Pill";
import { WhatsAppOrderCard } from "@/components/whatsapp/WhatsAppOrderCard";
import { moleculeSlug } from "@/lib/catalog/molecules";
import { search } from "@/lib/search";
import { logUnmatched } from "@/lib/search-log";

export async function generateMetadata({ searchParams }: PageProps<"/search">): Promise<Metadata> {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  return {
    title: query ? `Results for "${query}"` : "Search",
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  if (!query) redirect("/medicines");
  const results = search(query);

  if (results.empty) {
    await logUnmatched(query);
  }

  return (
    <div className="mx-auto flex w-full max-w-page flex-col gap-8 px-6 py-10 md:px-10 md:py-16 lg:px-12">
      {results.empty ? (
        <WhatsAppOrderCard context={{ kind: "search-miss", query }} headingLevel="h1" />
      ) : (
        <>
          <h1 className="text-h1 text-ink">Results for &ldquo;{results.query}&rdquo;</h1>
          {results.molecules.length > 0 || results.concerns.length > 0 ? (
            <ul className="flex flex-wrap gap-2" aria-label="Molecules and concerns">
              {results.molecules.map((molecule) => (
                <li key={molecule.molecule}>
                  <Link
                    href={`/molecules/${moleculeSlug(molecule.molecule)}`}
                    className="inline-flex min-h-11 items-center"
                  >
                    <Pill className="motion-surface min-h-9 hover:bg-primary hover:text-surface">
                      {molecule.molecule} · {molecule.count}{" "}
                      {molecule.count === 1 ? "medicine" : "medicines"}
                    </Pill>
                  </Link>
                </li>
              ))}
              {results.concerns.map((concern) => (
                <li key={concern.slug}>
                  <Link
                    href={`/concerns/${concern.slug}`}
                    className="inline-flex min-h-11 items-center"
                  >
                    <Pill className="motion-surface min-h-9 hover:bg-primary hover:text-surface">
                      {concern.title}
                    </Pill>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          <MedicineList skus={results.brands} ariaLabel="Brands" />
        </>
      )}
    </div>
  );
}
