"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeNames, type Locale } from "@/i18n/routing";

export function LocaleSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const dark = tone === "dark";

  function onSelect(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next as Locale });
    });
  }

  return (
    <div
      className={`inline-flex items-center rounded-full p-0.5 text-sm ${
        dark ? "bg-white/10" : "bg-cloud"
      } ${isPending ? "opacity-60" : ""}`}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            onClick={() => onSelect(l)}
            aria-current={active ? "true" : undefined}
            title={localeNames[l]}
            className={`rounded-full px-2.5 py-1 font-semibold uppercase transition-colors ${
              active
                ? dark
                  ? "bg-white text-ink"
                  : "bg-white text-azure-700 shadow-sm"
                : dark
                  ? "text-white/70 hover:text-white"
                  : "text-slate hover:text-ink"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
