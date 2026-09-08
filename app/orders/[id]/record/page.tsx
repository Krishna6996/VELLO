import type { Metadata } from "next";
import { RecordView } from "@/components/orders/RecordView";

export async function generateMetadata({
  params,
}: PageProps<"/orders/[id]/record">): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Dispensing record, order ${id} · Vello`,
    robots: { index: false, follow: false },
  };
}

export default async function RecordPage({ params }: PageProps<"/orders/[id]/record">) {
  const { id } = await params;
  return (
    <div className="mx-auto w-full max-w-list px-6 py-10 md:px-10 md:py-16 lg:px-12">
      <RecordView id={id} />
    </div>
  );
}
