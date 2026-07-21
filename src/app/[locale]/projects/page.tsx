import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { ContactCta } from "@/components/home/contact-cta";
import { PortfolioExplorer } from "@/components/projects/portfolio-explorer";
import { projectsByYear } from "@/content/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectsPage.hero" });
  return { title: "Projects", description: t("subtitle") };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProjectsContent />;
}

function ProjectsContent() {
  const t = useTranslations("projectsPage");
  const years = projectsByYear().map((y) => ({
    year: y.year,
    deals: y.deals.map((d) => ({
      sector: d.sector,
      title: d.title,
      img: d.img,
      desc: d.desc,
      slug: d.slug,
    })),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/deal-itpark.jpg"
      />
      <Section>
        <PortfolioExplorer
          label={t("portfolio.label")}
          title={t("portfolio.title")}
          intro={t("portfolio.intro")}
          hint={t("portfolio.hint")}
          years={years}
        />
      </Section>
      <ContactCta />
    </>
  );
}
