import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { AboutSubnav } from "@/components/about/about-subnav";
import { AboutPageShell } from "@/components/about/about-shell";
import { TeamSection } from "@/components/about/team-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("team.metaTitle"),
    description: t("team.metaDescription"),
  };
}

export default async function AboutTeamPage({
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
        eyebrow={t("team.eyebrow")}
        title={t("team.title")}
        subtitle={t("team.intro")}
        image="/samarkand.jpg"
      />
      <AboutSubnav current="team" />

      <AboutPageShell>
        <TeamSection />
      </AboutPageShell>
    </>
  );
}
