import Link from "next/link";
import { SearchField } from "@/components/ui/SearchField";

/** The 404: one line, one link home, one search field. */
export function NotFoundContent({ headingLevel = "h1" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  return (
    <div className="flex w-full max-w-list flex-col gap-6">
      <Heading className="text-h1 text-ink">We don&apos;t have a page here.</Heading>
      <SearchField
        id="not-found-search"
        variant="hero"
        placeholder="Search a medicine or molecule"
      />
      <Link
        href="/"
        className="inline-flex min-h-11 items-center self-start text-body font-medium text-primary hover:text-primary-pressed"
      >
        Vello
      </Link>
    </div>
  );
}
