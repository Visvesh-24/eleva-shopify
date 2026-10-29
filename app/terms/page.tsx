import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Terms of Service", alternates: { canonical: "/terms" } };

/** TODO(client): placeholder template. Have this reviewed by legal counsel. */
export default function TermsPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Terms of Service" }]} eyebrow="Legal" title="Terms of service" />
      <section className="bg-white py-14 md:py-20">
        <div className="wrap">
          <div className="mb-10 max-w-3xl rounded-sm bg-copper-wash p-5 text-sm text-ink">
            Placeholder terms for the demo. Final terms must be provided or approved by Eleva Imports&rsquo; legal counsel.
          </div>
          <article className="prose-eleva">
            <h2>Legal drinking age</h2>
            <p>
              By using this site and placing an order you confirm that you are of legal drinking age in your province of
              residence. We may refuse or cancel orders where age cannot be verified.
            </p>
            <h2>Orders and pricing</h2>
            <p>
              All prices are in Canadian dollars. Taxes and shipping are calculated at checkout. We reserve the right to correct
              pricing errors and to limit quantities.
            </p>
            <h2>Availability</h2>
            <p>
              Many of our products are imported in small quantities. If an item becomes unavailable after you order, we&rsquo;ll
              contact you with an alternative or a full refund.
            </p>
            <h2>Shipping and returns</h2>
            <p>
              See our <Link href="/shipping-returns">Shipping &amp; Returns</Link> page.
            </p>
            <h2>Responsible enjoyment</h2>
            <p>Please enjoy responsibly. Never drink and drive.</p>
          </article>
        </div>
      </section>
    </>
  );
}
