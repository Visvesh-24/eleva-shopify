import type { ReactNode } from "react";
import { cn } from "@/lib/format";
import { FadeIn } from "./FadeIn";

/** Standard vertical rhythm + max width for a page section. */
export function Section({
  children,
  className,
  id,
  tone = "ivory",
  "aria-labelledby": labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "ivory" | "white" | "stone" | "dark";
  "aria-labelledby"?: string;
}) {
  const tones = {
    ivory: "bg-ivory",
    white: "bg-white",
    stone: "bg-stone-100",
    dark: "on-dark bg-charcoal text-white",
  };
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 md:py-28", tones[tone], className)}>
      <div className="wrap">{children}</div>
    </section>
  );
}

/** Eyebrow + serif heading + optional intro and action, centred or left. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "center",
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "center" | "left";
  action?: ReactNode;
  className?: string;
}) {
  const centred = align === "center";
  return (
    <FadeIn
      className={cn(
        "mb-12 md:mb-16",
        centred ? "mx-auto max-w-2xl text-center" : "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn(!centred && "max-w-2xl")}>
        {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
        <h2 id={id} className="h-section">
          {title}
        </h2>
        {centred ? <span aria-hidden className="hairline-copper mx-auto mt-6 block w-12" /> : null}
        {intro ? <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">{intro}</p> : null}
      </div>
      {action ? <div className={cn(centred && "mt-8")}>{action}</div> : null}
    </FadeIn>
  );
}
