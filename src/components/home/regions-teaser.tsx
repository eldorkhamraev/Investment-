import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

/**
 * Homepage teaser for the interactive regions map (invest.gov embeds the map
 * on home; we keep a focused CTA to /regions to avoid crowding the slim home).
 */
export function RegionsTeaser() {
  const t = useTranslations("home.regionsTeaser");
  const bullets = t.raw("bullets") as string[];

  return (
    <Section tone="paper">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-3 text-3xl md:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-lg leading-relaxed text-steel">{t("intro")}</p>
          <ButtonLink href="/regions" className="mt-8">
            {t("cta")}
            <Icons.arrow className="h-4 w-4" />
          </ButtonLink>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-line bg-cloud p-8 md:p-10">
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-azure-100"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-gold-100/80"
            aria-hidden
          />
          <p className="relative text-xs font-semibold uppercase tracking-widest text-azure-700">
            {t("badge")}
          </p>
          <ul className="relative mt-5 space-y-3 text-sm text-steel">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-azure-600" />
                {bullet}
              </li>
            ))}
          </ul>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/samarkand.jpg"
            alt=""
            aria-hidden
            className="relative mt-8 h-36 w-full rounded-2xl object-cover opacity-90"
          />
        </div>
      </div>
    </Section>
  );
}
