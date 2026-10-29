"use client";

import { useEffect, useState } from "react";
import { daysUntil } from "@/lib/config";

/**
 * "N days left" computed on the client so a statically built page never shows
 * a stale count. Renders nothing once the deadline has passed (no fake urgency).
 */
export function DeadlineCountdown({ date, className }: { date: string; className?: string }) {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => setDays(daysUntil(date)), [date]);
  if (days === null || days < 0) return null;
  return (
    <span className={className}>
      {days === 0 ? "Last day to order" : `${days} ${days === 1 ? "day" : "days"} left`}
    </span>
  );
}

/** Boxed live countdown (days / hours / minutes) to the end of the deadline day. */
export function CountdownBoxes({ date, className }: { date: string; className?: string }) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = new Date(`${date}T23:59:59`).getTime();
    const tick = () => setLeft(end - Date.now());
    tick();
    const t = window.setInterval(tick, 30_000);
    return () => window.clearInterval(t);
  }, [date]);
  if (left === null || left <= 0) return null;
  const d = Math.floor(left / 86_400_000);
  const h = Math.floor((left % 86_400_000) / 3_600_000);
  const m = Math.floor((left % 3_600_000) / 60_000);
  const units = [
    { v: d, l: d === 1 ? "Day" : "Days" },
    { v: h, l: "Hrs" },
    { v: m, l: "Min" },
  ];
  return (
    <div className={className} role="timer" aria-label={`${d} days, ${h} hours and ${m} minutes left to order`}>
      <div className="flex gap-2" aria-hidden>
        {units.map((u) => (
          <div key={u.l} className="flex w-16 flex-col items-center rounded-sm bg-white/[0.06] py-2.5 ring-1 ring-white/15 backdrop-blur">
            <span className="font-serif text-3xl leading-none text-white tabular-nums">{String(u.v).padStart(2, "0")}</span>
            <span className="mt-1 text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-copper-pale">{u.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
