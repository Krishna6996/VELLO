import { getAll, getBySlug } from "@/lib/catalog/queries";
import { medicineLine } from "@/lib/format";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export function generateImageMetadata() {
  return getAll().map((sku) => ({
    id: sku.slug,
    alt: `${sku.brand}. ${medicineLine(sku.molecule, sku.strength, sku.form, sku.packLabel)}`,
    size: ogSize,
    contentType: ogContentType,
  }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sku = getBySlug(slug);
  if (!sku) return renderOg({ title: "Medicine, exactly as prescribed." });
  return renderOg({
    title: sku.brand,
    line: medicineLine(sku.molecule, sku.strength, sku.form, sku.packLabel),
  });
}
