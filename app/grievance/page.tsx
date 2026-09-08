import type { Metadata } from "next";
import { PlainPage } from "@/components/legal/PlainPage";
import { pageMetadata } from "@/lib/seo";

const lines = [
  "If something went wrong and we didn't fix it, write to our grievance officer. We respond within 48 hours.",
  "Grievance officer: [name], grievance@vello.in. We respond within 48 hours.",
];

export const metadata: Metadata = pageMetadata({
  title: "Grievance",
  description: lines[0],
  path: "/grievance",
});

export default function GrievancePage() {
  return <PlainPage title="Grievance" lines={lines} />;
}
