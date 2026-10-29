import type { SVGProps } from "react";

/** Four-point sparkle used as a festive accent. Decorative. */
export function Sparkle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M12 0c.6 6.2 2.9 9.8 12 12-9.1 2.2-11.4 5.8-12 12-.6-6.2-2.9-9.8-12-12C9.1 9.8 11.4 6.2 12 0Z" />
    </svg>
  );
}
