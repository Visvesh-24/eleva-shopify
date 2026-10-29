import { siteConfig } from "@/lib/config";
import { WhatsAppIcon } from "@/components/ui/Icons";

/** Floating WhatsApp contact (bottom right). Raised on PDP mobile via CSS var. */
export function WhatsAppButton() {
  return (
    <a
      href={siteConfig.contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Eleva on WhatsApp"
      className="fixed bottom-[calc(1.25rem+var(--sticky-bar-h,0px))] right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#1FA855] shadow-card ring-1 ring-line transition-transform duration-300 hover:scale-105 md:right-6"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
