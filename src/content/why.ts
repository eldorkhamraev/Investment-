export type WhyStat = {
  value: string;
  label: string;
  /** 0–100 for ring gauge; omit for plain value. */
  progress?: number;
};

export type WhyCompare = {
  title: string;
  caption?: string;
  before: { label: string; value: string };
  after: { label: string; value: string };
};

export type WhyChart = {
  title: string;
  caption?: string;
  unit?: string;
  items: { label: string; value: number }[];
};

export type WhyShare = {
  title: string;
  caption?: string;
  items: {
    label: string;
    value: number;
    color?: "azure" | "navy" | "gold" | "steel" | "mist";
  }[];
};

export type WhyStacked = {
  title: string;
  caption?: string;
  series: { key: string; label: string; tone: "azure" | "gold" }[];
  items: { label: string; values: Record<string, number>; total: number }[];
};

export type WhyGrouped = {
  title: string;
  caption?: string;
  series: { key: string; label: string; tone: "navy" | "azure" }[];
  items: { label: string; values: Record<string, number> }[];
};

export type WhyLine = {
  title: string;
  caption?: string;
  series: {
    key: string;
    label: string;
    tone: "azure" | "navy";
    points: number[];
  }[];
  labels: string[];
  yMin: number;
  yMax: number;
};

export type WhyRank = {
  title: string;
  caption?: string;
  items: { rank: number; country: string }[];
};

export type WhyGoal = { number: string; text: string };

export type WhyUniversity = {
  name: string;
  logo?: string;
  /** Logos designed on black sit on an ink tile. */
  tone?: "light" | "dark";
};

export type WhyMosaicImage = {
  src: string;
  caption: string;
  /** Optional body under the caption (e.g. travel note on a city tile). */
  detail?: string;
};

export type WhyPathway = {
  title: string;
  detail: string;
  href?: string;
};

/** Ordered page sections for zigzag storytelling. */
export type WhyBlock =
  | {
      type: "proof";
      items: WhyStat[];
    }
  | {
      type: "story";
      number: string;
      heading: string;
      prose: string[];
      evidence:
        | { kind: "line"; line: WhyLine }
        | { kind: "compares"; items: WhyCompare[] }
        | { kind: "share"; share: WhyShare }
        | { kind: "grouped"; grouped: WhyGrouped };
    }
  | {
      type: "bridge";
      heading: string;
      paragraphs: string[];
      href: string;
      linkLabel: string;
    }
  | {
      type: "split";
      reverse?: boolean;
      heading?: string;
      prose: string[];
      compare: WhyCompare;
    }
  | {
      type: "split-line";
      reverse?: boolean;
      heading?: string;
      prose: string[];
      line: WhyLine;
    }
  | {
      type: "split-stacked";
      reverse?: boolean;
      heading?: string;
      prose: string[];
      stacked: WhyStacked;
    }
  | {
      type: "split-share";
      reverse?: boolean;
      heading?: string;
      prose: string[];
      share: WhyShare;
    }
  | {
      type: "split-rank";
      reverse?: boolean;
      heading?: string;
      prose: string[];
      rank: WhyRank;
      image?: string;
    }
  | {
      type: "split-media";
      reverse?: boolean;
      heading?: string;
      prose: string[];
      image: string;
      imageAlt?: string;
      /** Shorter image height for text-heavy rows (e.g. culture cities). */
      imageAspect?: "standard" | "wide";
      /** `feature` = hub-style bordered card. Default is side-by-side split. */
      layout?: "split" | "feature";
    }
  | {
      type: "proof-mosaic";
      images: WhyMosaicImage[];
      stats: WhyStat[];
      paragraphs: string[];
    }
  | {
      type: "prose";
      paragraphs: string[];
      heading?: string;
      aside?: { value: string; label: string };
    }
  | { type: "stats"; title?: string; items: WhyStat[] }
  | { type: "charts-grid"; charts: WhyChart[]; shares: WhyShare[] }
  | { type: "grouped"; heading?: string; caption?: string; grouped: WhyGrouped }
  | { type: "rings"; title?: string; caption?: string; items: WhyStat[] }
  | { type: "universities"; title: string; items: WhyUniversity[] }
  | {
      type: "media-strip";
      title: string;
      caption?: string;
      items: WhyMosaicImage[];
    }
  | {
      type: "pathways";
      title: string;
      intro?: string;
      items: WhyPathway[];
      /** Slim footer links without the large mist/paper card. */
      compact?: boolean;
    }
  | {
      type: "goals-split";
      reverse?: boolean;
      goals: WhyGoal[];
      tone: "ink" | "azure";
      prose: string[];
    }
  | { type: "points"; items: { title: string; desc: string }[] };

