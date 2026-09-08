import type { Metadata } from "next";
import { PlainPage } from "@/components/legal/PlainPage";
import { pageMetadata } from "@/lib/seo";

const lines = [
  "Medicines can't be returned once dispensed, except if they arrive damaged or wrong. Tell us within 24 hours and we'll replace them.",
];

export const metadata: Metadata = pageMetadata({
  title: "Returns",
  description: lines[0],
  path: "/returns",
});

export default function ReturnsPage() {
  return <PlainPage title="Returns" lines={lines} />;
}
