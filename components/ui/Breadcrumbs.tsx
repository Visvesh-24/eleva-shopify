import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/format";
import { ChevronRight } from "./Icons";

export type Crumb = { label: string; href?: string };

/** Breadcrumb trail with BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${siteConfig.url}${c.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-xs", tone === "dark" ? "text-white/60" : "text-ink-muted")}>
        {all.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 ? <ChevronRight size={12} aria-hidden /> : null}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className={cn(tone === "dark" ? "hover:text-white" : "hover:text-ink")}>
                {c.label}
              </Link>
            ) : (
              <span aria-current={i === all.length - 1 ? "page" : undefined} className={tone === "dark" ? "text-white/90" : "text-ink"}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
