import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { Section } from "@/components/ui/section";
import { ArticleHero } from "@/components/news/article-hero";
import { ArticleSidebar } from "@/components/news/article-sidebar";
import { getNewsById, type NewsDetail } from "@/lib/cms";
import { NEWS_BODIES } from "@/content/news-bodies";

export const dynamic = "force-dynamic";

type Article = Omit<NewsDetail, "id" | "body"> & {
  id?: number;
  slug?: string;
  body: SerializedEditorState | null;
  paragraphs?: string[];
};

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
    slug: meta.slug,
    tag: meta.tag,
    date: meta.date,
    title: meta.title,
    excerpt: meta.excerpt,
    image: meta.image ?? null,
    body: null,
    paragraphs,
  };
}

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

  const t = await getTranslations({ locale, namespace: "newsPage" });
  const tContact = await getTranslations({
    locale,
    namespace: "contactPage.details",
  });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const hasLexical =
    !!item.body && typeof item.body === "object" && "root" in item.body;

  return (
    <article>
      <ArticleHero
        title={item.title}
        date={item.date}
        tag={item.tag}
        image={item.image}
        backLabel={t("backToNews")}
      />

      <Section tone="paper" className="!py-10 md:!py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="min-w-0">
            {item.excerpt ? (
              <p className="max-w-[40rem] text-base font-normal leading-[1.65] text-ink [font-family:var(--font-article)]">
                {item.excerpt}
              </p>
            ) : null}

            <div className={`prose-news ${item.excerpt ? "mt-5" : ""}`}>
              {hasLexical ? (
                <RichText data={item.body as SerializedEditorState} />
              ) : item.paragraphs ? (
                item.paragraphs.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p>{item.excerpt}</p>
              )}
            </div>
          </div>

          <ArticleSidebar
            contactTitle={t("sidebar.contactTitle")}
            emailLabel={t("sidebar.emailLabel")}
            phoneLabel={t("sidebar.phoneLabel")}
            addressLabel={t("sidebar.addressLabel")}
            contactLinkLabel={tNav("contact")}
            email={tContact("email")}
            phone={tContact("phone")}
            address={tContact("address")}
          />
        </div>
      </Section>
    </article>
  );
}
