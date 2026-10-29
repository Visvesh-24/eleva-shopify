import Link from "next/link";
import { AwardIcon } from "@/components/ui/Icons";
import { FadeIn } from "@/components/ui/FadeIn";

/**
 * Founder split layout.
 * TODO(client): supply a portrait of Adriana and approve the bio copy below.
 */
export function MeetAdriana() {
  return (
    <section aria-labelledby="adriana-title" className="bg-white py-20 md:py-28">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Portrait placeholder until photography is supplied */}
          <div
            role="img"
            aria-label="Portrait of Adriana Martinez (photography coming soon)"
            className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-t-full bg-gradient-to-b from-stone-100 to-stone-200"
          >
            <div aria-hidden className="absolute inset-4 rounded-t-full border border-copper-light/60" />
            <div className="relative w-full px-10 pt-16 text-center">
              <p aria-hidden className="font-serif text-[6rem] italic leading-none text-copper-light md:text-[8rem]">AM</p>
              <span aria-hidden className="hairline-copper mx-auto mt-6 block w-10" />
              <p className="mt-4 text-[0.625rem] uppercase tracking-wide2 text-ink-muted">Portrait coming soon</p>
            </div>
          </div>
          <div className="absolute -bottom-6 left-1/2 flex w-[86%] -translate-x-1/2 items-center gap-3 rounded-sm bg-white px-5 py-4 shadow-card ring-1 ring-line sm:w-auto">
            <AwardIcon size={30} className="shrink-0 text-agave" />
            <div>
              <p className="text-[0.625rem] font-semibold uppercase tracking-label text-copper">Certified</p>
              <p className="font-serif text-lg leading-tight">Canada&rsquo;s only Tequila Master</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="pt-6 lg:pt-0">
          <p className="eyebrow">Meet Adriana</p>
          <h2 id="adriana-title" className="h-section mt-4">
            &ldquo;Great tequila should taste of the agave, the land and the people who made it.&rdquo;
          </h2>
          <span aria-hidden className="hairline-copper mt-8 block w-12" />
          {/* TODO(client): replace with Adriana's approved biography and certification details. */}
          <div className="mt-8 space-y-4 text-[1.0625rem] leading-relaxed text-ink-soft">
            <p>
              Adriana Martinez is Canada&rsquo;s only Certified Tequila Master. Based in Toronto, she founded Eleva
              Imports to bring the additive-free tequilas she grew up admiring to Canadian tables.
            </p>
            <p>
              She personally tastes and selects every bottle we carry, working directly with family distilleries in Jalisco.
              Her philosophy is simple: no shortcuts, no additives, and a story worth sharing in every glass.
            </p>
          </div>
          <p className="mt-8 font-serif text-3xl italic text-copper">Adriana Martinez</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/about" className="btn-secondary">
              Read our story
            </Link>
            <Link href="/masterclass" className="btn-primary">
              Taste with Adriana
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
