import type { Metadata } from "next";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

export const metadata: Metadata = {
  title: "We don't have a page here · Vello",
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-page px-6 py-10 md:px-10 md:py-16 lg:px-12">
      <NotFoundContent />
    </div>
  );
}
