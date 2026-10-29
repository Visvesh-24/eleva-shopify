import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/format";

/**
 * Header lock-up: the copper "A" mark (cropped from logo.png) beside a typeset
 * wordmark, which reads better at small sizes than the full 3D logo.
 */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="Eleva Imports, home">
      <Image
        src="/images/brand/logo-mark.png"
        alt=""
        width={400}
        height={275}
        priority
        className="h-7 w-auto md:h-8"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[1.35rem] font-semibold tracking-[0.2em] md:text-[1.55rem]",
            tone === "dark" ? "text-ink" : "text-white",
          )}
        >
          ELEVA
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.5rem] font-semibold tracking-[0.62em] md:text-[0.5625rem]",
            tone === "dark" ? "text-ink-muted" : "text-white/70",
          )}
        >
          IMPORTS
        </span>
      </span>
    </Link>
  );
}
