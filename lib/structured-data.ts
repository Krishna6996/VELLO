import type { Sku } from "@/lib/catalog/types";
import type { Guide } from "@/lib/guides";
import { absoluteUrl, organisation, siteName, siteUrl } from "@/lib/site";

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: siteName,
    legalName: organisation.legalName,
    url: siteUrl,
    email: organisation.grievanceEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${organisation.pharmacy}, ${organisation.pharmacyAddress.street}`,
      addressLocality: organisation.pharmacyAddress.locality,
      addressRegion: organisation.pharmacyAddress.region,
      postalCode: organisation.pharmacyAddress.postalCode,
      addressCountry: organisation.pharmacyAddress.country,
    },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Drug licence",
      value: organisation.drugLicence,
    },
    employee: {
      "@type": "Person",
      name: organisation.pharmacist.name,
      jobTitle: "Registered Pharmacist",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "Pharmacist registration",
        value: organisation.pharmacist.reg,
      },
    },
  };
}

export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(sku: Sku): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: sku.brand,
    description: sku.description,
    brand: { "@type": "Brand", name: sku.brand.split(" ")[0] },
    manufacturer: { "@type": "Organization", name: sku.manufacturer },
    url: absoluteUrl(`/medicines/${sku.slug}`),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Molecule", value: sku.molecule },
      { "@type": "PropertyValue", name: "Strength", value: sku.strength },
      { "@type": "PropertyValue", name: "Pack", value: sku.packLabel },
      { "@type": "PropertyValue", name: "Schedule", value: sku.schedule },
    ],
    offers: {
      "@type": "Offer",
      price: (sku.mrp / 100).toFixed(2),
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: (sku.mrp / 100).toFixed(2),
        priceCurrency: "INR",
        priceType: "https://schema.org/ListPrice",
      },
      availability: sku.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: absoluteUrl(`/medicines/${sku.slug}`),
      seller: { "@type": "Pharmacy", name: organisation.pharmacy },
    },
  };
}

export function articleJsonLd(guide: Guide): Record<string, unknown> {
  const url = absoluteUrl(`/guides/${guide.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: guide.title,
        description: guide.excerpt,
        url,
        datePublished: guide.published,
        dateModified: guide.updated,
        author: { "@type": "Person", name: guide.author, honorificSuffix: guide.authorReg },
        publisher: { "@type": "Organization", name: siteName, url: siteUrl },
        mainEntityOfPage: { "@id": `${url}#page` },
      },
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#page`,
        url,
        name: guide.title,
        lastReviewed: guide.updated,
        reviewedBy: {
          "@type": "Person",
          name: guide.reviewer,
          identifier: {
            "@type": "PropertyValue",
            propertyID: "Registration",
            value: guide.reviewerReg,
          },
        },
      },
    ],
  };
}
