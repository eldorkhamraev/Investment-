import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ContactCta } from "@/components/home/contact-cta";
import { Icons, type IconName } from "@/components/ui/icons";
import { Link } from "@/i18n/navigation";
import { PROGRAMS } from "@/content/programs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.hero" });
  return { title: "Services", description: t("subtitle") };
}

type Service = { icon: IconName; title: string; desc: string };
type Step = { title: string; desc: string };

// Subtle flowing-line detail in the corner of each program card.
function ProgramCardLines() {
  return (
    <svg
      className="pointer-events-none absolute -bottom-2 right-0 h-24 w-48 text-azure-300"
      viewBox="0 0 200 100"
      fill="none"
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M0 ${92 - i * 12} C 70 ${92 - i * 12}, 90 ${40 - i * 10}, 200 ${40 - i * 10}`}
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.35"
        />
      ))}
    </svg>
  );
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesContent />;
}

function ServicesContent() {
  const t = useTranslations("services");
  const items = t.raw("list.items") as Service[];
  const steps = t.raw("process.steps") as Step[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/services-hero.jpg"
      />

      {/* Service list */}
      <Section>
        <SectionHeading eyebrow={t("list.eyebrow")} title={t("list.title")} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => {
            const Icon = Icons[s.icon];
            return (
              <Card key={s.title} interactive>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-azure-600 text-white shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{s.desc}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Process */}
      <Section tone="ink">
        <SectionHeading tone="dark" eyebrow={t("process.eyebrow")} title={t("process.title")} />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="font-display text-3xl font-extrabold text-azure-300">
                {i + 1}
              </span>
              <h3 className="mt-3 text-lg text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{s.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Programs — anchor text (1/3) + clean 2x2 card grid (2/3) */}
      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
          <div>
            <span className="text-sm font-semibold text-azure-700">
              {t("programs.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl">{t("programs.title")}</h2>
            <p className="mt-4 leading-relaxed text-slate">
              {t("programs.intro")}
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-6 sm:grid-cols-2">
              {PROGRAMS.map((p) => (
                <Link
                  key={p.slug}
                  href={`/programs/${p.slug}`}
                  className="relative min-h-52 overflow-hidden rounded-2xl border border-line bg-white p-8 transition-all hover:-translate-y-0.5 hover:border-azure-200 hover:shadow-lift"
                >
                  <h3 className="text-xl text-azure-700">{p.name}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate">
                    {p.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-azure-700">
                    Learn more <Icons.arrow className="h-4 w-4" />
                  </span>
                  <ProgramCardLines />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
