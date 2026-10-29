import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getAllProducts } from "@/lib/products";
import { getCollections } from "@/lib/collections";

const staticPaths = [
  "",
  "/collections/all",
  "/corporate-gifts",
  "/masterclass",
  "/events",
  "/recipes",
  "/about",
  "/trade",
  "/trade/ordering",
  "/contact",
  "/faq",
  "/shipping-returns",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections] = await Promise.all([getAllProducts(), getCollections()]);
  const now = new Date();
  return [
    ...staticPaths.map((p) => ({ url: `${siteConfig.url}${p}`, lastModified: now, priority: p === "" ? 1 : 0.7 })),
    ...collections.map((c) => ({ url: `${siteConfig.url}/collections/${c.handle}`, lastModified: now, priority: 0.8 })),
    ...products.map((p) => ({ url: `${siteConfig.url}/products/${p.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
