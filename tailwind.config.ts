import type { Config } from "tailwindcss";

/**
 * Eleva design tokens. Colours resolve to CSS variables defined in
 * app/globals.css so they can be themed in one place.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem", xl: "2.5rem" } },
    extend: {
      colors: {
        ivory: "rgb(var(--c-ivory) / <alpha-value>)",
        stone: {
          50: "rgb(var(--c-stone-50) / <alpha-value>)",
          100: "rgb(var(--c-stone-100) / <alpha-value>)",
          200: "rgb(var(--c-stone-200) / <alpha-value>)",
          300: "rgb(var(--c-stone-300) / <alpha-value>)",
        },
        line: "rgb(var(--c-line) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--c-ink) / <alpha-value>)",
          soft: "rgb(var(--c-ink-soft) / <alpha-value>)",
          muted: "rgb(var(--c-ink-muted) / <alpha-value>)",
        },
        charcoal: {
          DEFAULT: "rgb(var(--c-charcoal) / <alpha-value>)",
          800: "rgb(var(--c-charcoal-800) / <alpha-value>)",
        },
        copper: {
          DEFAULT: "rgb(var(--c-copper) / <alpha-value>)",
          dark: "rgb(var(--c-copper-dark) / <alpha-value>)",
          light: "rgb(var(--c-copper-light) / <alpha-value>)",
          pale: "rgb(var(--c-copper-pale) / <alpha-value>)",
          wash: "rgb(var(--c-copper-wash) / <alpha-value>)",
        },
        agave: "rgb(var(--c-agave) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        eyebrow: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.22em" }],
      },
      letterSpacing: { label: "0.18em", wide2: "0.28em" },
      borderRadius: { sm: "2px", DEFAULT: "3px", md: "4px" },
      boxShadow: {
        card: "0 1px 2px rgb(28 27 25 / 0.04), 0 8px 24px -12px rgb(28 27 25 / 0.10)",
        drawer: "-12px 0 40px -12px rgb(28 27 25 / 0.18)",
      },
      maxWidth: { site: "88rem" },
      transitionTimingFunction: { lux: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "fade-up": { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        // Gentle bob for floating badges and bottles
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "float-x": { "0%, 100%": { transform: "translate(0,0) rotate(-2deg)" }, "50%": { transform: "translate(4px,-6px) rotate(1deg)" } },
        twinkle: { "0%, 100%": { opacity: "0.15", transform: "scale(0.7)" }, "50%": { opacity: "1", transform: "scale(1)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        shine: { "0%": { transform: "translateX(-120%) skewX(-20deg)" }, "60%, 100%": { transform: "translateX(320%) skewX(-20deg)" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        glow: { "0%, 100%": { opacity: "0.55", transform: "scale(1)" }, "50%": { opacity: "0.9", transform: "scale(1.06)" } },
      },
      animation: {
        "fade-in": "fade-in 600ms cubic-bezier(0.22,1,0.36,1) both",
        "fade-up": "fade-up 800ms cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-x": "float-x 7s ease-in-out infinite",
        twinkle: "twinkle 3.2s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        shine: "shine 4.5s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        glow: "glow 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
