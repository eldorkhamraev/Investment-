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
      { key: "whyEconomy", href: "/why/economy" },
      { key: "whyTalent", href: "/why/talent" },
      { key: "whyInnovation", href: "/why/innovation" },
      { key: "whyCulture", href: "/why/culture" },
      { key: "whyLiving", href: "/why/living" },
      { key: "whyStrategy", href: "/why/strategy" },
    ],
  },
  {
    key: "investors",
    href: "/how-to-invest",
    children: [
      { key: "investorsOverview", href: "/how-to-invest" },
      { key: "whereToStart", href: "/how-to-invest/where-to-start" },
      { key: "exploreSectors", href: "/sectors" },
      { key: "projects", href: "/projects" },
      { key: "freeZones", href: "/how-to-invest/zones" },
      { key: "partnership", href: "/how-to-invest/partnership" },
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
      { key: "aboutStructure", href: "/about/structure" },
      { key: "aboutTeam", href: "/about/team" },
    ],
  },
] as const;

/** Compact primary footer links (horizontal strip). */
export const FOOTER_NAV = [
  { key: "why", href: "/why" },
  { key: "howToInvest", href: "/how-to-invest" },
  { key: "projects", href: "/projects" },
  { key: "sectors", href: "/sectors" },
  { key: "stories", href: "/stories" },
  { key: "regions", href: "/regions" },
  { key: "news", href: "/news" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

/** Full explore list for the sitemap page. */
export const FOOTER_EXPLORE = [
  { key: "why", href: "/why" },
  { key: "howToInvest", href: "/how-to-invest" },
  { key: "whereToStart", href: "/how-to-invest/where-to-start" },
  { key: "freeZones", href: "/how-to-invest/zones" },
  { key: "partnership", href: "/how-to-invest/partnership" },
  { key: "services", href: "/services" },
  { key: "programs", href: "/programs" },
  { key: "projects", href: "/projects" },
  { key: "sectors", href: "/sectors" },
  { key: "stories", href: "/stories" },
  { key: "regions", href: "/regions" },
  { key: "news", href: "/news" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;
