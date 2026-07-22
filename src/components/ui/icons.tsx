import type { SVGProps } from "react";

// Lightweight 24px stroke icons. Deliberately concrete (talent, cost, route,
// visa, institutions, export) — no globes or handshakes.
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Icons = {
  talent: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8M17.5 20a5.5 5.5 0 0 0-3-4.9" />
    </svg>
  ),
  cost: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 9.5v5M18 9.5v5" />
    </svg>
  ),
  route: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <path d="M8 18h6a3 3 0 0 0 3-3V8.5" />
    </svg>
  ),
  visa: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  institution: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 10l8-5 8 5" />
      <path d="M5 10v8M19 10v8M9.5 10v8M14.5 10v8M3.5 20h17" />
    </svg>
  ),
  export: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="7" cy="12" r="2.2" />
      <circle cx="17" cy="6" r="2.2" />
      <circle cx="17" cy="18" r="2.2" />
      <path d="M9 11l6-3.5M9 13l6 3.5" />
    </svg>
  ),
  growth: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 16.5 9 11l3.5 3.5L20 7" />
      <path d="M14.5 7H20v5.5" />
    </svg>
  ),
  population: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="8" cy="9" r="2.8" />
      <circle cx="16" cy="9" r="2.8" />
      <path d="M3.5 19a4.5 4.5 0 0 1 9 0M11.5 19a4.5 4.5 0 0 1 9 0" />
    </svg>
  ),
  registration: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 13h5M10 16.5h5" />
    </svg>
  ),
  legal: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 4v16M7 20h10M5 8l3-1 3 1M5 8l-1.5 4a3 3 0 0 0 5 0L7 8M19 8l-3-1-3 1M19 8l-1.5 4a3 3 0 0 0 5 0L20 8" />
    </svg>
  ),
  tax: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M6 3h12v18l-3-1.6L12 21l-3-1.6L6 21z" />
      <path d="M9.5 8.5l5 5M10 9h.01M14 13h.01" />
    </svg>
  ),
  partners: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="6" cy="7" r="2.4" />
      <circle cx="18" cy="7" r="2.4" />
      <circle cx="12" cy="17" r="2.4" />
      <path d="M7.6 8.8l3 6M16.4 8.8l-3 6M8 7h8" />
    </svg>
  ),
  arrow: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  search: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16.5 16.5L21 21" />
    </svg>
  ),
} as const;

export type IconName = keyof typeof Icons;
