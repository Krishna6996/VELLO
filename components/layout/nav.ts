export interface NavLink {
  label: string;
  href: string;
}

/** Header nav, in deck order: Medicines · Concerns · How it works · Guides · WhatsApp */
export const primaryNav: readonly NavLink[] = [
  { label: "Medicines", href: "/medicines" },
  { label: "Concerns", href: "/concerns" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Guides", href: "/guides" },
];

export const whatsappNav: NavLink = { label: "WhatsApp", href: "/whatsapp" };

/** Footer links from the copy deck's footer block. */
export const footerLinks: readonly NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Returns", href: "/returns" },
  { label: "Shipping", href: "/shipping" },
  { label: "Grievance", href: "/grievance" },
];
