"use client";

import { useState } from "react";

export type Deal = {
  sector: string;
  title: string;
  img: string;
  desc: string;
};
export type YearGroup = { year: string; deals: Deal[] };

export function PortfolioExplorer({
  label,
  title,
  intro,
  hint,
  years,
}: {
  label: string;
  title: string;
  intro: string;
  hint: string;
  years: YearGroup[];
}) {
  const [active, setActive] = useState(years[0]?.year ?? "");
  const group = years.find((y) => y.year === active) ?? years[0];

  return (
    <div className="grid gap-12 lg:grid-cols-[0.8fr_2.2fr] lg:gap-16">
      {/* Left: anchor text + year selector */}
      <div>
        <span className="eyebrow">{label}</span>
        <h2 className="mt-3 text-3xl md:text-4xl">{title}</h2>
        <p className="mt-4 leading-relaxed text-slate">{intro}</p>

        <div className="mt-8 flex flex-wrap gap-3 lg:flex-col lg:gap-0">
          {years.map((y) => {
            const on = y.year === active;
            return (
              <button
                key={y.year}
                onClick={() => setActive(y.year)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left font-display text-2xl font-extrabold tracking-tight transition-colors lg:rounded-none lg:border-l-2 lg:px-0 lg:pl-5 ${
                  on
                    ? "text-azure-700 lg:border-l-azure-600"
                    : "text-slate/50 hover:text-ink lg:border-l-line"
                }`}
              >
                {y.year}
                <span
                  className={`text-xs font-semibold ${on ? "text-slate" : "text-transparent"}`}
                >
                  {y.deals.length} projects
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: deal cards for the active year */}
      <div>
        <div className="grid gap-6 sm:grid-cols-2">
          {group?.deals.map((d) => (
            <DealCard key={d.title} deal={d} />
          ))}
        </div>
        <p className="mt-6 text-sm text-slate/70">{hint}</p>
      </div>
    </div>
  );
}

function DealCard({ deal }: { deal: Deal }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className="group relative block aspect-[5/6] w-full overflow-hidden rounded-2xl border border-line text-left shadow-card"
    >
      {/* Photo layer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={deal.img}
        alt={deal.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute left-5 top-5 z-10 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-ink backdrop-blur">
        {deal.sector}
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent p-6">
        <h3 className="text-xl font-extrabold leading-tight text-white md:text-2xl">
          {deal.title}
        </h3>
      </div>

      {/* White reveal panel (hover on desktop, tap on mobile) */}
      <div
        className={`absolute inset-0 z-[5] flex flex-col bg-white p-7 transition-opacity duration-300 group-hover:opacity-100 md:p-8 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-azure-700">
          <span className="h-1.5 w-1.5 rounded-full bg-azure-600" />
          {deal.sector}
        </span>
        <h3 className="mt-6 text-2xl font-extrabold leading-tight text-ink md:text-3xl">
          {deal.title}
        </h3>
        <p className="mt-4 text-[0.95rem] font-medium leading-relaxed text-steel">
          {deal.desc}
        </p>
        <DealLines />
      </div>
    </button>
  );
}

function DealLines() {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 right-0 h-28 w-56 text-azure-300"
      viewBox="0 0 220 110"
      fill="none"
      aria-hidden="true"
    >
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M0 ${100 - i * 12} C 80 ${100 - i * 12}, 100 ${44 - i * 9}, 220 ${44 - i * 9}`}
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
      ))}
    </svg>
  );
}
