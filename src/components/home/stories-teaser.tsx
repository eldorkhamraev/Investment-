import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { STORIES } from "@/content/stories";
import { getStories } from "@/lib/cms";

export async function StoriesTeaser() {
  const cms = await getStories(3);
  const cmsMapped = cms.map((s) => ({
    slug: s.slug,
    company: s.company,
    sector: s.sector,
    country: s.country,
    excerpt: s.excerpt,
    image: s.image || "/deal-itpark.jpg",
    highlight: s.highlight || undefined,
  }));
  const merged =
    cmsMapped.length > 0
      ? [
          ...cmsMapped,
          ...STORIES.filter((s) => !cmsMapped.some((c) => c.slug === s.slug)),
        ]
      : STORIES;
  const items = merged.slice(0, 3);

  return (
    <Section>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Success stories"
          title="Proof from the digital sector."
          intro="Foreign capital, talent partnerships and export milestones — the cases investors ask about first."
        />
        <ButtonLink href="/stories" variant="outline" className="shrink-0">
          All stories
          <Icons.arrow className="h-4 w-4" />
        </ButtonLink>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((s) => (
          <Link
            key={s.slug}
            href={`/stories/${s.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-0.5 hover:border-azure-200 hover:shadow-lift"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt={s.company}
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-2">
                <Badge tone="azure">{s.sector}</Badge>
                {s.highlight ? (
                  <span className="text-xs text-slate">{s.highlight}</span>
                ) : null}
              </div>
              <h3 className="mt-3 text-lg group-hover:text-azure-700">
                {s.company}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate">
                {s.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
