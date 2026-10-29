import Image from "next/image";
import Link from "next/link";
import { footerNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/config";
import { InstagramIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";

const payments = ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay", "Shop Pay", "Interac"];

export function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="border-t border-line bg-stone-100">
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="col-span-2 lg:col-span-4">
          <Image
            src="/images/brand/logo-full.png"
            alt="Eleva Imports"
            width={1254}
            height={1254}
            className="h-28 w-28"
            sizes="112px"
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-soft">
            Additive-free, 100% blue agave tequila and exclusive Mexican spirits, curated in Toronto by Adriana Martinez,
            Canada&rsquo;s only Certified Tequila Master.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm">
            <li>
              <a href={contact.phoneHref} className="inline-flex items-center gap-2.5 text-ink hover:text-copper">
                <PhoneIcon size={16} className="text-copper" /> {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-ink hover:text-copper">
                <WhatsAppIcon size={16} className="text-agave" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2.5 text-ink hover:text-copper">
                <MailIcon size={16} className="text-copper" /> {contact.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-ink-soft">
              <MapPinIcon size={16} className="text-copper" /> {contact.city}
            </li>
          </ul>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-copper"
          >
            <InstagramIcon size={18} /> {contact.instagramHandle}
          </a>
        </div>

        {footerNav.map((col) => (
          <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
            <h2 className="eyebrow mb-5">{col.title}</h2>
            <ul className="space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-soft hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="col-span-2 lg:col-span-2">
          <h2 className="eyebrow mb-5">Visit &amp; Taste</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Private tastings and masterclasses across the GTA. Corporate orders welcome.
          </p>
          <Link href="/masterclass" className="link-underline mt-4">
            Book a tasting
          </Link>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5 text-xs leading-relaxed text-ink-muted">
            <p className="font-semibold uppercase tracking-label text-ink">Please enjoy responsibly.</p>
            <p>You must be of legal drinking age in your province to purchase. Proof of age may be required on delivery.</p>
            {/* TODO(client): confirm the provinces you can legally ship to and update this line. */}
            <p>Shipping availability varies by province. See Shipping &amp; Returns for details.</p>
            <p>&copy; {new Date().getFullYear()} Eleva Imports. All rights reserved.</p>
          </div>
          <ul className="flex flex-wrap gap-2" aria-label="Accepted payment methods">
            {payments.map((p) => (
              <li
                key={p}
                className="flex h-7 items-center rounded-sm border border-stone-300 bg-white px-2.5 text-[0.625rem] font-semibold tracking-wide text-ink-soft"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
