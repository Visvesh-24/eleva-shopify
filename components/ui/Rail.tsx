"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";
import { cn } from "@/lib/format";

/**
 * Horizontal scroll-snap rail with prev/next buttons. Native scrolling, so it
 * works with touch, trackpad and keyboard; buttons hide at the ends.
 */
export function Rail({ children, label, className }: { children: ReactNode; label: string; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const btn =
    "absolute top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-card transition-opacity hover:border-copper hover:text-copper md:flex";

  return (
    <div className={cn("relative", className)}>
      <ul
        ref={ref}
        aria-label={label}
        className="no-scrollbar relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 md:-mx-0 md:gap-6 md:px-0"
      >
        {children}
      </ul>
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        className={cn(btn, "-left-5", edges.start && "pointer-events-none opacity-0")}
        tabIndex={edges.start ? -1 : 0}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        className={cn(btn, "-right-5", edges.end && "pointer-events-none opacity-0")}
        tabIndex={edges.end ? -1 : 0}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

/** Rail item: ~78% width on phones, 2.3-up on tablet, 4-up on desktop. */
export const railItemClass = "w-[72%] shrink-0 snap-start sm:w-[42%] lg:w-[calc((100%-4.5rem)/4)]";