export type WhyPage = {
  slug: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  image: string;
  /** Hub chapter tile image. */
  cardImage: string;
  /** Investor-job title on the hub overview. */
  hubLabel: string;
  /** Hub body paragraphs under the job title. */
  hubBody: string[];
  blocks: WhyBlock[];
};

/** Old slugs → current page (for redirects). */
export const WHY_SLUG_REDIRECTS: Record<string, string> = {
  incentives: "innovation",
  ecosystem: "innovation",
  "digital-2030": "strategy",
};

export const WHY_HUB_STATS: WhyStat[] = [
  { value: "7.7%", label: "GDP growth (2025)" },
  { value: "$43B", label: "Foreign investment attracted (2025)" },
  { value: "$81.2B", label: "Foreign trade turnover (2025)" },
  { value: "~$145B", label: "GDP (2025)" },
  { value: "BB", label: "Fitch sovereign credit rating" },
  { value: "4.8%", label: "Unemployment rate (2025)" },
  { value: "88", label: "Cities with direct flights to Tashkent" },
  { value: "55", label: "Double taxation agreements" },
  { value: "100%", label: "Foreign ownership allowed" },
  { value: "Top 1", label: "Political stability in Central Asia" },
  { value: "Top 10", label: "GovTech Maturity Index globally" },
];

