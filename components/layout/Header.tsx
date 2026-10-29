"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { mainNav, type NavItem } from "@/lib/navigation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/format";
import { Logo } from "./Logo";
import { useUI } from "./UIProvider";
import { useCart } from "@/components/shop/CartProvider";
import { ArrowRight, BagIcon, ChevronDown, MenuIcon, PhoneIcon, SearchIcon, UserIcon } from "@/components/ui/Icons";

/**
 * Sticky header. Desktop (xl+): utility row with centred logo, then a centred
 * nav row with keyboard-accessible dropdowns. Below xl: hamburger drawer
 * (<MobileMenu/>, rendered outside the header in app/layout.tsx because the
 * header's backdrop-filter would otherwise trap position:fixed children).
 */
export function Header() {
  const pathname = usePathname();
  const { setSearchOpen, setMenuOpen } = useUI();
  const { count, openCart, hydrated } = useCart();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpenMenu(null), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (item: NavItem) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href) || !!item.children?.some((c) => pathname.startsWith(c.href));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow duration-300",
        scrolled ? "border-line shadow-[0_1px_0_rgb(var(--c-line))]" : "border-line",
      )}
    >
      <div className="wrap grid h-[64px] grid-cols-[1fr_auto_1fr] items-center xl:h-[76px]">
        {/* Left: menu (mobile) / search + phone (desktop) */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-ml-2 p-2 text-ink xl:hidden"
            aria-label="Open menu"
          >
            <MenuIcon size={22} />
          </button>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden items-center gap-2 p-2 text-[0.8125rem] text-ink-soft hover:text-ink xl:-ml-2 xl:inline-flex"
          >
            <SearchIcon size={19} />
            <span>Search</span>
          </button>
          <a
            href={siteConfig.contact.phoneHref}
            className="ml-4 hidden items-center gap-2 text-[0.8125rem] text-ink-soft hover:text-ink xl:inline-flex"
          >
            <PhoneIcon size={16} className="text-copper" />
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>

        <Logo />

        {/* Right: search (mobile), account, cart */}
        <div className="flex items-center justify-end gap-0.5">
          <button type="button" onClick={() => setSearchOpen(true)} className="p-2 text-ink xl:hidden" aria-label="Search">
            <SearchIcon size={21} />
          </button>
          <Link href="/account" className="hidden p-2 text-ink hover:text-copper sm:inline-flex" aria-label="Account">
            <UserIcon size={21} />
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="relative -mr-2 p-2 text-ink hover:text-copper"
            aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
          >
            <BagIcon size={22} />
            {hydrated && count > 0 ? (
              <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-copper px-1 text-[0.625rem] font-semibold text-white">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {/* Desktop nav row */}
      <nav aria-label="Main" className="hidden border-t border-line/70 xl:block">
        <ul className="wrap flex items-center justify-center gap-x-7 2xl:gap-x-9">
          {mainNav.map((item) => (
            <DesktopNavItem
              key={item.label}
              item={item}
              active={isActive(item)}
              open={openMenu === item.label}
              setOpen={(o) => setOpenMenu(o ? item.label : null)}
            />
          ))}
        </ul>
      </nav>

    </header>
  );
}

function DesktopNavItem({
  item,
  active,
  open,
  setOpen,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  setOpen: (o: boolean) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const linkCls = cn(
    "relative flex h-12 items-center gap-1 whitespace-nowrap text-[0.8125rem] font-medium tracking-[0.02em] text-ink transition-colors hover:text-copper",
    "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-copper after:transition-transform after:duration-300",
    active || open ? "after:scale-x-100" : "after:scale-x-0",
  );

  // Close when focus leaves the item (keyboard users tabbing past).
  const onBlur = (e: React.FocusEvent) => {
    if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
  };

  if (!item.children) {
    return (
      <li>
        <Link href={item.href} className={linkCls} aria-current={active ? "page" : undefined}>
          {item.label}
        </Link>
      </li>
    );
  }

  const isShop = item.label === "Shop";
  return (
    <li
      ref={ref}
      className={cn(!isShop && "relative")}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={onBlur}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          (ref.current?.querySelector("button") as HTMLButtonElement | null)?.focus();
        }
      }}
    >
      <button type="button" className={linkCls} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(!open)}>
        {item.label}
        <ChevronDown size={14} className={cn("transition-transform duration-300", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute z-50 border border-line bg-white shadow-card",
              isShop ? "inset-x-0 top-full border-x-0" : "left-1/2 top-full w-72 -translate-x-1/2",
            )}
          >
            {isShop ? <ShopMegaMenu item={item} /> : <SimpleMenu item={item} />}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

function SimpleMenu({ item }: { item: NavItem }) {
  return (
    <ul className="py-3">
      {item.children!.map((c) => (
        <li key={c.href}>
          <Link href={c.href} className="block px-6 py-3 hover:bg-stone-50">
            <span className="block text-sm font-medium text-ink">{c.label}</span>
            {c.description ? <span className="mt-0.5 block text-xs text-ink-muted">{c.description}</span> : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ShopMegaMenu({ item }: { item: NavItem }) {
  const [all, ...rest] = item.children!;
  return (
    <div className="wrap grid grid-cols-12 gap-10 py-10">
      <div className="col-span-3">
        <p className="eyebrow">Shop</p>
        <p className="mt-3 font-serif text-3xl leading-tight">Curated by Canada&rsquo;s only Certified Tequila Master</p>
        <Link href={all.href} className="link-underline mt-6">
          {all.label} <ArrowRight size={15} />
        </Link>
      </div>
      <ul className="col-span-5 grid grid-cols-2 gap-x-8 gap-y-1 border-l border-line pl-10">
        {rest.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="group/link block py-2.5">
              <span className="block text-[0.9375rem] font-medium text-ink group-hover/link:text-copper">{c.label}</span>
              {c.description ? <span className="mt-0.5 block text-xs text-ink-muted">{c.description}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/collections/gift-and-share"
        className="group/card col-span-4 grid grid-cols-[1fr_1.1fr] items-center overflow-hidden rounded-sm bg-stone-100"
      >
        <div className="relative h-full min-h-[200px]">
          <Image
            src="/images/lifestyle/gift-pair.png"
            alt="Casa Cofradía Añejo and Iguanas Talavera bottles"
            fill
            sizes="220px"
            className="object-contain p-4 transition-transform duration-700 ease-lux group-hover/card:scale-105"
          />
        </div>
        <div className="p-6">
          <p className="eyebrow">Holiday gifting</p>
          <p className="mt-2 font-serif text-2xl leading-tight">Bottles that make an entrance</p>
          <span className="link-underline mt-4">
            Shop gifts <ArrowRight size={15} />
          </span>
        </div>
      </Link>
    </div>
  );
}
