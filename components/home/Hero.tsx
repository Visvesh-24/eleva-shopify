import Image from "next/image";
import Link from "next/link";
import { socialProof } from "@/lib/content";
import { ArrowRight, GiftIcon, StarIcon } from "@/components/ui/Icons";
import { Sparkle } from "@/components/ui/Sparkle";

/**
 * Mobile-first holiday hero. Copy first (headline + one-line sub + CTAs fit
 * above the fold on a 375px phone), then the client banner shown uncropped
 * with floating badges and twinkling sparkles. All motion is CSS and is
 * disabled under prefers-reduced-motion.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-ivory">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] animate-glow rounded-full bg-[radial-gradient(circle,rgb(var(--c-copper-light)/0.45),transparent_68%)] lg:h-[640px] lg:w-[640px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[360px] w-[360px] animate-glow rounded-full bg-[radial-gradient(circle,rgb(var(--c-copper-pale)/0.35),transparent_70%)] [animation-delay:-4s]"
      />

      <div className="wrap relative grid items-center gap-9 pb-12 pt-7 md:pb-20 md:pt-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-24">
        <div className="animate-fade-up text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-copper-light/70 bg-white/70 px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-copper backdrop-blur">
            <Sparkle className="h-3 w-3 animate-twinkle" /> The Holiday Edit 2026
          </p>
          <h1 id="hero-title" className="mt-5 font-serif text-[2.9rem] leading-[0.98] tracking-[-0.015em] sm:text-6xl lg:text-[5rem]">
            Pour something <em className="text-gold italic">unforgettable</em>.
          </h1>
          <p className="mx-auto mt-4 max-w-[22rem] text-[1rem] leading-snug text-ink-soft sm:max-w-md sm:text-lg lg:mx-0">
            Additive-free tequila, hand-picked by Canada&rsquo;s only Tequila Master.
          </p>

          <div className="mx-auto mt-7 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:justify-start">
            <Link href="/collections/all" className="btn-primary btn-shine">
              Shop the collection <ArrowRight size={16} />
            </Link>
            <Link href="/corporate-gifts" className="btn-secondary">
              <GiftIcon size={16} /> Corporate gifting
            </Link>
          </div>

          {/* MOCK aggregate rating, see lib/content.ts */}
          <p className="mt-6 flex items-center justify-center gap-2 text-[0.8125rem] text-ink-soft lg:justify-start">
            <span aria-hidden className="flex text-copper">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} size={13} />
              ))}
            </span>
            <span>
              <strong className="font-semibold text-ink">{socialProof.rating}</strong> from {socialProof.reviewCount}+ happy customers
            </span>
          </p>
        </div>

        {/* Client brand banner, uncropped at its native 1:1 ratio */}
        <div className="relative mx-auto w-full max-w-[520px] animate-fade-up [animation-delay:150ms] lg:max-w-none">
          <div className="relative animate-float-slow">
            <div aria-hidden className="absolute -inset-2.5 rounded-md border border-copper-light/50" />
            <Image
              src="/images/lifestyle/eleva-huizar-banner.jpg"
              alt="Eleva Imports, a world of exceptional spirits: Reserva Huizar Plata and Cristalino Reposado decanters"
              width={1254}
              height={1254}
              priority
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="relative h-auto w-full rounded-sm shadow-[0_30px_60px_-30px_rgb(28_27_25/0.35)]"
            />
          </div>

          {/* Floating badges sit on the banner's plain edges, never over its artwork */}
          <div className="absolute -right-1 -top-4 animate-float rounded-full bg-white/95 px-3.5 py-2 shadow-card ring-1 ring-line backdrop-blur sm:-right-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-ink">
              <GiftIcon size={14} className="text-copper" /> Gift-ready
            </p>
          </div>
          <div className="absolute -bottom-5 -left-1 animate-float-x rounded-sm bg-charcoal px-4 py-3 text-white shadow-card sm:-left-5">
            <p className="text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-copper-pale">Not at the LCBO</p>
            <p className="mt-0.5 font-serif text-lg leading-none">Exclusive imports</p>
          </div>

          <Sparkle aria-hidden className="absolute -left-3 top-10 h-5 w-5 animate-twinkle text-copper-light" />
          <Sparkle aria-hidden className="absolute -right-2 bottom-16 h-4 w-4 animate-twinkle text-copper [animation-delay:-1.2s]" />
          <Sparkle aria-hidden className="absolute right-1/3 -top-7 h-3 w-3 animate-twinkle text-copper-light [animation-delay:-2.1s]" />
        </div>
      </div>
    </section>
  );
}
