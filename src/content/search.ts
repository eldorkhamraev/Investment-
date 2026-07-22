import { SECTORS } from "./sectors";
import { WHY_PAGES } from "./why";
import { PROJECTS } from "./projects";
import { STORIES } from "./stories";
import { RESOURCES } from "./resources";
import { FAQ } from "./faq";
import { PROGRAMS } from "./programs";
import { REGIONS } from "@/lib/regionData";
import en from "../../messages/en.json";

export type SearchHit = {
  title: string;
  href: string;
  type: string;
  excerpt: string;
};

export function buildSearchIndex(): SearchHit[] {
  const hits: SearchHit[] = [
    {
      title: "Why digital Uzbekistan",
      href: "/why",
      type: "Page",
      excerpt: "Talent, incentives, Digital 2030, ecosystem and living.",
    },
    {
      title: "For investors",
      href: "/how-to-invest",
      type: "Page",
      excerpt:
        "Where to start, sectors, projects, preferential zones, and public-private partnership.",
    },
    {
      title: "Where to start",
      href: "/how-to-invest/where-to-start",
      type: "Page",
      excerpt: "Discover → Structure → Establish → Grow.",
    },
    {
      title: "Preferential zones",
      href: "/how-to-invest/zones",
      type: "Page",
      excerpt: "IT Park Zero Risk and related technology regimes.",
    },
    {
      title: "Public-private partnership",
      href: "/how-to-invest/partnership",
      type: "Page",
      excerpt: "Digital partnerships with ministries and agencies.",
    },
    {
      title: "Services",
      href: "/services",
      type: "Page",
      excerpt: "Market-entry support from registration to aftercare.",
    },
    {
      title: "Contact",
      href: "/contact",
      type: "Page",
      excerpt: "Book an introduction with the Investment Project Office.",
    },
    {
      title: "About the office",
      href: "/about",
      type: "Page",
      excerpt: "Mandate, ministry affiliation and how the office supports market entry.",
    },
    {
      title: "Office structure",
      href: "/about/structure",
      type: "Page",
      excerpt: "Organisational hierarchy of the Investment Project Office.",
    },
    {
      title: "Office team",
      href: "/about/team",
      type: "Page",
      excerpt: "Leadership and officers of the Investment Project Office.",
    },
    {
      title: "News",
      href: "/news",
      type: "Page",
      excerpt: "Newsroom — investment, partnerships and momentum.",
    },
    {
      title: "FAQ",
      href: "/faq",
      type: "Page",
      excerpt: "Common questions on mandate, incentives and process.",
    },
    {
      title: "Regions",
      href: "/regions",
      type: "Page",
      excerpt:
        "Interactive map of Uzbekistan's fourteen regions — digital economy briefs and investor introductions.",
    },
  ];

  for (const s of SECTORS) {
    hits.push({
      title: s.name,
      href: `/sectors/${s.slug}`,
      type: "Sector",
      excerpt: s.short,
    });
  }
  for (const w of WHY_PAGES) {
    hits.push({
      title: w.title,
      href: `/why/${w.slug}`,
      type: "Why Uzbekistan",
      excerpt: w.subtitle,
    });
  }
  for (const p of PROJECTS) {
    hits.push({
      title: p.title,
      href: `/projects/${p.slug}`,
      type: "Project",
      excerpt: p.desc,
    });
  }
  for (const s of STORIES) {
    hits.push({
      title: s.company,
      href: `/stories/${s.slug}`,
      type: "Success story",
      excerpt: s.excerpt,
    });
  }
  for (const r of RESOURCES) {
    hits.push({
      title: r.title,
      href: r.href,
      type: "Resource",
      excerpt: r.description,
    });
  }
  for (const p of PROGRAMS) {
    hits.push({
      title: p.name,
      href: `/programs/${p.slug}`,
      type: "Program",
      excerpt: p.tagline,
    });
  }
  for (const f of FAQ) {
    hits.push({
      title: f.q,
      href: "/faq",
      type: "FAQ",
      excerpt: f.a,
    });
  }
  for (const region of REGIONS) {
    const item = (
      en.regionsPage.items as Record<
        string,
        { name: string; description: string }
      >
    )[region.id];
    if (!item) continue;
    hits.push({
      title: item.name,
      href: "/regions",
      type: "Region",
      excerpt: item.description,
    });
  }

  return hits;
}

export function searchContent(query: string, limit = 40): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  return buildSearchIndex()
    .map((hit) => {
      const hay = `${hit.title} ${hit.excerpt} ${hit.type}`.toLowerCase();
      const score = terms.reduce(
        (acc, term) => acc + (hay.includes(term) ? 1 : 0),
        0,
      );
      return { hit, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.hit);
}
