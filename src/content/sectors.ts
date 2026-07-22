export type SectorStat = {
  value: string;
  label: string;
};

export type SectorContent = {
  slug: string;
  name: string;
  img: string;
  short: string;
  hero: string;
  /** Key numbers shown in a band under the hero (invest.gov pattern). */
  stats: SectorStat[];
  /** Snapshot / overview narrative. */
  snapshot: string;
  opportunity: string;
  /** Forward-looking paragraph. */
  outlook: string;
  highlights: string[];
  relatedProjectSlugs: string[];
  /** Downloadable investment offer (placeholder PDF until ministry replaces). */
  offerPdf: string;
};

export const SECTORS: SectorContent[] = [
  {
    slug: "ai-computing",
    name: "AI & Computing",
    img: "/sector-ai.jpg",
    short: "Intelligent computing centres and applied artificial intelligence.",
    hero: "Build the compute layer of Central Asia's AI decade.",
    stats: [
      { value: "$3.5B", label: "Modular Intelligent Computing Centre FDI" },
      { value: "5M", label: "Citizens in national AI literacy programme" },
      { value: "275K+", label: "Developers on GitHub (2025)" },
      { value: "2027", label: "Linkwise centre planned commissioning" },
    ],
    snapshot:
      "Uzbekistan is treating artificial intelligence as industrial policy — pairing multi-billion-dollar compute capacity with national skills programmes and a growing domestic developer base. Landmark FDI in modular intelligent computing and a national Nvidia-backed supercomputer cluster signal that the country intends to host regional AI workloads, not only consume them.",
    opportunity:
      "Investors can participate across the stack: hyperscale and modular compute, applied AI products, data platforms, and the talent pipelines that make those investments productive. The Investment Project Office helps structure entry, incentives and government coordination for technology capital at this scale.",
    outlook:
      "Through 2030, demand for AI training, inference and sovereign compute in Central Asia is expected to rise sharply. Uzbekistan’s combination of land, renewable potential, policy backing and STEM growth positions it as a serious destination for AI infrastructure and application investors.",
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
    offerPdf: "/briefs/sectors/ai-computing.pdf",
  },
  {
    slug: "digital-infrastructure",
    name: "Digital Infrastructure",
    img: "/sector-infra.jpg",
    short: "Data centres and the backbone of the digital economy.",
    hero: "Power the region's digital backbone.",
    stats: [
      { value: "$5B", label: "DataVolt programme ambition by 2030" },
      { value: "12 MW", label: "TAS-1 green facility in Tashkent" },
      { value: "300 MW", label: "National data-centre ambition" },
      { value: "4 DFIs", label: "DEG, EBRD, OPEC Fund, Proparco backing" },
    ],
    snapshot:
      "Green data centres, high-capacity interconnect and resilient power for AI and cloud workloads are national investment priorities. International operators are already committing multi-year capital, with development-finance institutions validating bankability on early facilities.",
    opportunity:
      "Opportunities span campus-scale green data centres, edge and regional facilities, connectivity and power partnerships. Investors benefit from a clear policy push toward digital infrastructure and an office that coordinates site, structure and aftercare.",
    outlook:
      "As AI and cloud demand compound, Uzbekistan aims to expand installed data-centre capacity significantly by 2030. Early movers with green-power strategies and DFI-aligned structures are well placed to scale.",
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
    offerPdf: "/briefs/sectors/digital-infrastructure.pdf",
  },
  {
    slug: "it-outsourcing-bpo",
    name: "IT Outsourcing & BPO",
    img: "/sector-outsourcing.jpg",
    short: "Export-oriented delivery centres serving global clients.",
    hero: "Nearshore delivery with cost advantage and STEM depth.",
    stats: [
      { value: "$1B+", label: "IT service exports (2025)" },
      { value: "2,990+", label: "IT Park resident companies" },
      { value: "90", label: "Export destinations worldwide" },
      { value: "0%", label: "Corporate tax for qualifying IT Park residents" },
    ],
    snapshot:
      "IT service exports crossed $1 billion for the first time. With IT Park incentives, a young STEM workforce and growing English/Russian bilingual talent, Uzbekistan is positioning as a serious delivery destination for global software and BPO buyers.",
    opportunity:
      "Foreign companies can establish delivery centres, captive teams or joint ventures under preferential tax treatment, with soft-landing support for registration, visas and first hires.",
    outlook:
      "National strategy targets $5 billion in annual digital exports by 2030. Outsourcing and BPO capacity outside Tashkent — especially in secondary cities — will be a major growth lane as labour markets deepen.",
    highlights: [
      "$1B+ IT service exports (2025)",
      "2,990+ IT Park resident companies",
      "Zero-risk tax regime for IT Park residents",
      "90 export destinations worldwide",
    ],
    relatedProjectSlugs: ["1-billion-in-it-service-exports"],
    offerPdf: "/briefs/sectors/it-outsourcing-bpo.pdf",
  },
  {
    slug: "creative-gaming",
    name: "Creative & Gaming",
    img: "/sector-gaming.jpg",
    short: "Animation, game development and digital media.",
    hero: "An export-ready creative industry taking shape.",
    stats: [
      { value: "21×", label: "Video-game export growth in three years" },
      { value: "$700K+", label: "Japan animation talent grant" },
      { value: "Growing", label: "GameDev and CG professional pipeline" },
      { value: "Export", label: "Creative services to global buyers" },
    ],
    snapshot:
      "Video-game exports grew 21× in three years. Japan-backed animation training and a growing GameDev community are building the creative talent Uzbekistan needs to compete globally in digital entertainment.",
    opportunity:
      "Studios, publishers and training operators can partner on talent, production capacity and co-production — with grant and FDI pathways supported by the office.",
    outlook:
      "As animation and games scale as export industries, Uzbekistan aims to convert cultural storytelling heritage into digital craft competitive on international markets.",
    highlights: [
      "21× growth in video-game exports over three years",
      "Japan Animation Talent Initiative with ELF-IN ($700K+ grant)",
      "Pipeline of CG and animation professionals",
      "Strong cultural storytelling heritage meeting digital craft",
    ],
    relatedProjectSlugs: ["japan-animation-talent-initiative"],
    offerPdf: "/briefs/sectors/creative-gaming.pdf",
  },
  {
    slug: "fintech-startups",
    name: "Fintech & Startups",
    img: "/sector-fintech.jpg",
    short: "High-growth digital startups and financial technology.",
    hero: "Capital, regulation and talent for digital founders.",
    stats: [
      { value: "1,000+", label: "Active startups in the ecosystem" },
      { value: "0%", label: "Corporate tax under IT Park Zero Risk" },
      { value: "3 yrs", label: "IT-Visa pathway for founders & specialists" },
      { value: "Fast", label: "Soft-landing from first meeting to ops" },
    ],
    snapshot:
      "Digital banks, payments and startup hubs are expanding fast. Uzbekistan’s first unicorn and a densifying founder community sit alongside preferential regimes designed for technology companies.",
    opportunity:
      "The office helps foreign founders and funds structure market entry, access IT Park benefits and connect with local partners, universities and regulators.",
    outlook:
      "Fintech adoption and startup formation are expected to accelerate with digital banking penetration and continued reform. Soft-landing and visa pathways reduce friction for international teams.",
    highlights: [
      "Digital banking and payments momentum",
      "IT Park Zero Risk for qualifying startups",
      "Soft-landing support for founding teams",
      "Links to university and technopark partnerships",
    ],
    relatedProjectSlugs: [],
    offerPdf: "/briefs/sectors/fintech-startups.pdf",
  },
  {
    slug: "digital-education",
    name: "Digital Education",
    img: "/sector-education.jpg",
    short: "Talent pipelines and skills for the technology sector.",
    hero: "Train the workforce that powers digital growth.",
    stats: [
      { value: "1M", label: "Programmers national skills drive" },
      { value: "5M", label: "AI Leaders programme by 2030" },
      { value: "1M+", label: "Already through basic AI training" },
      { value: "~6%", label: "Of GDP allocated to education nationally" },
    ],
    snapshot:
      "From One Million Programmers to AI literacy for five million citizens, Uzbekistan is scaling digital education as industrial policy. Corporate academies and international partnerships reinforce the public pipeline.",
    opportunity:
      "Investors and operators can partner on curricula, platforms, certification and corporate academies — aligning commercial models with national skills targets.",
    outlook:
      "Human capital is the binding constraint for digital FDI everywhere; Uzbekistan is treating it as a buildable asset. Partners who help scale quality training will sit at the centre of the ecosystem.",
    highlights: [
      "1 Million Programmers national drive",
      "Five Million AI Leaders (students, teachers, civil servants)",
      "Ucell five-year MOU on IT talent",
      "IT curricula and international certification reforms",
    ],
    relatedProjectSlugs: ["five-million-ai-leaders"],
    offerPdf: "/briefs/sectors/digital-education.pdf",
  },
];

export function getSector(slug: string) {
  return SECTORS.find((s) => s.slug === slug) ?? null;
}