export const WHY_PAGES: WhyPage[] = [
  {
    slug: "economy",
    title: "Stable and growing economy",
    eyebrow: "Economy",
    subtitle:
      "GDP grew 7.7% in 2025, foreign investment reached $43 billion, and trade turnover hit $81.2 billion.",
    image: "/why/economy/tashkent-business.jpg",
    cardImage: "/why/economy/tashkent-city.webp",
    hubLabel: "Stable and growing economy",
    hubBody: [
      "GDP grew 7.7% in 2025, with nominal output around $145 billion. Foreign investment attracted reached $43 billion, and foreign trade turnover hit $81.2 billion.",
      "Inflation eased to 7.3% by year-end and unemployment fell to 4.8%, the lowest on record per the IMF. A young domestic market continues to expand private consumption and investment.",
    ],
    blocks: [
      {
        type: "split-line",
        line: {
          title: "GDP growth",
          caption: "Uzbekistan vs Middle East and Central Asia, %",
          labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
          yMin: -4,
          yMax: 8,
          series: [
            {
              key: "uz",
              label: "Uzbekistan",
              tone: "azure",
              points: [5.7, 1.9, 7.4, 5.7, 6.0, 6.7, 7.7],
            },
            {
              key: "meca",
              label: "Middle East and Central Asia",
              tone: "navy",
              points: [1.6, -2.8, 4.5, 5.2, 2.0, 2.4, 3.2],
            },
          ],
        },
        prose: [
          "GDP grew by 7.7% in 2025, up from 6.7% in 2024, with nominal output around USD 145 billion, placing Uzbekistan among the world's 60 largest economies. Rapid urbanization, a young demographic, and expanding domestic demand are shaping one of the region's most dynamic consumer markets.",
        ],
      },
      {
        type: "split",
        reverse: true,
        prose: [
          "Macroeconomic policy remains focused on stability and predictability. The unemployment rate fell to 4.8% in 2025 per the IMF, the lowest on record, driven by rising formal employment (up 17% year-on-year) and private sector expansion. Population reached 38.2 million as of January 2026, with a median age of 27.",
        ],
        compare: {
          title: "Unemployment Rate, %",
          caption: "Rising employment up 17%",
          before: { label: "2017", value: "5.83" },
          after: { label: "2025", value: "4.8" },
        },
      },
      {
        type: "split",
        prose: [
          "The structure of the economy continues to diversify. Services account for 48.6% of GDP, industry 26.8%, construction 7.3%, and agriculture 17.3%. Private consumption rose 9.2% in real terms in 2025, while total investment grew by 10.5%, with investment as a share of GDP reaching 31.9%.",
        ],
        compare: {
          title: "Inflation Rate, %",
          caption: "Decreased by about 2 times since 2017",
          before: { label: "2017", value: "14.4" },
          after: { label: "2025", value: "7.3" },
        },
      },
      {
        type: "split-stacked",
        reverse: true,
        prose: [
          "Foreign direct investment is a key source of growth. Total attracted foreign investment reached USD 43.1 billion in 2025, a 24% increase year-on-year, and 18,164 enterprises with foreign capital operated across the country as of January 2026, nearly double the number five years ago.",
        ],
        stacked: {
          title:
            "Foreign trade turnover (FTT), January–December 2025 (USD 81.2 billion)",
          series: [
            { key: "imports", label: "Imports", tone: "gold" },
            { key: "exports", label: "Exports", tone: "azure" },
          ],
          items: [
            {
              label: "2019",
              values: { imports: 24.3, exports: 17.5 },
              total: 41.8,
            },
            {
              label: "2020",
              values: { imports: 21.2, exports: 15.1 },
              total: 36.3,
            },
            {
              label: "2021",
              values: { imports: 25.5, exports: 16.7 },
              total: 42.2,
            },
            {
              label: "2022",
              values: { imports: 30.8, exports: 19.7 },
              total: 50.5,
            },
            {
              label: "2023",
              values: { imports: 38.1, exports: 24.4 },
              total: 62.5,
            },
            {
              label: "2024",
              values: { imports: 38.9, exports: 26.9 },
              total: 65.8,
            },
            {
              label: "2025",
              values: { imports: 47.4, exports: 33.8 },
              total: 81.2,
            },
          ],
        },
      },
      {
        type: "stats",
        title: "Key Economic Indicators 2025",
        items: [
          { value: "~$145B", label: "GDP" },
          { value: "7.7%", label: "GDP Growth", progress: 7.7 },
          { value: "7.3%", label: "Inflation", progress: 7.3 },
          { value: "4.8%", label: "Unemployment rate", progress: 4.8 },
          { value: ">$81B", label: "Foreign Trade Turnover" },
          { value: ">$43B", label: "FDI" },
        ],
      },
      {
        type: "grouped",
        grouped: {
          title: "FDI inflows in 2017 – 2025, mln USD",
          caption: "Projects and FDI volume",
          series: [
            { key: "projects", label: "Projects", tone: "navy" },
            { key: "fdi", label: "FDI", tone: "azure" },
          ],
          items: [
            { label: "2017", values: { projects: 111, fdi: 3349 } },
            { label: "2018", values: { projects: 300, fdi: 2848 } },
            { label: "2019", values: { projects: 345, fdi: 4200 } },
            { label: "2020", values: { projects: 635, fdi: 6685 } },
            { label: "2021", values: { projects: 812, fdi: 8612 } },
            { label: "2022", values: { projects: 981, fdi: 9989 } },
            { label: "2023", values: { projects: 1402, fdi: 22372 } },
            { label: "2024", values: { projects: 2680, fdi: 34653 } },
            { label: "2025", values: { projects: 4900, fdi: 43000 } },
          ],
        },
      },
    ],
  },
  {
    slug: "talent",
    title: "A young country built for STEM.",
    eyebrow: "Talent",
    subtitle:
      "Forty percent of the population is under 19. Education takes 6% of GDP, and developers on GitHub grew tenfold in five years.",
    image: "/why/talent/education.jpg",
    cardImage: "/why/talent/students.jpeg",
    hubLabel: "Talent pipeline",
    hubBody: [
      "Forty percent of the population is under 19, and education receives about 6% of GDP. Nearly 6.5 million students attend high school, with further study across 209 higher education institutions.",
      "International campuses feed STEM hiring pipelines. Developers on GitHub grew from about 25,000 in 2020 to 275,000 in 2025, supporting delivery centres, product teams, and R&D.",
    ],
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "Since Khiva-born Al-Khawarizmi gave the world algebra, Uzbeks have punched above their weight in science and mathematics. Education and intellectual inquiry sit at the center of the culture.",
          "With 40% of the population under 19, and 30% younger than 14, Uzbekistan is a young country with the energy investors need for delivery centres, product teams, and R&D.",
        ],
        aside: {
          value: "40%",
          label:
            "of the population is under 19; a young market for delivery teams and R&D.",
        },
      },
      {
        type: "proof-mosaic",
        images: [
          {
            src: "/why/talent/coding.jpeg",
            caption: "Coding and digital skills programmes",
          },
          {
            src: "/why/talent/engineering.jpg",
            caption: "Engineering and applied STEM training",
          },
          {
            src: "/why/talent/students.jpeg",
            caption: "University and campus talent pipelines",
          },
          {
            src: "/why/talent/together.jpg",
            caption: "Collaborative delivery teams",
          },
          {
            src: "/why/talent/ai-leaders.jpg",
            caption: "National AI and digital literacy push",
          },
        ],
        stats: [
          { value: "40%", label: "Population under 19" },
          { value: "6.5M", label: "High school students" },
          { value: "6%", label: "GDP allocated to education" },
        ],
        paragraphs: [
          "Nearly 6.5 million students attend high schools with a growing STEM focus, and about a million train further at one of 209 higher education institutions.",
          "National programmes such as Million Programmers and large-scale AI literacy sit alongside corporate academies, building the skills base for a digital economy.",
        ],
      },
      {
        type: "split-line",
        reverse: true,
        line: {
          title: "Developers on GitHub",
          caption: "Uzbekistan accounts, thousands (GitHub Innovation Graph)",
          labels: ["2020", "2025"],
          yMin: 0,
          yMax: 300,
          series: [
            {
              key: "devs",
              label: "Developers (thousands)",
              tone: "azure",
              points: [25, 275],
            },
          ],
        },
        prose: [
          "Uzbek developers on GitHub grew more than tenfold, from about 25,000 in 2020 to 275,000 in 2025, according to GitHub Innovation Graph figures cited publicly by industry leaders. That growth tracks the push into IT exports and AI readiness.",
          "Teams are bilingual in practice: strong Russian across engineering cohorts, with English proficiency rising in delivery centres and product organisations.",
        ],
      },
      {
        type: "rings",
        title: "Education coverage",
        caption: "Enrollment rates and public spend on education.",
        items: [
          { value: "76%", label: "Pre-school", progress: 76 },
          { value: "100%", label: "School", progress: 100 },
          { value: "41%", label: "Higher", progress: 41 },
          {
            value: "6%",
            label: "GDP allocated to education",
            progress: 6,
          },
        ],
      },
      {
        type: "universities",
        title: "International campuses in Uzbekistan",
        items: [
          { name: "Amity University", logo: "/why/talent/amity.png" },
          { name: "Bucheon University", logo: "/why/talent/bucheon.png" },
          { name: "Inha University", logo: "/why/talent/inha.png" },
          { name: "Turin Polytechnic", logo: "/why/talent/turin.png" },
          {
            name: "Westminster International",
            logo: "/why/talent/westminster.png",
          },
          { name: "Webster University", logo: "/why/talent/webster.png" },
          { name: "MDIS", logo: "/why/talent/mdis.png" },
          {
            name: "American University of Technology",
            logo: "/why/talent/aut.png",
          },
        ],
      },
      {
        type: "points",
        items: [
          {
            title: "275K+ developers on GitHub",
            desc: "Tenfold growth since 2020, tracking the push into IT exports and AI readiness.",
          },
          {
            title: "Bilingual delivery talent",
            desc: "Strong Russian and growing English proficiency across engineering teams.",
          },
          {
            title: "National skills programmes",
            desc: "Million Programmers, AI literacy at scale, and corporate academies feeding IT Park hiring.",
          },
        ],
      },
    ],
  },
  {
    slug: "innovation",
    title: "Innovation and Digital",
    eyebrow: "Innovation and Digital",
    subtitle:
      "IT Park growth, fintech scale-ups, and export momentum, plus Zero Risk tax treatment and the IT-Visa for teams that want to land fast.",
    image: "/why/innovation/it-park.jpg",
    cardImage: "/why/innovation/itpark-campus.png",
    hubLabel: "Innovation and digital ecosystem",
    hubBody: [
      "IT Park membership passed 2,990 companies, with national IT service exports above $1 billion in 2025 and reach across more than 90 countries.",
      "Zero Risk offers 0% corporate tax, 0% VAT, and a 7.5% flat personal income tax for qualifying residents. The IT-Visa covers founders, investors, and specialists for up to three years.",
    ],
    blocks: [
      {
        type: "split-media",
        prose: [
          "With smartphone penetration set to reach 77% by 2025 and over 27 million internet users, Uzbekistan is a digitally literate society, with its young population building the leading tech businesses of tomorrow.",
          "Central to that story is IT Park in Tashkent: from 411 resident businesses in 2020 to more than 2,990 by 2025. Attracted by skilled talent and Zero Risk tax treatment, residents exported hundreds of millions in IT services earlier in the decade, with national IT service exports crossing $1 billion in 2025 and reaching more than 90 countries.",
          "Fintech runs in parallel with software and outsourcing. Uzum, valued above $1 billion, became the first Uzbek unicorn. With more than a thousand startups active in the country, it will not be the last.",
        ],
        image: "/why/innovation/itpark-campus.png",
        imageAlt: "Young professionals at IT Park Uzbekistan in Tashkent",
      },
      {
        type: "charts-grid",
        charts: [
          {
            title: "IT Park companies",
            items: [
              { label: "2020", value: 411 },
              { label: "2021", value: 523 },
              { label: "2022", value: 1122 },
              { label: "2023", value: 1652 },
              { label: "2025", value: 2990 },
            ],
          },
          {
            title: "Foreign IT companies",
            caption: "2025 figure as of mid-year (IT Park)",
            items: [
              { label: "2020", value: 14 },
              { label: "2021", value: 23 },
              { label: "2022", value: 156 },
              { label: "2023", value: 426 },
              { label: "2025", value: 776 },
            ],
          },
          {
            title: "Export-oriented residents",
            caption: "2024 figure as of Q3 (IT Park)",
            items: [
              { label: "2020", value: 59 },
              { label: "2021", value: 104 },
              { label: "2022", value: 353 },
              { label: "2023", value: 551 },
              { label: "2024", value: 936 },
            ],
          },
          {
            title: "IT export volume",
            unit: "USD millions",
            items: [
              { label: "2020", value: 16.3 },
              { label: "2021", value: 46.6 },
              { label: "2022", value: 140.9 },
              { label: "2023", value: 344 },
              { label: "2025", value: 1000 },
            ],
          },
        ],
        shares: [
          {
            title: "Types of IT companies",
            items: [
              { label: "IT services", value: 54, color: "navy" },
              { label: "Products", value: 24, color: "steel" },
              { label: "IT educational", value: 22, color: "gold" },
            ],
          },
          {
            title: "Exports by region",
            items: [
              { label: "North America", value: 44, color: "navy" },
              { label: "EU + UK", value: 24, color: "gold" },
              { label: "CIS", value: 20, color: "steel" },
              { label: "APAC", value: 8, color: "azure" },
              { label: "MENA", value: 4, color: "mist" },
            ],
          },
        ],
      },
      {
        type: "media-strip",
        title: "Operators already building here",
        caption:
          "Fintech, telecom, and digital platforms that signal a working commercial stack.",
        items: [
          {
            src: "/why/innovation/uzum.jpg",
            caption: "Uzum — first Uzbek unicorn",
          },
          {
            src: "/why/innovation/tbc-bank.webp",
            caption: "TBC Bank — digital banking",
          },
          {
            src: "/why/innovation/ucell.webp",
            caption: "Ucell — connectivity at scale",
          },
          {
            src: "/why/innovation/fintech.jpg",
            caption: "Fintech and payments growth",
          },
        ],
      },
      {
        type: "stats",
        title: "Incentives for technology residents",
        items: [
          { value: "0%", label: "Corporate tax (Zero Risk)" },
          { value: "0%", label: "VAT (Zero Risk)" },
          { value: "7.5%", label: "Flat personal income tax" },
          { value: "3 yrs", label: "IT-Visa (up to)" },
        ],
      },
      {
        type: "points",
        items: [
          {
            title: "IT Park Zero Risk",
            desc: "0% corporate tax, 0% VAT, and 7.5% flat personal income tax for qualifying technology residents.",
          },
          {
            title: "IT-Visa",
            desc: "Residence pathway for founders, investors, and specialists for up to three years.",
          },
          {
            title: "Soft-landing support",
            desc: "Registration, banking introductions, and first hires guided so market entry is not a cold start.",
          },
        ],
      },
    ],
  },
  {
    slug: "culture",
    title: "A place teams want to stay.",
    eyebrow: "Culture",
    subtitle:
      "UNESCO cities within reach of Tashkent, and hospitality that helps specialists settle and host partners.",
    image: "/why/culture/samarkand.jpg",
    cardImage: "/why/culture/bukhara.jpg",
    hubLabel: "Culture and hospitality",
    hubBody: [
      "Samarkand, Bukhara, and Khiva are UNESCO World Heritage sites on the Silk Road, within practical reach of teams based in Tashkent.",
      "Craft traditions in silk, ceramics, and design remain living industries. Hospitality is part of how international specialists settle and build local partnerships.",
    ],
    blocks: [
      {
        type: "split-media",
        heading: "Culture as operating context",
        layout: "feature",
        prose: [
          "Culture is part of the operating environment. For relocating specialists and visiting deal teams, food, hospitality, and a deep sense of place shape how quickly people settle and how easily they host partners.",
          "Three UNESCO World Heritage cities sit on the Silk Road within practical reach of Tashkent. Craft traditions in silk, ceramics, and design remain living industries.",
        ],
        image: "/why/culture/bukhara-2.jpg",
        imageAlt: "Historic architecture and courtyards in Bukhara",
      },
      {
        type: "media-strip",
        title: "Weekend geography from Tashkent",
        caption:
          "UNESCO cities for client hosting and team weekends. Confirm live rail and flight schedules when you book.",
        items: [
          {
            src: "/why/culture/samarkand-2.jpg",
            caption: "Samarkand",
            detail:
              "UNESCO World Heritage city. Afrosiyob high-speed rail from Tashkent in about 2 to 2.5 hours; strong for a day trip or overnight with guests.",
          },
          {
            src: "/why/culture/bukhara.jpg",
            caption: "Bukhara",
            detail:
              "UNESCO Historic Centre and Creative City of Crafts. Afrosiyob about four hours from Tashkent; about 1.5 hours from Samarkand.",
          },
          {
            src: "/why/culture/khiva-2.jpg",
            caption: "Khiva",
            detail:
              "Itchan Kala walled city. Fly Tashkent to Urgench in about 1.5 to 2 hours, then a short transfer; overnight train about 14 to 15 hours.",
          },
        ],
      },
      {
        type: "split-media",
        heading: "Hospitality at the table",
        imageAspect: "wide",
        prose: [
          "Plov, Uzbekistan's national dish, is on UNESCO's Intangible Cultural Heritage list. Shared tables, non bread, and tea are how teams host partners and settle into local life.",
          "Tashkent bazaars and plov centres make that hospitality easy to show on the same day as meetings.",
        ],
        image: "/why/culture/food.jpg",
        imageAlt: "Uzbek table culture and hospitality",
      },
      {
        type: "split-media",
        reverse: true,
        heading: "Craft as a living industry",
        imageAspect: "wide",
        prose: [
          "Bukhara is a UNESCO Creative City of Crafts and Folk Art. Workshops still produce gold embroidery, ceramics, jewellery, and woodwork.",
          "Silk and carpet studios in cities such as Khiva keep traditional techniques in production, next to textiles, fashion, and creative collaboration.",
        ],
        image: "/why/culture/craft.jpg",
        imageAlt: "Craft workshops and traditional making",
      },
      {
        type: "pathways",
        compact: true,
        title: "Related chapters",
        items: [
          {
            title: "Living in Uzbekistan",
            href: "/why/living",
            detail: "Visas, safety, and daily life in Tashkent.",
          },
          {
            title: "Regions",
            href: "/regions",
            detail: "Geography and briefs beyond the Silk Road circuit.",
          },
        ],
      },
    ],
  },
  {
    slug: "living",
    title: "Living in Uzbekistan",
    eyebrow: "Living in Uzbekistan",
    subtitle:
      "A Central Asian hub of 448,900 km² with Tashkent at the centre, practical visa routes, and a top Safety Perceptions Index ranking.",
    image: "/why/living/modern-tashkent.webp",
    cardImage: "/why/living/magic-city.jpeg",
    hubLabel: "Living and relocation",
    hubBody: [
      "Citizens of about 90 countries can enter visa-free. Longer stays use the Investment Visa or the IT-Visa for founders, investors, and specialists.",
      "Uzbekistan ranked first among 121 countries in the Safety Perceptions Index 2023. Tashkent is a practical base for posting international teams, with soft-landing support for residence and first hires.",
    ],
    blocks: [
      {
        type: "split-media",
        prose: [
          "Uzbekistan sits at the centre of Central Asia. Tashkent is the capital and largest city, the country's economic and cultural hub, covering a national territory of 448,900 km².",
          "Mild climate and more than 300 sunny days support outdoor life and travel. UTC+5 keeps working hours aligned with Europe mornings and Asia afternoons. The international dialing code is +998.",
          "For technology teams, the living question is practical: can specialists relocate, feel safe, and run a normal city life while building a delivery centre or regional HQ?",
        ],
        image: "/why/living/building.jpg",
        imageAlt: "Contemporary residential and business districts in Tashkent",
      },
      {
        type: "media-strip",
        title: "Daily life in Tashkent",
        caption:
          "Transit, parks, schools, and neighbourhood markets that matter to relocating teams.",
        items: [
          {
            src: "/why/living/metro.jpg",
            caption: "Metro and city transit",
          },
          {
            src: "/why/living/magic-city.jpeg",
            caption: "Magic City and public parks",
          },
          {
            src: "/why/living/schools.jpeg",
            caption: "Schools and family infrastructure",
          },
          {
            src: "/why/living/bazaar.avif",
            caption: "Neighbourhood markets and food culture",
          },
        ],
      },
      {
        type: "pathways",
        title: "Entry and residence pathways",
        intro:
          "Scannable routes for visiting teams, investors, and technology specialists. Confirm current thresholds with counsel; the Investment Visa amount tracks the Base Calculation Amount (BCA).",
        items: [
          {
            title: "Visa-free entry",
            detail:
              "Citizens of about 90 countries can enter without a visa, with stays from 10 days up to one year depending on nationality. Separate facilitations apply for certain UAE residents and travellers aged 55+.",
          },
          {
            title: "Investment Visa",
            detail:
              "Foreign nationals investing at least 8,500× the Base Calculation Amount (about USD 290,000 as of late 2025 guidance) can receive a three-year, multiple-entry Investment Visa, renewable without leaving the country. Spouse, parents, and children may receive matching guest visas.",
          },
          {
            title: "IT-Visa",
            detail:
              "Technology founders, investors, and specialists can use the IT-Visa for residence of up to three years, paired with IT Park soft-landing support for registration, banking, and first hires.",
          },
        ],
      },
      {
        type: "split-rank",
        reverse: true,
        prose: [
          "A stable and secure environment supports long-term posting for international teams. Soft-landing support from the office covers residence questions, banking introductions, and getting your first team on the ground.",
          "In the Safety Perceptions Index 2023 (Lloyd's Register Foundation / Institute for Economics & Peace), Uzbekistan ranked first among 121 countries for overall safety perceptions, driven by low reported experience of harm.",
        ],
        image: "/why/living/modern-tashkent.webp",
        rank: {
          title: "Safety Perceptions Index 2023",
          caption:
            "Least risk-impacted countries — Lloyd's Register Foundation / IEP",
          items: [
            { rank: 1, country: "Uzbekistan" },
            { rank: 2, country: "UAE" },
            { rank: 3, country: "KSA" },
            { rank: 4, country: "Norway" },
            { rank: 5, country: "Estonia" },
            { rank: 6, country: "Singapore" },
            { rank: 7, country: "Iceland" },
            { rank: 8, country: "Sweden" },
            { rank: 9, country: "China" },
            { rank: 10, country: "Denmark" },
          ],
        },
      },
      {
        type: "points",
        items: [
          {
            title: "Practical relocation",
            desc: "Visa-free entry for many nationalities, Investment Visa, and IT-Visa options for technology teams.",
          },
          {
            title: "Competitive cost base",
            desc: "Operating and living costs that support delivery-centre economics in Tashkent.",
          },
          {
            title: "Central location",
            desc: "Flight links toward Europe, the Gulf, China, and South Asia from a UTC+5 base.",
          },
        ],
      },
    ],
  },
  {
    slug: "strategy",
    title: "2030 Strategy Highlights",
    eyebrow: "2030 Strategy Highlights",
    subtitle:
      "Upper-middle-income targets, FDI at scale, green transition, and a national digital push to $5 billion in IT exports.",
    image: "/why/strategy/together.webp",
    cardImage: "/why/economy/data-centers.jpg",
    hubLabel: "2030 national strategy",
    hubBody: [
      "Uzbekistan–2030 targets upper-middle-income status, $250 billion in investment, and full high-speed internet coverage across the regions.",
      "The digital pillar aims for $5 billion in IT exports, 300,000 technology jobs, and 1,000 foreign IT companies. Preferential FEZ and FDI tax regimes are already in force.",
    ],
    blocks: [
      {
        type: "goals-split",
        tone: "ink",
        goals: [
          {
            number: "01",
            text: "Bringing GDP to $160 billion and per capita income to $4 thousand",
          },
          {
            number: "02",
            text: "Ensuring an annual inflation rate of 5–6 percent",
          },
          {
            number: "03",
            text: "Achieving 100% coverage of high-speed internet in the regions",
          },
        ],
        prose: [
          "Uzbekistan's 2030 strategy aims for upper-middle-income status by the end of the decade through liberalisation, foreign investment, expanded technological capacity, and lighter regulatory burdens on business.",
          "Preferential regimes already show results. Free Economic Zone residents can receive tax exemptions of up to 10 years, and FDI enterprises can enjoy exemptions on property, water, and land taxes for up to seven years.",
        ],
      },
      {
        type: "goals-split",
        reverse: true,
        tone: "azure",
        goals: [
          {
            number: "04",
            text: "Attracting $250 billion of investment into the country",
          },
          {
            number: "05",
            text: "Turning into a green economy and achieving carbon neutrality",
          },
          {
            number: "06",
            text: "Radically reducing the poverty rate (by more than 2 times)",
          },
        ],
        prose: [
          "Export development is accelerating as deregulation takes effect: more than 130 permits and licences abolished, and customs duties removed on exported goods and services. Privatisation has transferred more than $1 billion in state assets, and the Public-Private Partnership law has unlocked about $17 billion in projects.",
          "Visa-free access expanded from nine countries to about 90, and investor protections were strengthened alongside the Tashkent International Arbitration Centre.",
        ],
      },
      {
        type: "split-media",
        prose: [
          "For the Ministry of Digital Technologies and this office, the digital pillar of Uzbekistan–2030 is the operating mandate.",
          "National targets include raising IT service and software exports to $5 billion, creating 300,000 technology jobs, attracting 1,000 foreign IT companies, and placing Uzbekistan among the top 30 in the UN E-Government Development Index. Telecom coverage in populated areas has already risen from 41% to about 98%, with international bandwidth expanded sharply.",
        ],
        image: "/why/economy/data-centers.jpg",
        imageAlt: "Data centre and digital infrastructure investment",
      },
      {
        type: "stats",
        title: "Digital targets on the 2030 agenda",
        items: [
          { value: "$5B", label: "IT exports target" },
          { value: "300K", label: "IT jobs target" },
          { value: "1,000", label: "Foreign IT companies target" },
          { value: "Top 30", label: "UN e-Government Index aim" },
        ],
      },
      {
        type: "points",
        items: [
          {
            title: "Open for FDI",
            desc: "FEZ and FDI tax holidays plus a growing PPP pipeline for infrastructure and services.",
          },
          {
            title: "Digital priority",
            desc: "National push for connectivity, IT exports, and technology FDI through 2030.",
          },
          {
            title: "Office as counterpart",
            desc: "We convert strategy into investor outcomes, from first meeting to fully operational.",
          },
        ],
      },
    ],
  },
];

export function getWhyPage(slug: string) {
  return WHY_PAGES.find((p) => p.slug === slug) ?? null;
}
