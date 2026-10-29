import type { Metadata } from "next";
import { CheckoutStub } from "@/components/shop/CheckoutStub";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return <CheckoutStub />;
}
