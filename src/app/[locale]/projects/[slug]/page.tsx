import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Icons } from "@/components/ui/icons";
import { PROJECTS, getProject } from "@/content/projects";
import { getProjectBySlug } from "@/lib/cms";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getProjectBySlug(slug);
  const project = cms ?? getProject(slug);
  if (!project) return { title: "Project" };
  return { title: project.title, description: project.desc };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const cms = await getProjectBySlug(slug);
  const project = cms
    ? {
        title: cms.title,
        sector: cms.sector,
        year: cms.year,
        status: cms.status,
        desc: cms.desc,
        img: cms.image || "/deal-itpark.jpg",
      }
    : getProject(slug);

  if (!project) notFound();

  const img = "img" in project ? project.img : "/deal-itpark.jpg";

  return (
    <>
      <PageHero
        eyebrow={project.sector}
        title={project.title}
        subtitle={project.desc}
        image={img}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-azure-700 hover:gap-2.5"
          >
            <Icons.arrow className="h-4 w-4 rotate-180" />
            All projects
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge tone="azure">{project.sector}</Badge>
            {project.year ? (
              <Badge tone="neutral">{project.year}</Badge>
            ) : null}
            {project.status ? (
              <Badge tone="neutral">{project.status}</Badge>
            ) : null}
          </div>
          <p className="mt-8 text-lg leading-relaxed text-steel">
            {project.desc}
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-line shadow-lift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={project.title}
              className="max-h-[480px] w-full object-cover"
            />
          </div>
          <div className="mt-10">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Discuss this project
            </ButtonLink>
          </div>
        </div>
      </Section>

    </>
  );
}
