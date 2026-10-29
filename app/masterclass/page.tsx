import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { masterclassSessions } from "@/lib/experiences";
import { faqs } from "@/lib/faqs";
import { formatPrice } from "@/lib/format";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { FadeIn } from "@/components/ui/FadeIn";
import { AwardIcon, CheckIcon, GlassIcon, UserIcon, GiftIcon, CalendarIcon, MapPinIcon } from "@/components/ui/Icons";
import { MasterclassBooking } from "@/components/forms/MasterclassBooking";

export const metadata: Metadata = {
  title: "Tequila & Mezcal Masterclass",
  description:
    "Guided tequila and mezcal tastings with Adriana Martinez, Canada's only Certified Tequila Master. Private, corporate and group masterclasses in Toronto and online.",
  alternates: { canonical: "/masterclass" },
};

const learn = [
  "How blue agave becomes tequila, from field to bottle",
  "The real differences between blanco, reposado, añejo and cristalino",
  "How to spot additives, and why additive-free matters",
  "Tequila vs mezcal: agave species, ovens and traditions",
  "How to taste like a professional, with the right glass",
];

const audiences = [
  { icon: UserIcon, title: "Private", body: "Birthdays, anniversaries and dinner parties at home or a venue of your choice.", from: "From $85 per guest" },
  { icon: AwardIcon, title: "Corporate", body: "Team building, client entertainment and offsites. In person or virtual with kits.", from: "Quoted per group" },
  { icon: GiftIcon, title: "Groups", body: "Join a public session with friends, or book a group of 6+ for a private date.", from: "From $95 per guest" },
];

const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" });

