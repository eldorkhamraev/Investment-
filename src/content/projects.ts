import { slugify } from "@/lib/slug";

export type ProjectDeal = {
  slug: string;
  year: string;
  sector: string;
  title: string;
  img: string;
  desc: string;
  status?: string;
};

const RAW: Omit<ProjectDeal, "slug">[] = [
  {
    year: "2026",
    sector: "AI & Computing",
    title: "Shanghai Linkwise Modular Computing Centre",
    img: "/deal-linkwise.jpg",
    desc: "A $3.5 billion foreign direct investment to build a Modular Intelligent Computing Centre in the Republic of Karakalpakstan, planned for commissioning in 2027 — among the largest technology FDI commitments in the country's history.",
    status: "FDI · $3.5B",
  },
  {
    year: "2026",
    sector: "Digital Infrastructure",
    title: "DataVolt Green Data Centres",
    img: "/deal-datavolt.jpg",
    desc: "Saudi Arabia's DataVolt is developing green data centres in Uzbekistan under a foreign-investment program worth up to $5 billion by 2030. Its first facility, the 12 MW TAS-1 in Tashkent, is fully foreign-financed with $150 million backing from DEG, the EBRD, the OPEC Fund and Proparco.",
    status: "Phase 1 · 2026",
  },
  {
    year: "2026",
    sector: "Human Capital",
    title: "Five Million AI Leaders",
    img: "/deal-ai-leaders.jpg",
    desc: "A national program launched with the United Arab Emirates to train five million citizens in artificial intelligence by 2030 — 4.75 million students, 150,000 teachers and 100,000 civil servants. More than one million people have already completed basic training.",
    status: "National programme",
  },
  {
    year: "2026",
    sector: "AI & Computing",
    title: "Nvidia Supercomputer Cluster",
    img: "/sector-ai.jpg",
    desc: "A major national supercomputer cluster being launched in partnership with Nvidia to power domestic AI development, alongside a National Transfer Office opening in Silicon Valley to connect Uzbek founders with global investors.",
    status: "National infrastructure",
  },
  {
    year: "2025",
    sector: "Milestone",
    title: "$1 Billion in IT Service Exports",
    img: "/deal-itpark.jpg",
    desc: "IT service exports crossed $1 billion for the first time in the country's history, on the path to a national target of $5 billion in annual digital exports by 2030.",
    status: "Milestone · 2025",
  },
  {
    year: "2025",
    sector: "Creative & Gaming",
    title: "Japan Animation Talent Initiative",
    img: "/sector-gaming.jpg",
    desc: "A partnership with Japan's ELF-IN, backed by a grant exceeding $700,000, to train a new generation of animation and computer-graphics professionals and build an export-ready creative industry.",
    status: "Grant-backed",
  },
  {
    year: "2025",
    sector: "Ecosystem",
    title: "ICT Week Investment Forum",
    img: "/sector-outsourcing.jpg",
    desc: "Tashkent hosted the IT Investment Forum during ICT Week 2025, convening government leaders, global companies and international investors around Uzbekistan's digital opportunity.",
    status: "Forum · 2025",
  },
  {
    year: "2024",
    sector: "Investment Climate",
    title: "Record FDI Inflows",
    img: "/sector-infra.jpg",
    desc: "Foreign direct investment reached $11.9 billion, up more than 50% year on year and equal to 10.3% of GDP — a clear signal of rising international confidence in Uzbekistan.",
    status: "Macro · 2024",
  },
  {
    year: "2024",
    sector: "Digital Infrastructure",
    title: "DataVolt Green Data Centre Agreement",
    img: "/deal-datavolt.jpg",
    desc: "Uzbekistan signed with Saudi Arabia's DataVolt to develop a network of green data centres, laying the groundwork for a multi-billion-dollar build-out of the country's digital infrastructure.",
    status: "Agreement · 2024",
  },
];

export const PROJECTS: ProjectDeal[] = RAW.map((p) => ({
  ...p,
  slug: slugify(p.title),
}));

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

export function projectsByYear() {
  const years = [...new Set(PROJECTS.map((p) => p.year))].sort((a, b) =>
    b.localeCompare(a),
  );
  return years.map((year) => ({
    year,
    deals: PROJECTS.filter((p) => p.year === year),
  }));
}
