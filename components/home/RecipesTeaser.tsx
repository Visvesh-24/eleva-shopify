import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/lib/recipes";
import type { Product } from "@/lib/products";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/format";
import { ShopRecipeButton } from "@/components/shop/ShopRecipeButton";

export function RecipesTeaser({ recipes, products }: { recipes: Recipe[]; products: Product[] }) {
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  return (
    <Section tone="ivory" aria-labelledby="recipes-title">
      <SectionHeading
        id="recipes-title"
        align="left"
        eyebrow="Recipes & resources"
        title="Mix something worth sipping"
        action={
          <Link href="/recipes" className="link-underline">
            All recipes <ArrowRight size={15} />
          </Link>
        }
      />
      <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
        {recipes.map((r, i) => {
          const hero = bySlug.get(r.heroProduct);
          const items = r.products.map((s) => bySlug.get(s)).filter((p): p is Product => Boolean(p));
          return (
            <FadeIn as="li" key={r.slug} delay={i * 0.06} className="flex flex-col">
              <Link href={`/recipes#${r.slug}`} className="group block">
                <div className={cn("relative aspect-[5/4] overflow-hidden rounded-sm", r.tint)}>
                  {r.image ? (
                    <Image
                      src={r.image.src}
                      alt={r.image.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 90vw"
                      className="object-contain transition-transform duration-700 ease-lux group-hover:scale-105"
                    />
                  ) : hero?.images[0] ? (
                    <Image
                      src={hero.images[0].src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 30vw, 90vw"
                      className="object-contain p-[8%] transition-transform duration-700 ease-lux group-hover:scale-105"
                    />
                  ) : null}
                  <span className="absolute left-4 top-4 rounded-sm bg-white/90 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-label text-ink">
                    {r.time} · {r.level}
                  </span>
                </div>
                <h3 className="h-card mt-5 group-hover:text-copper">{r.name}</h3>
              </Link>
              <p className="mt-2 flex-1 text-[0.9375rem] text-ink-soft">{r.tagline}</p>
              <ShopRecipeButton products={items} className="mt-5 self-start" />
            </FadeIn>
          );
        })}
      </ul>
    </Section>
  );
}
