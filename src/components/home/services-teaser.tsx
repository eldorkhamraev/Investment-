import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Icons, type IconName } from "@/components/ui/icons";

type Service = { icon: IconName; title: string; desc: string };

export function ServicesTeaser() {
  const t = useTranslations("home.services");
  const items = t.raw("items") as Service[];

  return (
    <Section tone="mist">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />
        <ButtonLink href="/services" variant="outline" className="shrink-0">
          {t("cta")}
          <Icons.arrow className="h-4 w-4" />
        </ButtonLink>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s, i) => {
          const Icon = Icons[s.icon];
          return (
            <div
              key={s.title}
              className="group relative flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-azure-200 hover:shadow-lift"
            >
              <span className="font-display text-sm font-bold text-azure-300">
                0{i + 1}
              </span>
              <IconWrap>
                <Icon className="h-6 w-6" />
              </IconWrap>
              <h3 className="mt-4 text-lg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-azure-600 text-white shadow-sm">
      {children}
    </div>
  );
}
