import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Presentation } from "@/components/home/presentation";

const PRESENTATION_PREVIEW =
  "https://drive.google.com/file/d/1GA44feH0NOa4yvzquvBm6WZMZjrZZjGF/preview";

export function WhyUzbekistan() {
  const t = useTranslations("home.why");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <Section tone="paper" className="!py-20 md:!py-28">
      {/* Editorial two-column */}
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: text */}
        <div>
          <span className="eyebrow">{t("label")}</span>
          <h2 className="mt-3 text-3xl md:text-4xl">{t("title")}</h2>
          <div className="mt-6 space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-steel">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Right: tall Tashkent City photo */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tashkent-city.webp"
            alt={t("photoAlt")}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Investment presentation */}
      <div className="mt-20 border-t border-line pt-16 md:mt-28 md:pt-20">
        <Presentation
          intro={t("presentation.intro")}
          title={t("presentation.title")}
          desc={t("presentation.desc")}
          button={t("presentation.button")}
          previewSrc={PRESENTATION_PREVIEW}
        />
      </div>
    </Section>
  );
}
