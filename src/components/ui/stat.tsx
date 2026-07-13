"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Animated statistic. Counts up from 0 to `value` the first time it scrolls
 * into view. Respects prefers-reduced-motion (jumps straight to the value).
 */
export function Stat({
  value,
  prefix = "",
  suffix = "",
  label,
  source,
  decimals = 0,
  tone = "light",
  icon,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  source?: string;
  decimals?: number;
  tone?: "light" | "dark";
  icon?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const dark = tone === "dark";

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (reduce) {
          setDisplay(value);
          return;
        }

        const duration = 1400;
        let start: number | null = null;
        const step = (t: number) => {
          if (start === null) start = t;
          const progress = Math.min((t - start) / duration, 1);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(value * eased);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div ref={ref}>
      {icon ? (
        <div
          className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
            dark
              ? "bg-white/10 text-azure-300 ring-1 ring-inset ring-white/15"
              : "bg-azure-50 text-azure-600 ring-1 ring-inset ring-azure-100"
          }`}
        >
          {icon}
        </div>
      ) : null}
      <div
        className={`font-display text-4xl font-extrabold tracking-tight md:text-5xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {prefix}
        {formatted}
        {suffix}
      </div>
      <div
        className={`mt-2 text-sm leading-snug ${
          dark ? "text-azure-100/70" : "text-slate"
        }`}
      >
        {label}
      </div>
      {source ? (
        <div
          className={`mt-1 text-xs ${dark ? "text-white/35" : "text-slate/60"}`}
        >
          {source}
        </div>
      ) : null}
    </div>
  );
}
