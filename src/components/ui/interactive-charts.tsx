"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";

/* -------------------------------------------------------------------------- */
/* Shared tooltip                                                             */
/* -------------------------------------------------------------------------- */

function ChartTooltip({
  title,
  rows,
  active,
}: {
  title: string;
  rows: { colorClass: string; label: string; value: string }[];
  active: boolean;
}) {
  if (!active) return null;

  return (
    <div
      role="status"
      className="w-max max-w-[min(100%,16rem)] rounded-lg border border-line bg-white px-3 py-2 shadow-lift"
    >
      <p className="text-xs font-semibold text-ink">{title}</p>
      <ul className="mt-1.5 space-y-1">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center gap-2 text-xs text-steel"
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${row.colorClass}`}
            />
            <span className="truncate">{row.label}:</span>
            <span className="ml-auto font-semibold tabular-nums text-ink">
              {row.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChartShell({
  title,
  caption,
  hint,
  children,
  titleAlign = "center",
}: {
  title: string;
  caption?: string;
  hint?: string;
  children: ReactNode;
  titleAlign?: "center" | "left";
}) {
  return (
    <div className="h-full rounded-2xl border border-line bg-white p-4 shadow-sm md:p-5">
      <h3
        className={`text-sm font-semibold text-ink md:text-base ${
          titleAlign === "center" ? "text-center" : ""
        }`}
      >
        {title}
      </h3>
      {caption ? (
        <p
          className={`mt-0.5 text-xs text-slate ${
            titleAlign === "center" ? "text-center" : ""
          }`}
        >
          {caption}
        </p>
      ) : null}
      {hint ? (
        <p
          className={`mt-1 text-[11px] text-slate/80 ${
            titleAlign === "center" ? "text-center" : ""
          }`}
        >
          {hint}
        </p>
      ) : null}
      {children}
    </div>
  );
}

function usePinnedIndex(length: number) {
  const [hover, setHover] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const active = pinned ?? hover;

  const togglePin = useCallback((index: number) => {
    setPinned((prev) => (prev === index ? null : index));
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePin(index);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.min(index + 1, length - 1);
        setHover(next);
        setPinned(next);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = Math.max(index - 1, 0);
        setHover(prev);
        setPinned(prev);
      }
      if (e.key === "Escape") {
        setPinned(null);
        setHover(null);
      }
    },
    [length, togglePin],
  );

  return { hover, setHover, pinned, active, togglePin, onKeyDown };
}

function formatNumber(value: number, opts?: { plus?: boolean }) {
  const formatted = value.toLocaleString();
  return opts?.plus ? `${formatted}+` : formatted;
}

/* -------------------------------------------------------------------------- */
/* Dual-series line chart                                                     */
/* -------------------------------------------------------------------------- */

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
  const t = useTranslations("whyPage");
  const { hover, setHover, active, togglePin, onKeyDown } = usePinnedIndex(
    labels.length,
  );
  const svgRef = useRef<SVGSVGElement>(null);

  const w = 560;
  const h = 168;
  const pad = { t: 16, r: 12, b: 28, l: 36 };
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  const range = yMax - yMin || 1;

  const xAt = (i: number) =>
    pad.l + (labels.length <= 1 ? iw / 2 : (i / (labels.length - 1)) * iw);
  const yAt = (v: number) => pad.t + ((yMax - v) / range) * ih;

  const pathFor = (points: number[]) =>
    points
      .map(
        (v, i) =>
          `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)}`,
      )
      .join(" ");

  const tones = {
    azure: {
      stroke: "#0B8FBF",
      fill: "rgba(11,143,191,0.12)",
      dot: "bg-azure-600",
      className: "bg-azure-600",
    },
    navy: {
      stroke: "#0D1B2A",
      fill: "rgba(13,27,42,0.08)",
      dot: "bg-navy-900",
      className: "bg-navy-900",
    },
  };

  const ticks = [yMin, yMin + range / 2, yMax];
  const colW = labels.length > 1 ? iw / (labels.length - 1) : iw;

  const onMove = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * w;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < labels.length; i++) {
      const d = Math.abs(xAt(i) - x);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    setHover(best);
  };

  return (
    <ChartShell title={title} caption={caption} hint={t("chartHint")}>
      <div className="relative mt-1 pt-10">
        {active !== null ? (
          <div
            className="pointer-events-none absolute z-10"
            style={{
              left: `${(xAt(active) / w) * 100}%`,
              top: "0",
            }}
          >
            <div
              role="status"
              className="w-max max-w-[min(100%,16rem)] -translate-x-1/2 rounded-lg border border-line bg-white px-3 py-2 shadow-lift"
            >
              <p className="text-xs font-semibold text-ink">{labels[active]}</p>
              <ul className="mt-1.5 space-y-1">
                {series.map((s) => (
                  <li
                    key={s.key}
                    className="flex items-center gap-2 text-xs text-steel"
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${tones[s.tone].className}`}
                    />
                    <span className="truncate">{s.label}:</span>
                    <span className="ml-auto font-semibold tabular-nums text-ink">
                      {s.points[active].toFixed(1)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        <svg
          ref={svgRef}
          viewBox={`0 0 ${w} ${h}`}
          className="h-auto w-full touch-pan-y"
          role="img"
          aria-label={title}
          onMouseMove={(e) => onMove(e.clientX)}
          onMouseLeave={() => setHover(null)}
        >
          <title>{title}</title>
          {ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={pad.l}
                x2={w - pad.r}
                y1={yAt(tick)}
                y2={yAt(tick)}
                stroke="#E5EAF0"
                strokeWidth="1"
              />
              <text
                x={pad.l - 8}
                y={yAt(tick) + 3}
                textAnchor="end"
                className="fill-slate text-[10px]"
              >
                {tick.toFixed(1)}
              </text>
            </g>
          ))}

          {active !== null ? (
            <line
              x1={xAt(active)}
              x2={xAt(active)}
              y1={pad.t}
              y2={h - pad.b}
              stroke="#DCE4EA"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          ) : null}

          {series.map((s) => {
            const tone = tones[s.tone];
            const area =
              pathFor(s.points) +
              ` L ${xAt(s.points.length - 1).toFixed(1)} ${yAt(yMin).toFixed(1)} L ${xAt(0).toFixed(1)} ${yAt(yMin).toFixed(1)} Z`;
            return (
              <g key={s.key}>
                <path d={area} fill={tone.fill} />
                <path
                  d={pathFor(s.points)}
                  fill="none"
                  stroke={tone.stroke}
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {series.map((s) =>
            s.points.map((v, i) => (
              <circle
                key={`${s.key}-${i}`}
                cx={xAt(i)}
                cy={yAt(v)}
                r={active === i ? 5 : 3}
                fill={tones[s.tone].stroke}
                className={`transition-[r] duration-150 ${
                  active === i || active === null ? "opacity-100" : "opacity-40"
                }`}
              />
            )),
          )}

          {labels.map((label, i) => {
            const hitX = xAt(i) - colW / 2;
            return (
              <g key={label}>
                <rect
                  x={Math.max(pad.l, hitX)}
                  y={pad.t}
                  width={colW}
                  height={ih}
                  fill="transparent"
                  className="cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-label={`${label}: ${series
                    .map((s) => `${s.label} ${s.points[i].toFixed(1)}%`)
                    .join(", ")}`}
                  aria-pressed={active === i}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePin(i);
                  }}
                  onKeyDown={(e) => onKeyDown(e, i)}
                />
                <text
                  x={xAt(i)}
                  y={h - 10}
                  textAnchor="middle"
                  className={`text-[10px] ${
                    active === i
                      ? "fill-ink font-semibold"
                      : "fill-slate"
                  }`}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <ul className="mt-2 flex flex-wrap justify-center gap-4 text-xs text-steel">
        {series.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${tones[s.tone].className}`}
            />
            {s.label}
          </li>
        ))}
      </ul>
    </ChartShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Stacked columns                                                            */
/* -------------------------------------------------------------------------- */

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
  const t = useTranslations("whyPage");
  const { hover, setHover, active, togglePin, onKeyDown } = usePinnedIndex(
    items.length,
  );
  const max = Math.max(...items.map((i) => i.total), 1);
  const toneClass = { azure: "bg-azure-700", gold: "bg-gold-400" };

  return (
    <ChartShell title={title} caption={caption} hint={t("chartHint")} titleAlign="left">
      <div className="relative mt-4 pt-16">
        {active !== null ? (
          <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2">
            <ChartTooltip
              active
              title={items[active].label}
              rows={[
                ...series.map((s) => ({
                  colorClass: toneClass[s.tone],
                  label: s.label,
                  value: formatNumber(items[active].values[s.key] ?? 0),
                })),
                {
                  colorClass: "bg-ink",
                  label: t("chartTotal"),
                  value: formatNumber(items[active].total),
                },
              ]}
            />
          </div>
        ) : null}
        <div className="flex items-end justify-between gap-2 md:gap-3">
        {items.map((item, index) => {
          const isActive = active === index;
          const isDimmed = active !== null && !isActive;

          return (
            <button
              key={item.label}
              type="button"
              className={`relative flex min-w-0 flex-1 flex-col items-center rounded-lg outline-none transition focus-visible:ring-2 focus-visible:ring-azure-500 focus-visible:ring-offset-2 ${
                isDimmed ? "opacity-45" : "opacity-100"
              }`}
              aria-pressed={isActive}
              aria-label={`${item.label}: ${series
                .map((s) => `${s.label} ${item.values[s.key] ?? 0}`)
                .join(", ")}; total ${item.total}`}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(index)}
              onBlur={() => setHover(null)}
              onClick={() => togglePin(index)}
              onKeyDown={(e) => onKeyDown(e, index)}
            >
              <span
                className={`mb-1 text-[10px] font-semibold tabular-nums transition ${
                  isActive ? "text-azure-800" : "text-ink"
                }`}
              >
                {item.total}
              </span>
              <div
                className={`flex w-full max-w-[2.75rem] flex-col-reverse overflow-hidden rounded-t-md transition-transform duration-200 ${
                  isActive ? "scale-105 shadow-sm" : ""
                }`}
                style={{ height: `${Math.max((item.total / max) * 160, 24)}px` }}
              >
                {series.map((s) => {
                  const v = item.values[s.key] ?? 0;
                  const hPct = item.total ? (v / item.total) * 100 : 0;
                  return (
                    <div
                      key={s.key}
                      className={`relative flex w-full items-center justify-center ${toneClass[s.tone]}`}
                      style={{ height: `${hPct}%` }}
                    >
                      {hPct > 18 ? (
                        <span className="text-[9px] font-medium text-white">
                          {v}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <span
                className={`mt-2 text-[10px] ${
                  isActive ? "font-semibold text-ink" : "text-slate"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
        </div>
      </div>
      <ul className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-steel">
        {series.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-sm ${toneClass[s.tone]}`} />
            {s.label}
          </li>
        ))}
      </ul>
    </ChartShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Grouped dual bars                                                          */
/* -------------------------------------------------------------------------- */

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
  const t = useTranslations("whyPage");
  const { hover, setHover, active, togglePin, onKeyDown } = usePinnedIndex(
    items.length,
  );
  const chartH = 160;
  const maxByKey: Record<string, number> = {};
  for (const s of series) {
    maxByKey[s.key] = Math.max(...items.map((i) => i.values[s.key] ?? 0), 1);
  }
  const toneClass = { navy: "bg-navy-900", azure: "bg-azure-500" };

  const displayValue = (key: string, value: number) => {
    if (key === "fdi" && value >= 43000) return "43k+";
    if (value >= 10000) return `${Math.round(value / 1000)}k`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return String(value);
  };

  return (
    <ChartShell title={title} caption={caption} hint={t("chartHint")}>
      <div
        className={`relative mt-5 ${active !== null ? "pt-14" : "pt-2"}`}
      >
        {active !== null ? (
          <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2">
            <ChartTooltip
              active
              title={items[active].label}
              rows={series.map((s) => ({
                colorClass: toneClass[s.tone],
                label: s.label,
                value: formatNumber(items[active].values[s.key] ?? 0, {
                  plus:
                    s.key === "fdi" &&
                    (items[active].values[s.key] ?? 0) >= 43000,
                }),
              }))}
            />
          </div>
        ) : null}
        <div className="flex items-end justify-between gap-1 overflow-x-auto pb-1 md:gap-2">
          {items.map((item, index) => {
            const isActive = active === index;
            const isDimmed = active !== null && !isActive;

            return (
              <button
                key={item.label}
                type="button"
                className={`relative flex min-w-[3.5rem] flex-1 flex-col items-center rounded-lg px-0.5 py-1 outline-none transition focus-visible:ring-2 focus-visible:ring-azure-500 focus-visible:ring-offset-2 ${
                  isActive ? "bg-cloud/80" : ""
                } ${isDimmed ? "opacity-40" : "opacity-100"}`}
                aria-pressed={isActive}
                aria-label={`${item.label}: ${series
                  .map(
                    (s) =>
                      `${s.label} ${formatNumber(item.values[s.key] ?? 0, {
                        plus:
                          s.key === "fdi" &&
                          (item.values[s.key] ?? 0) >= 43000,
                      })}`,
                  )
                  .join(", ")}`}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(index)}
                onBlur={() => setHover(null)}
                onClick={() => togglePin(index)}
                onKeyDown={(e) => onKeyDown(e, index)}
              >
                <div
                  className="flex items-end justify-center gap-0.5 md:gap-1"
                  style={{ height: chartH }}
                >
                  {series.map((s) => {
                    const v = item.values[s.key] ?? 0;
                    const px = Math.max((v / maxByKey[s.key]) * (chartH - 18), 6);
                    return (
                      <div
                        key={s.key}
                        className="flex h-full w-4 flex-col items-center justify-end md:w-5"
                      >
                        <span className="mb-0.5 text-[9px] font-semibold tabular-nums leading-none text-ink md:text-[10px]">
                          {displayValue(s.key, v)}
                        </span>
                        <div
                          className={`w-full rounded-t-sm transition duration-200 ${toneClass[s.tone]} ${
                            isActive ? "brightness-110" : ""
                          }`}
                          style={{ height: px }}
                        />
                      </div>
                    );
                  })}
                </div>
                <span
                  className={`mt-2 text-[10px] ${
                    isActive ? "font-semibold text-ink" : "text-slate"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <ul className="mt-5 flex flex-wrap justify-center gap-5 text-xs text-steel">
        {series.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-sm ${toneClass[s.tone]}`} />
            {s.label}
          </li>
        ))}
      </ul>
    </ChartShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Before → after compare                                                     */
/* -------------------------------------------------------------------------- */

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
  const t = useTranslations("whyPage");
  const beforeN = parseFloat(before.value.replace(",", "."));
  const afterN = parseFloat(after.value.replace(",", "."));
  const hasDelta = Number.isFinite(beforeN) && Number.isFinite(afterN);
  const delta = hasDelta ? afterN - beforeN : 0;
  const deltaAbs = Math.abs(delta);
  const improved = delta < 0;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-azure-800 md:text-xl">
            {title}
          </h3>
          {caption ? <p className="mt-0.5 text-sm text-slate">{caption}</p> : null}
        </div>
        {hasDelta ? (
          <p
            className={`text-xs font-semibold tabular-nums ${
              improved ? "text-azure-700" : "text-steel"
            }`}
          >
            {improved
              ? t("chartDownBy", { value: deltaAbs.toFixed(2) })
              : t("chartUpBy", { value: deltaAbs.toFixed(2) })}
          </p>
        ) : null}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-azure-600 px-4 py-4 text-white md:px-6">
        <div className="min-w-0 text-center">
          <p className="text-2xl font-semibold tabular-nums md:text-3xl">
            {before.value}
          </p>
          <p className="mt-0.5 text-[11px] text-azure-100">{before.label}</p>
        </div>
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20"
          aria-hidden
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 16l5-5 4 4 7-8" />
            <path d="M15 7h5v5" />
          </svg>
        </div>
        <div className="min-w-0 text-center">
          <p className="text-2xl font-semibold tabular-nums md:text-3xl">
            {after.value}
          </p>
          <p className="mt-0.5 text-[11px] text-azure-100">{after.label}</p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Column (vertical) bar chart                                                */
/* -------------------------------------------------------------------------- */

function formatChartValue(value: number, unit?: string) {
  const formatted =
    Number.isInteger(value) || value >= 100
      ? value.toLocaleString()
      : value.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 1,
        });
  return unit ? `${formatted}${unit}` : formatted;
}

export function ColumnChart({
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
  const { setHover, active, togglePin, onKeyDown } = usePinnedIndex(
    items.length,
  );
  const max = Math.max(...items.map((i) => i.value), 1);
  const chartH = 168;

  return (
    <ChartShell title={title} caption={caption}>
      <div className="relative mt-5 pt-12">
        {active !== null ? (
          <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2">
            <ChartTooltip
              active
              title={items[active].label}
              rows={[
                {
                  colorClass: "bg-[#244192]",
                  label: title,
                  value: formatChartValue(items[active].value, unit),
                },
              ]}
            />
          </div>
        ) : null}

        <div
          className="relative flex items-end justify-between gap-2 border-b border-line px-1"
          style={{ height: chartH }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 bottom-0"
            aria-hidden
          >
            {[0.25, 0.5, 0.75].map((pct) => (
              <div
                key={pct}
                className="absolute inset-x-0 border-t border-dashed border-line/70"
                style={{ bottom: `${pct * 100}%` }}
              />
            ))}
          </div>

          {items.map((item, index) => {
            const isActive = active === index;
            const isDimmed = active !== null && !isActive;
            const h = Math.max((item.value / max) * (chartH - 8), 8);

            return (
              <button
                key={item.label}
                type="button"
                className={`relative z-[1] flex min-w-0 flex-1 flex-col items-center justify-end outline-none transition focus-visible:ring-2 focus-visible:ring-[#244192] focus-visible:ring-offset-2 ${
                  isDimmed ? "opacity-40" : "opacity-100"
                }`}
                style={{ height: chartH }}
                aria-pressed={isActive}
                aria-label={`${item.label}: ${formatChartValue(item.value, unit)}`}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(index)}
                onBlur={() => setHover(null)}
                onClick={() => togglePin(index)}
                onKeyDown={(e) => onKeyDown(e, index)}
              >
                <span
                  className={`mb-1.5 text-[10px] font-semibold tabular-nums transition ${
                    isActive ? "text-[#244192] opacity-100" : "text-ink opacity-70"
                  }`}
                >
                  {formatChartValue(item.value)}
                </span>
                <span
                  className={`w-full max-w-[2.5rem] rounded-t-md transition-all duration-200 md:max-w-[3rem] ${
                    isActive
                      ? "bg-[#1c3375] shadow-sm scale-y-[1.02]"
                      : "bg-[#244192] hover:bg-[#1c3375]"
                  }`}
                  style={{ height: h, transformOrigin: "bottom" }}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-2 flex justify-between gap-2 px-1">
          {items.map((item, index) => (
            <span
              key={item.label}
              className={`min-w-0 flex-1 truncate text-center text-[10px] ${
                active === index ? "font-semibold text-ink" : "text-slate"
              }`}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </ChartShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Donut / share chart                                                        */
/* -------------------------------------------------------------------------- */

const DONUT_TONES: Record<string, { fill: string; swatch: string }> = {
  azure: { fill: "#244192", swatch: "bg-[#244192]" },
  navy: { fill: "#1c3375", swatch: "bg-[#1c3375]" },
  gold: { fill: "#E89A2C", swatch: "bg-gold-500" },
  steel: { fill: "#5A6B9A", swatch: "bg-[#5A6B9A]" },
  mist: { fill: "#94A0C4", swatch: "bg-[#94A0C4]" },
};

export function DonutChart({
  title,
  caption,
  items,
}: {
  title: string;
  caption?: string;
  items: { label: string; value: number; color?: string }[];
}) {
  const { setHover, active, togglePin, onKeyDown } = usePinnedIndex(
    items.length,
  );
  const total = items.reduce((sum, i) => sum + i.value, 0) || 1;
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 72;
  const stroke = 28;
  const circumference = 2 * Math.PI * r;

  let offsetAcc = 0;
  const arcs = items.map((item, index) => {
    const tone = DONUT_TONES[item.color ?? "azure"] ?? DONUT_TONES.azure;
    const length = (item.value / total) * circumference;
    const dashOffset = -offsetAcc;
    offsetAcc += length;
    return { ...item, index, tone, length, dashOffset };
  });

  const selected = active !== null ? items[active] : null;
  const centerValue = selected
    ? `${selected.value % 1 === 0 ? selected.value : selected.value.toFixed(1)}%`
    : null;
  const centerLabel = selected?.label ?? null;

  return (
    <ChartShell title={title} caption={caption}>
      <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="relative shrink-0">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="h-44 w-44"
            role="img"
            aria-label={title}
          >
            <title>{title}</title>
            <g transform={`rotate(-90 ${cx} ${cy})`}>
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="#EEF2F6"
                strokeWidth={stroke}
              />
              {arcs.map((arc) => {
                const isActive = active === arc.index;
                const isDimmed = active !== null && !isActive;
                return (
                  <circle
                    key={arc.label}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke={arc.tone.fill}
                    strokeWidth={isActive ? stroke + 4 : stroke}
                    strokeDasharray={`${arc.length} ${circumference - arc.length}`}
                    strokeDashoffset={arc.dashOffset}
                    strokeLinecap="butt"
                    className={`cursor-pointer transition-[stroke-width,opacity] duration-200 ${
                      isDimmed ? "opacity-35" : "opacity-100"
                    }`}
                    onMouseEnter={() => setHover(arc.index)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => togglePin(arc.index)}
                  />
                );
              })}
            </g>
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            {centerValue ? (
              <>
                <p className="text-2xl font-semibold tabular-nums text-ink">
                  {centerValue}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-tight text-slate">
                  {centerLabel}
                </p>
              </>
            ) : (
              <p className="text-sm font-medium text-slate">{title}</p>
            )}
          </div>
        </div>

        <ul className="w-full min-w-0 space-y-1.5 sm:flex-1">
          {items.map((item, index) => {
            const tone = DONUT_TONES[item.color ?? "azure"] ?? DONUT_TONES.azure;
            const isActive = active === index;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-[#244192] ${
                    isActive ? "bg-[#eef0f8]" : "hover:bg-mist"
                  }`}
                  aria-pressed={isActive}
                  aria-label={`${item.label}: ${item.value}%`}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(index)}
                  onBlur={() => setHover(null)}
                  onClick={() => togglePin(index)}
                  onKeyDown={(e) => onKeyDown(e, index)}
                >
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${tone.swatch}`}
                  />
                  <span
                    className={`min-w-0 flex-1 truncate text-xs ${
                      isActive ? "font-semibold text-ink" : "text-steel"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-ink">
                    {item.value}%
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </ChartShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Ring gauge (used by StatStrip)                                             */
/* -------------------------------------------------------------------------- */

function RingGauge({
  value,
  progress,
  active,
}: {
  value: string;
  progress: number;
  active?: boolean;
}) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const pct = Math.min(Math.max(progress, 0), 100);
  const offset = c - (pct / 100) * c;

  return (
    <div
      className={`relative h-24 w-24 transition-transform duration-200 ${
        active ? "scale-105" : ""
      }`}
    >
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
          className="text-azure-600 transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold tabular-nums text-azure-800">
        {value}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Key indicators strip / carousel                                            */
/* -------------------------------------------------------------------------- */

export function StatStrip({
  title,
  items,
}: {
  title?: string;
  items: { value: string; label: string; progress?: number }[];
}) {
  const t = useTranslations("whyPage");
  const id = useId();
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const perPage = 4;
  const pageCount = Math.max(1, Math.ceil(items.length / perPage));

  useEffect(() => {
    if (page > pageCount - 1) setPage(pageCount - 1);
  }, [page, pageCount]);

  const start = page * perPage;
  const visible = items.slice(start, start + perPage);

  const go = (dir: -1 | 1) => {
    setPage((p) => (p + dir + pageCount) % pageCount);
    setSelected(null);
  };

  return (
    <div className="rounded-2xl border border-line bg-white p-5 md:p-6">
      {title ? (
        <h3 className="mb-1 text-center text-xl font-semibold text-azure-800">
          {title}
        </h3>
      ) : null}
      <p className="mb-5 text-center text-[11px] text-slate/80">
        {t("chartIndicatorHint")}
      </p>

      <div className="relative">
        {pageCount > 1 ? (
          <>
            <button
              type="button"
              className="absolute -left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-azure-700 shadow-sm transition hover:border-azure-300 hover:bg-azure-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 md:-left-3"
              aria-label={t("chartPrev")}
              onClick={() => go(-1)}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M12.7 4.3a1 1 0 010 1.4L8.4 10l4.3 4.3a1 1 0 11-1.4 1.4l-5-5a1 1 0 010-1.4l5-5a1 1 0 011.4 0z" />
              </svg>
            </button>
            <button
              type="button"
              className="absolute -right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-azure-700 shadow-sm transition hover:border-azure-300 hover:bg-azure-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 md:-right-3"
              aria-label={t("chartNext")}
              onClick={() => go(1)}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M7.3 4.3a1 1 0 011.4 0l5 5a1 1 0 010 1.4l-5 5a1 1 0 11-1.4-1.4L11.6 10 7.3 5.7a1 1 0 010-1.4z" />
              </svg>
            </button>
          </>
        ) : null}

        <ul
          id={id}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          aria-live="polite"
        >
          {visible.map((item, i) => {
            const absoluteIndex = start + i;
            const isActive = selected === absoluteIndex;
            return (
              <li key={`${item.label}-${absoluteIndex}`}>
                <button
                  type="button"
                  className={`flex w-full flex-col items-center rounded-xl px-2 py-3 text-center outline-none transition focus-visible:ring-2 focus-visible:ring-azure-500 ${
                    isActive ? "bg-azure-50" : "hover:bg-mist"
                  }`}
                  aria-pressed={isActive}
                  onClick={() =>
                    setSelected((prev) =>
                      prev === absoluteIndex ? null : absoluteIndex,
                    )
                  }
                >
                  {typeof item.progress === "number" ? (
                    <RingGauge
                      value={item.value}
                      progress={item.progress}
                      active={isActive}
                    />
                  ) : (
                    <p
                      className={`text-2xl font-semibold tabular-nums transition md:text-3xl ${
                        isActive ? "text-azure-800" : "text-azure-700"
                      }`}
                    >
                      {item.value}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-slate">{item.label}</p>
                  {isActive ? (
                    <p className="mt-2 text-xs font-medium text-azure-700">
                      {item.value}
                      <span className="mx-1 text-slate">·</span>
                      {item.label}
                    </p>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {pageCount > 1 ? (
        <div className="mt-6 flex justify-center gap-1.5">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`h-1.5 rounded-full transition ${
                i === page ? "w-5 bg-azure-600" : "w-1.5 bg-cloud hover:bg-line"
              }`}
              aria-label={`${t("chartPage")} ${i + 1}`}
              aria-current={i === page ? "true" : undefined}
              onClick={() => {
                setPage(i);
                setSelected(null);
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
