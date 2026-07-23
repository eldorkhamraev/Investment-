import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, IconTile } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";

export const metadata: Metadata = { title: "Design System" };

const SWATCHES: { name: string; token: string; hex: string; text?: string }[] = [
  { name: "Ink", token: "bg-ink", hex: "#071E2F", text: "text-white" },
  { name: "Navy 800", token: "bg-navy-800", hex: "#0E3054", text: "text-white" },
  { name: "Azure 700", token: "bg-azure-700", hex: "#0E6483", text: "text-white" },
  { name: "Azure 600", token: "bg-azure-600", hex: "#0B7CA0", text: "text-white" },
  { name: "Azure 500", token: "bg-azure-500", hex: "#109CC4", text: "text-white" },
  { name: "Azure 200", token: "bg-azure-200", hex: "#A6E4F5" },
  { name: "Gold 500", token: "bg-gold-500", hex: "#E89A2C" },
  { name: "Gold 400", token: "bg-gold-400", hex: "#F2B44C" },
  { name: "Mist", token: "bg-mist", hex: "#F4F7F9" },
  { name: "Cloud", token: "bg-cloud", hex: "#E9EEF2" },
  { name: "Line", token: "bg-line", hex: "#DCE4EA" },
  { name: "Slate", token: "bg-slate", hex: "#5A6B7A", text: "text-white" },
];

export default async function StyleguidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Header band */}
      <Section tone="ink" className="!py-20">
        <Badge tone="gold">Internal reference</Badge>
        <h1 className="mt-4 text-4xl text-white md:text-5xl">Design System</h1>
        <p className="mt-4 max-w-2xl text-lg text-azure-100/80">
          The visual language for the Investment Project Office — investor-grade
          polish with governmental credibility. Azure-teal from the Uzbek flag,
          deep navy for authority, warm gold for action.
        </p>
      </Section>

      {/* Colour */}
      <Section>
        <SectionHeading
          eyebrow="Foundations"
          title="Colour"
          intro="One confident brand palette rather than a rainbow. Azure carries identity, navy carries authority, gold is reserved strictly for calls to action."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SWATCHES.map((s) => (
            <div
              key={s.name}
              className="overflow-hidden rounded-xl border border-line"
            >
              <div className={`flex h-24 items-end p-3 ${s.token}`}>
                <span className={`text-xs font-semibold ${s.text ?? "text-ink"}`}>
                  {s.name}
                </span>
              </div>
              <div className="bg-white px-3 py-2 font-mono text-[0.7rem] text-slate">
                {s.hex}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section tone="mist">
        <SectionHeading
          eyebrow="Foundations"
          title="Typography"
          intro="Montserrat for everything on-brand (gov.uz). Inter remains available as an optional long-form alternate via --font-alt."
        />
        <div className="mt-10 space-y-6 rounded-2xl border border-line bg-white p-8">
          <div>
            <span className="text-xs text-slate">Display / H1 — Montserrat 700</span>
            <p className="font-display text-5xl font-bold tracking-tight text-ink">
              Invest in Uzbekistan
            </p>
          </div>
          <div>
            <span className="text-xs text-slate">Heading / H2 — Montserrat</span>
            <h2 className="text-3xl">O‘zbekiston · Инвестиции · Digital</h2>
          </div>
          <div>
            <span className="text-xs text-slate">Body — Montserrat</span>
            <p className="max-w-2xl text-lg leading-relaxed text-steel">
              The Investment Project Office helps foreign technology companies
              enter Uzbekistan — from company registration and legal guidance to
              tax procedures and local partnerships.
            </p>
          </div>
          <div>
            <span className="text-xs text-slate">Optional alt — Inter (--font-alt)</span>
            <p className="max-w-2xl text-lg leading-relaxed text-steel [font-family:var(--font-alt)]">
              Long-form alternate if a denser reading face is needed later.
            </p>
          </div>
          <div>
            <span className="text-xs text-slate">Cyrillic body — Русский</span>
            <p className="max-w-2xl text-lg leading-relaxed text-steel">
              Офис инвестиционных проектов помогает иностранным технологическим
              компаниям выйти на рынок Узбекистана.
            </p>
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <Section>
        <SectionHeading eyebrow="Components" title="Buttons" />
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button size="lg">Large</Button>
          <Button size="md">Medium</Button>
          <Button size="sm">Small</Button>
          <ButtonLink href="/styleguide" variant="secondary">
            Button as link
          </ButtonLink>
        </div>
        <div className="mt-6 rounded-2xl bg-ink p-6">
          <Button variant="on-dark">On dark surface</Button>
        </div>
      </Section>

      {/* Statistics */}
      <Section tone="ink">
        <SectionHeading
          tone="dark"
          eyebrow="Components"
          title="Statistics"
          intro="Numbers are the persuasion. Counters animate on scroll and carry their source."
        />
        <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
          <Stat tone="dark" prefix="$" value={1} suffix="B+" decimals={0} label="IT services exports, 2025" source="Ministry of Digital Technologies" />
          <Stat tone="dark" value={2990} suffix="+" label="IT Park member companies" source="IT Park Uzbekistan" />
          <Stat tone="dark" value={44000} suffix="+" label="Tech jobs created" source="IT Park Uzbekistan" />
          <Stat tone="dark" value={90} label="Export destination countries" source="IT Park Uzbekistan" />
        </div>
      </Section>

      {/* Cards + badges */}
      <Section tone="mist">
        <SectionHeading eyebrow="Components" title="Cards & badges" />
        <div className="mt-6 flex flex-wrap gap-3">
          <Badge tone="azure">Azure</Badge>
          <Badge tone="gold">Priority sector</Badge>
          <Badge tone="success">Active</Badge>
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="outline">Outline</Badge>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { t: "Market entry", d: "Company registration, legal and administrative guidance for foreign investors." },
            { t: "Tax & residence", d: "Facilitation of residence and tax procedures, including the IT-Visa route." },
            { t: "Local partners", d: "Direct connections to vetted local service providers and partners." },
          ].map((c) => (
            <Card key={c.t} interactive>
              <IconTile>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7l8-4 8 4-8 4-8-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M4 12l8 4 8-4M4 17l8 4 8-4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </IconTile>
              <h3 className="mt-5 text-xl">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{c.d}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
