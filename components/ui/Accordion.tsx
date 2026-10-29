import type { ReactNode } from "react";
import { cn } from "@/lib/format";
import { PlusIcon } from "./Icons";

/**
 * Accordion built on native <details>/<summary>: keyboard accessible and
 * works without JavaScript.
 */
export function Accordion({
  items,
  className,
  defaultOpen,
  faqSchema = false,
}: {
  items: { q: string; a: ReactNode; id?: string }[];
  className?: string;
  defaultOpen?: number;
  /** Emit FAQPage JSON-LD (only when answers are plain strings). */
  faqSchema?: boolean;
}) {
  const schema = faqSchema
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items
          .filter((i) => typeof i.a === "string")
          .map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
      }
    : null;
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => (
        <details key={item.q} id={item.id} className="group" open={defaultOpen === i}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-xl leading-snug text-ink">{item.q}</span>
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition-transform duration-300 group-open:rotate-45 group-open:border-copper group-open:text-copper"
            >
              <PlusIcon size={14} />
            </span>
          </summary>
          <div className="pb-6 pr-12 text-[0.9375rem] leading-relaxed text-ink-soft">{item.a}</div>
        </details>
      ))}
      {schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> : null}
    </div>
  );
}
