import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactCta } from "@/components/home/contact-cta";
import { Link } from "@/i18n/navigation";
import { Icons } from "@/components/ui/icons";
import { SECTORS, getSector } from "@/content/sectors";
import { getProject } from "@/content/projects";

export function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return { title: "Sectors" };
  return { title: sector.name, description: sector.short };
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const sector = getSector(slug);
  if (!sector) notFound();

  const related = sector.relatedProjectSlugs
    .map((s) => getProject(s))
    .filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={sector.name}
        title={sector.hero}
        subtitle={sector.short}
        image={sector.img}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/sectors"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-azure-700 hover:gap-2.5"
          >
            <Icons.arrow className="h-4 w-4 rotate-180" />
            All sectors
          </Link>
          <h2 className="mt-8 text-2xl md:text-3xl">The opportunity</h2>
          <p className="mt-4 text-lg leading-relaxed text-steel">
            {sector.opportunity}
          </p>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading
          eyebrow="Highlights"
          title="Signals investors watch."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {sector.highlights.map((h) => (
            <li key={h}>
              <Card>
                <p className="text-sm leading-relaxed text-steel">{h}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {related.length > 0 ? (
        <Section tone="ink">
          <SectionHeading
            tone="dark"
            eyebrow="Related projects"
            title="Deals and programmes in this sector."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((project) =>
              project ? (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  {project.status ? (
                    <Badge tone="neutral">{project.status}</Badge>
                  ) : null}
                  <h3 className="mt-3 text-lg text-white">{project.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/65">
                    {project.desc}
                  </p>
                </Link>
              ) : null,
            )}
          </div>
        </Section>
      ) : null}

      <ContactCta />
    </>
  );
}
