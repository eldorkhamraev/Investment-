export type SectorContent = {
  slug: string;
  name: string;
  img: string;
  short: string;
  hero: string;
  opportunity: string;
  highlights: string[];
  relatedProjectSlugs: string[];
};

export const SECTORS: SectorContent[] = [
  {
    slug: "ai-computing",
    name: "AI & Computing",
    img: "/sector-ai.jpg",
    short: "Intelligent computing centres and applied artificial intelligence.",
    hero: "Build the compute layer of Central Asia's AI decade.",
    opportunity:
      "Uzbekistan is committing multi-billion-dollar capacity to AI infrastructure — from modular intelligent computing centres to national supercomputer clusters — while training millions of citizens in AI literacy. Investors can participate in capacity, applications, and talent pipelines.",
    highlights: [
      "$3.5B Modular Intelligent Computing Centre with Shanghai Linkwise",
      "National Nvidia supercomputer cluster for domestic AI development",
      "Five Million AI Leaders programme with the UAE",
      "Rising GitHub developer base — 275K+ and growing",
    ],
    relatedProjectSlugs: [
      "shanghai-linkwise-modular-computing-centre",
      "nvidia-supercomputer-cluster",
      "five-million-ai-leaders",
    ],
  },
  {
    slug: "digital-infrastructure",
    name: "Digital Infrastructure",
    img: "/sector-infra.jpg",
    short: "Data centres and the backbone of the digital economy.",
    hero: "Power the region's digital backbone.",
    opportunity:
      "Green data centres, high-capacity interconnect and resilient power for AI and cloud workloads are priority national investments. International operators are already committing multi-year capital to Uzbekistan's digital infrastructure.",
    highlights: [
      "DataVolt green data-centre programme (up to $5B by 2030)",
      "12 MW TAS-1 facility in Tashkent with DFIs behind it",
      "Up to 300 MW national data-centre ambition",
      "Strategic location between Europe, China and South Asia",
    ],
    relatedProjectSlugs: [
      "datavolt-green-data-centres",
      "datavolt-green-data-centre-agreement",
    ],
  },
  {
    slug: "it-outsourcing-bpo",
    name: "IT Outsourcing & BPO",
    img: "/sector-outsourcing.jpg",
    short: "Export-oriented delivery centres serving global clients.",
    hero: "Nearshore delivery with cost advantage and STEM depth.",
    opportunity:
      "IT service exports crossed $1 billion for the first time. With IT Park incentives, a young STEM workforce and growing English/Russian bilingual talent, Uzbekistan is positioning as a serious delivery destination for global software and BPO buyers.",
    highlights: [
      "$1B+ IT service exports (2025)",
      "2,990+ IT Park resident companies",
      "Zero-risk tax regime for IT Park residents",
      "90 export destinations worldwide",
    ],
    relatedProjectSlugs: ["1-billion-in-it-service-exports"],
  },
  {
    slug: "creative-gaming",
    name: "Creative & Gaming",
    img: "/sector-gaming.jpg",
    short: "Animation, game development and digital media.",
    hero: "An export-ready creative industry taking shape.",
    opportunity:
      "Video-game exports grew 21× in three years. Japan-backed animation training and a growing GameDev community are building the creative talent Uzbekistan needs to compete globally in digital entertainment.",
    highlights: [
      "21× growth in video-game exports over three years",
      "Japan Animation Talent Initiative with ELF-IN ($700K+ grant)",
      "Pipeline of CG and animation professionals",
      "Strong cultural storytelling heritage meeting digital craft",
    ],
    relatedProjectSlugs: ["japan-animation-talent-initiative"],
  },
  {
    slug: "fintech-startups",
    name: "Fintech & Startups",
    img: "/sector-fintech.jpg",
    short: "High-growth digital startups and financial technology.",
    hero: "Capital, regulation and talent for digital founders.",
    opportunity:
      "Digital banks, payments and startup hubs are expanding fast. The office helps foreign founders and funds structure market entry, access IT Park benefits and connect with local partners and universities.",
    highlights: [
      "Digital banking and payments momentum",
      "IT Park Zero Risk for qualifying startups",
      "Soft-landing support for founding teams",
      "Links to university and technopark partnerships",
    ],
    relatedProjectSlugs: [],
  },
  {
    slug: "digital-education",
    name: "Digital Education",
    img: "/sector-education.jpg",
    short: "Talent pipelines and skills for the technology sector.",
    hero: "Train the workforce that powers digital growth.",
    opportunity:
      "From One Million Programmers to AI literacy for five million citizens, Uzbekistan is scaling digital education as industrial policy. Investors and operators can partner on curricula, platforms and corporate academies.",
    highlights: [
      "1 Million Programmers national drive",
      "Five Million AI Leaders (students, teachers, civil servants)",
      "Ucell five-year MOU on IT talent",
      "IT curricula and international certification reforms",
    ],
    relatedProjectSlugs: ["five-million-ai-leaders"],
  },
];

export function getSector(slug: string) {
  return SECTORS.find((s) => s.slug === slug) ?? null;
}
