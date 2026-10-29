import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTABand } from "@/components/ui/CTABand";
import { FadeIn } from "@/components/ui/FadeIn";
import { AgaveIcon, AwardIcon, GlassIcon, MapPinIcon, ShieldIcon, GiftIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "About Us",
  description: "Eleva Imports brings additive-free, 100% blue agave tequila to Canada, curated by Adriana Martinez, Canada's only Certified Tequila Master.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: AgaveIcon, title: "Nothing added", body: "Only 100% blue agave tequilas made without additives. What's in the glass is agave, water, time and craft." },
  { icon: MapPinIcon, title: "Direct from Mexico", body: "We work directly with family-run producers and import their spirits ourselves." },
  { icon: GlassIcon, title: "Exclusive to Eleva", body: "Many of our bottles are not available at the LCBO or anywhere else in Canada." },
  { icon: ShieldIcon, title: "Honest guidance", body: "We recommend what we'd pour for ourselves, and we're happy to tell you why." },
  { icon: GiftIcon, title: "Gifting with care", body: "Every order is packed by hand in Toronto, ready to give." },
  { icon: AwardIcon, title: "Responsible enjoyment", body: "Agave spirits are meant to be savoured. We encourage drinking less and drinking better." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "About Us" }]}
        eyebrow="Our story"
        title="Bringing Mexico's finest agave to Canadian tables"
        intro={
          <p>
            Eleva Imports was founded in Toronto by Adriana Martinez, Canada&rsquo;s only Certified Tequila Master, with one goal:
            to share tequila the way it&rsquo;s meant to taste.
          </p>
        }
        image={{ src: "/images/lifestyle/adriana-portrait.jpg", alt: "Adriana Martinez holding a glass of tequila in an agave field", width: 1334, height: 1628, className: "max-w-[460px]" }}
      />

      {/* TODO(client): replace story copy with Adriana's approved biography. */}
      <Section tone="white" aria-labelledby="story-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <FadeIn>
            <p className="eyebrow">The beginning</p>
            <h2 id="story-title" className="h-section mt-4">
              A master&rsquo;s recommendation, not a liquor store
            </h2>
          </FadeIn>
          <FadeIn delay={0.08} className="space-y-5 text-[1.0625rem] leading-relaxed text-ink-soft">
            <p>
              Too many Canadians have only met tequila as a shot with salt and lime. Adriana knew there was another story: of
              slow-cooked agave, patient fermentation and families who have perfected their craft over generations.
            </p>
            <p>
              After earning her certification as a Tequila Master, she founded Eleva Imports to bring
              those stories home. Every bottle in our range is tasted and chosen by Adriana, and most of them you won&rsquo;t
              find on any other Canadian shelf.
            </p>
            <p>
              Today Eleva supplies discerning home collectors, companies looking for gifts that stand out, and restaurants and
              bars building serious agave programs, all with the same personal care.
            </p>
          </FadeIn>
        </div>
      </Section>

      <section aria-labelledby="cert-title" className="bg-ivory py-20 md:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn className="mx-auto w-full max-w-md lg:order-2">
            <Image src="/images/lifestyle/adriana-barrel-room.jpg" alt="Adriana Martinez in a tequila barrel room" width={882} height={1336} sizes="(min-width: 1024px) 34vw, 90vw" className="h-auto w-full rounded-sm" />
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="eyebrow inline-flex items-center gap-2">
              <AwardIcon size={15} className="text-agave" /> Certification
            </p>
            <h2 id="cert-title" className="h-section mt-4">
              Canada&rsquo;s only Certified Tequila Master
            </h2>
            {/* TODO(client): add certifying body, year and any other credentials. */}
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">
              Adriana&rsquo;s certification means she has studied tequila from agave field to bottle: cultivation, cooking,
              fermentation, distillation, ageing and professional sensory evaluation. She uses that expertise to choose every
              bottle we carry, and shares it in masterclasses across the GTA.
            </p>
            <h3 className="mt-10 font-serif text-3xl">How we source</h3>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
              We visit producers, taste in the barrel room and ask hard questions about process. A tequila joins the Eleva
              range only if it is made from 100% blue agave without additives, and if it tastes exceptional.
            </p>
          </FadeIn>
        </div>
      </section>

      <Section tone="white" aria-labelledby="values-title">
        <SectionHeading id="values-title" eyebrow="What we believe" title="Our values" />
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, title, body }, i) => (
            <FadeIn as="li" key={title} delay={(i % 3) * 0.05} className="border-t border-copper-light/70 pt-7">
              <Icon size={26} className="text-agave" />
              <h3 className="mt-5 font-serif text-2xl">{title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{body}</p>
            </FadeIn>
          ))}
        </ul>
      </Section>

      <section className="bg-stone-50 py-16 md:py-20">
        <div className="wrap">
          <Image
            src="/images/lifestyle/eleva-huizar-banner.jpg"
            alt="Eleva Imports: a world of exceptional spirits"
            width={1254}
            height={1254}
            sizes="(min-width: 768px) 560px, 92vw"
            className="mx-auto h-auto w-full max-w-[560px] rounded-sm shadow-card"
          />
          <p className="mt-8 text-center">
            <Link href="/collections/all" className="link-underline">
              Discover the collection
            </Link>
          </p>
        </div>
      </section>

      <CTABand
        eyebrow="Start tasting"
        title="Find your first bottle"
        body="Not sure where to begin? Start with a tasting mini, or ask us for a personal recommendation."
        primary={{ label: "Shop the collection", href: "/collections/all" }}
        secondary={{ label: "Book a masterclass", href: "/masterclass" }}
      />
    </>
  );
}
