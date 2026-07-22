import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { WhySubnav } from "@/components/why/why-subnav";
import { ContactCta } from "@/components/home/contact-cta";
import { WHY_PAGES } from "@/content/why";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "whyPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function WhyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "whyPage" });

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        image="/samarkand.jpg"
      />
      <WhySubnav />

      <section className="bg-paper py-16 md:py-24">
        <div className="container-edge">
          <SectionHeading
            eyebrow={t("hubEyebrow")}
            title={t("hubTitle")}
            intro={t("hubIntro")}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_PAGES.map((page) => (
              <Link
                key={page.slug}
                href={`/why/${page.slug}`}
                className="group"
              >
                <Card interactive className="h-full">
                  <Badge tone="azure">{page.eyebrow}</Badge>
                  <h3 className="mt-4 text-lg group-hover:text-azure-700">
                    {page.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {page.subtitle}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
          <p className="mt-12 max-w-2xl text-sm text-slate">
            {t.rich("sidebarNote", {
              link: (chunks) => (
                <a
                  href="https://invest.gov.uz/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-azure-700 underline-offset-2 hover:underline"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
