import type { Metadata } from "next";
import { PlainPage } from "@/components/legal/PlainPage";
import { pageMetadata } from "@/lib/seo";

const lines = [
  "We deliver in Ludhiana, to pincodes starting 1410.",
  "Two slots: today by 8 pm if you order before 4 pm, or tomorrow between 10 am and 1 pm.",
  "Delivery is ₹25, whatever the order.",
  "Plain packaging. No medicine names on the outside, no Vello branding on the box.",
  "The rider calls when close.",
];

export const metadata: Metadata = pageMetadata({
  title: "Shipping",
  description: "Where we deliver, the two slots, the ₹25 delivery charge, and plain packaging.",
  path: "/shipping",
});

export default function ShippingPage() {
  return <PlainPage title="Shipping" lines={lines} />;
}
