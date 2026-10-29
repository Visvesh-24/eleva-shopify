import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/format";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/**
 * Standard page hero. Light (ivory) by default; `tone="dark"` is reserved for
 * corporate gifting and trade pages. Optional image is shown uncropped.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  actions,
  image,
  tone = "light",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
  image?: { src: string; alt: string; width: number; height: number; className?: string };
  tone?: "light" | "dark";
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section className={cn(dark ? "on-dark relative overflow-hidden bg-charcoal text-white" : "border-b border-line bg-ivory")}>
      {dark ? (
        <div
          aria-hidden
          className="absolute -right-40 top-1/2 h-[720px] w-[720px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--c-copper)/0.32),transparent_65%)]"
        />
      ) : null}
      <div className={cn("wrap relative grid items-center gap-10 py-12 md:py-16 lg:py-20", image && "lg:grid-cols-[1.1fr_1fr] lg:gap-16")}>
        <div className="animate-fade-in">
          {crumbs ? <Breadcrumbs items={crumbs} tone={tone} /> : null}
          {eyebrow ? <p className="eyebrow mt-6">{eyebrow}</p> : null}
          <h1 className={cn("mt-4 font-serif text-[2.4rem] leading-[1.05] sm:text-5xl lg:text-6xl", dark && "text-white")}>{title}</h1>
          {intro ? (
            <div className={cn("mt-6 max-w-2xl text-[1.0625rem] leading-relaxed md:text-lg", dark ? "text-white/80" : "text-ink-soft")}>
              {intro}
            </div>
          ) : null}
          {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">{actions}</div> : null}
          {children}
        </div>
        {image ? (
          <div className="animate-fade-in [animation-delay:120ms]">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              sizes="(min-width: 1024px) 45vw, 92vw"
              className={cn("mx-auto h-auto w-full rounded-sm", image.className)}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
