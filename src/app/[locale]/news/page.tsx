import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { ContactCta } from "@/components/home/contact-cta";
import { NewsGrid } from "@/components/news/news-grid";
import { getNews, type NewsItem } from "@/lib/cms";

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

  const cms = await getNews();
  const fallback = (t.raw("items") as NewsItem[]).map((n) => ({
    ...n,
    image: n.image ?? null,
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
        <NewsGrid items={items} />
      </Section>
      <ContactCta />
    </>
  );
}
