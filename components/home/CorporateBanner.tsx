import Image from "next/image";
import Link from "next/link";
import { siteConfig, formatDeadline } from "@/lib/config";
import { CheckIcon, PhoneIcon } from "@/components/ui/Icons";
import { FadeIn } from "@/components/ui/FadeIn";
import { Sparkle } from "@/components/ui/Sparkle";
import { CountdownBoxes } from "./DeadlineCountdown";

/**
 * Dark corporate-gifting banner (one of only two dark sections). Mobile:
 * floating bottles first, then a short pitch, live countdown and one CTA.
 */
export function CorporateBanner() {
  const { corporate, contact } = siteConfig;
  const deadline = formatDeadline(corporate.orderDeadline);
  return (
    <section aria-labelledby="corp-title" className="on-dark relative overflow-hidden bg-charcoal text-white">
      <div
        aria-hidden
        className="absolute -right-40 top-0 h-[620px] w-[620px] animate-glow rounded-full bg-[radial-gradient(circle,rgb(var(--c-copper)/0.4),transparent_65%)] lg:top-1/2 lg:h-[720px] lg:w-[720px] lg:-translate-y-1/2"
      />
      <Sparkle className="absolute left-[12%] top-10 h-3 w-3 animate-twinkle text-copper-pale" />
      <Sparkle className="absolute right-[18%] top-[38%] h-4 w-4 animate-twinkle text-copper-light [animation-delay:-1.5s]" />
      <Sparkle className="absolute bottom-16 left-[45%] h-2.5 w-2.5 animate-twinkle text-copper-pale [animation-delay:-2.4s]" />

      <div className="wrap relative grid items-center gap-8 py-14 md:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:py-24">
        <FadeIn delay={0.05} className="relative order-1 lg:order-2">
          <div className="animate-float-slow">
            <Image
              src="/images/lifestyle/gifting-lineup.png"
              alt="Casa Cofradía Añejo, Reserva Huizar Cristalino, Cofradía Iguanas and Reserva Huizar Rosado bottles"
              width={2000}
              height={1250}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="relative h-auto w-full"
            />
          </div>
          <div aria-hidden className="mx-auto -mt-6 h-6 w-4/5 rounded-[50%] bg-black/60 blur-xl" />
        </FadeIn>

        <FadeIn className="order-2 lg:order-1">
          <p className="eyebrow">Corporate gifting · Holiday 2026</p>
          <h2 id="corp-title" className="mt-4 font-serif text-[2.2rem] leading-[1.05] text-white sm:text-5xl">
            Gifts they&rsquo;ll <em className="text-gold italic">remember</em>.
          </h2>
          <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-white/80 sm:text-[1.0625rem]">
            Exclusive spirits with your logo and message. One order, one invoice. We handle everything.
          </p>
          <ul className="mt-6 grid gap-2.5 text-[0.9375rem] text-white/90 sm:grid-cols-2">
            {["Logo gift boxes & cards", `From ${corporate.minimumOrder} gifts`, "Delivered to every recipient", "One simple invoice"].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <CheckIcon size={16} className="shrink-0 text-copper-pale" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white/60">Orders close {deadline}</p>
            <CountdownBoxes date={corporate.orderDeadline} className="mt-3" />
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/corporate-gifts#quote" className="btn btn-shine bg-copper-pale text-ink hover:bg-white">
              Reserve my gifts
            </Link>
            <a href={contact.phoneHref} className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white hover:text-copper-pale">
              <PhoneIcon size={17} className="text-copper-pale" />
              Or call {contact.phoneDisplay}
            </a>
          </div>
          <p className="mt-5 text-xs text-white/55">Delivery in {corporate.deliveryWindow} for orders placed by {deadline}.</p>
        </FadeIn>
      </div>
    </section>
  );
}
