import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactCta } from "@/components/home/contact-cta";
import { Link } from "@/i18n/navigation";
import { RESOURCES } from "@/content/resources";
import { getDocuments } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides, presentations and one-pagers for investing in Uzbekistan's digital sector.",
};

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cms = await getDocuments();
  const items =
    cms.length > 0
      ? [
          ...cms.map((d) => ({
            slug: d.slug,
            title: d.title,
            category: d.category,
            description: d.description,
            href: d.href,
            external: d.external,
            date: d.date,
          })),
          ...RESOURCES.filter((r) => !cms.some((d) => d.slug === r.slug)),
        ]
      : RESOURCES;

  return (
    <>
      <PageHero
        eyebrow="For investors"
        title="Resources & documents."
        subtitle="Presentations, checklists and one-pagers to share with your team before the first call."
        image="/services-hero.jpg"
      />

      <Section>
        <SectionHeading
          eyebrow="Library"
          title="Download or open what you need."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const isExternal =
              item.external ||
              item.href.startsWith("http://") ||
              item.href.startsWith("https://");
            const inner = (
              <Card interactive className="h-full">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="azure">{item.category}</Badge>
                  {item.date ? (
                    <span className="text-xs text-slate">{item.date}</span>
                  ) : null}
                </div>
                <h3 className="mt-4 text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {item.description}
                </p>
              </Card>
            );

            if (isExternal) {
              return (
                <a
                  key={item.slug}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  {inner}
                </a>
              );
            }

            return (
              <Link key={item.slug} href={item.href} className="group">
                {inner}
              </Link>
            );
          })}
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
