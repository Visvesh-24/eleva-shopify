"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { ChevronLeft, ChevronRight } from "@/components/ui/Icons";

/** Rotating announcement bar. Pauses on hover/focus; static under reduced motion. */
export function AnnouncementBar() {
  const items = siteConfig.announcements;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % items.length), 5000);
    return () => window.clearInterval(t);
  }, [paused, reduce, items.length]);

  const go = (d: number) => setI((n) => (n + d + items.length) % items.length);
  const item = items[i];

  return (
    <div
      className="relative z-50 border-b border-copper-light/40 bg-copper-wash text-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-label="Announcements"
    >
      <div className="wrap flex h-9 items-center justify-between gap-2">
        <button type="button" onClick={() => go(-1)} className="p-1 text-ink-soft hover:text-ink" aria-label="Previous announcement">
          <ChevronLeft size={14} />
        </button>
        <div className="relative flex h-full flex-1 items-center justify-center overflow-hidden" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={i}
              initial={{ opacity: 0, y: reduce ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -6 }}
              transition={{ duration: 0.35 }}
              className="truncate text-center text-[0.6875rem] font-semibold uppercase tracking-label"
            >
              <Link href={item.href} className="hover:text-copper">
                {item.text}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        <button type="button" onClick={() => go(1)} className="p-1 text-ink-soft hover:text-ink" aria-label="Next announcement">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
