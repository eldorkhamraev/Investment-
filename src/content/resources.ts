export type Resource = {
  slug: string;
  title: string;
  category: "Guide" | "Presentation" | "Report" | "One-pager" | "Legal";
  description: string;
  href: string;
  external?: boolean;
  date: string;
};

export const RESOURCES: Resource[] = [
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
    title: "Digital Uzbekistan 2030 — highlights",
    category: "Report",
    description:
      "National strategy highlights relevant to foreign technology investors and digital FDI.",
    href: "/why/digital-2030",
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
