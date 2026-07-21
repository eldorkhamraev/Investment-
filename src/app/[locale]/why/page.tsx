import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactCta } from "@/components/home/contact-cta";
import { Link } from "@/i18n/navigation";
import { WHY_PAGES } from "@/content/why";

export const metadata: Metadata = {
  title: "Why digital Uzbekistan",
  description:
    "Talent, incentives, Digital Uzbekistan 2030, ecosystem and living — why technology investors choose Uzbekistan.",
};

export default async function WhyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        eyebrow="Why Uzbekistan"
        title="Why digital Uzbekistan."
        subtitle="A young STEM workforce, competitive incentives, a national digital strategy and an ecosystem opening to the world."
        image="/samarkand.jpg"
      />

      <Section>
        <SectionHeading
          eyebrow="The opportunity"
          title="Five reasons technology investors look here first."
          intro="Explore the foundations of Uzbekistan's digital pitch — from talent and tax to strategy, ecosystem and life on the ground."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_PAGES.map((page) => (
            <Link key={page.slug} href={`/why/${page.slug}`} className="group">
              <Card interactive className="h-full">
                <Badge tone="azure">{page.eyebrow}</Badge>
                <h3 className="mt-4 text-lg group-hover:text-azure-700">
                  {page.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {page.subtitle}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
