"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/format";

/**
 * Accessible slide-in drawer: focus is trapped inside while open, Escape and
 * the backdrop close it, body scroll is locked, and focus returns to the
 * element that opened it.
 */
export function Drawer({
  open,
  onClose,
  side = "right",
  label,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Keep the latest onClose without re-running the open effect (which would steal focus).
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
    // Focus the first control once the panel mounts.
    const t = window.setTimeout(() => focusables()[0]?.focus(), 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key !== "Tab") return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  const offset = side === "right" ? "100%" : "-100%";

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            className="absolute inset-0 bg-ink/35 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={cn(
              "absolute top-0 flex h-full w-full max-w-[440px] flex-col bg-white shadow-drawer",
              side === "right" ? "right-0" : "left-0",
              className,
            )}
            initial={{ x: offset }}
            animate={{ x: 0 }}
            exit={{ x: offset }}
            transition={reduce ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
