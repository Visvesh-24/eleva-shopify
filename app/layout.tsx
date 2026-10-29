import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { getAllProducts, getProductsBySlugs } from "@/lib/products";
import { CartProvider } from "@/components/shop/CartProvider";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { UIProvider } from "@/components/layout/UIProvider";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Footer } from "@/components/layout/Footer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { AgeGate, ageGateScript } from "@/components/layout/AgeGate";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Eleva Imports | Additive-Free Tequila Curated by Canada's Only Certified Tequila Master",
    template: "%s | Eleva Imports",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_CA",
    images: [{ url: "/images/lifestyle/eleva-huizar-banner.jpg", width: 1254, height: 1254, alt: "Eleva Imports: a world of exceptional spirits" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/images/brand/logo-mark.png" },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F4",
  width: "device-width",
  initialScale: 1,
};

/** Upsell candidates for the cart drawer ("Complete the gift"). */
const CART_UPSELLS = ["riedel-tequila-glass", "reserva-huizar-extra-anejo-mini", "reserva-huizar-tasting-collection", "pechery-dubai-chocolate"];

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [products, upsells] = await Promise.all([getAllProducts(), getProductsBySlugs(CART_UPSELLS)]);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: "+1-905-718-1247",
    address: { "@type": "PostalAddress", addressLocality: "Toronto", addressRegion: "ON", addressCountry: "CA" },
    sameAs: [siteConfig.contact.instagram],
    founder: { "@type": "Person", name: "Adriana Martinez", jobTitle: "Certified Tequila Master" },
  };

  return (
    <html lang="en-CA" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ageGateScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[110] bg-white px-4 py-3 text-sm font-semibold focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <UIProvider>
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <MobileMenu />
            <main id="main">{children}</main>
            <Footer />
            <CartDrawer upsells={upsells} />
            <SearchOverlay products={products} />
            <WhatsAppButton />
          </CartProvider>
        </UIProvider>
        <AgeGate />
      </body>
    </html>
  );
}
