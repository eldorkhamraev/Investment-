import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

type GuideItem = {
  title: string;
  desc: string;
  href: string;
  meta: string;
};

/**
 * Home strip mirroring invest.gov “explore the report” guide cards —
 * digital-scoped, downloadable placeholders until ministry decks land.
 */
export function GuidesStrip() {
  const t = useTranslations("home.guides");
  const items = t.raw("items") as GuideItem[];

  return (
    <Section tone="mist">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-3 text-3xl md:text-4xl">{t("title")}</h2>
          <p className="mt-3 text-lg leading-relaxed text-steel">{t("intro")}</p>
        </div>
        <ButtonLink href="/resources" variant="outline" className="shrink-0">
          {t("allResources")}
          <Icons.arrow className="h-4 w-4" />
        </ButtonLink>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {items.map((guide) => (
          <div
            key={guide.title}
            className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card sm:flex-row sm:items-center sm:gap-5 sm:p-7"
          >
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-azure-600">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 2.75h7.2L19 8.5V20a1.25 1.25 0 0 1-1.25 1.25H6A1.25 1.25 0 0 1 4.75 20V4A1.25 1.25 0 0 1 6 2.75Z"
                  fill="white"
                />
                <path
                  d="M13 2.75 19 8.5h-4.75A1.25 1.25 0 0 1 13 7.25V2.75Z"
                  fill="#BFE0F5"
                />
              </svg>
              <span className="absolute -bottom-1.5 right-0 rounded-[4px] bg-ink px-1 py-px text-[8px] font-bold leading-none tracking-wide text-white">
                PDF
              </span>
            </div>
            <div className="mt-4 min-w-0 flex-1 sm:mt-0">
              <h3 className="text-lg font-semibold text-ink">{guide.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">
                {guide.desc}
              </p>
              <p className="mt-2 text-xs font-medium text-steel">{guide.meta}</p>
            </div>
            <a
              href={guide.href}
              download
              className="mt-5 inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-azure-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-azure-700 sm:mt-0"
            >
              {t("explore")}
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}
