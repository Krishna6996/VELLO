import type { Metadata } from "next";
import { PlainPage } from "@/components/legal/PlainPage";
import { pageMetadata } from "@/lib/seo";

const lines = [
  "Vello takes your order and arranges delivery of medicines dispensed by Sharma Medicos, a licensed pharmacy in Ludhiana.",
  "Prescription medicines are dispensed only against a valid prescription checked by a registered pharmacist. The pharmacist may decline an order; nothing is charged for an order that isn't dispensed.",
  "Prices are printed MRPs. Delivery is ₹25. There are no other charges.",
  "You can cancel an order until it is packed. After that, see Returns.",
  "These terms are governed by the laws of India. Disputes are heard in Ludhiana.",
];

export const metadata: Metadata = pageMetadata({
  title: "Terms",
  description:
    "Plain terms: what Vello does, when a pharmacist may decline, what you pay, and how to cancel.",
  path: "/terms",
});

export default function TermsPage() {
  return <PlainPage title="Terms" lines={lines} />;
}
