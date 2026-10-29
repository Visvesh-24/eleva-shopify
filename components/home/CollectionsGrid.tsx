import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/collections";
import { ArrowRight } from "@/components/ui/Icons";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/format";

const tones: Record<Collection["tone"], string> = {
  stone: "bg-stone-100",
  ivory: "bg-stone-50",
  copper: "bg-copper-wash",
};

/**
 * Six editorial collection cards. Mobile: horizontal snap rail (cards never
 * clip their titles). md: 2 columns. lg: 3 columns.
 */
export function CollectionsGrid({ collections }: { collections: Collection[] }) {
  return (
    <Section tone="ivory" aria-labelledby="collections-title">
      <SectionHeading
        id="collections-title"
        eyebrow="Our collections"
        title="Find your bottle"
        intro="Six ways into the world of agave, each chosen by a master."
      />
      <ul className="no-scrollbar relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3">
        {collections.map((c, i) => (
          <FadeIn as="li" key={c.handle} delay={(i % 3) * 0.06} className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto">
            <Link href={`/collections/${c.handle}`} className="group block h-full">
              <div className={cn("relative aspect-[4/5] overflow-hidden rounded-sm", tones[c.tone])}>
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 78vw"
                  className={cn(
                    "object-contain transition-transform duration-700 ease-lux group-hover:scale-[1.05]",
                    c.image.fit === "full"
                      ? "object-contain"
                      : c.image.src.includes("/lifestyle/")
                        ? "scale-[1.12] p-[3%] group-hover:scale-[1.17]"
                        : "p-[9%]",
                  )}
                />
              </div>
              <div className="flex items-start justify-between gap-4 pt-5">
                <div className="min-w-0">
                  <h3 className="h-card group-hover:text-copper">{c.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{c.tagline}</p>
                </div>
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 group-hover:border-copper group-hover:bg-copper group-hover:text-white">
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </ul>
    </Section>
  );
}
