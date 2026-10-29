"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

/** Global UI state shared by the header and overlays (search, mobile menu). */
type UIState = {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const value = useMemo(() => ({ searchOpen, setSearchOpen, menuOpen, setMenuOpen }), [searchOpen, menuOpen]);
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIState {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
