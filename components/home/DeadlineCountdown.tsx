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
