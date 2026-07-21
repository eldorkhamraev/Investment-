export type Program = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  benefits: string[];
  who: string[];
  steps: string[];
  ctaInterest: string;
};

export const PROGRAMS: Program[] = [
  {
    slug: "it-park-zero-risk",
    name: "IT Park Zero Risk",
    tagline: "Preferential tax treatment for technology residents.",
    summary:
      "Residents of IT Park can operate under a regime designed to de-risk export-oriented technology businesses — no corporate income tax, VAT or social tax, with a flat 7.5% personal income tax.",
    benefits: [
      "0% corporate income tax for qualifying residents",
      "0% VAT and social tax under the programme rules",
      "Flat 7.5% personal income tax",
      "Fast path to operational status with office support",
    ],
    who: [
      "Software development and IT service exporters",
      "Product companies establishing a delivery or R&D presence",
      "Startups joining the IT Park resident community",
    ],
    steps: [
      "Discovery call with the Investment Project Office",
      "Confirm eligibility and optimal legal structure",
      "Company registration and IT Park residency process",
      "Operational soft-landing and aftercare",
    ],
    ctaInterest: "IT Park / Zero Risk",
  },
  {
    slug: "it-visa",
    name: "IT-Visa",
    tagline: "Residence for founders, investors and specialists.",
    summary:
      "A streamlined residence pathway for IT founders, investors and specialists — valid for up to three years — so key people can live and work in Uzbekistan while you build.",
    benefits: [
      "Residence validity up to three years",
      "Aligned with company setup and IT Park pathways",
      "Support for founding and specialist teams",
      "Sequenced with tax and banking setup",
    ],
    who: [
      "Founders relocating or splitting time on the ground",
      "Foreign investors taking an active operating role",
      "Specialist engineers and product leads",
    ],
    steps: [
      "Confirm role and eligibility",
      "Align visa timing with incorporation",
      "Submit with guided documentation",
      "Arrive and complete local onboarding",
    ],
    ctaInterest: "IT-Visa",
  },
  {
    slug: "soft-landing",
    name: "Soft-Landing",
    tagline: "Hands-on help to get operational quickly.",
    summary:
      "Practical support to get your team on the ground — registration, banking introductions, office and hiring orientation — so market entry does not stall on logistics.",
    benefits: [
      "Guided incorporation and licensing checklist",
      "Introductions to vetted local service providers",
      "Orientation for first hires and workplace setup",
      "A single office relationship through the first months",
    ],
    who: [
      "Companies past exploratory interest and ready to execute",
      "Teams opening a delivery centre or regional hub",
      "Founders making a first soft-landing visit",
    ],
    steps: [
      "Scope your 90-day landing plan",
      "Complete registration and incentive pathways",
      "On-ground clinic and introductions",
      "Aftercare as you hire and scale",
    ],
    ctaInterest: "Soft-landing support",
  },
  {
    slug: "digital-startups",
    name: "Digital Startups",
    tagline: "Pathways for scalable digital startups.",
    summary:
      "Support routes for scalable digital startups and IT Park residents — including introductions to the ecosystem, incentive navigation and connections into national programmes.",
    benefits: [
      "IT Park residency navigation",
      "Ecosystem and partner introductions",
      "Visibility into grant and programme routes",
      "Access to forums and investor briefings",
    ],
    who: [
      "Foreign startups entering Uzbekistan",
      "Local startups seeking international co-investors",
      "Founders exploring IT Park residency",
    ],
    steps: [
      "Share your stage, sector and goals",
      "Map incentives and residency options",
      "Meet ecosystem partners",
      "Execute entry with office aftercare",
    ],
    ctaInterest: "Startup / Digital Startups programme",
  },
];

export function getProgram(slug: string) {
  return PROGRAMS.find((p) => p.slug === slug) ?? null;
}
