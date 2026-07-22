/**
 * Lightweight horizontal/vertical bar chart — no chart library dependency.
 * Used on Why pages for IT Park / export storytelling.
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
    <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      {caption ? (
        <p className="mt-1 text-sm text-slate">{caption}</p>
      ) : null}
      <ul className="mt-6 space-y-4">
        {items.map((item) => {
          const pct = Math.round((item.value / max) * 100);
          return (
            <li key={item.label}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium text-steel">
                  {item.label}
                </span>
                <span className="text-sm font-semibold tabular-nums text-ink">
                  {item.value.toLocaleString()}
                  {unit ? (
                    <span className="ml-1 font-normal text-slate">{unit}</span>
                  ) : null}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-cloud">
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
