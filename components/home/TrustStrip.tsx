import { AgaveIcon, AwardIcon, MapPinIcon, ShieldIcon, GlassIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/format";

const items = [
  { icon: AwardIcon, label: "Certified Tequila Master" },
  { icon: ShieldIcon, label: "Additive-free" },
  { icon: AgaveIcon, label: "100% blue agave" },
  { icon: GlassIcon, label: "Not at the LCBO" },
  { icon: MapPinIcon, label: "Curated in Toronto" },
];

function Pills({ hidden = false, className }: { hidden?: boolean; className?: string }) {
  return (
    <ul className={cn("flex shrink-0 gap-3", className)} aria-hidden={hidden || undefined}>
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="trust-pill">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-copper-wash text-agave">
            <Icon size={15} />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}

/**
 * Trust signals as pill containers. Mobile: a slow, seamless marquee (two
 * copies, the second hidden from screen readers). Desktop: a centred row.
 * Under reduced motion the mobile row becomes a static, swipeable list.
 */
export function TrustStrip() {
  return (
    <section aria-label="Why customers trust Eleva" className="relative border-y border-line bg-stone-50 py-4 md:py-6">
      {/* Mobile / tablet marquee */}
      <div className="relative overflow-hidden lg:hidden motion-reduce:overflow-x-auto motion-reduce:no-scrollbar">
        {/* Each copy carries its own trailing gap so -50% loops seamlessly */}
        <div className="flex w-max py-1 animate-marquee motion-reduce:animate-none motion-reduce:px-5">
          <Pills className="pr-3" />
          <Pills hidden className="pr-3 motion-reduce:hidden" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-stone-50 motion-reduce:hidden" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-stone-50 motion-reduce:hidden" />
      </div>
      {/* Desktop row */}
      <div className="wrap hidden lg:block">
        <Pills className="flex-wrap justify-center" />
      </div>
    </section>
  );
}
