import { useTranslations } from "next-intl";
import { Stat } from "@/components/ui/stat";
import { Icons } from "@/components/ui/icons";

const STAT_ICONS = [
  <Icons.export key="0" className="h-6 w-6" />,
  <Icons.institution key="1" className="h-6 w-6" />,
  <Icons.talent key="2" className="h-6 w-6" />,
  <Icons.route key="3" className="h-6 w-6" />,
];

type TrackStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  source?: string;
};

export function TrackRecord() {
  const t = useTranslations("home.track");
  const stats = t.raw("stats") as TrackStat[];

  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Samarkand backdrop, heavily darkened for legibility */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/samarkand-track.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/[0.72]" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />

      <div className="container-edge relative py-16 md:py-24">
        <span className="eyebrow !text-azure-300">{t("label")}</span>
        <h2 className="mt-3 max-w-2xl text-3xl text-white md:text-4xl">
          {t("title")}
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Stat
              key={i}
              tone="dark"
              value={s.value}
              prefix={s.prefix}
              suffix={s.suffix}
              decimals={s.decimals ?? 0}
              label={s.label}
              source={s.source}
              icon={STAT_ICONS[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
