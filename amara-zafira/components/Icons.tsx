import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const IconMenu = (p: P) => (
  <svg {...base(p)}><path d="M3 7h18M3 12h18M3 17h18" /></svg>
);
export const IconClose = (p: P) => (
  <svg {...base(p)}><path d="M5 5l14 14M19 5L5 19" /></svg>
);
export const IconSearch = (p: P) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>
);
export const IconBag = (p: P) => (
  <svg {...base(p)}><path d="M5 8h14l-1 13H6L5 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></svg>
);
export const IconHeart = ({ filled, ...p }: P & { filled?: boolean }) => (
  <svg {...base(p)} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0112 7.2a4.3 4.3 0 017.5 2.6C19.5 15.4 12 20 12 20z" />
  </svg>
);
export const IconChevronLeft = (p: P) => (
  <svg {...base(p)}><path d="M15 5l-7 7 7 7" /></svg>
);
export const IconChevronRight = (p: P) => (
  <svg {...base(p)}><path d="M9 5l7 7-7 7" /></svg>
);
export const IconChevronDown = (p: P) => (
  <svg {...base(p)}><path d="M5 9l7 7 7-7" /></svg>
);
export const IconPlus = (p: P) => (
  <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconMinus = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14" /></svg>
);
export const IconGrid2 = (p: P) => (
  <svg {...base(p)}><rect x="4" y="4" width="7" height="16" /><rect x="13" y="4" width="7" height="16" /></svg>
);
export const IconGrid4 = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="3.5" height="16" /><rect x="8.2" y="4" width="3.5" height="16" />
    <rect x="13.4" y="4" width="3.5" height="16" /><rect x="18.5" y="4" width="2.5" height="16" />
  </svg>
);
export const IconFilter = (p: P) => (
  <svg {...base(p)}><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>
);
export const IconArrowRight = (p: P) => (
  <svg {...base(p)}><path d="M4 12h16M14 6l6 6-6 6" /></svg>
);
export const IconCheck = (p: P) => (
  <svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
