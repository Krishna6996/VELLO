import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout · Vello",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto flex w-full max-w-page flex-col gap-8 px-6 py-10 md:px-10 md:py-16 lg:px-12">
      <div className="mx-auto flex w-full max-w-list flex-col gap-8">
        <h1 className="text-h1 text-ink">Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  );
}
