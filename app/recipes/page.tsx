import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { recipes } from "@/lib/recipes";
import { guides } from "@/lib/guides";
import { getAllProducts, type Product } from "@/lib/products";
import { formatPrice, cn } from "@/lib/format";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { CTABand } from "@/components/ui/CTABand";
import { FadeIn } from "@/components/ui/FadeIn";
import { ShopRecipeButton } from "@/components/shop/ShopRecipeButton";

export const metadata: Metadata = {
  title: "Recipes & Resources",
  description: "Tequila cocktail recipes and guides from Canada's only Certified Tequila Master: palomas, margaritas, how to taste, and what additive-free really means.",
  alternates: { canonical: "/recipes" },
};

export default async function RecipesPage() {
  const products = await getAllProducts();
  const bySlug = new Map(products.map((p) => [p.slug, p]));

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Recipes & Resources" }]}
        eyebrow="Recipes & resources"
        title="Mix, sip and learn"
        intro={<p>Simple, agave-forward recipes and the guides Adriana shares in every masterclass.</p>}
        actions={
          <>
            <Link href="#recipes" className="btn-primary">
              Cocktail recipes
            </Link>
            <Link href="#resources" className="btn-secondary">
              Tequila guides
            </Link>
          </>
        }
      />

      <Section tone="white" id="recipes" aria-labelledby="recipes-title">
        <SectionHeading id="recipes-title" align="left" eyebrow="Cocktails" title="Recipes" />
        <div className="space-y-16 md:space-y-24">
          {recipes.map((r, i) => {
            const hero = bySlug.get(r.heroProduct);
            const items = r.products.map((s) => bySlug.get(s)).filter((p): p is Product => Boolean(p));
            return (
              <FadeIn key={r.slug} as="section">
                <article id={r.slug} aria-labelledby={`${r.slug}-title`} className="grid scroll-mt-36 items-start gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={cn("relative overflow-hidden rounded-sm", r.tint, i % 2 === 1 && "lg:order-2")}>
                    {r.image ? (
                      <Image src={r.image.src} alt={r.image.alt} width={1254} height={1254} sizes="(min-width: 1024px) 45vw, 92vw" className="h-auto w-full" />
                    ) : hero?.images[0] ? (
                      <div className="relative aspect-[5/4]">
                        <Image src={hero.images[0].src} alt={hero.images[0].alt} fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-contain p-[8%]" />
                      </div>
                    ) : null}
                    <span className="absolute left-4 top-4 rounded-sm bg-white/90 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-label">
                      {r.time} · {r.level}
                    </span>
                  </div>
                  <div>
                    <h3 id={`${r.slug}-title`} className="h-section">
                      {r.name}
                    </h3>
                    <p className="mt-3 text-[1.0625rem] text-ink-soft">{r.tagline}</p>
                    <div className="mt-8 grid gap-8 sm:grid-cols-2">
                      <div>
                        <h4 className="eyebrow mb-3">Ingredients</h4>
                        <ul className="space-y-2 text-[0.9375rem] text-ink">
                          {r.ingredients.map((x) => (
                            <li key={x} className="border-b border-line pb-2">
                              {x}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="eyebrow mb-3">Method</h4>
                        <ol className="space-y-3 text-[0.9375rem] text-ink-soft">
                          {r.steps.map((s, n) => (
                            <li key={s} className="flex gap-3">
                              <span className="font-serif text-xl leading-none text-copper">{n + 1}</span>
                              {s}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    {items.length ? (
                      <div className="mt-8 rounded-sm bg-stone-50 p-5">
                        <p className="text-xs font-semibold uppercase tracking-label text-ink-muted">You&rsquo;ll need</p>
                        <ul className="mt-2 space-y-1 text-sm">
                          {items.map((p) => (
                            <li key={p.slug} className="flex justify-between gap-4">
                              <Link href={`/products/${p.slug}`} className="hover:text-copper">
                                {p.name}
                              </Link>
                              <span className="tabular-nums text-ink-soft">{formatPrice(p.variants[0].price)}</span>
                            </li>
                          ))}
                        </ul>
                        <ShopRecipeButton products={items} className="mt-4" />
                      </div>
                    ) : null}
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      <Section tone="ivory" id="resources" aria-labelledby="resources-title">
        <SectionHeading id="resources-title" eyebrow="Resources" title="Tequila guides" intro="Everything you need to choose, taste and enjoy agave spirits with confidence." />
        <div className="grid gap-8 lg:grid-cols-3">
          {guides.map((g) => (
            <FadeIn key={g.slug} className="rounded-sm bg-white p-7 ring-1 ring-line">
              <h3 id={g.slug} className="scroll-mt-36 font-serif text-3xl leading-tight">
                {g.title}
              </h3>
              <p className="mt-3 text-sm text-ink-soft">{g.summary}</p>
              <Accordion className="mt-6" items={g.sections.map((s) => ({ q: s.heading, a: s.body }))} />
            </FadeIn>
          ))}
        </div>
      </Section>

      <CTABand
        eyebrow="Go deeper"
        title="Learn it in the glass"
        body="The best way to understand tequila is to taste it with a master. Join a masterclass or start with a tasting flight."
        primary={{ label: "Book a masterclass", href: "/masterclass" }}
        secondary={{ label: "Shop tasting minis", href: "/collections/start-here" }}
        showContact={false}
      />
    </>
  );
}
