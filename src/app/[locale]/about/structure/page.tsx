import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { AboutSubnav } from "@/components/about/about-subnav";
import { AboutPageShell } from "@/components/about/about-shell";
import { OfficeStructure } from "@/components/about/office-structure";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("structure.metaTitle"),
    description: t("structure.metaDescription"),
  };
}

export default async function AboutStructurePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <PageHero
        eyebrow={t("structure.eyebrow")}
        title={t("structure.title")}
        subtitle={t("structure.intro")}
        image="/samarkand.jpg"
      />
      <AboutSubnav current="structure" />

      <AboutPageShell>
        <div className="border border-line bg-white px-4 py-10 md:px-6 md:py-12">
          <Suspense fallback={null}>
            <OfficeStructure />
          </Suspense>
        </div>
      </AboutPageShell>
    </>
  );
}
