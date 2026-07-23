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
