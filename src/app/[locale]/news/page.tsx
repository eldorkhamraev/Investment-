import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { ContactCta } from "@/components/home/contact-cta";
import { Icons } from "@/components/ui/icons";
import { getNews, type NewsItem } from "@/lib/cms";

// Always reflect the latest CMS content.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "newsPage.hero" });
  return { title: "News", description: t("subtitle") };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "newsPage" });

  // CMS-first; fall back to the built-in stories until items are published.
  const cms = await getNews();
  const fallback = (t.raw("items") as Omit<NewsItem, "image">[]).map((n) => ({
    ...n,
    image: null as string | null,
  }));
  const items: NewsItem[] = cms.length ? cms : fallback;

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/itpark.jpg"
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((n, i) => (
            <NewsCard key={n.id ?? `${n.title}-${i}`} item={n} />
          ))}
        </div>
      </Section>
      <ContactCta />
    </>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  const inner = (
    <>
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt={item.title}
          className="h-48 w-full object-cover"
        />
      ) : (
        <MediaPlaceholder className="h-48 w-full" seed={item.id ?? 0} />
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          {item.tag ? <Badge tone="azure">{item.tag}</Badge> : null}
          <span className="text-xs text-slate">{item.date}</span>
        </div>
        <h3 className="mt-4 text-lg leading-snug group-hover:text-azure-700">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate">
          {item.excerpt}
        </p>
        {item.id ? (
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-azure-700 transition-transform group-hover:gap-2.5">
            Read the article <Icons.arrow className="h-4 w-4" />
          </span>
        ) : null}
      </div>
    </>
  );

  const shell =
    "group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-200";

  // CMS items link to their article page; fallback items have no detail page.
  return item.id ? (
    <Link
      href={`/news/${item.id}`}
      className={`${shell} hover:-translate-y-0.5 hover:border-azure-200 hover:shadow-lift`}
    >
      {inner}
    </Link>
  ) : (
    <article className={shell}>{inner}</article>
  );
}
