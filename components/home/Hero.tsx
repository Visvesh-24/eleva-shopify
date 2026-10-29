import Image from "next/image";
import Link from "next/link";
import { socialProof } from "@/lib/content";
import { AwardIcon, StarIcon } from "@/components/ui/Icons";

/** Static hero with a gentle CSS fade-in (no JS needed above the fold). */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-ivory">
      <div className="wrap grid items-center gap-10 pb-16 pt-10 md:pb-20 md:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div className="animate-fade-in text-center lg:text-left">
          <p className="eyebrow inline-flex items-center gap-2">
            <AwardIcon size={15} className="text-agave" />
            Curated by Canada&rsquo;s only Certified Tequila Master
          </p>
          <h1 id="hero-title" className="h-display mt-6">
            Tequila, the way <em className="font-serif italic text-copper">Mexico</em> intended.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft md:text-lg lg:mx-0">
            Additive-free, 100% blue agave tequila and exclusive Mexican spirits, hand-selected by Adriana Martinez.
            Many of our bottles you simply won&rsquo;t find at the LCBO.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link href="/collections/all" className="btn-primary">
              Shop the collection
            </Link>
            <Link href="/corporate-gifts" className="btn-secondary">
              Gifting &amp; corporate orders
            </Link>
          </div>
          {/* MOCK aggregate rating, see lib/content.ts */}
          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-ink-soft lg:justify-start">
            <span aria-hidden className="flex text-copper">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} size={14} />
              ))}
            </span>
            <span>
              <strong className="font-semibold text-ink">{socialProof.rating}/5</strong> from {socialProof.reviewCount}+ happy
              customers
            </span>
          </p>
        </div>

        {/* Client brand banner, shown uncropped at its native 1:1 ratio */}
        <div className="relative mx-auto w-full max-w-[560px] animate-fade-in [animation-delay:150ms] lg:max-w-none">
          <div aria-hidden className="absolute -inset-2.5 rounded-md border border-copper-light/50" />
          <Image
            src="/images/lifestyle/eleva-huizar-banner.jpg"
            alt="Eleva Imports, a world of exceptional spirits: Reserva Huizar Plata and Cristalino Reposado decanters"
            width={1254}
            height={1254}
            priority
            sizes="(min-width: 1024px) 46vw, 92vw"
            className="relative h-auto w-full rounded-sm shadow-card"
          />
        </div>
      </div>
    </section>
  );
}
