import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactCta } from "@/components/home/contact-cta";
import { Link } from "@/i18n/navigation";
import { EVENTS, formatEventDate } from "@/content/events";
import { getEvents } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Forums, briefings and soft-landing clinics for investors in Uzbekistan's digital sector.",
};

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cms = await getEvents();
  const events =
    cms.length > 0
      ? cms.map((e) => ({
          slug: e.slug,
          title: e.title,
          date: e.date,
          endDate: e.endDate,
          location: e.location,
          type: e.type,
          excerpt: e.excerpt,
          image: e.image || undefined,
        }))
      : EVENTS;

  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <PageHero
        eyebrow="Calendar"
        title="Events & briefings."
        subtitle="Investment tracks, investor briefings and practical clinics for teams entering the market."
        image="/news/news-ictweek.webp"
      />

      <Section>
        <SectionHeading
          eyebrow="Upcoming"
          title="Meet us on the calendar."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {sorted.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="group"
            >
              <Card interactive className="h-full">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="azure">{event.type}</Badge>
                  <span className="text-xs text-slate">
                    {formatEventDate(event.date, event.endDate)}
                  </span>
                </div>
                <h3 className="mt-4 text-lg group-hover:text-azure-700">
                  {event.title}
                </h3>
                <p className="mt-1 text-sm text-slate">{event.location}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {event.excerpt}
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
