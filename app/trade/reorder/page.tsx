import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { tradeAccount } from "@/lib/experiences";
import { PageHeader } from "@/components/ui/PageHeader";
import { TradeNav } from "@/components/layout/TradeNav";
import { QuickReorder } from "@/components/forms/TradeForms";

export const metadata: Metadata = { title: "Quick Reorder", robots: { index: false } };

export default async function QuickReorderPage() {
  const products = (await getAllProducts()).filter((p) => p.type !== "Gift Set");
  return (
    <>
      <PageHeader
        tone="dark"
        crumbs={[{ label: "For Restaurants & Bars", href: "/trade" }, { label: "Quick Reorder" }]}
        eyebrow="Quick reorder"
        title="Your usual, in seconds"
        intro={
          <p>
            Signed in as <strong className="text-white">{tradeAccount.business}</strong>. Load a past order, adjust quantities
            and submit.
          </p>
        }
      />
      <TradeNav />
      <section className="bg-ivory py-14 md:py-20">
        <div className="wrap">
          {/* MOCK account + order history (lib/experiences.ts) */}
          <QuickReorder orders={tradeAccount.orders} products={products} />
          <p className="mt-10 text-sm text-ink-soft">
            Not a trade partner yet? <Link href="/trade/ordering" className="underline">Apply for an account</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
