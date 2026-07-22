"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icons } from "@/components/ui/icons";

type Figure = {
  value: string;
  label: string;
};

const VISIBLE = 4;

/**
 * Quiet “Uzbekistan in numbers” — typography only, like the reference strip.
 */
export function TrackRecord() {
  const t = useTranslations("home.track");
  const figures = t.raw("figures") as Figure[];
  const max = Math.max(0, figures.length - VISIBLE);
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion || max === 0) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i >= max ? 0 : i + 1));
    }, 4500);
    return () => window.clearInterval(id);
  }, [max, reduceMotion]);

  function prev() {
    setIndex((i) => (i <= 0 ? max : i - 1));
  }

  function next() {
    setIndex((i) => (i >= max ? 0 : i + 1));
  }

  const visible = figures.slice(index, index + VISIBLE);

  return (
    <section className="border-y border-line bg-paper py-14 md:py-16">
      <div className="container-edge">
        <h2 className="text-center text-xl font-semibold tracking-tight text-azure-800 md:text-2xl">
          {t("title")}
        </h2>

        <div className="relative mt-12 md:mt-14">
          <button
            type="button"
            onClick={prev}
            aria-label={t("prev")}
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center text-ink/50 transition-colors hover:text-ink md:-left-1 md:flex lg:-left-3"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={t("next")}
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center text-ink/50 transition-colors hover:text-ink md:-right-1 md:flex lg:-right-3"
          >
            <Chevron dir="right" />
          </button>

          <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-10">
            {visible.map((figure) => (
              <li
                key={`${figure.label}-${figure.value}`}
                className="flex flex-col items-center text-center"
              >
                <p className="font-display text-3xl font-bold tracking-tight text-azure-800 md:text-[2.05rem]">
                  {figure.value}
                </p>
                <p className="mt-3 max-w-[12rem] text-sm leading-snug text-ink/80">
                  {figure.label}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-center gap-5 md:hidden">
            <button
              type="button"
              onClick={prev}
              aria-label={t("prev")}
              className="inline-flex h-9 w-9 items-center justify-center text-ink/50"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={t("next")}
              className="inline-flex h-9 w-9 items-center justify-center text-ink/50"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>

        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/why"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-azure-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-azure-700"
          >
            {t("cta")}
            <Icons.arrow className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M15 6 9 12l6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
