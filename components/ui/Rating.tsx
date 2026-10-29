import { StarIcon } from "./Icons";
import { cn } from "@/lib/format";

/** Star rating with accessible label. Ratings are MOCK data (TODO.md). */
export function Rating({
  value,
  count,
  size = 13,
  className,
}: {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="sr-only">
        Rated {value.toFixed(1)} out of 5{count ? ` from ${count} reviews` : ""}
      </span>
      <span aria-hidden className="flex text-copper">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon key={i} size={size} filled={i <= rounded} />
        ))}
      </span>
      {count ? (
        <span aria-hidden className="text-[0.75rem] text-ink-muted">
          {value.toFixed(1)} ({count})
        </span>
      ) : null}
    </div>
  );
}
