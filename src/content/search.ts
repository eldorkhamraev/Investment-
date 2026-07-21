import { SECTORS } from "./sectors";
import { WHY_PAGES } from "./why";
import { PROJECTS } from "./projects";
import { STORIES } from "./stories";
import { EVENTS } from "./events";
import { RESOURCES } from "./resources";
import { FAQ } from "./faq";
import { PROGRAMS } from "./programs";

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
      title: "How to invest",
      href: "/how-to-invest",
      type: "Page",
      excerpt: "Discover → Structure → Establish → Grow.",
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
      excerpt: "Mandate, focus areas, initiatives and leadership.",
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
  for (const e of EVENTS) {
    hits.push({
      title: e.title,
      href: `/events/${e.slug}`,
      type: "Event",
      excerpt: e.excerpt,
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
