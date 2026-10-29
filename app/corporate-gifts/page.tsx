import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, formatDeadline } from "@/lib/config";
import { giftTiers } from "@/lib/experiences";
import { faqs } from "@/lib/faqs";
import { testimonials } from "@/lib/content";
import { getProductsBySlugs } from "@/lib/products";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { FadeIn } from "@/components/ui/FadeIn";
import { CheckIcon, PhoneIcon, WhatsAppIcon, GiftIcon, TruckIcon, AwardIcon, CalendarIcon } from "@/components/ui/Icons";
import { DeadlineCountdown } from "@/components/home/DeadlineCountdown";
import { CorporateQuoteForm } from "@/components/forms/CorporateQuoteForm";
import { LogoPreview } from "@/components/forms/LogoPreview";
import { ProductImage } from "@/components/shop/ProductImage";
import { cn } from "@/lib/format";

export const metadata: Metadata = {
  title: "Corporate Gifts",
  description:
    "Exclusive additive-free Mexican spirits, personalized with your logo and message. One order, one invoice, delivered to every recipient. Curated by Canada's only Certified Tequila Master.",
  alternates: { canonical: "/corporate-gifts" },
};

const steps = [
  { icon: GiftIcon, title: "Choose", body: "Pick a gift tier or let Adriana curate a selection for your budget and audience." },
  { icon: AwardIcon, title: "Personalize", body: "Add your logo and message to gift boxes, tags and cards. Approve a digital proof before production." },
  { icon: TruckIcon, title: "We deliver", body: "Send us your recipient list. We wrap, ship and track every gift. You get one invoice." },
];

