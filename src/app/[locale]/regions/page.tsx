import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { UzbekistanMap } from "@/components/regions/uzbekistan-map";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "regionsPage" });
  return {
    title: t("metaTitle"),
    description: t("subtitle"),
  };
}

export default async function RegionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "regionsPage" });

  return (
    <>
      <section className="bg-ink">
        <div className="container-edge py-16 md:py-20">
          <p className="eyebrow !text-azure-300">{t("eyebrow")}</p>
          <h1 className="mt-3 max-w-3xl text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-azure-100/80">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="bg-paper py-12 md:py-16">
        <div className="container-edge">
          <UzbekistanMap />
        </div>
      </section>
    </>
  );
}
