import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";

type Milestone = { year: string; title: string; desc: string };

export function Timeline() {
  const t = useTranslations("home.timeline");
  const items = t.raw("items") as Milestone[];

  return (
    <Section tone="paper">
      <SectionHeading eyebrow={t("label")} title={t("title")} />

      {/* Desktop: horizontal timeline */}
      <div className="mt-14 hidden md:block">
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map((m) => (
            <div key={m.year} className="font-display text-4xl font-extrabold tracking-tight text-azure-600 lg:text-5xl">
              {m.year}
            </div>
          ))}
        </div>

        {/* Node track */}
        <div className="relative my-6">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
          <div
            className="relative grid gap-6"
            style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
          >
            {items.map((m) => (
              <div key={m.year} className="flex">
                <span className="h-3.5 w-3.5 rounded-full bg-azure-500 ring-4 ring-azure-100" />
              </div>
            ))}
          </div>
        </div>

        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map((m) => (
            <div key={m.year} className="pr-4">
              <h3 className="text-base">{m.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <ol className="relative mt-10 space-y-8 border-l border-line pl-6 md:hidden">
        {items.map((m) => (
          <li key={m.year} className="relative">
            <span className="absolute -left-[1.9rem] top-1.5 h-3.5 w-3.5 rounded-full bg-azure-500 ring-4 ring-azure-100" />
            <div className="font-display text-2xl font-extrabold text-azure-600">
              {m.year}
            </div>
            <h3 className="mt-1 text-base">{m.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate">{m.desc}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
