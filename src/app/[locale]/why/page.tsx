import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Link } from "@/i18n/navigation";
import { WhySubnav } from "@/components/why/why-subnav";
import { WhyNumbers } from "@/components/why/why-numbers";
import { WHY_HUB_STATS, WHY_PAGES } from "@/content/why";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "whyPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function WhyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "whyPage" });

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        image="/why/hub/samarkand.jpeg"
      />
      <WhySubnav />
      <WhyNumbers figures={WHY_HUB_STATS} />

      <section className="bg-paper py-16 md:py-24">
        <div className="container-edge">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">{t("hubEyebrow")}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              {t("hubTitle")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-steel md:text-lg">
              {t("hubIntro")}
            </p>
          </div>

          <ul className="mt-14 space-y-10 md:mt-16 md:space-y-12">
            {WHY_PAGES.map((page, index) => {
              const reverse = index % 2 === 1;
              return (
                <li key={page.slug}>
                  <Link
                    href={`/why/${page.slug}`}
                    className={`group grid min-h-[22rem] overflow-hidden border border-line bg-white transition-colors hover:border-azure-400 md:min-h-[24rem] md:grid-cols-2 ${
                      reverse ? "md:[&>div:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="relative min-h-[14rem] overflow-hidden bg-mist md:min-h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={page.cardImage}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10 lg:px-12">
                      <p className="eyebrow">{page.eyebrow}</p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink group-hover:text-azure-700 md:text-[1.65rem]">
                        {page.hubLabel}
                      </h3>
                      <div className="mt-4 space-y-3">
                        {page.hubBody.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="text-sm leading-relaxed text-slate md:text-[0.95rem] md:leading-relaxed"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <span className="mt-6 text-sm font-medium text-azure-700">
                        {t("exploreChapter")}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-12 max-w-2xl text-sm text-slate md:mt-16">
            {t.rich("sidebarNote", {
              link: (chunks) => (
                <a
                  href="https://invest.gov.uz/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-azure-700 underline-offset-2 hover:underline"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </section>
    </>
  );
}
