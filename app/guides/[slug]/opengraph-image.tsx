import { getGuideBySlug } from "@/lib/guides";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return renderOg({ title: "Guides, written by doctors, reviewed by doctors" });
  return renderOg({
    title: guide.title,
    line: `Written by ${guide.author}, ${guide.authorReg}. Reviewed by ${guide.reviewer}.`,
  });
}
