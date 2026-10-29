import type { Metadata } from "next";
import Image from "next/image";
import { upcomingEvents } from "@/lib/experiences";
import { formatPrice } from "@/lib/format";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTABand } from "@/components/ui/CTABand";
import { FadeIn } from "@/components/ui/FadeIn";
import { MapPinIcon, CalendarIcon } from "@/components/ui/Icons";
import { EventRSVP } from "@/components/forms/EventRSVP";

export const metadata: Metadata = {
  title: "Events",
  description: "Tequila tastings, pop-ups and seasonal events with Eleva Imports and Adriana Martinez in Toronto.",
  alternates: { canonical: "/events" },
};

/** Past-event gallery: supplied photography, shown uncropped (CSS columns keep native ratios). */
const gallery = [
  { src: "/images/lifestyle/adriana-barrel-room.jpg", alt: "Adriana among tequila barrels", width: 882, height: 1336 },
  { src: "/images/lifestyle/eleva-huizar-banner.jpg", alt: "Reserva Huizar Plata and Cristalino decanters", width: 1254, height: 1254 },
  { src: "/images/lifestyle/adriana-portrait.jpg", alt: "Adriana raising a glass in an agave field", width: 1334, height: 1628 },
  { src: "/images/lifestyle/pechery-dubai-lifestyle.jpg", alt: "Pechery Dubai Style Chocolate Cream Liqueur", width: 1254, height: 1254 },
  { src: "/images/lifestyle/gifting-lineup.png", alt: "Eleva gift bottle line-up", width: 2000, height: 1250 },
  { src: "/images/lifestyle/trio-decanters.png", alt: "Reserva Huizar trio of decanters", width: 1600, height: 1250 },
];

const day = (d: string) => new Date(`${d}T12:00:00`);

export default function EventsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Events" }]}
        eyebrow="Events"
        title="Raise a glass with us"
        intro={<p>Tastings, pop-ups and seasonal celebrations across Toronto, hosted by Adriana and the Eleva team.</p>}
      />

      <Section tone="white" aria-labelledby="upcoming-title">
        <SectionHeading id="upcoming-title" align="left" eyebrow="Upcoming" title="Upcoming events" />
        {/* MOCK events: see lib/experiences.ts */}
        <ul className="space-y-6">
          {upcomingEvents.map((e, i) => (
            <FadeIn as="li" key={e.id} delay={i * 0.05} className="grid gap-6 rounded-sm bg-ivory p-6 ring-1 ring-line md:grid-cols-[120px_1fr] md:p-8">
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-sm bg-white text-center ring-1 ring-line">
                <span className="text-xs font-semibold uppercase tracking-label text-copper">
                  {day(e.date).toLocaleDateString("en-CA", { month: "short" })}
                </span>
                <span className="font-serif text-5xl leading-none">{day(e.date).getDate()}</span>
                <span className="text-[0.625rem] uppercase tracking-label text-ink-muted">{day(e.date).toLocaleDateString("en-CA", { weekday: "short" })}</span>
              </div>
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-3xl leading-tight">{e.title}</h3>
                    <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarIcon size={14} /> {e.time}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPinIcon size={14} /> {e.venue}, {e.city}
                      </span>
                    </p>
                  </div>
                  <p className="text-lg font-semibold tabular-nums">{e.price ? `${formatPrice(e.price)} / person` : "Free, RSVP required"}</p>
                </div>
                <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">{e.description}</p>
                <div className="mt-5">
                  <EventRSVP event={e} />
                </div>
              </div>
            </FadeIn>
          ))}
        </ul>
      </Section>

      <Section tone="ivory" aria-labelledby="past-title">
        <SectionHeading id="past-title" eyebrow="Past events" title="Moments from the cellar" />
        {/* TODO(client): replace with real event photography */}
        <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.map((g) => (
            <li key={g.src} className="mb-5 break-inside-avoid overflow-hidden rounded-sm bg-white ring-1 ring-line">
              <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" className="h-auto w-full" />
            </li>
          ))}
        </ul>
      </Section>

      <CTABand
        eyebrow="Private events"
        title="Planning a celebration?"
        body="Book a private tasting or masterclass for your guests, at your venue or ours."
        primary={{ label: "Book a masterclass", href: "/masterclass#book" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
