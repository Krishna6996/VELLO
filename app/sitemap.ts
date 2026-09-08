import type { MetadataRoute } from "next";
import { concernSlugs } from "@/lib/catalog/concerns";
import { getMoleculePages } from "@/lib/catalog/molecules";
import { getAll } from "@/lib/catalog/queries";
import { getGuides } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const fixed = [
    "/",
    "/medicines",
    "/concerns",
    "/guides",
    "/whatsapp",
    "/how-it-works",
    "/about",
    "/privacy",
    "/terms",
    "/returns",
    "/shipping",
    "/grievance",
  ];
  const guides = await getGuides();
  return [
    ...fixed.map((path) => ({ url: absoluteUrl(path), lastModified: now })),
    ...concernSlugs.map((slug) => ({ url: absoluteUrl(`/concerns/${slug}`), lastModified: now })),
    ...getAll().map((sku) => ({ url: absoluteUrl(`/medicines/${sku.slug}`), lastModified: now })),
    ...getMoleculePages().map((page) => ({
      url: absoluteUrl(`/molecules/${page.slug}`),
      lastModified: now,
    })),
    ...guides.map((guide) => ({
      url: absoluteUrl(`/guides/${guide.slug}`),
      lastModified: new Date(guide.updated),
    })),
  ];
}
