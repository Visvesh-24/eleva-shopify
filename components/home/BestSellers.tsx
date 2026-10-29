import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Rail, railItemClass } from "@/components/ui/Rail";
import { ArrowRight } from "@/components/ui/Icons";

export function BestSellers({ products }: { products: Product[] }) {
  return (
    <Section tone="white" aria-labelledby="bestsellers-title">
      <SectionHeading
        id="bestsellers-title"
        align="left"
        eyebrow="Best sellers"
        title="The bottles our guests reorder"
        action={
          <Link href="/collections/all" className="link-underline">
            Shop all <ArrowRight size={15} />
          </Link>
        }
      />
      <Rail label="Best-selling products">
        {products.map((p, i) => (
          <li key={p.slug} className={railItemClass}>
            <ProductCard product={p} priority={i < 2} />
          </li>
        ))}
      </Rail>
    </Section>
  );
}
