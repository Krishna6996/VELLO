import type { Metadata } from "next";
import { PlainPage } from "@/components/legal/PlainPage";
import { pageMetadata } from "@/lib/seo";

const lines = [
  "Vello is run by a doctor and an engineer. We dispense from Sharma Medicos, a licensed pharmacy in Model Town, under pharmacist-in-charge Anil Mehta. We don't take discounts from manufacturers and we don't run offers. We deliver what was written.",
  "Dispensed by Sharma Medicos, B-12, Model Town, Ludhiana 141002. Drug licence no. PB-LDH-20/21-XXXXX.",
  "Pharmacist-in-charge: Anil Mehta, Registered Pharmacist, Reg no. PB-45821.",
];

export const metadata: Metadata = pageMetadata({
  title: "Who we are",
  description: lines[0],
  path: "/about",
});

export default function AboutPage() {
  return <PlainPage title="Who we are" lines={lines} />;
}
