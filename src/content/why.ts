export type WhyPage = {
  slug: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  image: string;
  body: string[];
  points: { title: string; desc: string }[];
};

export const WHY_PAGES: WhyPage[] = [
  {
    slug: "talent",
    title: "A young STEM workforce, scaling fast.",
    eyebrow: "Talent",
    subtitle:
      "Uzbekistan's digital opportunity starts with people — a young population, rising developer density and national programmes that treat skills as industrial policy.",
    image: "/sector-education.jpg",
    body: [
      "More than half the population is under 30. GitHub's Innovation Graph shows Uzbek developers growing from roughly 25,000 to 275,000 between 2020 and 2025 — a tenfold jump that tracks the country's push into IT exports and AI readiness.",
      "National initiatives — One Million Programmers, AI literacy at scale, reformed IT curricula — are deliberately expanding the specialist pipeline investors need for delivery centres, product teams and R&D.",
    ],
    points: [
      {
        title: "275K+ developers on GitHub",
        desc: "Tenfold growth since 2020, with continued climb in AI readiness rankings.",
      },
      {
        title: "Bilingual delivery talent",
        desc: "Strong Russian and growing English proficiency across engineering teams.",
      },
      {
        title: "National skills programmes",
        desc: "Million Programmers, Five Million AI Leaders, corporate academies.",
      },
    ],
  },
  {
    slug: "incentives",
    title: "Incentives built for technology companies.",
    eyebrow: "Incentives & IT Park",
    subtitle:
      "IT Park Zero Risk, the IT-Visa and soft-landing support lower the cost and friction of establishing a technology presence in Uzbekistan.",
    image: "/deal-itpark.jpg",
    body: [
      "IT Park residents can operate under a preferential tax regime — no corporate income tax, VAT or social tax, with a flat 7.5% personal income tax — designed specifically for export-oriented technology businesses.",
      "The IT-Visa streamlines residence for founders, investors and specialists for up to three years. Soft-landing support helps teams get operational quickly, from registration through first local hires.",
    ],
    points: [
      {
        title: "IT Park Zero Risk",
        desc: "Preferential tax treatment for qualifying technology residents.",
      },
      {
        title: "IT-Visa",
        desc: "Residence pathway for founders, investors and specialists up to three years.",
      },
      {
        title: "Fast incorporation",
        desc: "Guided company registration with the right structure for your sector.",
      },
    ],
  },
  {
    slug: "digital-2030",
    title: "Digital Uzbekistan 2030.",
    eyebrow: "National strategy",
    subtitle:
      "A national target of $5 billion in annual digital exports by 2030 — and a policy stack that treats FDI in technology as a strategic priority.",
    image: "/samarkand.jpg",
    body: [
      "Digital Uzbekistan 2030 sets the direction: expand IT exports, deepen digital infrastructure, grow human capital and integrate foreign technology companies into the domestic ecosystem.",
      "The Investment Project Office exists to convert that strategy into investor outcomes — structuring projects, facilitating grants and partnerships, and accompanying companies from first meeting to fully operational.",
    ],
    points: [
      {
        title: "$5B digital export target",
        desc: "Annual IT and digital services exports by 2030.",
      },
      {
        title: "Infrastructure build-out",
        desc: "Data centres, AI compute and connectivity as national priorities.",
      },
      {
        title: "Open to foreign capital",
        desc: "Landmark FDI already committed across AI and green data centres.",
      },
    ],
  },
  {
    slug: "ecosystem",
    title: "An ecosystem that is opening to the world.",
    eyebrow: "Innovation ecosystem",
    subtitle:
      "IT Park, technoparks, universities and global partnerships form the network around every market entry we support.",
    image: "/itpark.jpg",
    body: [
      "More than 2,990 companies sit inside IT Park. Forums such as ICT Week bring government, investors and operators into one room. Bilateral partnerships with Japan, China, the UAE and others feed talent, capital and know-how into the sector.",
      "We introduce investors to vetted local partners, service providers and talent channels — so market entry is not a cold start.",
    ],
    points: [
      {
        title: "IT Park network",
        desc: "Thousands of resident companies and export-oriented delivery capacity.",
      },
      {
        title: "International partnerships",
        desc: "Active cooperation with Japan, China, UAE, Korea and beyond.",
      },
      {
        title: "Events & deal flow",
        desc: "Investment forums and ministerial engagement on the calendar.",
      },
    ],
  },
  {
    slug: "living",
    title: "Living and working in Tashkent.",
    eyebrow: "Living",
    subtitle:
      "A capital city that is modernising quickly — with the connectivity, culture and cost base that make long-term posting practical for international teams.",
    image: "/tashkent-city.webp",
    body: [
      "Tashkent combines Silk Road heritage with a growing technology district culture. International schools, modern housing and improving air connectivity make it workable for relocated founders and specialists.",
      "The office can help with practical soft-landing questions — residence, banking introductions and getting your first team on the ground — so living arrangements do not become a project blocker.",
    ],
    points: [
      {
        title: "Practical relocation",
        desc: "IT-Visa and residence support for founding and specialist teams.",
      },
      {
        title: "Competitive cost base",
        desc: "Operating and living costs that support delivery-centre economics.",
      },
      {
        title: "Central location",
        desc: "Flight links toward Europe, the Gulf, China and South Asia.",
      },
    ],
  },
];

export function getWhyPage(slug: string) {
  return WHY_PAGES.find((p) => p.slug === slug) ?? null;
}
