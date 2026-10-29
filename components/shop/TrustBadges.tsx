import { AgaveIcon, AwardIcon, GiftIcon, ShieldIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/format";

const badges = [
  { icon: AgaveIcon, label: "Additive-free" },
  { icon: AwardIcon, label: "Certified Tequila Master selection" },
  { icon: ShieldIcon, label: "Secure checkout" },
  { icon: GiftIcon, label: "Gift-ready" },
];

/** Trust row shown beside every Add to cart / checkout. */
export function TrustBadges({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-4 gap-y-2.5", className)}>
      {badges.map(({ icon: Icon, label }) => (
        <li key={label} className={cn("flex items-center gap-2 text-ink-soft", compact ? "text-[0.6875rem]" : "text-[0.8125rem]")}>
          <Icon size={compact ? 15 : 17} className="shrink-0 text-agave" />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}
