import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

/** TODO(client): placeholder template. Have this reviewed by legal counsel (PIPEDA, CASL). */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Privacy Policy" }]} eyebrow="Legal" title="Privacy policy" />
      <section className="bg-white py-14 md:py-20">
        <div className="wrap">
          <div className="mb-10 max-w-3xl rounded-sm bg-copper-wash p-5 text-sm text-ink">
            Placeholder policy for the demo. The final policy must be provided or approved by Eleva Imports&rsquo; legal counsel.
          </div>
          <article className="prose-eleva">
            <h2>What we collect</h2>
            <p>
              When you place an order, create an account, subscribe to our newsletter or submit a form, we collect the details
              you provide, such as your name, email, phone number, delivery address and order history.
            </p>
            <h2>How we use it</h2>
            <ul>
              <li>To process and deliver your orders and verify legal drinking age.</li>
              <li>To respond to enquiries, quotes, bookings and trade applications.</li>
              <li>To send marketing emails, only with your consent. You can unsubscribe at any time.</li>
              <li>To understand how our site is used through analytics, so we can improve it.</li>
            </ul>
            <h2>Sharing</h2>
            <p>
              We share information only with service providers who help us run the store (for example our e-commerce platform,
              payment processor and delivery partners), and never sell your personal information.
            </p>
            <h2>Your choices</h2>
            <p>
              You can request access to, correction of or deletion of your personal information by contacting{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
