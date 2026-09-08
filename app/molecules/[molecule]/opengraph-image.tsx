import { getMoleculePage } from "@/lib/catalog/molecules";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ molecule: string }> }) {
  const { molecule } = await params;
  const page = getMoleculePage(molecule);
  if (!page) return renderOg({ title: "Medicine, exactly as prescribed." });
  const brands = new Set(page.skus.map((sku) => sku.brand)).size;
  return renderOg({
    title: page.molecule,
    line: `${brands} ${brands === 1 ? "brand" : "brands"}, printed MRPs, same molecule`,
  });
}
