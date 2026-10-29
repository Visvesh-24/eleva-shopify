import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { siteConfig } from "@/lib/config";
import { PageHeader } from "@/components/ui/PageHeader";
import { TradeNav } from "@/components/layout/TradeNav";
import { TradeApplicationForm, TradeOrderForm } from "@/components/forms/TradeForms";
import { PhoneIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Trade Ordering",
  description: "Apply for an Eleva Imports trade account and order additive-free tequila for your restaurant or bar.",
  alternates: { canonical: "/trade/ordering" },
};

export default async function TradeOrderingPage() {
  const products = (await getAllProducts()).filter((p) => p.type !== "Gift Set");
  return (
    <>
      <PageHeader
        tone="dark"
        crumbs={[{ label: "For Restaurants & Bars", href: "/trade" }, { label: "Trade Ordering" }]}
        eyebrow="Trade ordering"
        title="Open a trade account"
        intro={<p>For licensed restaurants, bars, hotels and caterers in Ontario. Mixed cases, trade pricing and dedicated support.</p>}
        actions={
          <a href={siteConfig.contact.phoneHref} className="btn-secondary">
            <PhoneIcon size={16} /> {siteConfig.contact.phoneDisplay}
          </a>
        }
      />
      <TradeNav />

      <section aria-labelledby="apply-title" className="bg-white py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="eyebrow">Step 1</p>
            <h2 id="apply-title" className="h-section mt-3">
              Apply for an account
            </h2>
            <p className="mt-4 text-[1.0625rem] text-ink-soft">
              We&rsquo;ll verify your licence and set up trade pricing. Most applications are reviewed within two business days.
            </p>
          </div>
          <TradeApplicationForm />
        </div>
      </section>

      <section aria-labelledby="pricelist-title" className="border-t border-line bg-ivory py-16 md:py-24">
        <div className="wrap">
          <p className="eyebrow">Step 2</p>
          <h2 id="pricelist-title" className="h-section mt-3">
            Trade price list &amp; order form
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] text-ink-soft">
            Enter bottle quantities to build an order request. Minimum one mixed case of 6 bottles.
          </p>
          <div className="mt-10">
            <TradeOrderForm products={products} />
          </div>
        </div>
      </section>
    </>
  );
}
