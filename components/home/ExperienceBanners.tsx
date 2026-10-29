import Link from "next/link";
import { ArrowRight, CheckIcon } from "@/components/ui/Icons";
import { FadeIn } from "@/components/ui/FadeIn";

/** Fine-line tasting flight illustration (no photography needed). */
function TastingFlight() {
  const glasses = [
    { label: "Blanco", fill: "#F3EEDF" },
    { label: "Reposado", fill: "#EBD3A6" },
    { label: "Añejo", fill: "#C98E52" },
  ];
  return (
    <div aria-hidden className="flex items-end justify-center gap-6 sm:gap-10">
      {glasses.map((g, i) => (
        <div key={g.label} className="flex flex-col items-center">
          <svg viewBox="0 0 80 150" className="h-36 w-auto sm:h-44" fill="none" stroke="rgb(var(--c-copper))" strokeWidth="1.2">
            <path d="M18 8h44c2 34-6 58-22 62C24 66 16 42 18 8Z" fill="white" />
            <path d={`M20.5 ${34 - i * 2}c10 3 29 3 39 0-1 18-8 32-19.5 35C28.5 66 21 52 20.5 ${34 - i * 2}Z`} fill={g.fill} stroke="none" />
            <path d="M40 70v62M24 136h32" />
          </svg>
          <span className="mt-3 text-[0.625rem] font-semibold uppercase tracking-wide2 text-ink-soft">{g.label}</span>
        </div>
      ))}
    </div>
  );
}

export function MasterclassBanner() {
  return (
    <section aria-labelledby="masterclass-title" className="bg-white py-20 md:py-28">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn className="order-2 rounded-sm bg-stone-100 px-6 py-14 lg:order-1 lg:py-20">
          <TastingFlight />
          <p className="mt-10 text-center font-serif text-xl italic text-ink-soft">Taste side by side. Discover your style.</p>
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
