import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { AccountForms } from "@/components/forms/AccountForms";

export const metadata: Metadata = { title: "Account", robots: { index: false } };

export default function AccountPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Account" }]}
        eyebrow="Your Eleva account"
        title="Sign in or create an account"
        intro={<p>Track orders, reorder favourites and save addresses for gifting.</p>}
      />
      <section className="bg-white py-14 md:py-20">
        <div className="wrap">
          <AccountForms />
          <p className="mt-10 text-sm text-ink-soft">
            Restaurant or bar? <Link href="/trade/ordering" className="underline">Apply for a trade account</Link> or go to{" "}
            <Link href="/trade/reorder" className="underline">Quick Reorder</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
