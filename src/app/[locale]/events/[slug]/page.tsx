import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ContactCta } from "@/components/home/contact-cta";
import { ButtonLink } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Icons } from "@/components/ui/icons";
import { EVENTS, formatEventDate, getEvent } from "@/content/events";
import { getEventBySlug } from "@/lib/cms";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getEventBySlug(slug);
  const event = cms ?? getEvent(slug);
  if (!event) return { title: "Event" };
  return { title: event.title, description: event.excerpt };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const cms = await getEventBySlug(slug);
  const event = cms
    ? {
        title: cms.title,
        date: cms.date,
        endDate: cms.endDate,
        location: cms.location,
        type: cms.type,
        excerpt: cms.excerpt,
        body: cms.body.length > 0 ? cms.body : [cms.excerpt],
        registrationUrl: cms.registrationUrl,
        image: cms.image || "/services-hero.jpg",
      }
    : getEvent(slug);

  if (!event) notFound();

  const image =
    "image" in event && event.image ? event.image : "/services-hero.jpg";

  return (
    <>
      <PageHero
        eyebrow={event.type}
        title={event.title}
        subtitle={event.excerpt}
        image={image}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-azure-700 hover:gap-2.5"
          >
            <Icons.arrow className="h-4 w-4 rotate-180" />
            All events
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge tone="azure">{event.type}</Badge>
            <span className="text-sm text-slate">
              {formatEventDate(event.date, event.endDate)}
            </span>
            <span className="text-sm text-slate">{event.location}</span>
          </div>
          <div className="mt-8 space-y-5">
            {event.body.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-steel">
                {p}
              </p>
            ))}
          </div>
          {"registrationUrl" in event && event.registrationUrl ? (
            <div className="mt-8">
              <ButtonLink
                href={event.registrationUrl}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register
              </ButtonLink>
            </div>
          ) : (
            <div className="mt-8">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Request an invitation
              </ButtonLink>
            </div>
          )}
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
