import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { InvestorsSubnav } from "@/components/investors/investors-subnav";
import { ContactCta } from "@/components/home/contact-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "investorsPage.partnership",
  });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function PartnershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: "investorsPage.partnership",
  });
  const stages = t.raw("stages") as { title: string; desc: string }[];
  const fits = t.raw("fits") as { title: string; desc: string }[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        image="/services-hero.jpg"
      />
      <InvestorsSubnav current="partnership" />

      <Section>
        <SectionHeading
          eyebrow={t("howEyebrow")}
          title={t("howTitle")}
          intro={t("howIntro")}
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-3">
          {stages.map((stage, i) => (
            <li key={stage.title}>
              <Card className="h-full">
                <span className="font-display text-3xl font-extrabold text-azure-600">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-lg">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {stage.desc}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="mist">
        <SectionHeading
          eyebrow={t("fitEyebrow")}
          title={t("fitTitle")}
          intro={t("fitIntro")}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {fits.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/contact" variant="primary" size="lg">
            {t("ctaPrimary")}
          </ButtonLink>
          <ButtonLink href="/projects" variant="outline" size="lg">
            {t("ctaSecondary")}
          </ButtonLink>
        </div>
        <p className="mt-10 max-w-2xl text-sm text-slate">
          {t.rich("nationalNote", {
            link: (chunks) => (
              <a
                href="https://invest.gov.uz/en/guide/partnership"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-azure-700 underline-offset-2 hover:underline"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </Section>

      <ContactCta />
    </>
  );
}
