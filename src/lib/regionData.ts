export type RegionMeta = {
  id: string;
  /** Regional digital brief PDF (placeholder until ministry replaces). */
  pdfUrl?: string;
};

/** Structural region list — copy lives in messages under regionsPage.items. */
export const REGIONS: RegionMeta[] = [
  { id: "karakalpakstan", pdfUrl: "/briefs/regions/karakalpakstan.pdf" },
  { id: "xorazm", pdfUrl: "/briefs/regions/xorazm.pdf" },
  { id: "navoiy", pdfUrl: "/briefs/regions/navoiy.pdf" },
  { id: "bukhara", pdfUrl: "/briefs/regions/bukhara.pdf" },
  { id: "samarqand", pdfUrl: "/briefs/regions/samarqand.pdf" },
  { id: "qashqadaryo", pdfUrl: "/briefs/regions/qashqadaryo.pdf" },
  { id: "surxondaryo", pdfUrl: "/briefs/regions/surxondaryo.pdf" },
  { id: "jizzakh", pdfUrl: "/briefs/regions/jizzakh.pdf" },
  { id: "sirdaryo", pdfUrl: "/briefs/regions/sirdaryo.pdf" },
  { id: "tashkent-region", pdfUrl: "/briefs/regions/tashkent-region.pdf" },
  { id: "tashkent-city", pdfUrl: "/briefs/regions/tashkent-city.pdf" },
  { id: "namangan", pdfUrl: "/briefs/regions/namangan.pdf" },
  { id: "andijan", pdfUrl: "/briefs/regions/andijan.pdf" },
  { id: "fergana", pdfUrl: "/briefs/regions/fergana.pdf" },
];

export function getRegion(id: string): RegionMeta | undefined {
  return REGIONS.find((r) => r.id === id);
}
