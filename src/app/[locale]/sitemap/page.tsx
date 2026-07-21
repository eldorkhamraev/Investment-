import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { ContactCta } from "@/components/home/contact-cta";
import { Link } from "@/i18n/navigation";
import { FOOTER_EXPLORE } from "@/config/navigation";
import { WHY_PAGES } from "@/content/why";
import { SECTORS } from "@/content/sectors";
import { PROGRAMS } from "@/content/programs";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "HTML sitemap of the Investment Project Office website.",
};

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SitemapContent />;
}

function SitemapContent() {
  const t = useTranslations();

  return (
    <>
      <PageHero
        eyebrow="Site"
        title="Sitemap."
        subtitle="A complete list of main sections and key child pages."
        image="/samarkand.jpg"
      />

      <Section>
        <SectionHeading eyebrow="Explore" title="Main pages." />
        <ul className="mt-8 columns-1 gap-8 sm:columns-2 lg:columns-3">
          {FOOTER_EXPLORE.map((item) => (
            <li key={item.key} className="mb-3 break-inside-avoid">
              <Link
                href={item.href}
                className="font-semibold text-azure-700 hover:underline"
              >
                {t(`nav.${item.key}`)}
              </Link>
            </li>
          ))}
          <li className="mb-3 break-inside-avoid">
            <Link href="/privacy" className="font-semibold text-azure-700 hover:underline">
              {t("footer.privacy")}
            </Link>
          </li>
          <li className="mb-3 break-inside-avoid">
            <Link href="/cookies" className="font-semibold text-azure-700 hover:underline">
              {t("footer.cookies")}
            </Link>
          </li>
          <li className="mb-3 break-inside-avoid">
            <Link href="/search" className="font-semibold text-azure-700 hover:underline">
              {t("nav.search")}
            </Link>
          </li>
        </ul>
      </Section>

      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <h2 className="text-xl">Why Uzbekistan</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/why" className="text-sm text-azure-700 hover:underline">
                  Overview
                </Link>
              </li>
              {WHY_PAGES.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/why/${p.slug}`}
                    className="text-sm text-azure-700 hover:underline"
                  >
                    {p.eyebrow}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl">Sectors</h2>
            <ul className="mt-4 space-y-2">
              {SECTORS.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/sectors/${s.slug}`}
                    className="text-sm text-azure-700 hover:underline"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl">Programs</h2>
            <ul className="mt-4 space-y-2">
              {PROGRAMS.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/programs/${p.slug}`}
                    className="text-sm text-azure-700 hover:underline"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
