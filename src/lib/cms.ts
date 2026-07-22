import { getPayload } from "payload";
import config from "@payload-config";
import { slugify } from "@/lib/slug";

// Memoise the Payload instance across requests in a single server runtime.
let cached: Awaited<ReturnType<typeof getPayload>> | null = null;
async function client() {
  if (!cached) cached = await getPayload({ config });
  return cached;
}

export type NewsItem = {
  id?: number;
  slug?: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  image: string | null;
};

export type NewsDetail = NewsItem & { body: unknown | null };

export type ProjectItem = {
  slug: string;
  year: string;
  sector: string;
  status: string;
  title: string;
  desc: string;
  image: string | null;
};

export type StoryItem = {
  slug: string;
  company: string;
  sector: string;
  country: string;
  excerpt: string;
  highlight: string;
  image: string | null;
  body: string[];
};

export type DocumentItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  href: string;
  external?: boolean;
  date: string;
};

function mediaUrl(m: unknown): string | null {
  if (m && typeof m === "object" && "url" in m) {
    const url = (m as { url?: string }).url;
    return url ?? null;
  }
  return null;
}

/** Published news, newest first. Returns [] on any error (callers fall back). */
export async function getNews(limit = 50): Promise<NewsItem[]> {
  try {
    const payload = await client();
    const res = await payload.find({
      collection: "news",
      where: { published: { equals: true } },
      sort: "-publishedDate",
      limit,
      depth: 1,
    });
    return res.docs.map((d: Record<string, unknown>) => ({
      id: Number(d.id),
      title: String(d.title ?? ""),
      tag: String(d.tag ?? ""),
      date: d.publishedDate
        ? new Date(String(d.publishedDate)).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : "",
      excerpt: String(d.excerpt ?? ""),
      image: mediaUrl(d.coverImage),
    }));
  } catch {
    return [];
  }
}

/** A single published news article by id, with its rich-text body. */
export async function getNewsById(id: string): Promise<NewsDetail | null> {
  try {
    const payload = await client();
    const d = (await payload.findByID({
      collection: "news",
      id,
      depth: 1,
    })) as Record<string, unknown>;
    if (!d || d.published === false) return null;
    return {
      id: Number(d.id),
      title: String(d.title ?? ""),
      tag: String(d.tag ?? ""),
      date: d.publishedDate
        ? new Date(String(d.publishedDate)).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "",
      excerpt: String(d.excerpt ?? ""),
      image: mediaUrl(d.coverImage),
      body: d.body ?? null,
    };
  } catch {
    return null;
  }
}

/** Published projects, by manual order. Returns [] on any error. */
export async function getProjects(limit = 50): Promise<ProjectItem[]> {
  try {
    const payload = await client();
    const res = await payload.find({
      collection: "projects",
      where: { published: { equals: true } },
      sort: "order",
      limit,
      depth: 1,
    });
    return res.docs.map((d: Record<string, unknown>) => {
      const title = String(d.title ?? "");
      return {
        title,
        slug: String(d.slug || slugify(title)),
        year: String(d.year ?? ""),
        sector: String(d.sector ?? ""),
        status: String(d.status ?? ""),
        desc: String(d.description ?? ""),
        image: mediaUrl(d.coverImage),
      };
    });
  } catch {
    return [];
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectItem | null> {
  // Use list mapping so empty CMS slugs still resolve via slugify(title).
  const all = await getProjects(100);
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getStories(limit = 50): Promise<StoryItem[]> {
  try {
    const payload = await client();
    const res = await payload.find({
      collection: "stories",
      where: { published: { equals: true } },
      sort: "order",
      limit,
      depth: 1,
    });
    return res.docs.map((d: Record<string, unknown>) => ({
      slug: String(d.slug ?? ""),
      company: String(d.company ?? ""),
      sector: String(d.sector ?? ""),
      country: String(d.country ?? ""),
      excerpt: String(d.excerpt ?? ""),
      highlight: String(d.highlight ?? ""),
      image: mediaUrl(d.coverImage),
      body: String(d.body ?? "")
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean),
    }));
  } catch {
    return [];
  }
}

export async function getStoryBySlug(slug: string): Promise<StoryItem | null> {
  const all = await getStories(100);
  return all.find((s) => s.slug === slug) ?? null;
}

export async function getDocuments(limit = 50): Promise<DocumentItem[]> {
  try {
    const payload = await client();
    const res = await payload.find({
      collection: "documents",
      where: { published: { equals: true } },
      limit,
      depth: 1,
    });
    return res.docs.flatMap((d: Record<string, unknown>) => {
      const fileUrl = mediaUrl(d.file);
      const external = String(d.externalUrl ?? "").trim();
      const href = fileUrl || external;
      if (!href || href === "#") return [];
      return [
        {
          slug: String(d.slug ?? ""),
          title: String(d.title ?? ""),
          category: String(d.category ?? "Guide"),
          description: String(d.description ?? ""),
          href,
          external: Boolean(external && !fileUrl),
          date: String(d.dateLabel ?? ""),
        },
      ];
    });
  } catch {
    return [];
  }
}
