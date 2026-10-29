import Image from "next/image";
import Link from "next/link";
import { AwardIcon } from "@/components/ui/Icons";
import { FadeIn } from "@/components/ui/FadeIn";

/**
 * Founder split layout with Adriana's portrait.
 * TODO(client): approve the bio copy below.
 */
export function MeetAdriana() {
  return (
    <section aria-labelledby="adriana-title" className="bg-white py-14 md:py-24 lg:py-28">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn className="mx-auto w-full max-w-md lg:max-w-[520px]">
          {/* Client photo, shown uncropped at its native ratio */}
          <Image
            src="/images/lifestyle/adriana-portrait.jpg"
            alt="Adriana Martinez raising a glass of tequila in a blue agave field"
            width={1334}
            height={1628}
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="h-auto w-full rounded-sm"
          />
          <div className="mt-5 flex items-center gap-3 border-t border-copper-light/60 pt-5">
            <AwardIcon size={30} className="shrink-0 text-agave" />
            <div>
              <p className="text-[0.625rem] font-semibold uppercase tracking-label text-copper">Certified</p>
              <p className="font-serif text-xl leading-tight">Canada&rsquo;s only Tequila Master</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
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
