import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { SimpleBars } from "@/components/ui/simple-bars";
import { WhySidebar } from "@/components/why/why-sidebar";
import { WHY_PAGES, getWhyPage } from "@/content/why";

export function generateStaticParams() {
  return WHY_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getWhyPage(slug);
  if (!page) return { title: "Why Uzbekistan" };
  return { title: page.eyebrow, description: page.subtitle };
}

export default async function WhyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const page = getWhyPage(slug);
  if (!page) notFound();

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
        image={page.image}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <WhySidebar current={page.slug} />
          <div className="min-w-0">
            <div className="space-y-5">
              {page.body.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-steel">
                  {p}
                </p>
              ))}
            </div>

            {page.charts && page.charts.length > 0 ? (
              <div className="mt-12 grid gap-6">
                {page.charts.map((chart) => (
                  <SimpleBars
                    key={chart.title}
                    title={chart.title}
                    caption={chart.caption}
                    unit={chart.unit}
                    items={chart.items}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading eyebrow="Key points" title="What investors should know." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {page.points.map((point) => (
            <Card key={point.title}>
              <h3 className="text-lg">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {point.desc}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
