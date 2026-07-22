/**
 * Chart primitives for Why Uzbekistan pages — CSS/SVG only, no chart library.
 */

export function SimpleBars({
  title,
  caption,
  unit,
  items,
}: {
  title: string;
  caption?: string;
  unit?: string;
  items: { label: string; value: number }[];
}) {
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <div className="rounded-2xl border border-line bg-white p-5 md:p-6">
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      {caption ? <p className="mt-1 text-xs text-slate">{caption}</p> : null}
      <ul className="mt-5 space-y-3">
        {items.map((item) => {
          const pct = Math.round((item.value / max) * 100);
          return (
            <li key={item.label}>
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <span className="text-xs font-medium text-steel">{item.label}</span>
                <span className="text-xs font-semibold tabular-nums text-ink">
                  {item.value.toLocaleString()}
                  {unit ? (
                    <span className="ml-0.5 font-normal text-slate">{unit}</span>
                  ) : null}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-cloud">
                <div
                  className="h-full rounded-full bg-azure-600"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Azure callout: before → after metric. */
export function CompareStat({
  title,
  caption,
  before,
  after,
}: {
  title: string;
  caption?: string;
  before: { label: string; value: string };
  after: { label: string; value: string };
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-azure-800 md:text-2xl">
        {title}
      </h3>
      {caption ? <p className="mt-1 text-sm text-slate">{caption}</p> : null}
      <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-azure-600 px-5 py-6 text-white md:px-8">
        <div className="text-center">
          <p className="text-3xl font-semibold tabular-nums md:text-4xl">
            {before.value}
          </p>
          <p className="mt-1 text-xs text-azure-100">{before.label}</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M4 16l5-5 4 4 7-8" />
            <path d="M15 7h5v5" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-3xl font-semibold tabular-nums md:text-4xl">
            {after.value}
          </p>
          <p className="mt-1 text-xs text-azure-100">{after.label}</p>
        </div>
      </div>
    </div>
  );
}

export function StatStrip({
  title,
  items,
}: {
  title?: string;
  items: { value: string; label: string; progress?: number }[];
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
      {title ? (
        <h3 className="mb-8 text-center text-xl font-semibold text-azure-800">
          {title}
        </h3>
      ) : null}
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.label} className="flex flex-col items-center text-center">
            {typeof item.progress === "number" ? (
              <RingGauge value={item.value} progress={item.progress} />
            ) : (
              <p className="text-2xl font-semibold tabular-nums text-azure-700 md:text-3xl">
                {item.value}
              </p>
            )}
            <p className="mt-3 text-sm text-slate">{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RingGauge({
  value,
  progress,
  label,
}: {
  value: string;
  progress: number;
  label?: string;
}) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const pct = Math.min(Math.max(progress, 0), 100);
  const offset = c - (pct / 100) * c;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 88 88" className="h-full w-full -rotate-90">
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-cloud"
          />
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className="text-azure-600"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold tabular-nums text-azure-800">
          {value}
        </span>
      </div>
      {label ? <p className="mt-2 text-sm text-slate">{label}</p> : null}
    </div>
  );
}

export function RingsRow({
  items,
}: {
  items: { value: string; label: string; progress?: number }[];
}) {
  return (
    <ul className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {items.map((item) => (
        <li key={item.label} className="flex justify-center">
          <RingGauge
            value={item.value}
            progress={item.progress ?? 0}
            label={item.label}
          />
        </li>
      ))}
    </ul>
  );
}

const shareTone: Record<string, string> = {
  azure: "bg-azure-600",
  navy: "bg-navy-700",
  gold: "bg-gold-500",
  steel: "bg-steel",
  mist: "bg-slate",
};

export function ShareBars({
  title,
  caption,
  items,
}: {
  title: string;
  caption?: string;
  items: { label: string; value: number; color?: string }[];
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 md:p-6">
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      {caption ? <p className="mt-1 text-xs text-slate">{caption}</p> : null}
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="text-xs font-medium text-steel">{item.label}</span>
              <span className="text-xs font-semibold tabular-nums text-ink">
                {item.value}%
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-cloud">
              <div
                className={`h-full rounded-full ${shareTone[item.color ?? "azure"] ?? shareTone.azure}`}
                style={{ width: `${Math.min(item.value, 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RankTable({
  title,
  caption,
  items,
  variant = "card",
}: {
  title: string;
  caption?: string;
  items: { rank: number; country: string }[];
  variant?: "card" | "panel";
}) {
  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);
  const panel = variant === "panel";

  return (
    <div
      className={
        panel
          ? "rounded-2xl bg-azure-700 p-6 text-white md:p-8"
          : "rounded-2xl border border-line bg-white p-6 md:p-8"
      }
    >
      <h3
        className={`text-lg font-semibold ${panel ? "text-white" : "text-ink"}`}
      >
        {title}
      </h3>
      {caption ? (
        <p className={`mt-1 text-sm ${panel ? "text-azure-100" : "text-slate"}`}>
          {caption}
        </p>
      ) : null}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[left, right].map((col, colIdx) => (
          <div key={colIdx}>
            <div
              className={`mb-2 grid grid-cols-[2.5rem_1fr] gap-2 border-b pb-2 text-xs font-semibold uppercase tracking-wider ${
                panel ? "border-white/30 text-azure-100" : "border-line text-slate"
              }`}
            >
              <span>Rank</span>
              <span>Country</span>
            </div>
            <ol className="space-y-1.5">
              {col.map((item) => (
                <li
                  key={item.rank}
                  className={`grid grid-cols-[2.5rem_1fr] gap-2 rounded-md px-1 py-1.5 text-sm ${
                    panel
                      ? item.rank === 1
                        ? "bg-white/15 font-semibold"
                        : ""
                      : item.rank === 1
                        ? "bg-azure-50 font-semibold text-azure-900"
                        : "text-ink"
                  }`}
                >
                  <span className="tabular-nums opacity-80">
                    {String(item.rank).padStart(2, "0")}
                  </span>
                  <span>{item.country}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Dual-series line chart (SVG). */
export function LineCompare({
  title,
  caption,
  labels,
  series,
  yMin,
  yMax,
}: {
  title: string;
  caption?: string;
  labels: string[];
  series: {
    key: string;
    label: string;
    tone: "azure" | "navy";
    points: number[];
  }[];
  yMin: number;
  yMax: number;
}) {
  const w = 560;
  const h = 280;
  const pad = { t: 24, r: 16, b: 36, l: 40 };
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  const range = yMax - yMin || 1;

  const xAt = (i: number) =>
    pad.l + (labels.length <= 1 ? iw / 2 : (i / (labels.length - 1)) * iw);
  const yAt = (v: number) => pad.t + ((yMax - v) / range) * ih;

  const pathFor = (points: number[]) =>
    points
      .map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)}`)
      .join(" ");

  const tones = {
    azure: { stroke: "#0B8FBF", fill: "rgba(11,143,191,0.12)" },
    navy: { stroke: "#0D1B2A", fill: "rgba(13,27,42,0.08)" },
  };

  const ticks = [yMin, yMin + range / 2, yMax];

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm md:p-6">
      <h3 className="text-center text-base font-semibold text-ink">{title}</h3>
      {caption ? (
        <p className="mt-1 text-center text-xs text-slate">{caption}</p>
      ) : null}
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 h-auto w-full" role="img">
        <title>{title}</title>
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={pad.l}
              x2={w - pad.r}
              y1={yAt(t)}
              y2={yAt(t)}
              stroke="#E5EAF0"
              strokeWidth="1"
            />
            <text
              x={pad.l - 8}
              y={yAt(t) + 3}
              textAnchor="end"
              className="fill-slate text-[10px]"
            >
              {t.toFixed(1)}
            </text>
          </g>
        ))}
        {series.map((s) => {
          const t = tones[s.tone];
          const area =
            pathFor(s.points) +
            ` L ${xAt(s.points.length - 1).toFixed(1)} ${yAt(yMin).toFixed(1)} L ${xAt(0).toFixed(1)} ${yAt(yMin).toFixed(1)} Z`;
          return (
            <g key={s.key}>
              <path d={area} fill={t.fill} />
              <path
                d={pathFor(s.points)}
                fill="none"
                stroke={t.stroke}
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </g>
          );
        })}
        {labels.map((label, i) => (
          <text
            key={label}
            x={xAt(i)}
            y={h - 10}
            textAnchor="middle"
            className="fill-slate text-[10px]"
          >
            {label}
          </text>
        ))}
      </svg>
      <ul className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-steel">
        {series.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                s.tone === "azure" ? "bg-azure-600" : "bg-navy-900"
              }`}
            />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Stacked column chart. */
export function StackedBars({
  title,
  caption,
  series,
  items,
}: {
  title: string;
  caption?: string;
  series: { key: string; label: string; tone: "azure" | "gold" }[];
  items: { label: string; values: Record<string, number>; total: number }[];
}) {
  const max = Math.max(...items.map((i) => i.total), 1);
  const toneClass = { azure: "bg-azure-700", gold: "bg-gold-400" };

  return (
    <div className="rounded-2xl border border-line bg-white p-5 md:p-6">
      <h3 className="text-sm font-semibold leading-snug text-ink">{title}</h3>
      {caption ? <p className="mt-1 text-xs text-slate">{caption}</p> : null}
      <div className="mt-6 flex items-end justify-between gap-2 md:gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex min-w-0 flex-1 flex-col items-center">
            <span className="mb-1 text-[10px] font-semibold tabular-nums text-ink">
              {item.total}
            </span>
            <div
              className="flex w-full max-w-[2.75rem] flex-col-reverse overflow-hidden rounded-t-md"
              style={{ height: `${Math.max((item.total / max) * 160, 24)}px` }}
            >
              {series.map((s) => {
                const v = item.values[s.key] ?? 0;
                const h = item.total ? (v / item.total) * 100 : 0;
                return (
                  <div
                    key={s.key}
                    className={`relative flex w-full items-center justify-center ${toneClass[s.tone]}`}
                    style={{ height: `${h}%` }}
                    title={`${s.label}: ${v}`}
                  >
                    {h > 18 ? (
                      <span className="text-[9px] font-medium text-white">
                        {v}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <span className="mt-2 text-[10px] text-slate">{item.label}</span>
          </div>
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-steel">
        {series.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-sm ${toneClass[s.tone]}`} />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Grouped dual bars (projects vs FDI). Scales each series independently. */
export function GroupedBars({
  title,
  caption,
  series,
  items,
}: {
  title: string;
  caption?: string;
  series: { key: string; label: string; tone: "navy" | "azure" }[];
  items: { label: string; values: Record<string, number> }[];
}) {
  const chartH = 176;
  const maxByKey: Record<string, number> = {};
  for (const s of series) {
    maxByKey[s.key] = Math.max(...items.map((i) => i.values[s.key] ?? 0), 1);
  }
  const toneClass = { navy: "bg-navy-900", azure: "bg-azure-500" };

  return (
    <div className="rounded-2xl border border-line bg-white p-5 md:p-8">
      <h3 className="text-center text-lg font-semibold text-azure-800">{title}</h3>
      {caption ? (
        <p className="mt-1 text-center text-xs text-slate">{caption}</p>
      ) : null}
      <div className="mt-8 flex items-end justify-between gap-1 overflow-x-auto md:gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex min-w-[3.25rem] flex-1 flex-col items-center"
          >
            <div className="flex w-full flex-col items-center">
              <div className="mb-1 flex h-4 items-end justify-center gap-0.5 md:gap-1">
                {series.map((s) => {
                  const v = item.values[s.key] ?? 0;
                  return (
                    <span
                      key={s.key}
                      className="w-3 truncate text-center text-[8px] font-semibold tabular-nums text-ink md:w-4 md:text-[9px]"
                    >
                      {v >= 1000
                        ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k`
                        : v}
                    </span>
                  );
                })}
              </div>
              <div
                className="flex items-end gap-0.5 md:gap-1"
                style={{ height: chartH }}
              >
                {series.map((s) => {
                  const v = item.values[s.key] ?? 0;
                  const px = Math.max((v / maxByKey[s.key]) * chartH, 6);
                  return (
                    <div
                      key={s.key}
                      className={`w-3 shrink-0 rounded-t-sm md:w-4 ${toneClass[s.tone]}`}
                      style={{ height: px }}
                      title={`${s.label}: ${v.toLocaleString()}`}
                    />
                  );
                })}
              </div>
            </div>
            <span className="mt-2 text-[10px] text-slate">{item.label}</span>
          </div>
        ))}
      </div>
      <ul className="mt-5 flex flex-wrap justify-center gap-5 text-xs text-steel">
        {series.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-sm ${toneClass[s.tone]}`} />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
