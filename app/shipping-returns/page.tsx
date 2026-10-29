import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Delivery areas, timelines, free shipping and returns for Eleva Imports orders.",
  alternates: { canonical: "/shipping-returns" },
};

/** TODO(client): every policy detail on this page must be confirmed before launch. */
export default function ShippingPage() {
  const threshold = formatPrice(siteConfig.commerce.freeShippingThreshold, { round: true });
  return (
    <>
      <PageHeader crumbs={[{ label: "Shipping & Returns" }]} eyebrow="Help" title="Shipping & returns" />
      <section className="bg-white py-14 md:py-20">
        <div className="wrap">
          <div className="mb-10 max-w-3xl rounded-sm bg-copper-wash p-5 text-sm text-ink">
            Draft policy for the demo. Delivery areas and timelines are to be confirmed by Eleva Imports.
          </div>
          <article className="prose-eleva">
            <h2>Where we deliver</h2>
            <p>
              We currently deliver within Ontario. Shipping availability to other provinces varies with provincial liquor
              regulations; please <Link href="/contact">contact us</Link> to confirm delivery to your address.
            </p>
            <h2>Shipping costs</h2>
            <ul>
              <li>
                <strong>Free shipping</strong> on orders over {threshold}.
              </li>
              <li>Orders under {threshold}: a flat rate is calculated at checkout.</li>
              <li>Corporate orders: delivery is quoted per recipient.</li>
            </ul>
            <h2>Delivery times</h2>
            <p>Orders are prepared in Toronto within 1–2 business days. Typical delivery times after dispatch:</p>
            <ul>
              <li>Greater Toronto Area: 2–4 business days</li>
              <li>Rest of Ontario: 3–6 business days</li>
            </ul>
            <h2>Age verification</h2>
            <p>
              You must be of legal drinking age in your province to order. An adult of legal drinking age must be present to
              receive the delivery, and proof of age may be required.
            </p>
            <h2>Returns</h2>
            <p>
              Because alcohol is a regulated product, we can&rsquo;t accept returns of opened bottles. If your order arrives
              damaged, incorrect or incomplete, contact us within 48 hours with your order number and a photo, and we&rsquo;ll
              replace it or refund you.
            </p>
            <h2>Questions</h2>
            <p>
              Call <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phoneDisplay}</a>, email{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> or message us on WhatsApp.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
