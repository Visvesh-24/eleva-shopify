import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/config";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { FadeIn } from "./FadeIn";

/** Closing call-to-action band used at the bottom of content pages. */
export function CTABand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  showContact = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  showContact?: boolean;
}) {
  return (
    <section className="border-t border-line bg-copper-wash py-20 md:py-24">
      <FadeIn className="wrap max-w-3xl text-center">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="h-section mt-4">{title}</h2>
        {body ? <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">{body}</p> : null}
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={primary.href} className="btn-primary">
            {primary.label}
          </Link>
          {secondary ? (
            <Link href={secondary.href} className="btn-secondary">
              {secondary.label}
            </Link>
          ) : null}
        </div>
        {showContact ? (
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-soft">
            <a href={siteConfig.contact.phoneHref} className="inline-flex items-center gap-2 hover:text-ink">
              <PhoneIcon size={16} className="text-copper" /> {siteConfig.contact.phoneDisplay}
            </a>
            <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ink">
              <WhatsAppIcon size={16} className="text-agave" /> WhatsApp us
            </a>
          </p>
        ) : null}
      </FadeIn>
    </section>
  );
}
