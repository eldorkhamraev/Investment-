import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { InvestorsSubnav } from "@/components/investors/investors-subnav";
import { ContactCta } from "@/components/home/contact-cta";
import { INVESTOR_SECTIONS } from "@/content/investors";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "investorsPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function HowToInvestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "investorsPage" });

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        image="/tashkent-city.webp"
      />
      <InvestorsSubnav />

      <section className="bg-paper py-16 md:py-24">
        <div className="container-edge">
          <SectionHeading
            eyebrow={t("hubEyebrow")}
            title={t("hubTitle")}
            intro={t("hubIntro")}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INVESTOR_SECTIONS.map((section) => (
              <Link
                key={section.slug}
                href={section.href}
                className="group"
              >
                <Card interactive className="h-full">
                  <Badge tone="azure">{section.eyebrow}</Badge>
                  <h3 className="mt-4 text-lg group-hover:text-azure-700">
                    {section.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {section.summary}
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