export default function MasterclassPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Tequila/Mezcal Masterclass" }]}
        eyebrow="Tequila & mezcal masterclass"
        title="Taste like a master, with a master"
        intro={
          <p>
            A guided tasting with Adriana Martinez, Canada&rsquo;s only Certified Tequila Master. Discover what great agave
            spirits taste like, and why you&rsquo;ll never go back to shots.
          </p>
        }
        actions={
          <>
            <Link href="#book" className="btn-primary">
              Book a masterclass
            </Link>
            <Link href="#sessions" className="btn-secondary">
              Upcoming sessions
            </Link>
          </>
        }
        image={{ src: "/images/lifestyle/adriana-barrel-room.jpg", alt: "Adriana Martinez in a tequila barrel room", width: 882, height: 1336, className: "max-w-[420px]" }}
      />

      <Section tone="white" aria-labelledby="learn-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <p className="eyebrow">What you&rsquo;ll learn</p>
            <h2 id="learn-title" className="h-section mt-4">
              Ninety minutes that change how you drink tequila
            </h2>
            <ul className="mt-8 space-y-4">
              {learn.map((l) => (
                <li key={l} className="flex gap-3 text-[1.0625rem] text-ink-soft">
                  <CheckIcon size={20} className="mt-1 shrink-0 text-agave" /> {l}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.08} className="rounded-sm bg-ivory p-8 ring-1 ring-line md:p-10">
            <p className="eyebrow">The format</p>
            <dl className="mt-6 divide-y divide-line">
              {[
                ["Duration", "90 minutes to 2 hours"],
                ["Tasting", "4–5 additive-free expressions, served in Riedel tequila glasses"],
                ["Group size", "6–60 in person, unlimited virtually"],
                ["Where", "Our Toronto venue, your home or office, or online with tasting kits"],
                ["Includes", "Tasting notes card, plus light bites at public sessions"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[110px_1fr] gap-4 py-4 text-sm">
                  <dt className="font-semibold text-ink">{k}</dt>
                  <dd className="text-ink-soft">{v}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </Section>

      <Section tone="ivory" aria-labelledby="who-title">
        <SectionHeading id="who-title" eyebrow="Who it's for" title="Private, corporate and groups" />
        <ul className="grid gap-6 md:grid-cols-3">
          {audiences.map(({ icon: Icon, title, body, from }, i) => (
            <FadeIn as="li" key={title} delay={i * 0.06} className="rounded-sm bg-white p-8 ring-1 ring-line">
              <Icon size={26} className="text-agave" />
              <h3 className="mt-5 font-serif text-3xl">{title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{body}</p>
              <p className="mt-5 text-sm font-semibold text-copper">{from}</p>
            </FadeIn>
          ))}
        </ul>
      </Section>

      <Section tone="white" id="sessions" aria-labelledby="sessions-title" className="scroll-mt-32">
        <SectionHeading id="sessions-title" align="left" eyebrow="Upcoming sessions" title="Join a public masterclass" />
        <ul className="divide-y divide-line border-y border-line">
          {masterclassSessions.map((s) => (
            <li key={s.id} className="grid gap-4 py-6 md:grid-cols-[180px_1fr_auto] md:items-center md:gap-8">
              <div>
                <p className="font-serif text-2xl leading-tight">{fmt(s.date)}</p>
                <p className="text-xs text-ink-muted">{s.time}</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl">{s.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{s.description}</p>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPinIcon size={13} /> {s.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <GlassIcon size={13} /> {s.format}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-4 md:flex-col md:items-end">
                <p className="text-lg font-semibold tabular-nums">
                  {formatPrice(s.pricePerGuest)} <span className="text-xs font-normal text-ink-muted">/ guest</span>
                </p>
                {s.seatsLeft <= 8 ? <p className="text-xs font-medium text-copper">Only {s.seatsLeft} seats left</p> : null}
                <Link href={`#book-${s.id}`} className="btn-secondary btn-sm">
                  Book<span className="sr-only"> {s.title}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <section id="book" aria-labelledby="book-title" className="scroll-mt-32 bg-stone-100 py-20 md:py-28">
        <div className="wrap">
          <p className="eyebrow inline-flex items-center gap-2">
            <CalendarIcon size={15} /> Book
          </p>
          <h2 id="book-title" className="h-section mt-4">
            Request your masterclass
          </h2>
          <div className="mt-10">
            <MasterclassBooking sessions={masterclassSessions} />
          </div>
        </div>
      </section>

      <section aria-labelledby="credentials-title" className="bg-white py-20 md:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <FadeIn className="mx-auto w-full max-w-md">
            <Image src="/images/lifestyle/adriana-portrait.jpg" alt="Adriana Martinez, Certified Tequila Master" width={1334} height={1628} sizes="(min-width: 1024px) 34vw, 90vw" className="h-auto w-full rounded-sm" />
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="eyebrow">Your host</p>
            <h2 id="credentials-title" className="h-section mt-4">
              Adriana Martinez, Certified Tequila Master
            </h2>
            {/* TODO(client): confirm certification body, year and credentials. */}
            <ul className="mt-8 space-y-4 text-[1.0625rem] text-ink-soft">
              <li className="flex gap-3">
                <AwardIcon size={22} className="mt-0.5 shrink-0 text-agave" /> Canada&rsquo;s only Certified Tequila Master
              </li>
              <li className="flex gap-3">
                <GlassIcon size={22} className="mt-0.5 shrink-0 text-agave" /> Founder of Eleva Imports, selecting every bottle in the range
              </li>
              <li className="flex gap-3">
                <UserIcon size={22} className="mt-0.5 shrink-0 text-agave" /> Hosts tastings for private guests, corporate teams and hospitality professionals
              </li>
            </ul>
            <Link href="/about" className="link-underline mt-8">
              Read Adriana&rsquo;s story
            </Link>
          </FadeIn>
        </div>
      </section>

      <Section tone="ivory" aria-labelledby="mc-faq">
        <div className="mx-auto max-w-3xl">
          <h2 id="mc-faq" className="h-section text-center">
            Masterclass FAQ
          </h2>
          <Accordion className="mt-10" items={faqs.masterclass} faqSchema />
        </div>
      </Section>
    </>
  );
}
