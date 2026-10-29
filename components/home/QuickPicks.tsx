import Image from "next/image";
import Link from "next/link";
import { Sparkle } from "@/components/ui/Sparkle";

/**
 * "Shop by occasion" story circles: a thumb-friendly row of shortcuts into
 * filtered collections, the way shoppers browse on Instagram.
 */
const picks = [
  { label: "Holiday gifts", href: "/collections/gift-and-share", src: "/images/products/cofradia-iguanas.png", alt: "Cofradía Iguanas bottle" },
  { label: "Sippers", href: "/collections/sip-neat", src: "/images/products/huizar-cristalino.png", alt: "Cristalino decanter" },
  { label: "Cocktails", href: "/collections/mix-and-pour", src: "/images/products/huizar-plata.png", alt: "Plata decanter" },
  { label: "Under $75", href: "/collections/all?budget=under-75", src: "/images/products/pechery-dubai-chocolate.png", alt: "Pechery bottle" },
  { label: "Rosado", href: "/products/reserva-huizar-plata-rosado", src: "/images/products/huizar-rosado.png", alt: "Rosado decanter" },
  { label: "Collectors", href: "/collections/boutique-tequila-collection", src: "/images/products/cofradia-anejo.png", alt: "Casa Cofradía bottle" },
  { label: "Corporate", href: "/corporate-gifts", src: "/images/lifestyle/gift-pair.png", alt: "Gift bottles" },
];

export function QuickPicks() {
  return (
    <section aria-labelledby="quickpicks-title" className="bg-white pb-6 pt-8 md:py-12">
      <div className="wrap">
        <h2 id="quickpicks-title" className="flex items-center justify-center gap-2 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
          <Sparkle className="h-2.5 w-2.5 text-copper" /> Shop by occasion <Sparkle className="h-2.5 w-2.5 text-copper" />
        </h2>
        <ul className="no-scrollbar relative scroll-px-5 md:scroll-px-0 -mx-5 mt-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:justify-center md:gap-8 md:px-0">
          {picks.map((p, i) => (
            <li key={p.label} className="snap-start">
              <Link href={p.href} className="group flex w-[76px] flex-col items-center gap-2 md:w-24">
                <span className="relative block h-[76px] w-[76px] rounded-full p-[2px] md:h-24 md:w-24">
                  {/* Rotating copper ring */}
                  <span
                    aria-hidden
                    className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#7A5236,#D9B48C,#A8754F,#F5EDE4,#7A5236)]"
                    style={{ animationDelay: `${-i * 1.7}s` }}
                  />
                  <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-b from-stone-50 to-stone-200">
                    <Image
                      src={p.src}
                      alt=""
                      width={120}
                      height={150}
                      sizes="96px"
                      className="h-[84%] w-auto object-contain transition-transform duration-500 ease-lux group-hover:scale-110"
                    />
                  </span>
                </span>
                <span className="text-center text-[0.75rem] font-medium leading-tight text-ink group-hover:text-copper">{p.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
