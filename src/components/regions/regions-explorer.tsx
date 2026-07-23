"use client";

import { useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { REGIONS, type RegionStats } from "@/lib/regionData";
import { Icons } from "@/components/ui/icons";

type RegionCopy = {
  name: string;
  description: string;
  facts: string[];
};

const STAT_KEYS: (keyof RegionStats)[] = [
  "population",
  "projects",
  "fdi",
  "trade",
];

const DEFAULT_REGION = "tashkent-city";

function resolveId(candidate: string | null | undefined) {
  if (candidate && REGIONS.some((r) => r.id === candidate)) return candidate;
  return DEFAULT_REGION;
}

export function RegionsExplorer({ initialId }: { initialId?: string }) {
  const t = useTranslations("regionsPage");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedId = resolveId(searchParams.get("region") ?? initialId);

  const items = t.raw("items") as Record<string, RegionCopy>;
  const selected = useMemo(
    () => REGIONS.find((r) => r.id === selectedId) ?? REGIONS[0],
    [selectedId],
  );
  const copy = items[selected.id];

  const select = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("region", id);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  if (!copy) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="grid lg:grid-cols-[15.5rem_minmax(0,1fr)] xl:grid-cols-[17rem_minmax(0,1fr)]">
        <nav
          className="border-b border-line lg:border-b-0 lg:border-r"
          aria-label={t("listLabel")}
        >
          <p className="hidden px-4 pt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel lg:block">
            {t("listLabel")}
          </p>
          <ul className="flex gap-1 overflow-x-auto px-3 py-3 lg:mt-1 lg:max-h-[36rem] lg:flex-col lg:gap-0 lg:overflow-y-auto lg:px-0 lg:py-2">
            {REGIONS.map((region) => {
              const name = items[region.id]?.name ?? region.id;
              const active = region.id === selected.id;
              return (
                <li key={region.id} className="shrink-0 lg:w-full">
                  <button
                    type="button"
                    onClick={() => select(region.id)}
                    aria-current={active ? "true" : undefined}
                    className={`relative w-full rounded-full px-3.5 py-2 text-left text-sm transition-colors lg:rounded-none lg:px-4 lg:py-2.5 ${
                      active
                        ? "bg-azure-600 font-semibold text-white lg:bg-mist lg:text-ink lg:before:absolute lg:before:inset-y-1.5 lg:before:left-0 lg:before:w-0.5 lg:before:rounded-full lg:before:bg-azure-600"
                        : "font-medium text-steel hover:bg-mist hover:text-ink"
                    }`}
                  >
                    {name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex min-w-0 flex-col">
          <div className="border-b border-line bg-mist/60 px-5 py-5 sm:px-7 sm:py-6">
            <p className="eyebrow">{t("detailEyebrow")}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              {copy.name}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate">
              {copy.description}
            </p>
          </div>

          {selected.stats ? (
            <div className="grid grid-cols-2 gap-px border-b border-line bg-line sm:grid-cols-4">
              {STAT_KEYS.map((key) => (
                <div key={key} className="bg-white px-4 py-4 sm:px-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-steel">
                    {t(`statLabels.${key}`)}
                  </p>
                  <p className="mt-1.5 text-lg font-semibold tracking-tight text-ink">
                    {selected.stats?.[key]}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="flex flex-1 flex-col gap-8 px-5 py-6 sm:px-7 sm:py-8">
            <div>
              <h3 className="text-sm font-semibold text-ink">{t("keyFacts")}</h3>
              <ul className="mt-3 space-y-2.5">
                {copy.facts.map((fact) => (
                  <li
                    key={fact}
                    className="flex gap-3 text-sm leading-relaxed text-slate"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-azure-600"
                      aria-hidden
                    />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex flex-wrap gap-3 border-t border-line pt-6">
              {selected.pdfUrl ? (
                <a
                  href={selected.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line bg-white px-5 text-[0.95rem] font-semibold tracking-tight text-ink transition-all duration-200 hover:border-azure-400 hover:text-azure-700"
                >
                  {t("downloadBrief")}
                  <Icons.arrow className="h-4 w-4 -rotate-45" />
                </a>
              ) : null}
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gold-500 px-5 text-[0.95rem] font-semibold tracking-tight text-ink shadow-sm transition-all duration-200 hover:bg-gold-400 hover:shadow-md"
              >
                {t("bookIntro")}
                <Icons.arrow className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
