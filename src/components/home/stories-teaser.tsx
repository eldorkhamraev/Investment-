import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { STORIES } from "@/content/stories";
import { getStories } from "@/lib/cms";

type StoryCard = {
  slug: string;
  company: string;
  sector: string;
  country: string;
  excerpt: string;
  image: string;
  highlight?: string;
};

export async function StoriesTeaser() {
  const t = await getTranslations("home.stories");
  const cms = await getStories(6);
  const cmsMapped: StoryCard[] = cms.map((s) => ({
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
  const featured = merged[0];
  const rail = merged.slice(1, 5);

  if (!featured) return null;

  return (
    <Section className="!py-14 md:!py-16">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <ButtonLink href="/stories" variant="outline" className="shrink-0" size="sm">
          {t("cta")}
          <Icons.arrow className="h-4 w-4" />
        </ButtonLink>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8 lg:items-start">
        <Link
          href={`/stories/${featured.slug}`}
          className="group overflow-hidden rounded-2xl border border-line bg-white transition-colors duration-200 hover:border-azure-200"
        >
          <div className="relative h-56 overflow-hidden bg-cloud sm:h-64 lg:h-60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.image}
              alt={featured.company}
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="px-5 py-4 sm:px-6 sm:py-5">
            {featured.highlight ? (
              <p className="font-display text-xl font-bold tracking-tight text-azure-700">
                {featured.highlight}
              </p>
            ) : null}
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate">
              {featured.sector}
              {featured.country ? ` · ${featured.country}` : null}
            </p>
            <h3 className="mt-1.5 text-lg font-semibold text-ink transition-colors group-hover:text-azure-800">
              {featured.company}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-steel">
              {featured.excerpt}
            </p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-azure-700">
              {t("readStory")}
              <Icons.arrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>

        <div className="min-w-0 self-start">
          <p className="text-xs font-semibold uppercase leading-none tracking-wide text-slate">
            {t("more")}
          </p>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {rail.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/stories/${s.slug}`}
                  className="group flex items-center gap-4 py-3.5 transition-colors"
                >
                  <span className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-cloud sm:h-[5.25rem] sm:w-[7rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image}
                      alt=""
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    {s.highlight ? (
                      <span className="font-display block text-base font-bold tracking-tight text-azure-700">
                        {s.highlight}
                      </span>
                    ) : null}
                    <span className="mt-1 block text-sm font-semibold text-ink transition-colors group-hover:text-azure-800">
                      {s.company}
                    </span>
                    <span className="mt-0.5 block text-xs font-medium uppercase tracking-wide text-slate">
                      {s.sector}
                    </span>
                  </span>
                  <Icons.arrow className="h-3.5 w-3.5 shrink-0 text-steel opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-azure-600" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
