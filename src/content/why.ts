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
  items: { label: string; value: number; color?: "azure" | "navy" | "gold" | "steel" | "mist" }[];
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

export type WhyUniversity = { name: string };

/** Ordered page sections for zigzag storytelling. */
export type WhyBlock =
  | { type: "split"; reverse?: boolean; prose: string[]; compare: WhyCompare }
  | { type: "split-line"; reverse?: boolean; prose: string[]; line: WhyLine }
  | {
      type: "split-stacked";
      reverse?: boolean;
      prose: string[];
      stacked: WhyStacked;
    }
  | {
      type: "split-rank";
      reverse?: boolean;
      prose: string[];
      rank: WhyRank;
      image?: string;
    }
  | { type: "prose"; paragraphs: string[]; heading?: string }
  | { type: "stats"; title?: string; items: WhyStat[] }
  | { type: "charts-grid"; charts: WhyChart[]; shares: WhyShare[] }
  | { type: "grouped"; grouped: WhyGrouped }
  | { type: "rings"; items: WhyStat[] }
  | { type: "universities"; title: string; items: WhyUniversity[] }
  | {
      type: "gallery";
      title: string;
      images: string[];
      paragraphs: string[];
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
  blocks: WhyBlock[];
};

/** Old slugs → current page (for redirects). */
export const WHY_SLUG_REDIRECTS: Record<string, string> = {
  incentives: "innovation",
  ecosystem: "innovation",
  "digital-2030": "strategy",
};

