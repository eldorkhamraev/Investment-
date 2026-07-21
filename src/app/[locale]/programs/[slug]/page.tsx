import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ContactCta } from "@/components/home/contact-cta";
import { ButtonLink } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Icons } from "@/components/ui/icons";
import { PROGRAMS, getProgram } from "@/content/programs";

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return { title: "Programs" };
  return { title: program.name, description: program.tagline };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const program = getProgram(slug);
  if (!program) notFound();

  return (
    <>
      <PageHero
        eyebrow="Program"
        title={program.name}
        subtitle={program.tagline}
        image="/services-hero.jpg"
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-azure-700 hover:gap-2.5"
          >
            <Icons.arrow className="h-4 w-4 rotate-180" />
            All programs
          </Link>
          <p className="mt-8 text-lg leading-relaxed text-steel">
            {program.summary}
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Discuss {program.ctaInterest}
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <SectionHeading eyebrow="Benefits" title="What you get." />
            <ul className="mt-6 space-y-3">
              {program.benefits.map((b) => (
                <li key={b}>
                  <Card>
                    <p className="text-sm leading-relaxed text-steel">{b}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Who it's for" title="Typical applicants." />
            <ul className="mt-6 space-y-3">
              {program.who.map((w) => (
                <li key={w}>
                  <Card>
                    <p className="text-sm leading-relaxed text-steel">{w}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Process" title="How it typically runs." />
            <ol className="mt-6 space-y-3">
              {program.steps.map((s, i) => (
                <li key={s}>
                  <Card>
                    <span className="font-display text-xl font-extrabold text-azure-600">
                      {i + 1}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-steel">{s}</p>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
