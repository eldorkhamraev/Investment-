import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { getNews, type NewsItem } from "@/lib/cms";

export async function NewsTeaser() {
  const t = await getTranslations("home.news");

  // CMS-first (latest 3); fall back to the built-in stories until published.
  const cms = await getNews(3);
  const fallback = (t.raw("items") as Omit<NewsItem, "image">[]).map((n) => ({
    ...n,
    image: null as string | null,
  }));
  const items: NewsItem[] = cms.length ? cms : fallback.slice(0, 3);

  return (
    <Section tone="mist">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <ButtonLink href="/news" variant="outline" className="shrink-0">
          {t("cta")}
          <Icons.arrow className="h-4 w-4" />
        </ButtonLink>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((n, i) => (
          <Link
            key={n.id ?? `${n.title}-${i}`}
            href={n.id ? `/news/${n.id}` : "/news"}
            className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-azure-200 hover:shadow-lift"
          >
            {n.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={n.image}
                alt={n.title}
                className="h-40 w-full object-cover"
              />
            ) : null}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3">
                {n.tag ? <Badge tone="azure">{n.tag}</Badge> : null}
                <span className="text-xs text-slate">{n.date}</span>
              </div>
              <h3 className="mt-4 text-lg leading-snug group-hover:text-azure-700">
                {n.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                {n.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-azure-700 transition-transform group-hover:gap-2.5">
                Read <Icons.arrow className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
