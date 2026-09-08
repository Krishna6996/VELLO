import type { Metadata } from "next";
import { OrderView } from "@/components/orders/OrderView";

export async function generateMetadata({ params }: PageProps<"/orders/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: `Order ${id}`, robots: { index: false, follow: false } };
}

export default async function OrderPage({ params }: PageProps<"/orders/[id]">) {
  const { id } = await params;
  return (
    <div className="mx-auto w-full max-w-page px-6 py-10 md:px-10 md:py-16 lg:px-12">
      <OrderView id={id} />
    </div>
  );
}
