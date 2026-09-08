import type { Metadata } from "next";
import { PlainPage } from "@/components/legal/PlainPage";
import { pageMetadata } from "@/lib/seo";

const lines = [
  "What we collect: your name, phone number, delivery address, and the prescription you send us.",
  "Why: to check and deliver your order. The law asks a pharmacy to keep a record of every prescription medicine it dispenses, and we keep that record.",
  "Who sees it: the registered pharmacist checking your order and the rider delivering it. Nobody else.",
  "How long: prescriptions and dispensing records are kept for the period the Drugs and Cosmetics Rules require, and then deleted.",
  "We don't sell health data, and we don't share it for advertising.",
  "To see or delete what we hold about you, write to grievance@vello.in.",
];

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description:
    "What we collect, why, who sees it, how long we keep it, and how to have it deleted.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PlainPage title="Privacy" lines={lines} />;
}
