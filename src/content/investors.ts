/**
 * For Investors guide sections — adapted from invest.gov.uz
 * (Privatization, Consultants, and Buying Bonds intentionally omitted).
 */
export type InvestorSection = {
  slug: "where-to-start" | "explore" | "projects" | "zones" | "partnership";
  /** Locale-aware app path */
  href: string;
  eyebrow: string;
  title: string;
  summary: string;
};

export const INVESTOR_SECTIONS: readonly InvestorSection[] = [
  {
    slug: "where-to-start",
    href: "/how-to-invest/where-to-start",
    eyebrow: "Where to start",
    title: "From first call to a growing local presence.",
    summary:
      "A clear path for technology companies: discover fit, structure incentives, establish on the ground, then grow with office aftercare.",
  },
  {
    slug: "explore",
    href: "/sectors",
    eyebrow: "Explore your sector",
    title: "Digital sectors with real demand.",
    summary:
      "AI and computing, fintech, IT outsourcing, digital infrastructure, education tech, and creative industries — mapped for market entry.",
  },
  {
    slug: "projects",
    href: "/projects",
    eyebrow: "Projects",
    title: "Priority digital investment opportunities.",
    summary:
      "Live and pipeline projects the Investment Project Office is ready to introduce — scoped for technology investors and operators.",
  },
  {
    slug: "zones",
    href: "/how-to-invest/zones",
    eyebrow: "Preferential zones",
    title: "IT Park and preferential regimes for tech.",
    summary:
      "IT Park Zero Risk gives qualifying residents 0% corporate tax, 0% VAT, and a flat 7.5% personal income tax — the digital equivalent of a free zone.",
  },
  {
    slug: "partnership",
    href: "/how-to-invest/partnership",
    eyebrow: "Public-private partnership",
    title: "Partner with the state on digital delivery.",
    summary:
      "Structure conversations with ministries and agencies on govtech, digital infrastructure, and service delivery — with IPO as your counterpart.",
  },
] as const;

export function getInvestorSection(slug: string) {
  return INVESTOR_SECTIONS.find((s) => s.slug === slug);
}

export const WHERE_TO_START_STEPS = [
  {
    title: "Discover",
    desc: "Map your sector fit, review priority projects, and understand incentives. Start with a discovery call.",
    links: [
      { label: "Why Uzbekistan", href: "/why" },
      { label: "Sectors", href: "/sectors" },
      { label: "Projects", href: "/projects" },
    ],
  },
  {
    title: "Structure",
    desc: "Choose the right legal and incentive path — IT Park residency, tax treatment, and ownership structure for your model.",
    links: [
      { label: "Services", href: "/services" },
      { label: "Programs", href: "/programs" },
      { label: "Preferential zones", href: "/how-to-invest/zones" },
    ],
  },
  {
    title: "Establish",
    desc: "Register, secure visas, open banking relationships, and complete soft-landing so your team can operate on the ground.",
    links: [
      { label: "IT Park Zero Risk", href: "/programs/it-park-zero-risk" },
      { label: "IT-Visa", href: "/programs/it-visa" },
      { label: "Soft-Landing", href: "/programs/soft-landing" },
    ],
  },
  {
    title: "Grow",
    desc: "Hire, expand, and stay connected to the ecosystem — partners and aftercare from the office.",
    links: [
      { label: "Success stories", href: "/stories" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;
