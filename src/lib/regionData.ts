export type RegionStats = {
  population: string;
  projects: string;
  fdi: string;
  trade: string;
  area: string;
};

export type RegionMeta = {
  id: string;
  /** Regional digital brief PDF (placeholder until ministry replaces). */
  pdfUrl?: string;
  /** Official regional indicators (from invest.gov investment map). */
  stats?: RegionStats;
};

/** Structural region list — names/copy in messages; stats from invest.gov map. */
export const REGIONS: RegionMeta[] = [
  {
    id: "karakalpakstan",
    pdfUrl: "/briefs/regions/karakalpakstan.pdf",
    stats: {
      population: "2.04m",
      projects: "1,432",
      fdi: "$770.5m",
      trade: "$810 mln",
      area: "166,600",
    },
  },
  {
    id: "xorazm",
    pdfUrl: "/briefs/regions/xorazm.pdf",
    stats: {
      population: "2.45m",
      projects: "1,092",
      fdi: "$412.8m",
      trade: "$873 mln",
      area: "6,050",
    },
  },
  {
    id: "navoiy",
    pdfUrl: "/briefs/regions/navoiy.pdf",
    stats: {
      population: "1.10m",
      projects: "707",
      fdi: "$1.4bn",
      trade: "$2,344 mln",
      area: "111,000",
    },
  },
  {
    id: "bukhara",
    pdfUrl: "/briefs/regions/bukhara.pdf",
    stats: {
      population: "2.08m",
      projects: "867",
      fdi: "$2.3bn",
      trade: "$1,686 mln",
      area: "40,216",
    },
  },
  {
    id: "samarqand",
    pdfUrl: "/briefs/regions/samarqand.pdf",
    stats: {
      population: "4.33m",
      projects: "1,903",
      fdi: "$1bn",
      trade: "$4,066 mln",
      area: "16,773",
    },
  },
  {
    id: "qashqadaryo",
    pdfUrl: "/briefs/regions/qashqadaryo.pdf",
    stats: {
      population: "3.67m",
      projects: "1,340",
      fdi: "$839.5m",
      trade: "$1,242 mln",
      area: "28,568",
    },
  },
  {
    id: "surxondaryo",
    pdfUrl: "/briefs/regions/surxondaryo.pdf",
    stats: {
      population: "2.97m",
      projects: "1,020",
      fdi: "$1.2bn",
      trade: "$790 mln",
      area: "20,100",
    },
  },
  {
    id: "jizzakh",
    pdfUrl: "/briefs/regions/jizzakh.pdf",
    stats: {
      population: "1.55m",
      projects: "701",
      fdi: "$1m",
      trade: "$1,898 mln",
      area: "21,210",
    },
  },
  {
    id: "sirdaryo",
    pdfUrl: "/briefs/regions/sirdaryo.pdf",
    stats: {
      population: "938k",
      projects: "964",
      fdi: "$557m",
      trade: "$951 mln",
      area: "5,276",
    },
  },
  {
    id: "tashkent-region",
    pdfUrl: "/briefs/regions/tashkent-region.pdf",
    stats: {
      population: "3.13m",
      projects: "800",
      fdi: "$2.4bn",
      trade: "$8,106 mln",
      area: "15,300",
    },
  },
  {
    id: "tashkent-city",
    pdfUrl: "/briefs/regions/tashkent-city.pdf",
    // Stats pending — not in the provided invest.gov screenshots yet.
  },
  {
    id: "namangan",
    pdfUrl: "/briefs/regions/namangan.pdf",
    stats: {
      population: "3.15m",
      projects: "1,145",
      fdi: "$818.5m",
      trade: "$1,775 mln",
      area: "7,440",
    },
  },
  {
    id: "andijan",
    pdfUrl: "/briefs/regions/andijan.pdf",
    stats: {
      population: "3.48m",
      projects: "433",
      fdi: "$885 mln",
      trade: "$4,317 mln",
      area: "4,268",
    },
  },
  {
    id: "fergana",
    pdfUrl: "/briefs/regions/fergana.pdf",
    stats: {
      population: "4.18m",
      projects: "1,368",
      fdi: "$1.3bn",
      trade: "$2,668 mln",
      area: "6,760",
    },
  },
];

export function getRegion(id: string): RegionMeta | undefined {
  return REGIONS.find((r) => r.id === id);
}
