import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ContactCta } from "@/components/home/contact-cta";
import { Link } from "@/i18n/navigation";
import { Icons } from "@/components/ui/icons";
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
        <div className="mx-auto max-w-3xl">
          <Link
            href="/why"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-azure-700 hover:gap-2.5"
          >
            <Icons.arrow className="h-4 w-4 rotate-180" />
            Why Uzbekistan
          </Link>
          <div className="mt-8 space-y-5">
            {page.body.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-steel">
                {p}
              </p>
            ))}
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

      <ContactCta />
    </>
  );
}
