import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { faqs } from "@/lib/faqs";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { ContactForm } from "@/components/forms/ContactForm";
import { InstagramIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Eleva Imports in Toronto: call 905-718-1247, WhatsApp, email or Instagram. Bottle recommendations, corporate gifts, masterclasses and trade.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { contact } = siteConfig;
  const channels = [
    { icon: PhoneIcon, label: "Call", value: contact.phoneDisplay, href: contact.phoneHref },
    { icon: WhatsAppIcon, label: "WhatsApp", value: "Message us", href: contact.whatsapp, external: true },
    { icon: MailIcon, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: InstagramIcon, label: "Instagram", value: contact.instagramHandle, href: contact.instagram, external: true },
  ];
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact"
        title="We'd love to hear from you"
        intro={<p>Questions about a bottle, a gift or an event? Reach Adriana&rsquo;s team by phone, WhatsApp or the form below.</p>}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="wrap">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full items-center gap-4 rounded-sm bg-ivory p-5 ring-1 ring-line hover:ring-copper"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-copper ring-1 ring-line group-hover:bg-copper group-hover:text-white">
                    <Icon size={19} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-label text-ink-muted">{label}</span>
                    <span className="block truncate text-[0.9375rem] font-medium text-ink">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <h2 className="font-serif text-3xl">Send a message</h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
            <div>
              {/* TODO(client): replace with a Google Maps embed and real address/hours */}
              <div
                role="img"
                aria-label="Map of Toronto (placeholder)"
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-sm bg-stone-100 ring-1 ring-line"
              >
                <svg aria-hidden viewBox="0 0 400 300" className="absolute inset-0 h-full w-full text-stone-300" fill="none" stroke="currentColor">
                  {[40, 90, 140, 190, 240].map((y) => (
                    <path key={y} d={`M0 ${y}c80 -12 160 14 240 0s120 -10 160 4`} strokeWidth="1" />
                  ))}
                  {[60, 150, 250, 330].map((x) => (
                    <path key={x} d={`M${x} 0l-20 300`} strokeWidth="1" />
                  ))}
                  <path d="M0 270c90-20 210 12 400-18v48H0Z" fill="rgb(var(--c-stone-200))" stroke="none" />
                </svg>
                <span className="relative flex flex-col items-center">
                  <MapPinIcon size={36} className="text-copper" />
                  <span className="mt-2 rounded-sm bg-white px-3 py-1.5 text-sm font-medium shadow-card">Eleva Imports, Toronto</span>
                </span>
              </div>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 font-semibold text-ink">Location</dt>
                  <dd className="text-ink-soft">{contact.city}. Tastings by appointment.</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 font-semibold text-ink">Hours</dt>
                  <dd className="text-ink-soft">Monday to Saturday, 10 am – 6 pm (to be confirmed)</dd>
                </div>
              </dl>
              <h2 className="mt-12 font-serif text-3xl">Quick answers</h2>
              <Accordion className="mt-4" items={[faqs.shipping[0], faqs.shipping[1], faqs.shopping[2]]} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
