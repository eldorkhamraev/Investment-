import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { Icons } from "@/components/ui/icons";
import { FEATURED_REGION_IDS } from "@/lib/regionData";

type RegionCopy = {
  name: string;
  description: string;
};

export async function RegionsTeaser() {
  const t = await getTranslations("home.regionsTeaser");
  const regionsT = await getTranslations("regionsPage");
  const items = regionsT.raw("items") as Record<string, RegionCopy>;

  return (
    <Section tone="mist" className="!py-14 md:!py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-2 text-2xl md:text-3xl">{t("title")}</h2>
          <p className="mt-3 text-base leading-relaxed text-steel">{t("intro")}</p>
        </div>
        <Link
          href="/regions"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-azure-700 transition-colors hover:text-azure-800"
        >
          {t("cta")}
          <Icons.arrow className="h-4 w-4" />
        </Link>
      </div>

      <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED_REGION_IDS.map((id) => {
          const copy = items[id];
          if (!copy) return null;
          return (
            <li key={id} className="bg-white">
              <Link
                href={`/regions?region=${id}`}
                className="group flex h-full flex-col px-5 py-5 transition-colors hover:bg-mist sm:px-6 sm:py-6"
              >
                <h3 className="text-base font-semibold tracking-tight text-ink transition-colors group-hover:text-azure-800">
                  {copy.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate line-clamp-3">
                  {copy.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-azure-700">
                  {t("openRegion")}
                  <Icons.arrow className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
