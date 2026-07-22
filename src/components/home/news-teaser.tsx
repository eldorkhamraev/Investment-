import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { getNews, type NewsItem } from "@/lib/cms";

export async function NewsTeaser() {
  const t = await getTranslations("home.news");
  const tPage = await getTranslations("newsPage");

  const cms = await getNews(6);
  const homeFallback = (t.raw("items") as NewsItem[]).map((n) => ({
    ...n,
    image: n.image ?? null,
  }));
  const pageFallback = (tPage.raw("items") as NewsItem[]).map((n) => ({
    ...n,
    image: n.image ?? null,
  }));
  const fallback = [
    ...homeFallback,
    ...pageFallback.filter(
      (p) => !homeFallback.some((h) => (h.slug && h.slug === p.slug) || h.title === p.title),
    ),
  ].slice(0, 6);
  const items: NewsItem[] = cms.length ? cms.slice(0, 6) : fallback;

  return (
    <Section tone="mist" className="!py-14 md:!py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-2 text-2xl md:text-3xl">{t("title")}</h2>
          <p className="mt-2 text-base leading-relaxed text-steel">{t("intro")}</p>
        </div>
        <ButtonLink href="/news" variant="outline" className="shrink-0" size="sm">
          {t("cta")}
          <Icons.arrow className="h-4 w-4" />
        </ButtonLink>
      </div>

      <ul className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((n, i) => (
          <li key={n.id ?? n.slug ?? `${n.title}-${i}`}>
            <Link
              href={n.id ? `/news/${n.id}` : n.slug ? `/news/${n.slug}` : "/news"}
              className="group block"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cloud">
                {n.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={n.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : null}
              </div>
              {n.date ? (
                <p className="mt-3 text-xs text-slate">{n.date}</p>
              ) : null}
              <h3 className="mt-1.5 text-sm font-semibold leading-snug text-ink transition-colors line-clamp-2 group-hover:text-azure-800 md:text-[0.95rem]">
                {n.title}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
