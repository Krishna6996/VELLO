import type { Metadata } from "next";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Route path, e.g. "/medicines/glycomet-500-sr". */
  path: string;
  /** Pages that shouldn't be indexed: checkout, orders, styleguide, search. */
  noIndex?: boolean;
  ogType?: "website" | "article";
}

/** Title, description, canonical and OpenGraph for one route. The OG image comes from the route's opengraph-image. */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
  ogType = "website",
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: ogType, title, description, url: path },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
