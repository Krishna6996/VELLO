import type { Metadata } from "next";
import { ConcernTile } from "@/components/catalog/ConcernTile";
import { concerns } from "@/lib/catalog/concerns";

export const metadata: Metadata = {
  title: "Concerns · Vello",
};

export default function ConcernsPage() {
  return (
    <div className="mx-auto flex w-full max-w-page flex-col gap-8 px-6 py-10 md:px-10 md:py-16 lg:px-12">
      <h1 className="text-h1 text-ink">Concerns</h1>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {concerns.map((concern) => (
          <li key={concern.slug} className="flex">
            <ConcernTile concern={concern} className="flex-1" />
          </li>
        ))}
      </ul>
    </div>
  );
}
