"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeNames, type Locale } from "@/i18n/routing";

export function LocaleSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dark = tone === "dark";

  function onSelect(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${isPending ? "opacity-60" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Language"
        className={`inline-flex h-8 items-center gap-1 rounded-lg px-2.5 text-[12px] font-semibold uppercase tracking-wide transition-colors ${
          dark
            ? "text-white/80 hover:bg-white/10 hover:text-white"
            : "text-steel hover:bg-cloud hover:text-ink"
        }`}
      >
        {locale}
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`absolute right-0 top-full z-50 pt-2 transition-[opacity,transform] duration-200 ease-out ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <ul
          role="listbox"
          aria-label="Language"
          className="min-w-[9.5rem] overflow-hidden rounded-xl border border-line bg-white py-1 shadow-lift"
        >
          {routing.locales.map((l, index) => {
            const active = l === locale;
            return (
              <li key={l} role="option" aria-selected={active}>
                {index > 0 ? (
                  <div className="mx-3 border-t border-line" aria-hidden />
                ) : null}
                <button
                  type="button"
                  onClick={() => onSelect(l)}
                  className={`flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? "font-semibold text-ink"
                      : "font-medium text-steel hover:bg-mist hover:text-ink"
                  }`}
                >
                  <span>{localeNames[l]}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate">
                    {l}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
