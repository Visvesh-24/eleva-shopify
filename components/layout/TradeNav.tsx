"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/format";

const links = [
  { href: "/trade", label: "Build Your Agave Program" },
  { href: "/trade/ordering", label: "Trade Ordering" },
  { href: "/trade/reorder", label: "Quick Reorder" },
];

/** Sub-navigation shared by the three For Restaurants & Bars pages. */
export function TradeNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Restaurants and bars" className="border-b border-line bg-white">
      <ul className="wrap no-scrollbar relative flex gap-6 overflow-x-auto">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <li key={l.href} className="shrink-0">
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block border-b-2 py-4 text-[0.8125rem] font-medium",
                  active ? "border-copper text-ink" : "border-transparent text-ink-soft hover:text-ink",
                )}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
