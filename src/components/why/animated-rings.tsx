"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedRing({
  value,
  progress,
  label,
  active,
}: {
  value: string;
  progress: number;
  label: string;
  active: boolean;
}) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const pct = Math.min(Math.max(progress, 0), 100);
  const offset = active ? c - (pct / 100) * c : c;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-[5.25rem] w-[5.25rem]">
        <svg viewBox="0 0 84 84" className="h-full w-full -rotate-90">
          <circle
            cx="42"
            cy="42"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            className="text-cloud"
          />
          <circle
            cx="42"
            cy="42"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className="text-azure-600 transition-[stroke-dashoffset] duration-1000 ease-out"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-base font-semibold tabular-nums text-azure-800">
          {value}
        </span>
      </div>
      <p className="mt-2 max-w-[8.5rem] text-xs leading-snug text-slate sm:text-sm">
        {label}
      </p>
    </div>
  );
}

export function AnimatedRings({
  title,
  caption,
  items,
}: {
  title?: string;
  caption?: string;
  items: { value: string; label: string; progress?: number }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {title ? (
        <div className="mb-8 max-w-xl">
          <h3 className="text-xl font-semibold text-ink md:text-2xl">{title}</h3>
          {caption ? (
            <p className="mt-2 text-sm leading-relaxed text-slate">{caption}</p>
          ) : null}
        </div>
      ) : null}
      <ul className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
        {items.map((item) => (
          <li key={item.label} className="flex justify-center">
            <AnimatedRing
              value={item.value}
              progress={item.progress ?? 0}
              label={item.label}
              active={active}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
