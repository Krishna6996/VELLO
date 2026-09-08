import type { Metadata } from "next";
import { ConcernFilter } from "@/components/catalog/ConcernFilter";
import { MedicineList } from "@/components/catalog/MedicineList";
import { concernSlugs } from "@/lib/catalog/concerns";
import { getAllSorted, getByConcern } from "@/lib/catalog/queries";
import type { ConcernSlug } from "@/lib/catalog/types";

export const metadata: Metadata = {
  title: "Medicines · Vello",
};

function isConcern(value: string | string[] | undefined): value is ConcernSlug {
  return typeof value === "string" && (concernSlugs as readonly string[]).includes(value);
}

export default async function MedicinesPage({ searchParams }: PageProps<"/medicines">) {
  const params = await searchParams;
  const selected = isConcern(params.concern) ? params.concern : undefined;
  const skus = selected ? getByConcern(selected) : getAllSorted();

  return (
    <div className="mx-auto flex w-full max-w-page flex-col gap-8 px-6 py-10 md:px-10 md:py-16 lg:px-12">
      <h1 className="text-h1 text-ink">Medicines</h1>
      <ConcernFilter basePath="/medicines" selected={selected} />
      <MedicineList skus={skus} ariaLabel="Medicines" />
    </div>
  );
}
