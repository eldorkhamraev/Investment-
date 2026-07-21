import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card, IconTile } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { ContactCta } from "@/components/home/contact-cta";
import { Icons, type IconName } from "@/components/ui/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.hero" });
  return { title: "About", description: t("subtitle") };
}

type Focus = { icon: IconName; title: string; desc: string };
type Leader = { name: string; role: string; photo?: string };
type Initiative = { title: string; desc: string };

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");
  const focus = t.raw("focus.items") as Focus[];
  const leaders = t.raw("team.leaders") as Leader[];
  const initiatives = t.raw("initiatives.items") as Initiative[];
  const mission = t.raw("mission.body") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/samarkand.jpg"
      />

      {/* Mission */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">{t("mission.eyebrow")}</span>
            <h2 className="mt-3 text-3xl md:text-4xl">{t("mission.title")}</h2>
            <div className="mt-6 space-y-5">
              {mission.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-steel">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line shadow-lift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about-building.png"
              alt="Uzbekistan — a new regional IT hub"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Macro stats */}
      <Section tone="ink">
        <SectionHeading
          tone="dark"
          eyebrow="By the numbers"
          title={t("stats.title")}
          intro={t("stats.intro")}
        />
        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          <Stat tone="dark" prefix="$" value={11.9} suffix="B" decimals={1} label="Foreign direct investment in 2024, up 50% year on year" source="Investment Project Office" />
          <Stat tone="dark" value={275} suffix="K" label="Uzbek developers on GitHub — 10× growth since 2020" source="GitHub Innovation Graph" />
          <Stat tone="dark" value={21} suffix="×" label="Growth in video-game exports over three years" source="Investment Project Office" />
          <Stat tone="dark" value={90} label="Countries importing Uzbekistan's digital services" source="IT Park Uzbekistan" />
        </div>
      </Section>

      {/* Focus areas */}
      <Section tone="mist">
        <SectionHeading eyebrow={t("focus.eyebrow")} title={t("focus.title")} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {focus.map((f) => {
            const Icon = Icons[f.icon];
            return (
              <Card key={f.title}>
                <IconTile>
                  <Icon className="h-6 w-6" />
                </IconTile>
                <h3 className="mt-5 text-lg">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* National initiatives */}
      <Section>
        <SectionHeading
          eyebrow={t("initiatives.eyebrow")}
          title={t("initiatives.title")}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {initiatives.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Leadership */}
      <Section tone="mist">
        <SectionHeading
          eyebrow={t("team.eyebrow")}
          title={t("team.title")}
          intro={t("team.intro")}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((l, i) => (
            <Card key={l.name}>
              <div className="flex items-center gap-4">
                {l.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={l.photo}
                    alt={l.name}
                    className="h-14 w-14 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, var(--color-azure-${i % 2 ? "600" : "700"}), var(--color-navy-800))`,
                    }}
                    aria-hidden="true"
                  >
                    {initials(l.name)}
                  </span>
                )}
                <div>
                  <h3 className="text-base leading-tight">{l.name}</h3>
                  <p className="mt-1 text-sm leading-snug text-slate">{l.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <ContactCta />
    </>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}
