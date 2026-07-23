import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { WhySubnav } from "@/components/why/why-subnav";
import { WhyBlocks } from "@/components/why/why-blocks";
import { redirect } from "@/i18n/navigation";
import {
  WHY_PAGES,
  WHY_SLUG_REDIRECTS,
  getWhyPage,
} from "@/content/why";

export function generateStaticParams() {
  return [
    ...WHY_PAGES.map((p) => ({ slug: p.slug })),
    ...Object.keys(WHY_SLUG_REDIRECTS).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const target = WHY_SLUG_REDIRECTS[slug];
  const page = getWhyPage(target ?? slug);
  if (!page) return { title: "Why Uzbekistan" };
  return { title: page.eyebrow, description: page.subtitle };
}

export default async function WhyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const redirected = WHY_SLUG_REDIRECTS[slug];
  if (redirected) {
    redirect({ href: `/why/${redirected}`, locale });
  }

  const page = getWhyPage(slug);
  if (!page) notFound();

  const t = await getTranslations({ locale, namespace: "whyPage" });

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
        image={page.image}
      />
      <WhySubnav current={page.slug} />

      <section className="bg-paper py-12 md:py-16">
        <div className="container-edge">
          <WhyBlocks
            blocks={page.blocks}
            pointsEyebrow={t("pointsEyebrow")}
            pointsTitle={t("pointsTitle")}
            chartsEyebrow={t("chartsEyebrow")}
            chartsTitle={t("chartsTitle")}
            chartsIntro={t("chartsIntro")}
            mosaicHint={t("mosaicHint")}
          />
        </div>
      </section>
    </>
  );
}
