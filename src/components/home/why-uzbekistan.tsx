import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export function WhyUzbekistan() {
  const t = useTranslations("home.why");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <Section tone="paper" className="!py-14 md:!py-20">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <span className="eyebrow">{t("label")}</span>
          <h2 className="mt-2 text-2xl md:text-3xl lg:text-[2rem] lg:leading-tight">
            {t("title")}
          </h2>
          <div className="mt-4 space-y-3">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-steel md:text-[1.05rem]">
                {p}
              </p>
            ))}
          </div>
          <ButtonLink href="/why" variant="outline" className="mt-6" size="sm">
            {t("explore")}
            <Icons.arrow className="h-4 w-4" />
          </ButtonLink>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lift lg:aspect-[5/4]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tashkent-city.webp"
            alt={t("photoAlt")}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
