"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Wordmark } from "@/components/ui/brand";
import { ButtonLink } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/locale-switcher";

const NAV = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 backdrop-blur-md">
      <div className="container-edge flex h-20 items-center justify-between gap-6 py-3">
        <Link href="/" aria-label="Investment Office — home">
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          <nav className="flex items-center gap-0.5">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-azure-50 text-azure-700"
                    : "text-steel hover:bg-cloud hover:text-ink"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 border-l border-line/70 pl-5">
            <LocaleSwitcher />
            <ButtonLink href="/contact" size="sm" variant="secondary">
              {t("cta")}
            </ButtonLink>
          </div>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-cloud lg:hidden"
          aria-label={t("menu")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="container-edge flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium ${
                  isActive(item.href)
                    ? "text-azure-700"
                    : "text-steel hover:bg-cloud"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-line pt-4">
              <LocaleSwitcher />
              <ButtonLink href="/contact" size="sm" variant="secondary">
                {t("cta")}
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