export default async function CorporateGiftsPage() {
  const { corporate, contact } = siteConfig;
  const deadline = formatDeadline(corporate.orderDeadline);
  const tierProducts = await getProductsBySlugs(giftTiers.map((t) => t.productSlug));

  return (
    <>
      <PageHeader
        tone="dark"
        crumbs={[{ label: "Corporate Gifts" }]}
        eyebrow="Corporate gifting 2026"
        title="Gifts your clients will remember long after the holidays"
        intro={
          <p>
            Exclusive Mexican spirits, personalized with your company logo and message. One order. One invoice. We handle
            everything.
          </p>
        }
        actions={
          <>
            <Link href="#quote" className="btn bg-copper-pale text-ink hover:bg-white">
              Reserve my gifts
            </Link>
            <a href={contact.phoneHref} className="btn-secondary">
              <PhoneIcon size={16} /> {contact.phoneDisplay}
            </a>
          </>
        }
        image={{ src: "/images/lifestyle/gifting-lineup.png", alt: "Eleva corporate gift bottles", width: 2000, height: 1250 }}
      >
        <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-label text-copper-pale">
          <CalendarIcon size={15} /> Orders close {deadline}
          <DeadlineCountdown date={corporate.orderDeadline} className="text-white" />
        </p>
      </PageHeader>

      {/* How it works */}
      <Section tone="white" aria-labelledby="how-title">
        <SectionHeading id="how-title" eyebrow="How it works" title="Three steps. We do the rest." />
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <FadeIn as="li" key={title} delay={i * 0.06} className="relative rounded-sm bg-ivory p-8 ring-1 ring-line">
              <span className="font-serif text-6xl leading-none text-copper-light">{i + 1}</span>
              <Icon size={26} className="absolute right-8 top-8 text-agave" />
              <h3 className="mt-6 font-serif text-3xl">{title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{body}</p>
            </FadeIn>
          ))}
        </ol>
      </Section>

      {/* Tiers */}
      <Section tone="ivory" aria-labelledby="tiers-title">
        <SectionHeading
          id="tiers-title"
          eyebrow="Gift packages"
          title="Choose a starting point"
          intro="Every package can be tailored. Prices include personalization and gift packaging; delivery is quoted per recipient."
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {giftTiers.map((t, i) => {
            const p = tierProducts.find((x) => x.slug === t.productSlug);
            return (
              <FadeIn
                as="li"
                key={t.name}
                delay={i * 0.05}
                className={cn("relative flex flex-col rounded-sm bg-white ring-1", t.featured ? "ring-2 ring-copper" : "ring-line")}
              >
                {t.featured ? (
                  <span className="absolute right-4 top-4 z-10 rounded-sm bg-copper px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-label text-white">
                    Most chosen
                  </span>
                ) : null}
                {p ? (
                  <div className="overflow-hidden rounded-t-sm border-b border-line">
                    <ProductImage product={p} sizes="(min-width: 1024px) 22vw, 45vw" />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-2xl">{t.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-copper">{t.priceRange}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">Minimum {t.minimum} gifts</p>
                  <ul className="mt-5 flex-1 space-y-2.5 text-sm text-ink-soft">
                    {t.includes.map((x) => (
                      <li key={x} className="flex gap-2.5">
                        <CheckIcon size={16} className="mt-0.5 shrink-0 text-agave" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <Link href="#quote" className={cn("mt-6 w-full", t.featured ? "btn-primary" : "btn-secondary")}>
                    Request a quote
                  </Link>
                </div>
              </FadeIn>
            );
          })}
        </ul>
      </Section>

      {/* Personalization preview */}
      <Section tone="white" aria-labelledby="preview-title">
        <SectionHeading
          id="preview-title"
          eyebrow="Personalization"
          title="See your logo on the gift"
          intro="Upload your logo and write a message to preview a personalized gift tag. Final artwork is proofed by our team."
        />
        <LogoPreview />
      </Section>

      {/* Deadlines */}
      <section aria-labelledby="deadline-title" className="on-dark bg-charcoal py-16 text-white md:py-20">
        <div className="wrap">
          <h2 id="deadline-title" className="h-section text-white">
            Holiday deadlines
          </h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-sm bg-white/15 md:grid-cols-3">
            {[
              { when: `By ${deadline}`, what: "Place your order and send your logo and recipient list." },
              { when: "Within 3 business days", what: "Approve your digital proof." },
              { when: `In ${corporate.deliveryWindow}`, what: "Gifts are delivered to every recipient." },
            ].map((d) => (
              <li key={d.when} className="bg-charcoal-800 p-7">
                <p className="eyebrow">{d.when}</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/85">{d.what}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs text-white/60">Orders after {deadline} are welcome; we&rsquo;ll confirm what can be delivered before the holidays.</p>
        </div>
      </section>

      {/* Testimonials */}
      <Section tone="ivory" aria-labelledby="corp-reviews">
        <SectionHeading id="corp-reviews" eyebrow="Trusted by teams" title="What our corporate clients say" />
        <ul className="grid gap-6 md:grid-cols-2">
          {[testimonials[0], testimonials[2]].map((t) => (
            <li key={t.name} className="rounded-sm bg-white p-8 ring-1 ring-line">
              <blockquote className="font-serif text-2xl leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
              <p className="mt-5 text-sm font-semibold">{t.name}</p>
              <p className="text-sm text-ink-muted">{t.context}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Quote form + FAQ */}
      <section id="quote" aria-labelledby="quote-title" className="scroll-mt-32 bg-white py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow">Reserve your gifts</p>
            <h2 id="quote-title" className="h-section mt-4">
              Get a corporate quote
            </h2>
            <p className="mt-4 max-w-xl text-[1.0625rem] text-ink-soft">
              Tell us about your gifting and we&rsquo;ll send a tailored proposal. No commitment until you approve.
            </p>
            <div className="mt-10">
              <CorporateQuoteForm />
            </div>
          </div>
          <div>
            <div className="rounded-sm bg-stone-50 p-6 ring-1 ring-line">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/lifestyle/adriana-portrait.jpg"
                  alt="Adriana Martinez"
                  width={1334}
                  height={1628}
                  sizes="80px"
                  className="h-20 w-auto rounded-sm"
                />
                <div>
                  <p className="font-serif text-xl">Talk to Adriana&rsquo;s team</p>
                  <p className="text-sm text-ink-soft">Personal recommendations for every budget.</p>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a href={contact.phoneHref} className="btn-secondary btn-sm flex-1">
                  <PhoneIcon size={15} /> Call
                </a>
                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-sm flex-1">
                  <WhatsAppIcon size={15} /> WhatsApp
                </a>
              </div>
            </div>
            <h3 className="mt-12 font-serif text-3xl">Questions</h3>
            <Accordion className="mt-4" items={faqs.corporate} faqSchema />
          </div>
        </div>
      </section>
    </>
  );
}
