import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { SECTORS } from "@/content/sectors";

export const metadata: Metadata = {
  title: "Sectors",
  description:
    "Priority digital sectors for investment in Uzbekistan — AI, infrastructure, outsourcing, gaming, fintech and education.",
};

export default async function SectorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        eyebrow="Opportunities"
        title="Priority digital sectors."
        subtitle="Where foreign capital, partnerships and market entry are actively supported — from AI compute to talent pipelines."
        image="/sector-ai.jpg"
      />

      <Section>
        <SectionHeading
          eyebrow="Sectors"
          title="Where we focus investment support."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((sector) => (
            <Link
              key={sector.slug}
              href={`/sectors/${sector.slug}`}
              className="group"
            >
              <Card interactive className="h-full overflow-hidden !p-0">
                <div className="aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sector.img}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg group-hover:text-azure-700">
                    {sector.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {sector.short}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

    </>
  );
}
