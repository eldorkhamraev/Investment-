export type Resource = {
  slug: string;
  title: string;
  category:
    | "Guide"
    | "Presentation"
    | "Report"
    | "One-pager"
    | "Legal"
    | "Region brief"
    | "Sector offer";
  description: string;
  href: string;
  external?: boolean;
  date: string;
};

export const RESOURCES: Resource[] = [
  {
    slug: "digital-investment-guide",
    title: "Digital Investment Guide",
    category: "Guide",
    description:
      "Comprehensive overview for technology FDI: sectors, incentives, soft-landing and how the office supports market entry.",
    href: "/briefs/digital-investment-guide.pdf",
    date: "2026",
  },
  {
    slug: "soft-landing-brief",
    title: "Soft-Landing Brief",
    category: "Guide",
    description:
      "Practical market-entry pathway for founding and specialist teams — registration, visas, IT Park and first hires.",
    href: "/briefs/soft-landing-brief.pdf",
    date: "2026",
  },
  {
    slug: "investment-presentation",
    title: "Investment Project Office — presentation",
    category: "Presentation",
    description:
      "Overview deck covering the office mandate, digital opportunity, priority sectors and how we support market entry.",
    href: "/investment-presentation.pdf",
    date: "2026",
  },
  {
    slug: "sector-ai-offer",
    title: "AI & Computing — investment offer",
    category: "Sector offer",
    description:
      "Sector snapshot, key stats and outlook for AI infrastructure and applied artificial intelligence.",
    href: "/briefs/sectors/ai-computing.pdf",
    date: "2026",
  },
  {
    slug: "sector-infra-offer",
    title: "Digital Infrastructure — investment offer",
    category: "Sector offer",
    description:
      "Data centres, green power and backbone capacity — opportunity brief for infrastructure investors.",
    href: "/briefs/sectors/digital-infrastructure.pdf",
    date: "2026",
  },
  {
    slug: "region-tashkent-city",
    title: "Tashkent City — regional digital brief",
    category: "Region brief",
    description:
      "IT Park hub, talent density and soft-landing context for the capital.",
    href: "/briefs/regions/tashkent-city.pdf",
    date: "2026",
  },
  {
    slug: "region-karakalpakstan",
    title: "Karakalpakstan — regional digital brief",
    category: "Region brief",
    description:
      "AI compute frontier and digital infrastructure opportunity in western Uzbekistan.",
    href: "/briefs/regions/karakalpakstan.pdf",
    date: "2026",
  },
  {
    slug: "it-park-zero-risk",
    title: "IT Park Zero Risk — one-pager",
    category: "One-pager",
    description:
      "Summary of preferential tax treatment and residency benefits for qualifying technology companies.",
    href: "/programs/it-park-zero-risk",
    date: "2026",
  },
  {
    slug: "it-visa",
    title: "IT-Visa — one-pager",
    category: "One-pager",
    description:
      "Residence pathway for IT founders, investors and specialists — validity and who qualifies.",
    href: "/programs/it-visa",
    date: "2026",
  },
  {
    slug: "how-to-invest-checklist",
    title: "How to invest — market-entry checklist",
    category: "Guide",
    description:
      "Step-by-step checklist from first conversation to operational entity: structure, incentives, visas and aftercare.",
    href: "/how-to-invest",
    date: "2026",
  },
  {
    slug: "digital-2030-highlights",
    title: "2030 strategy — highlights",
    category: "Report",
    description:
      "National strategy highlights relevant to foreign technology investors and digital FDI.",
    href: "/why/strategy",
    date: "2026",
  },
  {
    slug: "national-invest-guide",
    title: "National Investment Guide (invest.gov.uz)",
    category: "Guide",
    description:
      "Economy-wide investment guide published by the national Investment Promotion Agency — for context beyond the digital sector.",
    href: "https://invest.gov.uz/uploads/investment-guide/invest-guide.pdf",
    external: true,
    date: "2025",
  },
];
