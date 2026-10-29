import Image from "next/image";
import Link from "next/link";
import { siteConfig, formatDeadline } from "@/lib/config";
import { CheckIcon, PhoneIcon } from "@/components/ui/Icons";
import { FadeIn } from "@/components/ui/FadeIn";
import { DeadlineCountdown } from "./DeadlineCountdown";

/** Dark corporate-gifting banner (one of only two dark sections on the site). */
export function CorporateBanner() {
  const { corporate, contact } = siteConfig;
  const deadline = formatDeadline(corporate.orderDeadline);
  return (
    <section aria-labelledby="corp-title" className="on-dark relative overflow-hidden bg-charcoal text-white">
      <div
        aria-hidden
        className="absolute -right-40 top-1/2 h-[720px] w-[720px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--c-copper)/0.35),transparent_65%)]"
      />
      <div className="wrap relative grid items-center gap-12 py-20 md:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
        <FadeIn>
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2">
            Corporate gifting
            <span className="h-px w-8 bg-copper-pale/60" aria-hidden />
            <DeadlineCountdown date={corporate.orderDeadline} className="text-white" />
          </p>
          <h2 id="corp-title" className="h-section mt-5 text-white">
            Gifts your clients will remember long after the holidays.
          </h2>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/80">
            Exclusive Mexican spirits, personalized with your company logo and message. One order. One invoice. We handle
            everything.
          </p>
          <ul className="mt-7 space-y-3 text-[0.9375rem] text-white/90">
            {[
              "Personalized labels, cards and gift boxes",
              `From ${corporate.minimumOrder} gifts, delivered to every recipient`,
              `Order by ${deadline} for delivery in ${corporate.deliveryWindow}`,
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <CheckIcon size={18} className="mt-0.5 shrink-0 text-copper-pale" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/corporate-gifts#quote" className="btn bg-copper-pale text-ink hover:bg-white">
              Reserve my gifts
            </Link>
            <a href={contact.phoneHref} className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-copper-pale">
              <PhoneIcon size={17} className="text-copper-pale" />
              Or call {contact.phoneDisplay}
            </a>
          </div>
          <p className="mt-6 text-xs uppercase tracking-label text-copper-pale">
            Corporate orders close {deadline}. Spaces are limited.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="relative">
          <Image
            src="/images/lifestyle/gifting-lineup.png"
            alt="Casa Cofradía Añejo, Reserva Huizar Cristalino, Cofradía Iguanas and Reserva Huizar Rosado bottles"
            width={2000}
            height={1250}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="relative h-auto w-full"
          />
          <div aria-hidden className="mx-auto -mt-6 h-6 w-4/5 rounded-[50%] bg-black/50 blur-xl" />
        </FadeIn>
      </div>
    </section>
  );
}
