import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { SECTORS } from "@/content/sectors";

export function Sectors() {
  const t = useTranslations("home.sectors");

  return (
    <Section tone="mist">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow={t("label")}
          title={t("title")}
          intro={t("intro")}
        />
        <ButtonLink href="/sectors" variant="outline" className="shrink-0">
          {t("cta")}
          <Icons.arrow className="h-4 w-4" />
        </ButtonLink>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SECTORS.map((s) => (
          <Link
            key={s.slug}
            href={`/sectors/${s.slug}`}
            className="group relative block aspect-[4/3] overflow-hidden rounded-2xl shadow-card"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.img}
              alt={s.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-ink/25 to-transparent p-6">
              <h3 className="text-lg text-white transition-transform duration-200 group-hover:-translate-y-0.5">
                {s.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-white/75">
                {s.short}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
