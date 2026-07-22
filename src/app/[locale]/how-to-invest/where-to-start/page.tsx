import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { InvestorsSubnav } from "@/components/investors/investors-subnav";
import { ContactCta } from "@/components/home/contact-cta";
import { WHERE_TO_START_STEPS } from "@/content/investors";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "investorsPage.whereToStart",
  });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function WhereToStartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: "investorsPage.whereToStart",
  });

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        image="/tashkent-city.webp"
      />
      <InvestorsSubnav current="where-to-start" />

      <Section>
        <SectionHeading
          eyebrow={t("pathEyebrow")}
          title={t("pathTitle")}
          intro={t("pathIntro")}
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2">
          {WHERE_TO_START_STEPS.map((step, i) => (
            <li key={step.title}>
              <Card className="h-full">
                <span className="font-display text-3xl font-extrabold text-azure-600">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {step.desc}
                </p>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {step.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm font-semibold text-azure-700 hover:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/contact" variant="primary" size="lg">
            {t("ctaPrimary")}
          </ButtonLink>
          <ButtonLink href="/services" variant="outline" size="lg">
            {t("ctaSecondary")}
          </ButtonLink>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