export const WHY_PAGES: WhyPage[] = [
  {
    slug: "economy",
    title: "Economy",
    eyebrow: "Economy",
    subtitle:
      "GDP grew 7.7% in 2025, foreign investment topped $43 billion, and a young population of 38 million is powering demand.",
    image: "/tashkent-city.webp",
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
          "GDP grew by 7.7% in 2025, up from 6.7% in 2024, with nominal output reaching approximately USD 147 billion, placing Uzbekistan among the world's 60 largest economies. Rapid urbanization, favorable demographic trends, and expanding domestic demand are shaping one of the region's most dynamic consumer markets.",
        ],
      },
      {
        type: "split",
        reverse: true,
        prose: [
          "Macroeconomic policy remains focused on stability and predictability. The labor market has seen significant improvement: the unemployment rate fell to 4.8% in 2025 per the IMF, the lowest on record, driven by rising formal employment, up 17% year-on-year, and private sector expansion. Uzbekistan's population reached 38.2 million as of January 2026 (National Statistics Committee), one of Central Asia's youngest demographics, with a median age of just 27 years.",
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
          "The structure of the economy is becoming increasingly diversified. Services now account for 48.6% of GDP, industry 26.8%, construction 7.3%, and agriculture 17.3%. Private consumption rose 9.2% in real terms in 2025, driven by higher wages and remittances, while total investment grew by 10.5%, with investment as a share of GDP reaching 31.9%.",
          "Foreign trade turnover exceeded USD 81.2 billion in 2025, with exports reaching USD 33.8 billion, up 24% year-on-year, actively developing across gold, agriculture, energy, and processing industries. Economic policy is focused on promoting export-oriented production, deepening value-added processing, and integrating the country into regional and global value chains.",
        ],
        compare: {
          title: "Inflation Rate, %",
          caption: "Decreased by 2 times",
          before: { label: "2017", value: "14.4" },
          after: { label: "2025", value: "7.3" },
        },
      },
      {
        type: "split-stacked",
        reverse: true,
        prose: [
          "Foreign direct investment is a key source of growth. Total attracted foreign investment reached USD 43.1 billion in 2025, a 24% increase year-on-year, and 18,164 enterprises with foreign capital now operate across the country as of January 2026, nearly double the number five years ago. Investor interest is concentrated in manufacturing, energy, mining, and digital infrastructure, supported by improvements in investment legislation, privatization initiatives, and expanding public-private partnerships.",
        ],
        stacked: {
          title:
            "Foreign trade turnover (FTT) (January – December 2025, 81.2 billion US Dollars)",
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
          { value: "$145 billion", label: "GDP" },
          { value: "7.7%", label: "GDP Growth", progress: 7.7 },
          { value: "7.3%", label: "Inflation", progress: 7.3 },
          { value: "4.9%", label: "Unemployment rate", progress: 4.9 },
          { value: ">$81 billion", label: "Foreign Trade Turnover" },
          { value: "38.2 million", label: "Population" },
          { value: ">$43 billion", label: "FDI" },
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
      {
        type: "points",
        items: [
          {
            title: "Diversified growth engines",
            desc: "Services, industry, construction, and agriculture each contributing, with private consumption and investment rising together.",
          },
          {
            title: "FDI at scale",
            desc: "$43.1 billion attracted in 2025 and 18,164 enterprises with foreign capital operating nationwide.",
          },
          {
            title: "Young domestic market",
            desc: "38.2 million people, median age 27, with urbanization and rising real incomes.",
          },
        ],
      },
    ],
  },
  {
    slug: "talent",
    title: "Talent",
    eyebrow: "Talent",
    subtitle:
      "Forty percent of the population is under 19. Education takes 6% of GDP, and millions of students are training for a digital economy.",
    image: "/sector-education.jpg",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "Since Khiva-born Al-Khawarizmi, 'the grandfather of computer science,' gave the world algebra, Uzbeks have made an outsized contribution to humanity's collective understanding of the world and the scientific principles underpinning it. This is a culture in which education and intellectual inquiry are highly valued.",
          "With 40% of the population under the age of 19, and 30% even younger than 14, Uzbekistan is a young country, full of the dynamism and energy of youth.",
        ],
      },
      {
        type: "stats",
        items: [
          { value: "40%", label: "Population under 19" },
          { value: "6.5m", label: "High school students" },
          { value: "6%", label: "GDP allocated to education" },
        ],
      },
      {
        type: "prose",
        paragraphs: [
          "What's more, the almost 6.5 million students currently attending Uzbekistan's high schools are benefiting from an increasingly sophisticated STEM education, and a million are receiving further training at one of the country's 209 higher educational institutions, preparing the nation's next generation for a critical role in the global economy of tomorrow.",
          "From science and math to art, literature, and music, Uzbeks inherit a legacy of great achievement, and we are determined to enrich the 21st century just as we have enriched so many other periods in history.",
        ],
      },
      {
        type: "rings",
        items: [
          { value: "76%", label: "Pre-school", progress: 76 },
          { value: "100", label: "School", progress: 100 },
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
        title: "International universities",
        items: [
          { name: "Amity University" },
          { name: "Bucheon University" },
          { name: "Inha University" },
          { name: "Turin Polytechnic University in Tashkent" },
          { name: "Westminster International University in Tashkent" },
          { name: "Webster University" },
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
            desc: "Million Programmers, AI literacy at scale, and corporate academies.",
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
      "IT Park, fintech growth, and export momentum, plus Zero Risk tax treatment and the IT-Visa for teams that want to land fast.",
    image: "/itpark.jpg",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "With smartphone penetration set to reach 77% by 2025 and over 27 million internet users, Uzbekistan is a digitally literate society, with its young population building the leading tech businesses of tomorrow.",
          "Central to the economy's growing tech leadership is the IT Park in Tashkent, a dedicated digital business ecosystem that has grown exponentially over the last four years, from 411 businesses in 2020 to 1,652 in 2023 and more than 2,990 by 2025. Attracted by a skilled workforce and a total exemption from corporate tax, businesses within the IT Park exported $344 million in IT products and services in 2023, with national IT service exports crossing $1 billion in 2025.",
          "A burgeoning IT sector runs in parallel with a constellation of fintech startups that are capitalizing on Uzbekistan's rapidly evolving digital payments and online retail markets. Leading the country's fintech charge is Uzum, an e-commerce business and, with a market value of more than $1 billion, the first Uzbek unicorn. With over a thousand startups active in Uzbekistan, Uzum will not be the last.",
        ],
      },
      {
        type: "charts-grid",
        charts: [
          {
            title: "Companies",
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
            items: [
              { label: "2020", value: 14 },
              { label: "2021", value: 23 },
              { label: "2022", value: 156 },
              { label: "2023", value: 426 },
            ],
          },
          {
            title: "Exporters",
            items: [
              { label: "2020", value: 59 },
              { label: "2021", value: 104 },
              { label: "2022", value: 353 },
              { label: "2023", value: 551 },
            ],
          },
          {
            title: "Volume (million dollars)",
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
              { label: "IT services", value: 54, color: "azure" },
              { label: "Products", value: 24, color: "mist" },
              { label: "IT educational", value: 22, color: "gold" },
            ],
          },
          {
            title: "Exports by country",
            items: [
              { label: "North America", value: 44, color: "navy" },
              { label: "EU + UK", value: 24, color: "azure" },
              { label: "CIS", value: 20, color: "gold" },
              { label: "APAC", value: 8, color: "steel" },
              { label: "MENA", value: 4, color: "mist" },
            ],
          },
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
    title: "Culture",
    eyebrow: "Culture",
    subtitle:
      "Craft traditions, hospitality, and UNESCO cities that make partnerships warmer and tourism, creative, and service investments natural.",
    image: "/samarkand.jpg",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "Uzbekistan is renowned for its artisanal crafts, including intricate silk weaving, pottery, and decorative woodwork, with techniques passed down through generations. This craftsmanship has created a foundation for sectors like textiles, fashion, and tourism, offering the opportunity to collaborate with skilled local artisans to bring authentic, high-quality products to international markets.",
        ],
      },
      {
        type: "prose",
        paragraphs: [
          'Uzbekistan\'s culinary traditions, particularly its world-famous dishes like "plov", highlight its deep-seated hospitality and social culture. The warm, welcoming nature of Uzbek people is one of the country\'s greatest assets, creating a friendly environment for foreign investors and facilitating meaningful local partnerships. This cultural warmth also supports the growth of key sectors such as hospitality, tourism, and services.',
        ],
      },
      {
        type: "gallery",
        title: "UNESCO World Heritage Sites in Uzbekistan",
        images: [
          "/samarkand.jpg",
          "/samarkand-track.jpg",
          "/tashkent-city.webp",
          "/about-building.png",
        ],
        paragraphs: [
          "Home to stunning cities like Samarkand, Bukhara, and Khiva, Uzbekistan boasts numerous UNESCO World Heritage Sites. The government is actively promoting these attractions, which provides fertile ground for tourism investments. The expanding infrastructure and commitment to preserving historical sites signals great potential for investors interested in tourism, hospitality, and cultural exchange initiatives.",
          "Investing in Uzbekistan is more than a financial opportunity; it is a chance to engage with a culture rich in tradition and forward-thinking ambition. The country's unique cultural landscape creates an inviting, inspiring environment for investors who value both economic potential and cultural depth.",
        ],
      },
      {
        type: "points",
        items: [
          {
            title: "Craft and creative industries",
            desc: "Silk, ceramics, and design traditions that feed textiles, fashion, and export-ready products.",
          },
          {
            title: "Hospitality as an advantage",
            desc: "A welcoming culture that helps foreign teams build local relationships faster.",
          },
          {
            title: "UNESCO cities",
            desc: "Samarkand, Bukhara, and Khiva as anchors for tourism and cultural investment.",
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
      "A Central Asian hub of 448,900 km² with Tashkent at the center, practical visa routes, and a strong safety record.",
    image: "/tashkent-city.webp",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "The Republic of Uzbekistan is a country located in Central Asia. Its capital is Tashkent, which is also the largest city in the country. Covering an area of 448,900 km², Uzbekistan is a country rich in history and culture, standing out as a regional hub with a unique blend of traditions and modernity. Tashkent, with its special administrative status, serves as the country's economic and cultural center.",
          "Uzbekistan's administrative structure is diverse, comprising the autonomous Republic of Karakalpakstan, several regions (known as viloyat), rural districts (tuman), urban districts, and cities with regional subordination. Smaller communities, including villages called kishlaks and auls, reflect the country's deep-rooted traditions and close-knit society.",
          "Located in the UTC +5 time zone (MSK +2), Uzbekistan is globally connected through the international dialing code +998. It is an exciting destination for those interested in its historical heritage, strategic location, and the economic opportunities it offers as a modernizing nation.",
          "Mild climate, more than 300 sunny days make Uzbekistan favorable for agriculture and tourism. Uzbekistan's stable and secure environment, coupled with its rapidly growing economy and dynamic young population, fosters a vibrant and optimistic atmosphere where bold ideas are encouraged, and every contribution is valued.",
        ],
      },
      {
        type: "prose",
        heading: "Entry regulations",
        paragraphs: [
          "Citizens of 90 countries can enter Uzbekistan without a visa, with the allowed duration of stay ranging from 10 days to one year, depending on nationality. Additionally, residents of the UAE and individuals aged 55 and older are also exempt from requiring a visa to travel to Uzbekistan.",
          "The process for obtaining an Investment Visa in Uzbekistan is detailed in Resolution No. 864 (11.10.2019). Foreign nationals who invest at least 8,500 times the base calculation amount (BCA) in Uzbekistan can receive a three-year, multiple-entry Investment Visa, which is renewable indefinitely without leaving the country. Family members (spouse, parents, children) are also eligible for guest visas with the same conditions.",
          "Investment Visas are issued and renewed by regional offices of Uzbekistan's Ministry of Internal Affairs for foreign nationals entering with business, guest, or compatriot visas. Extensions for those with an initial Investment Visa are processed by the same offices. Foreign investors wishing to apply for permanent residence must submit an application, along with an investment confirmation certificate from the Central Securities Depository (for shares) or the Public Services Agency (for stakes or foreign-invested enterprises).",
          "Technology teams can also use the IT-Visa for founders, investors, and specialists for up to three years.",
        ],
      },
      {
        type: "split-rank",
        reverse: true,
        prose: [
          "A stable and secure environment supports long-term posting for international teams. Soft-landing support from the office covers residence questions, banking introductions, and getting your first team on the ground.",
        ],
        image: "/samarkand.jpg",
        rank: {
          title: "Safety Perceptions Index",
          caption: "Capturing the impact of risk in countries around the world",
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
            desc: "Visa-free entry for many nationalities, Investment Visa, and IT-Visa options for teams.",
          },
          {
            title: "Competitive cost base",
            desc: "Operating and living costs that support delivery-centre economics in Tashkent.",
          },
          {
            title: "Central location",
            desc: "Flight links toward Europe, the Gulf, China, and South Asia.",
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
      "Upper-middle-income targets, FDI at scale, green transition, and a more open regulatory environment for foreign capital.",
    image: "/samarkand-track.jpg",
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
            text: "Ensuring an annual inflation rate of 5-6 percent",
          },
          {
            number: "03",
            text: "Achieving 100% coverage of high-speed internet in the regions",
          },
        ],
        prose: [
          "Uzbekistan's 2030 strategy aims to achieve upper middle-income nation status by the end of the decade, through a radical reform programme designed to liberalise the economy, attract foreign investment, dramatically expand the country's technological capacity and strategic infrastructure, and reduce regulatory burdens on businesses.",
          "Moreover, compelling incentives to attract foreign direct investment are already creating obvious results. International businesses operating in the country's Free Economic Zones (FEZ) benefit from tax exemptions of up to 10 years, and FDI enterprises enjoy exemptions on property, water usage, and land taxes for up to seven years.",
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
            text: "Radically reducing poverty rate (by more than 2 times)",
          },
        ],
        prose: [
          "As well as the most liberal tax regime in the region, Uzbekistan's export development is accelerating as major deregulation takes effect, with the abolition of more than 130 permits and licences, as well as all customs duties on exported goods and services. The government's privatisation programme has also marked significant milestones, with sale of more than $1 billion worth of state assets and the adoption of a landmark law on Public-Private Partnership facilitating $17 billion-worth of projects.",
          "Moreover, by increasing the number of countries with which Uzbekistan enjoys a visa-free regime from nine to 93, the country is attracting talent and investment from across the world. A critical pillar of the 2030 Strategy has been the substantial expansion of investor protections, ensuring the safeguarding of investor rights and complementing the dispute mechanisms of the Tashkent International Arbitration Centre.",
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
            title: "Office as operator",
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
