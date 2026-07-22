import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Icons } from "@/components/ui/icons";
import { STORIES, getStory } from "@/content/stories";
import { getProject } from "@/content/projects";
import { getStoryBySlug } from "@/lib/cms";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getStoryBySlug(slug);
  const story = cms ?? getStory(slug);
  if (!story) return { title: "Success story" };
  return {
    title: story.company,
    description: story.excerpt,
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const cms = await getStoryBySlug(slug);
  const staticStory = getStory(slug);
  const story = cms
    ? {
        company: cms.company,
        sector: cms.sector,
        sectorSlug: staticStory?.sectorSlug,
        country: cms.country,
        excerpt: cms.excerpt,
        image: cms.image || "/deal-itpark.jpg",
        highlight: cms.highlight || undefined,
        body: cms.body.length > 0 ? cms.body : [cms.excerpt],
        relatedProjectSlugs: staticStory?.relatedProjectSlugs,
      }
    : staticStory;

  if (!story) notFound();

  const related = (story.relatedProjectSlugs ?? [])
    .map((s) => getProject(s))
    .filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={story.sector}
        title={story.company}
        subtitle={story.excerpt}
        image={story.image}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-azure-700 hover:gap-2.5"
          >
            <Icons.arrow className="h-4 w-4 rotate-180" />
            All stories
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {"sectorSlug" in story && story.sectorSlug ? (
              <Link href={`/sectors/${story.sectorSlug}`}>
                <Badge tone="azure">{story.sector}</Badge>
              </Link>
            ) : (
              <Badge tone="azure">{story.sector}</Badge>
            )}
            <span className="text-sm text-slate">{story.country}</span>
            {story.highlight ? (
              <Badge tone="neutral">{story.highlight}</Badge>
            ) : null}
          </div>
          <div className="mt-8 space-y-5">
            {story.body.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-steel">
                {p}
              </p>
            ))}
          </div>

          {related.length > 0 ? (
            <div className="mt-12 border-t border-line pt-10">
              <h2 className="text-xl md:text-2xl">Related projects</h2>
              <ul className="mt-5 space-y-3">
                {related.map((project) =>
                  project ? (
                    <li key={project.slug}>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group flex items-start justify-between gap-4 rounded-xl border border-line bg-white px-4 py-3 transition-colors hover:border-azure-300"
                      >
                        <span>
                          <span className="font-semibold text-ink group-hover:text-azure-700">
                            {project.title}
                          </span>
                          <span className="mt-0.5 block text-sm text-slate">
                            {project.status}
                          </span>
                        </span>
                        <Icons.arrow className="mt-1 h-4 w-4 shrink-0 text-azure-700" />
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          ) : null}

          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Book an introduction</ButtonLink>
            <ButtonLink href="/stories" variant="outline">
              More success stories
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
