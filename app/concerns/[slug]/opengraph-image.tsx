import { concernBySlug, concernSlugs } from "@/lib/catalog/concerns";
import type { ConcernSlug } from "@/lib/catalog/types";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(concernSlugs as readonly string[]).includes(slug))
    return renderOg({ title: "Medicine, exactly as prescribed." });
  const concern = concernBySlug[slug as ConcernSlug];
  return renderOg({ title: concern.title, line: concern.line });
}
