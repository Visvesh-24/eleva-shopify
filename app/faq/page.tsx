import type { Metadata } from "next";
import Link from "next/link";
import { allFaqs } from "@/lib/faqs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { CTABand } from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about additive-free tequila, shipping, corporate gifts, masterclasses and trade accounts at Eleva Imports.",
  alternates: { canonical: "/faq" },
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "");

export default function FAQPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "FAQ" }]} eyebrow="Help" title="Frequently asked questions">
        <ul className="mt-8 flex flex-wrap gap-2">
          {allFaqs.map((g) => (
            <li key={g.title}>
              <Link href={`#${slug(g.title)}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm hover:border-copper hover:text-copper">
                {g.title}
              </Link>
            </li>
          ))}
        </ul>
      </PageHeader>
      <section className="bg-white py-14 md:py-20">
        <div className="wrap max-w-3xl space-y-16">
          {allFaqs.map((g) => (
            <div key={g.title} id={slug(g.title)} className="scroll-mt-36">
              <h2 className="h-section">{g.title}</h2>
              <Accordion className="mt-6" items={g.items} />
            </div>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: allFaqs.flatMap((g) => g.items).map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
            }),
          }}
        />
      </section>
      <CTABand title="Still have a question?" body="Our team is happy to help, from bottle picks to delivery details." primary={{ label: "Contact us", href: "/contact" }} />
    </>
  );
}
