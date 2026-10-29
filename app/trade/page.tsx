import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/lib/faqs";
import { siteConfig } from "@/lib/config";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { FadeIn } from "@/components/ui/FadeIn";
import { TradeNav } from "@/components/layout/TradeNav";
import { AgaveIcon, AwardIcon, GlassIcon, TruckIcon, UserIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "For Restaurants & Bars: Build Your Agave Program",
  description: "Exclusive additive-free tequilas, staff training, menu support and tastings for Ontario restaurants and bars, led by Canada's only Certified Tequila Master.",
  alternates: { canonical: "/trade" },
};

const benefits = [
  { icon: GlassIcon, title: "Exclusive pours", body: "Additive-free tequilas your competitors can't list, many unavailable at the LCBO." },
  { icon: UserIcon, title: "Staff training", body: "On-site sessions so your team can describe, recommend and upsell agave with confidence." },
  { icon: AgaveIcon, title: "Menu support", body: "Signature cocktails, flights and pairing notes built around your concept." },
  { icon: AwardIcon, title: "Tasting events", body: "Guest tastings hosted by Adriana to launch your program and drive covers." },
  { icon: TruckIcon, title: "Reliable supply", body: "Mixed-case ordering, trade pricing and fast reorders from Toronto." },
];

const steps = [
  { title: "Taste", body: "We bring a curated flight to your venue and match bottles to your menu and price points." },
  { title: "Build", body: "Together we design your agave list, cocktails and flights, with menu copy written for you." },
  { title: "Train", body: "Your front-of-house team learns to tell the story of every bottle." },
  { title: "Grow", body: "Quarterly check-ins, seasonal features and simple reorders keep your program fresh." },
];

export default function TradePage() {
  return (
    <>
      <PageHeader
        tone="dark"
        crumbs={[{ label: "For Restaurants & Bars" }]}
        eyebrow="For restaurants & bars"
        title="Build an agave program your guests will talk about"
        intro={
          <p>
            Exclusive additive-free tequilas, plus staff training, menu development and tastings led by Canada&rsquo;s only
            Certified Tequila Master.
          </p>
        }
        actions={
          <>
            <Link href="/trade/ordering" className="btn bg-copper-pale text-ink hover:bg-white">
              Apply for a trade account
            </Link>
            <a href={siteConfig.contact.phoneHref} className="btn-secondary">
              <PhoneIcon size={16} /> Talk to our trade team
            </a>
          </>
        }
        image={{ src: "/images/lifestyle/trio-decanters.png", alt: "Reserva Huizar decanters", width: 1600, height: 1250 }}
      />
      <TradeNav />

      <Section tone="white" aria-labelledby="benefits-title">
        <SectionHeading id="benefits-title" eyebrow="Why partner with Eleva" title="More than a supplier" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map(({ icon: Icon, title, body }, i) => (
            <FadeIn as="li" key={title} delay={i * 0.04} className="rounded-sm bg-ivory p-6 ring-1 ring-line">
              <Icon size={24} className="text-agave" />
              <h3 className="mt-4 font-serif text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
            </FadeIn>
          ))}
        </ul>
      </Section>

      <Section tone="ivory" aria-labelledby="program-title">
        <SectionHeading id="program-title" eyebrow="How it works" title="Your agave program in four steps" />
        <ol className="grid gap-px overflow-hidden rounded-sm bg-line md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-white p-8">
              <span className="font-serif text-5xl leading-none text-copper-light">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 font-serif text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section className="on-dark bg-charcoal py-16 text-white md:py-20">
        <div className="wrap flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="h-section text-white">Book a tasting at your venue</h2>
            <p className="mt-3 max-w-xl text-white/80">Free for licensed venues in the GTA. We&rsquo;ll bring the bottles and the glasses.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/trade/ordering" className="btn bg-copper-pale text-ink hover:bg-white">
              Apply now
            </Link>
            <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <WhatsAppIcon size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Section tone="white" aria-labelledby="trade-faq">
        <div className="mx-auto max-w-3xl">
          <h2 id="trade-faq" className="h-section text-center">
            Trade FAQ
          </h2>
          <Accordion className="mt-10" items={faqs.trade} faqSchema />
          <p className="mt-8 text-center text-sm text-ink-soft">
            Already a partner? <Link href="/trade/reorder" className="underline">Quick reorder</Link>
          </p>
        </div>
      </Section>
    </>
  );
}
