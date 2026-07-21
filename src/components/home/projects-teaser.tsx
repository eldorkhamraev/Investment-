import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { PROJECTS } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";

export function ProjectsTeaser() {
  const items = PROJECTS.slice(0, 3);

  return (
    <Section>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Opportunities"
          title="Investment projects in the digital sector."
          intro="From landmark AI infrastructure to export-oriented delivery — open any project for the full brief."
        />
        <ButtonLink href="/projects" variant="outline" className="shrink-0">
          View all projects
          <Icons.arrow className="h-4 w-4" />
        </ButtonLink>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="group">
            <Card interactive className="h-full overflow-hidden !p-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt={p.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <Badge tone="azure">{p.sector}</Badge>
                  {p.status ? (
                    <span className="text-xs text-slate">{p.status}</span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-lg group-hover:text-azure-700">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate">
                  {p.desc}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
