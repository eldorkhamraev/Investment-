import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { InvestorsSubnav } from "@/components/investors/investors-subnav";
import { ContactCta } from "@/components/home/contact-cta";
import { PROGRAMS } from "@/content/programs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "investorsPage.zones",
  });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function PreferentialZonesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: "investorsPage.zones",
  });
  const highlights = t.raw("highlights") as { title: string; desc: string }[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        image="/deal-itpark.jpg"
      />
      <InvestorsSubnav current="zones" />

      <Section>
        <SectionHeading
          eyebrow={t("itParkEyebrow")}
          title={t("itParkTitle")}
          intro={t("itParkIntro")}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading
          eyebrow={t("programsEyebrow")}
          title={t("programsTitle")}
          intro={t("programsIntro")}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {PROGRAMS.map((program) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="group"
            >
              <Card interactive className="h-full">
                <h3 className="text-xl text-azure-700 group-hover:text-azure-800">
                  {program.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-ink">
                  {program.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {program.summary}
                </p>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/contact" variant="primary" size="lg">
            {t("ctaPrimary")}
          </ButtonLink>
          <ButtonLink href="/programs" variant="outline" size="lg">
            {t("ctaSecondary")}
          </ButtonLink>
        </div>
        <p className="mt-10 max-w-2xl text-sm text-slate">
          {t.rich("nationalNote", {
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
      </Section>

      <ContactCta />
    </>
  );
}
