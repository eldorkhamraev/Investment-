import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ContactCta } from "@/components/home/contact-cta";
import { Link } from "@/i18n/navigation";
import { PROGRAMS } from "@/content/programs";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "IT Park Zero Risk, IT-Visa, soft-landing and digital startup pathways for technology companies entering Uzbekistan.",
};

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        eyebrow="For investors"
        title="Programs that de-risk market entry."
        subtitle="Preferential tax, residence pathways, soft-landing support and startup routes — structured for technology companies."
        image="/deal-itpark.jpg"
      />

      <Section>
        <SectionHeading
          eyebrow="Programs"
          title="Choose the pathway that fits your model."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {PROGRAMS.map((program) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="group"
            >
              <Card interactive className="h-full">
                <h3 className="text-xl text-azure-700 group-hover:text-azure-800">
                  {program.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-ink">
                  {program.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {program.summary}
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
