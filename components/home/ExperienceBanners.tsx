import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckIcon } from "@/components/ui/Icons";
import { FadeIn } from "@/components/ui/FadeIn";

export function MasterclassBanner() {
  return (
    <section aria-labelledby="masterclass-title" className="bg-white py-20 md:py-28">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn className="order-2 mx-auto w-full max-w-sm lg:order-1 lg:max-w-[440px]">
          {/* Client photo, shown uncropped at its native ratio */}
          <Image
            src="/images/lifestyle/adriana-barrel-room.jpg"
            alt="Adriana Martinez among tequila barrels in an aging cellar"
            width={882}
            height={1336}
            sizes="(min-width: 1024px) 34vw, 90vw"
            className="h-auto w-full rounded-sm"
          />
        </FadeIn>
        <FadeIn delay={0.08} className="order-1 lg:order-2">
          <p className="eyebrow">Tequila &amp; mezcal masterclass</p>
          <h2 id="masterclass-title" className="h-section mt-4">
            Taste like a master, with a master
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">
            A guided tasting with Adriana: learn how agave becomes tequila, how to spot additives, and how to taste blanco,
            reposado and añejo like a professional. For private groups, corporate teams and celebrations.
          </p>
          <ul className="mt-6 space-y-2.5 text-[0.9375rem] text-ink">
            {["Private, corporate and group formats", "In-person in the GTA or virtual", "Tasting kits shipped to remote teams"].map((t) => (
              <li key={t} className="flex gap-3">
                <CheckIcon size={18} className="mt-0.5 shrink-0 text-agave" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/masterclass" className="btn-primary">
              Book a masterclass
            </Link>
            <Link href="/events" className="link-underline">
              See upcoming events <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/** Dark trade banner (the second of two dark sections). */
export function TradeBanner() {
  return (
    <section aria-labelledby="trade-title" className="on-dark bg-charcoal text-white">
      <div className="wrap grid items-center gap-10 py-20 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <FadeIn>
          <p className="eyebrow">For restaurants &amp; bars</p>
          <h2 id="trade-title" className="h-section mt-4 text-white">
            Build an agave program your guests will talk about.
          </h2>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/80">
            Exclusive additive-free tequilas your competitors can&rsquo;t pour, plus staff training, menu development and
            tastings led by Canada&rsquo;s only Certified Tequila Master.
          </p>
        </FadeIn>
        <FadeIn delay={0.08} className="lg:justify-self-end">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/15 text-sm">
            {["Staff training", "Menu support", "Trade pricing", "Fast reorders"].map((t) => (
              <li key={t} className="bg-charcoal-800 px-5 py-4 text-white/90">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/trade/ordering" className="btn bg-copper-pale text-ink hover:bg-white">
              Apply for a trade account
            </Link>
            <Link href="/trade/reorder" className="btn-secondary">
              Quick reorder
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
