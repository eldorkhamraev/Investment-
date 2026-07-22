import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section";
import { AboutSubnav } from "@/components/about/about-subnav";
import { AboutPageShell } from "@/components/about/about-shell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("office.metaTitle"),
    description: t("office.metaDescription"),
  };
}

export default async function AboutOfficePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const facts = t.raw("office.facts") as { label: string; value: string }[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/samarkand.jpg"
      />
      <AboutSubnav current="office" />

      <AboutPageShell>
        <SectionHeading
          eyebrow={t("office.eyebrow")}
          title={t("office.title")}
        />
        <div className="mt-8 space-y-5 text-base leading-relaxed text-steel md:text-lg">
          <p>{t("office.belongs")}</p>
          <p>{t("office.mandate")}</p>
          <p>{t("office.support")}</p>
        </div>
        <dl className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-mist px-5 py-4">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
                {fact.label}
              </dt>
              <dd className="mt-2 text-sm font-medium text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div className="relative mt-8 aspect-[21/9] overflow-hidden border border-line md:aspect-[2.4/1]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-building.png"
            alt={t("office.buildingAlt")}
            className="h-full w-full object-cover"
          />
        </div>
      </AboutPageShell>
    </>
  );
}
