export type Story = {
  slug: string;
  company: string;
  sector: string;
  country: string;
  excerpt: string;
  image: string;
  body: string[];
  highlight?: string;
};

export const STORIES: Story[] = [
  {
    slug: "datavolt",
    company: "DataVolt",
    sector: "Digital Infrastructure",
    country: "Saudi Arabia",
    excerpt:
      "Green data centres with DFI backing — building Uzbekistan's compute capacity for the AI decade.",
    image: "/deal-datavolt.jpg",
    highlight: "Up to $5B programme by 2030",
    body: [
      "Saudi Arabia's DataVolt is developing green data centres in Uzbekistan under a foreign-investment programme targeting up to $5 billion by 2030.",
      "Its first facility, the 12 MW TAS-1 in Tashkent, is fully foreign-financed with backing from DEG, the EBRD, the OPEC Fund and Proparco — a signal that international development finance sees Uzbekistan's digital infrastructure as bankable.",
      "The Investment Project Office supports market entry and coordination with national digital priorities so infrastructure investors can move from agreement to operations with clarity.",
    ],
  },
  {
    slug: "linkwise",
    company: "Shanghai Linkwise",
    sector: "AI & Computing",
    country: "China",
    excerpt:
      "A $3.5 billion modular intelligent computing centre in Karakalpakstan — among the largest tech FDI commitments in the country's history.",
    image: "/deal-linkwise.jpg",
    highlight: "$3.5B FDI",
    body: [
      "Shanghai Linkwise is delivering a Modular Intelligent Computing Centre in the Republic of Karakalpakstan as foreign direct investment, planned for commissioning in 2027.",
      "The project anchors Uzbekistan's ambition to host regional AI compute capacity and pairs capital with a long-term technology partnership.",
      "Landmark deals like this show how the office works with foreign technology investors on structure, location and government coordination.",
    ],
  },
  {
    slug: "elf-in",
    company: "ELF-IN",
    sector: "Creative & Gaming",
    country: "Japan",
    excerpt:
      "Japan-backed animation talent training — building an export-ready creative industry.",
    image: "/sector-gaming.jpg",
    highlight: "$700K+ grant partnership",
    body: [
      "A partnership with Japan's ELF-IN, backed by a grant exceeding $700,000, is training a new generation of animation and computer-graphics professionals.",
      "The initiative sits alongside a gaming sector that grew exports 21× in three years — evidence that creative digital industries can scale as export businesses from Uzbekistan.",
      "Talent and grant partnerships are a core lane of work for the Investment Project Office alongside classic FDI.",
    ],
  },
  {
    slug: "it-park-exports",
    company: "IT Park ecosystem",
    sector: "IT Outsourcing & BPO",
    country: "Uzbekistan",
    excerpt:
      "IT service exports crossed $1 billion — proof that the delivery model works at scale.",
    image: "/deal-itpark.jpg",
    highlight: "$1B+ IT exports",
    body: [
      "IT service exports crossed $1 billion for the first time, on a national path toward $5 billion in annual digital exports by 2030.",
      "More than 2,990 IT Park companies and a preferential tax regime for residents underpin the delivery-centre economics that attract foreign buyers and co-investors.",
      "Foreign companies entering via IT Park get a tested incentive stack and an office that helps with registration, visas and local partnerships.",
    ],
  },
  {
    slug: "uae-ai-leaders",
    company: "UAE · Five Million AI Leaders",
    sector: "Digital Education",
    country: "United Arab Emirates",
    excerpt:
      "A national AI literacy programme training five million citizens by 2030 — with over one million already through basic training.",
    image: "/deal-ai-leaders.jpg",
    highlight: "5M citizens by 2030",
    body: [
      "Launched with the United Arab Emirates, Five Million AI Leaders aims to train 4.75 million students, 150,000 teachers and 100,000 civil servants in artificial intelligence by 2030.",
      "More than one million people have already completed basic training — a human-capital programme at a scale that reshapes the investor pitch for AI and digital services.",
      "Education and skills partnerships sit alongside infrastructure FDI as part of how Uzbekistan is building a complete digital economy.",
    ],
  },
];

export function getStory(slug: string) {
  return STORIES.find((s) => s.slug === slug) ?? null;
}
