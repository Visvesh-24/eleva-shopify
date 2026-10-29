/**
 * Inline SVG icon set (1.5px stroke, 24px grid). Decorative by default:
 * pass `title` to expose an accessible name.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { title?: string; size?: number };

function Svg({ title, size = 20, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const SearchIcon = (p: IconProps) => (
  <Svg {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></Svg>
);
export const UserIcon = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="8.5" r="3.75" /><path d="M4.75 20c.9-3.6 3.8-5.5 7.25-5.5s6.35 1.9 7.25 5.5" /></Svg>
);
export const BagIcon = (p: IconProps) => (
  <Svg {...p}><path d="M5.5 8h13l-1 12h-11l-1-12Z" /><path d="M9 10V6.5a3 3 0 0 1 6 0V10" /></Svg>
);
export const MenuIcon = (p: IconProps) => (
  <Svg {...p}><path d="M3.5 7h17M3.5 12h17M3.5 17h17" /></Svg>
);
export const CloseIcon = (p: IconProps) => (
  <Svg {...p}><path d="m6 6 12 12M18 6 6 18" /></Svg>
);
export const ChevronDown = (p: IconProps) => (
  <Svg {...p}><path d="m6 9 6 6 6-6" /></Svg>
);
export const ChevronRight = (p: IconProps) => (
  <Svg {...p}><path d="m9 6 6 6-6 6" /></Svg>
);
export const ChevronLeft = (p: IconProps) => (
  <Svg {...p}><path d="m15 6-6 6 6 6" /></Svg>
);
export const ArrowRight = (p: IconProps) => (
  <Svg {...p}><path d="M4 12h15.5M14 6.5l5.5 5.5-5.5 5.5" /></Svg>
);
export const PlusIcon = (p: IconProps) => (
  <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
);
export const MinusIcon = (p: IconProps) => (
  <Svg {...p}><path d="M5 12h14" /></Svg>
);
export const CheckIcon = (p: IconProps) => (
  <Svg {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Svg>
);
/** Stylised agave leaf: used for additive-free / 100% agave trust marks. */
export const AgaveIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21V9M12 21c-1.5-5-4.5-8-8-9 1 4 4 7.5 8 9ZM12 21c1.5-5 4.5-8 8-9-1 4-4 7.5-8 9Z" />
    <path d="M12 9c-1.2-2-1.2-4 0-6 1.2 2 1.2 4 0 6Z" />
  </Svg>
);
export const AwardIcon = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="9" r="5.5" /><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" /><path d="m10 9 1.5 1.5L14.5 7.5" /></Svg>
);
export const ShieldIcon = (p: IconProps) => (
  <Svg {...p}><path d="M12 3 5 6v5.5c0 4.4 3 7.9 7 9.5 4-1.6 7-5.1 7-9.5V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></Svg>
);
export const GiftIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="8" width="17" height="4" rx=".5" /><path d="M5 12v8.5h14V12M12 8v12.5" />
    <path d="M12 8c-1.5-3.5-5.5-4-5.5-1.5S10 8 12 8Zm0 0c1.5-3.5 5.5-4 5.5-1.5S14 8 12 8Z" />
  </Svg>
);
export const TruckIcon = (p: IconProps) => (
  <Svg {...p}><path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3.5v3h-7" /><circle cx="6.5" cy="17.5" r="1.75" /><circle cx="17" cy="17.5" r="1.75" /></Svg>
);
export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}><path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z" /></Svg>
);
export const MailIcon = (p: IconProps) => (
  <Svg {...p}><rect x="3" y="5.5" width="18" height="13" rx="1" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></Svg>
);
export const MapPinIcon = (p: IconProps) => (
  <Svg {...p}><path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.25" /></Svg>
);
export const CalendarIcon = (p: IconProps) => (
  <Svg {...p}><rect x="3.5" y="5" width="17" height="15.5" rx="1" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></Svg>
);
export const GlassIcon = (p: IconProps) => (
  <Svg {...p}><path d="M8 3h8c.3 4.5-.8 8-4 8.5C8.8 11 7.7 7.5 8 3ZM12 11.5V20M8.5 20.5h7" /></Svg>
);
export const StarIcon = ({ filled = true, ...p }: IconProps & { filled?: boolean }) => (
  <Svg {...p} fill={filled ? "currentColor" : "none"} strokeWidth={1.2}>
    <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
  </Svg>
);

export const InstagramIcon = (p: IconProps) => (
  <Svg {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="3.75" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></Svg>
);
export const WhatsAppIcon = ({ size = 20, title, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} {...p}>
    {title ? <title>{title}</title> : null}
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.22 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);
