import { useTranslations } from "next-intl";
import { UzbekistanMap } from "@/components/regions/uzbekistan-map";

/**
 * Home investment map — compact, invest.gov-style card on select.
 */
export function InvestmentMap() {
  const t = useTranslations("home.investmentMap");

  return (
    <section className="border-y border-line bg-paper">
      <div className="container-edge py-12 md:py-16">
        <h2 className="text-center text-xl font-semibold tracking-tight text-azure-800 md:text-2xl lg:text-[1.75rem]">
          {t("title")}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm leading-relaxed text-steel md:text-base">
          {t("intro")}
        </p>

        <div className="mt-8 md:mt-10">
          <UzbekistanMap layout="portal" />
        </div>
      </div>
    </section>
  );
}
