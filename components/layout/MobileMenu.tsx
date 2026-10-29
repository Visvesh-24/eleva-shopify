"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { ChevronDown, CloseIcon, InstagramIcon, PhoneIcon, UserIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { mainNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/format";
import { useUI } from "./UIProvider";
import { Logo } from "./Logo";

/** Mobile/tablet navigation drawer with accordion sub-menus. */
export function MobileMenu() {
  const { menuOpen, setMenuOpen } = useUI();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen]);
  const close = () => setMenuOpen(false);

  return (
    <Drawer open={menuOpen} onClose={close} side="left" label="Menu">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <Logo />
        <button type="button" onClick={close} className="-mr-2 p-2" aria-label="Close menu">
          <CloseIcon />
        </button>
      </div>
      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-2">
        <ul className="divide-y divide-line">
          {mainNav.map((item) =>
            item.children ? (
              <li key={item.label}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 text-left font-serif text-[1.35rem]"
                  aria-expanded={expanded === item.label}
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown size={18} className={cn("transition-transform", expanded === item.label && "rotate-180")} />
                </button>
                {expanded === item.label ? (
                  <ul className="-mt-1 pb-4">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} onClick={close} className="block py-2 pl-3 text-[0.9375rem] text-ink-soft hover:text-copper">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ) : (
              <li key={item.label}>
                <Link href={item.href} onClick={close} className="block py-4 font-serif text-[1.35rem] hover:text-copper">
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
      <div className="space-y-3 border-t border-line bg-stone-50 px-5 py-5 text-sm">
        <Link href="/account" onClick={close} className="flex items-center gap-3 text-ink">
          <UserIcon size={18} /> Account
        </Link>
        <a href={siteConfig.contact.phoneHref} className="flex items-center gap-3 text-ink">
          <PhoneIcon size={18} className="text-copper" /> {siteConfig.contact.phoneDisplay}
        </a>
        <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink">
          <WhatsAppIcon size={18} className="text-agave" /> WhatsApp us
        </a>
        <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink">
          <InstagramIcon size={18} /> {siteConfig.contact.instagramHandle}
        </a>
      </div>
    </Drawer>
  );
}
