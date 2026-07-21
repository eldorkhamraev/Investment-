import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactCta } from "@/components/home/contact-cta";
import { Link } from "@/i18n/navigation";
import { STORIES } from "@/content/stories";
import { getStories } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Success stories",
  description:
    "How foreign technology investors and partners are building in Uzbekistan's digital economy.",
};

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cms = await getStories();
  const stories =
    cms.length > 0
      ? cms.map((s) => ({
          slug: s.slug,
          company: s.company,
          sector: s.sector,
          country: s.country,
          excerpt: s.excerpt,
          image: s.image || "/deal-itpark.jpg",
          highlight: s.highlight || undefined,
        }))
      : STORIES;

  return (
    <>
      <PageHero
        eyebrow="Opportunities"
        title="Success stories."
        subtitle="FDI, grants and partnerships already shaping Uzbekistan's digital economy."
        image="/deal-datavolt.jpg"
      />

      <Section>
        <SectionHeading
          eyebrow="Stories"
          title="Investors and partners already here."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <Link
              key={story.slug}
              href={`/stories/${story.slug}`}
              className="group"
            >
              <Card interactive className="h-full overflow-hidden !p-0">
                <div className="aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={story.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="azure">{story.sector}</Badge>
                    <span className="text-xs text-slate">{story.country}</span>
                  </div>
                  <h3 className="mt-3 text-lg group-hover:text-azure-700">
                    {story.company}
                  </h3>
                  {story.highlight ? (
                    <p className="mt-1 text-sm font-semibold text-azure-700">
                      {story.highlight}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {story.excerpt}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
