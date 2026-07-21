import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { upcomingEvents, formatEventDate } from "@/content/events";

export function EventsTeaser() {
  const items = upcomingEvents(3);

  return (
    <Section tone="mist">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Events"
          title="Where investors meet the office."
          intro="Forums, briefings and soft-landing clinics on the calendar."
        />
        <ButtonLink href="/events" variant="outline" className="shrink-0">
          All events
          <Icons.arrow className="h-4 w-4" />
        </ButtonLink>
      </div>

      <div className="mt-12 grid gap-4">
        {items.map((e) => (
          <Link
            key={e.slug}
            href={`/events/${e.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-line bg-white p-5 transition-all hover:border-azure-200 hover:shadow-lift sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="azure">{e.type}</Badge>
                <span className="text-xs text-slate">
                  {formatEventDate(e.date, e.endDate)} · {e.location}
                </span>
              </div>
              <h3 className="mt-2 text-lg group-hover:text-azure-700">
                {e.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-slate">{e.excerpt}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-azure-700">
              Details <Icons.arrow className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
