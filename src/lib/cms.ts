import { getPayload } from "payload";
import config from "@payload-config";

// Memoise the Payload instance across requests in a single server runtime.
let cached: Awaited<ReturnType<typeof getPayload>> | null = null;
async function client() {
  if (!cached) cached = await getPayload({ config });
  return cached;
}

export type NewsItem = {
  id?: number;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  image: string | null;
};

export type NewsDetail = NewsItem & { body: unknown | null };

export type ProjectItem = {
  sector: string;
  status: string;
  title: string;
  desc: string;
  image: string | null;
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
    return res.docs.map((d: Record<string, unknown>) => ({
      title: String(d.title ?? ""),
      sector: String(d.sector ?? ""),
      status: String(d.status ?? ""),
      desc: String(d.description ?? ""),
      image: mediaUrl(d.coverImage),
    }));
  } catch {
    return [];
  }
}
