import { useTranslations } from "next-intl";
import { HeroAtmosphere } from "@/components/ui/hero-atmosphere";
import { HeroMedia } from "@/components/ui/hero-media";
import { WatchFilm } from "@/components/home/watch-film";
import { heroMedia, promoVideoId } from "@/config/site";

type HeroStat = { value: string; label: string };

export function Hero() {
  const t = useTranslations("home.hero");
  const stats = t.raw("stats") as HeroStat[];

  return (
    <section className="relative overflow-hidden bg-ink">
      <HeroAtmosphere media={heroMedia ? <HeroMedia /> : undefined} />

      <div className="container-edge relative py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10">
          {/* Left: headline, subtitle, stats */}
          <div>
            <h1 className="text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl">
              {t("titleLead")}{" "}
              <span className="text-azure-300">{t("titleHighlight")}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-azure-100/80 md:text-xl">
              {t("subtitle")}
            </p>

            {/* Stat trio — real numbers, not buttons */}
            <dl className="mt-12 grid max-w-2xl grid-cols-3 border-t border-white/10 pt-8">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-4 first:pl-0 ${i > 0 ? "border-l border-white/10" : ""}`}
                >
                  <dt className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1.5 text-xs leading-snug text-white/60 sm:text-sm">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: large play button with orbit rings */}
          <div className="flex justify-center lg:justify-end">
            <WatchFilm
              videoId={promoVideoId}
              variant="circle"
              label={t("watch")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
