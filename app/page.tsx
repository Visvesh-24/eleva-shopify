import { getAllProducts, getBestSellers, getProduct } from "@/lib/products";
import { getFeaturedCollections } from "@/lib/collections";
import { recipes } from "@/lib/recipes";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { QuickPicks } from "@/components/home/QuickPicks";
import { CorporateBanner } from "@/components/home/CorporateBanner";
import { CollectionsGrid } from "@/components/home/CollectionsGrid";
import { BestSellers } from "@/components/home/BestSellers";
import { ProductSpotlight } from "@/components/home/ProductSpotlight";
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
  const [products, bestSellers, collections, pechery] = await Promise.all([
    getAllProducts(),
    getBestSellers(12),
    getFeaturedCollections(),
    getProduct("pechery-dubai-chocolate"),
  ]);
  const ordered = [...bestSellers].sort((a, b) => BEST_SELLER_ORDER.indexOf(a.slug) - BEST_SELLER_ORDER.indexOf(b.slug));

  return (
    <>
      <Hero />
      <TrustStrip />
      <QuickPicks />
      <CorporateBanner />
      <CollectionsGrid collections={collections} />
      <BestSellers products={ordered} />
      {pechery ? (
        <ProductSpotlight
          product={pechery}
          banner={{
            src: "/images/lifestyle/pechery-dubai-lifestyle.jpg",
            alt: "Pechery Dubai Style Chocolate Cream Liqueur on travertine with chocolate bars and pistachios",
            width: 1254,
            height: 1254,
          }}
          eyebrow="Dessert in a glass"
          title="Dubai chocolate, poured into a glass"
          moreHref="/collections/cream-liqueurs"
          moreLabel="Browse all cream liqueurs"
        />
      ) : null}
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
