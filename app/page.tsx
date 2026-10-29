import { getAllProducts, getBestSellers } from "@/lib/products";
import { getFeaturedCollections } from "@/lib/collections";
import { recipes } from "@/lib/recipes";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CorporateBanner } from "@/components/home/CorporateBanner";
import { CollectionsGrid } from "@/components/home/CollectionsGrid";
import { BestSellers } from "@/components/home/BestSellers";
import { GiftFinder } from "@/components/home/GiftFinder";
import { WhyEleva } from "@/components/home/WhyEleva";
import { MeetAdriana } from "@/components/home/MeetAdriana";
import { Testimonials } from "@/components/home/Testimonials";
import { MasterclassBanner, TradeBanner } from "@/components/home/ExperienceBanners";
import { RecipesTeaser } from "@/components/home/RecipesTeaser";
import { Newsletter } from "@/components/home/Newsletter";

/** Best-seller order is merchandised by hand (TODO: confirm with client). */
const BEST_SELLER_ORDER = [
  "reserva-huizar-cristalino-reposado",
  "reserva-huizar-plata-rosado",
  "casa-cofradia-iguanas-talavera",
  "pechery-dubai-chocolate",
  "reserva-huizar-plata",
  "casa-cofradia-anejo",
  "reserva-huizar-tasting-collection",
];

export default async function HomePage() {
  const [products, bestSellers, collections] = await Promise.all([getAllProducts(), getBestSellers(12), getFeaturedCollections()]);
  const ordered = [...bestSellers].sort((a, b) => BEST_SELLER_ORDER.indexOf(a.slug) - BEST_SELLER_ORDER.indexOf(b.slug));

  return (
    <>
      <Hero />
      <TrustStrip />
      <CorporateBanner />
      <CollectionsGrid collections={collections} />
      <BestSellers products={ordered} />
      <GiftFinder products={products} />
      <WhyEleva />
      <MeetAdriana />
      <Testimonials />
      <MasterclassBanner />
      <TradeBanner />
      <RecipesTeaser recipes={recipes.filter((r) => ["paloma", "rosado-spritz", "dubai-chocolate-martini"].includes(r.slug))} products={products} />
      <Newsletter />
    </>
  );
}
