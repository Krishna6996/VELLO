/** Canonical origin for metadata, sitemaps and JSON-LD. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vello.in").replace(/\/$/, "");

export const siteName = "Vello";

export const siteDescription =
  "Medicine, exactly as prescribed. Delivered in hours from a licensed pharmacy near you. A registered pharmacist checks every order. Prices are printed MRPs.";

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** The licence block, also used for Organization JSON-LD. */
export const organisation = {
  legalName: "[Legal entity name] Private Limited",
  pharmacy: "Sharma Medicos",
  pharmacyAddress: {
    street: "B-12, Model Town",
    locality: "Ludhiana",
    postalCode: "141002",
    region: "Punjab",
    country: "IN",
  },
  drugLicence: "PB-LDH-20/21-XXXXX",
  pharmacist: { name: "Anil Mehta", reg: "PB-45821" },
  grievanceEmail: "grievance@vello.in",
  registeredOffice: "DLF Prime Tower, Okhla, New Delhi",
} as const;
