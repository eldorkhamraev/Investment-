"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { Icons } from "@/components/ui/icons";
import { SECTORS } from "@/content/sectors";

type SectorItem = {
  slug: string;
  name: string;
  desc: string;
};

export function Sectors() {
  const t = useTranslations("home.sectors");
  const items = t.raw("items") as SectorItem[];
  const previewImg = SECTORS[0]?.img;

  return (
    <Section tone="mist" className="!py-14 md:!py-16">
      <div className="max-w-xl">
        <span className="eyebrow">{t("label")}</span>
        <h2 className="mt-2 text-2xl md:text-3xl">{t("title")}</h2>
        <p className="mt-3 text-base leading-relaxed text-steel">{t("intro")}</p>
      </div>

      <div className="mt-8 grid overflow-hidden rounded-2xl border border-line bg-white lg:grid-cols-[13rem_minmax(0,1fr)]">
        <ul className="flex flex-row overflow-x-auto border-b border-line divide-x divide-line lg:flex-col lg:divide-x-0 lg:divide-y lg:overflow-visible lg:border-b-0 lg:border-r">
          {items.map((item) => (
            <li key={item.slug} className="shrink-0 lg:w-full">
              <Link
                href={`/sectors/${item.slug}`}
                className="block px-3.5 py-3 text-sm font-semibold text-steel transition-colors duration-200 hover:bg-mist hover:text-ink lg:px-4 lg:py-3.5"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/sectors"
          className="group flex min-w-0 flex-col outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-azure-400"
        >
          <div className="relative h-40 overflow-hidden bg-cloud sm:h-44 lg:h-48">
            {previewImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewImg}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            ) : null}
          </div>
          <div className="flex flex-1 flex-col gap-3 border-t border-line px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <div className="min-w-0 max-w-lg">
              <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-azure-800">
                {t("title")}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate line-clamp-2">
                {t("intro")}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-azure-700">
              {t("cta")}
              <Icons.arrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </div>
    </Section>
  );
}
