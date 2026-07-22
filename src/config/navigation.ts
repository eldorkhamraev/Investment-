/**
 * Site information architecture.
 * Top-level items with optional dropdown children.
 */
export type NavChild = { key: string; href: string };
export type NavItem = {
  key: string;
  href: string;
  children?: readonly NavChild[];
};

export const NAV: readonly NavItem[] = [
  {
    key: "why",
    href: "/why",
    children: [
      { key: "whyOverview", href: "/why" },
      { key: "whyTalent", href: "/why/talent" },
      { key: "whyIncentives", href: "/why/incentives" },
      { key: "whyStrategy", href: "/why/digital-2030" },
      { key: "whyEcosystem", href: "/why/ecosystem" },
      { key: "whyLiving", href: "/why/living" },
    ],
  },
  {
    key: "investors",
    href: "/how-to-invest",
    children: [
      { key: "howToInvest", href: "/how-to-invest" },
      { key: "services", href: "/services" },
      { key: "programs", href: "/programs" },
      { key: "faq", href: "/faq" },
      { key: "resources", href: "/resources" },
    ],
  },
  {
    key: "opportunities",
    href: "/projects",
    children: [
      { key: "projects", href: "/projects" },
      { key: "sectors", href: "/sectors" },
      { key: "stories", href: "/stories" },
      { key: "regions", href: "/regions" },
    ],
  },
  { key: "news", href: "/news" },
  {
    key: "about",
    href: "/about",
    children: [
      { key: "aboutOffice", href: "/about" },
      { key: "contact", href: "/contact" },
    ],
  },
] as const;

/** Flattened footer explore links. */
export const FOOTER_EXPLORE = [
  { key: "why", href: "/why" },
  { key: "howToInvest", href: "/how-to-invest" },
  { key: "services", href: "/services" },
  { key: "programs", href: "/programs" },
  { key: "projects", href: "/projects" },
  { key: "sectors", href: "/sectors" },
  { key: "stories", href: "/stories" },
  { key: "regions", href: "/regions" },
  { key: "resources", href: "/resources" },
  { key: "news", href: "/news" },
  { key: "faq", href: "/faq" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;
