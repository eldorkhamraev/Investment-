import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { getNewsById, type NewsDetail } from "@/lib/cms";
import { NEWS_BODIES } from "@/content/news-bodies";

export const dynamic = "force-dynamic";

// Resolved article for rendering: either a CMS record (Lexical body) or a
// built-in static story (plain paragraphs).
type Article = Omit<NewsDetail, "id" | "body"> & {
  body: SerializedEditorState | null;
  paragraphs?: string[];
};

/** Built-in story matching a slug, assembled from messages + NEWS_BODIES. */
async function getStaticArticle(
  locale: string,
  slug: string,
): Promise<Article | null> {
  const paragraphs = NEWS_BODIES[slug];
  if (!paragraphs) return null;
  const t = await getTranslations({ locale, namespace: "newsPage" });
  const items = t.raw("items") as {
    slug?: string;
    tag: string;
    date: string;
    title: string;
    excerpt: string;
    image?: string | null;
  }[];
  const meta = items.find((n) => n.slug === slug);
  if (!meta) return null;
  return {
    tag: meta.tag,
    date: meta.date,
    title: meta.title,
    excerpt: meta.excerpt,
    image: meta.image ?? null,
    body: null,
    paragraphs,
  };
}

/** CMS article first (numeric id); otherwise the built-in story by slug. */
async function resolveArticle(
  locale: string,
  id: string,
): Promise<Article | null> {
  const cms = await getNewsById(id);
  if (cms) return { ...cms, body: cms.body as SerializedEditorState | null };
  return getStaticArticle(locale, id);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const item = await resolveArticle(locale, id);
  if (!item) return { title: "News" };
  return { title: item.title, description: item.excerpt };
}

export default async function NewsArticle({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const item = await resolveArticle(locale, id);
  if (!item) notFound();

  const hasLexical =
    !!item.body && typeof item.body === "object" && "root" in item.body;

  return (
    <>
      <article>
        <Section tone="paper" className="!pb-10">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-azure-700 hover:gap-2.5"
            >
              <Icons.arrow className="h-4 w-4 rotate-180" />
              All news
            </Link>
            <div className="mt-6 flex items-center gap-3">
              {item.tag ? <Badge tone="azure">{item.tag}</Badge> : null}
              <span className="text-sm text-slate">{item.date}</span>
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl">{item.title}</h1>
          </div>

          {item.image ? (
            <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl shadow-lift">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="max-h-[520px] w-full object-cover"
              />
            </div>
          ) : null}
        </Section>

        <Section tone="paper" className="!pt-0">
          <div className="prose-news mx-auto max-w-3xl">
            {hasLexical ? (
              <RichText data={item.body as SerializedEditorState} />
            ) : item.paragraphs ? (
              item.paragraphs.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-steel">
                  {p}
                </p>
              ))
            ) : (
              <p className="text-lg leading-relaxed text-steel">{item.excerpt}</p>
            )}
          </div>
        </Section>
      </article>
    </>
  );
}
