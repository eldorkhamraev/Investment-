import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { PortfolioExplorer } from "@/components/projects/portfolio-explorer";
import { PROJECTS, type ProjectDeal } from "@/content/projects";
import { getProjects } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectsPage.hero" });
  return { title: "Projects", description: t("subtitle") };
}

function groupByYear(projects: ProjectDeal[]) {
  const years = [...new Set(projects.map((p) => p.year).filter(Boolean))].sort(
    (a, b) => b.localeCompare(a),
  );
  return years.map((year) => ({
    year,
    deals: projects
      .filter((p) => p.year === year)
      .map((d) => ({
        sector: d.sector,
        title: d.title,
        img: d.img,
        desc: d.desc,
        slug: d.slug,
      })),
  }));
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projectsPage" });

  const cms = await getProjects();
  const cmsMapped: ProjectDeal[] = cms.map((p) => ({
    slug: p.slug,
    year: p.year || "Other",
    sector: p.sector,
    title: p.title,
    img: p.image || "/deal-itpark.jpg",
    desc: p.desc,
    status: p.status || undefined,
  }));
  const projects =
    cmsMapped.length > 0
      ? [
          ...cmsMapped,
          ...PROJECTS.filter((p) => !cmsMapped.some((c) => c.slug === p.slug)),
        ]
      : PROJECTS;
  const years = groupByYear(projects);

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
    </>
  );
}
