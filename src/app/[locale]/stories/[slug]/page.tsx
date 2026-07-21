import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ContactCta } from "@/components/home/contact-cta";
import { Link } from "@/i18n/navigation";
import { Icons } from "@/components/ui/icons";
import { STORIES, getStory } from "@/content/stories";
import { getStoryBySlug } from "@/lib/cms";

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
  const story = cms
    ? {
        company: cms.company,
        sector: cms.sector,
        country: cms.country,
        excerpt: cms.excerpt,
        image: cms.image || "/deal-itpark.jpg",
        highlight: cms.highlight || undefined,
        body: cms.body.length > 0 ? cms.body : [cms.excerpt],
      }
    : getStory(slug);

  if (!story) notFound();

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
            <Badge tone="azure">{story.sector}</Badge>
            <span className="text-sm text-slate">{story.country}</span>
            {"highlight" in story && story.highlight ? (
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
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
