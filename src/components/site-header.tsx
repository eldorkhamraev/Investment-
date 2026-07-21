"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Wordmark } from "@/components/ui/brand";
import { ButtonLink } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { NAV, type NavItem } from "@/config/navigation";
import { Icons } from "@/components/ui/icons";

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const groupActive = (item: NavItem) => {
    if (isActive(item.href)) return true;
    return item.children?.some((c) => isActive(c.href)) ?? false;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 backdrop-blur-md">
      <div className="container-edge flex h-20 items-center justify-between gap-4 py-3">
        <Link href="/" aria-label="Investment Office — home">
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-3 xl:flex">
          <nav className="flex items-center gap-0.5">
            {NAV.map((item) =>
              item.children ? (
                <DesktopDropdown
                  key={item.key}
                  item={item}
                  label={t(item.key)}
                  active={groupActive(item)}
                  open={openKey === item.key}
                  onOpen={() => setOpenKey(item.key)}
                  onClose={() => setOpenKey(null)}
                  t={t}
                />
              ) : (
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
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 border-l border-line/70 pl-4">
            <Link
              href="/search"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-steel hover:bg-cloud hover:text-ink"
              aria-label={t("search")}
            >
              <Icons.search className="h-4 w-4" />
            </Link>
            <LocaleSwitcher />
            <ButtonLink href="/contact" size="sm" variant="secondary">
              {t("cta")}
            </ButtonLink>
          </div>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <Link
            href="/search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-cloud"
            aria-label={t("search")}
          >
            <Icons.search className="h-5 w-5" />
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-cloud"
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
      </div>

      {open ? (
        <div className="border-t border-line bg-white xl:hidden">
          <nav className="container-edge flex max-h-[80vh] flex-col overflow-y-auto py-3">
            {NAV.map((item) => (
              <div key={item.key} className="border-b border-line/60 py-1 last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-base font-semibold ${
                    groupActive(item) ? "text-azure-700" : "text-ink"
                  }`}
                >
                  {t(item.key)}
                </Link>
                {item.children ? (
                  <div className="mb-2 ml-2 flex flex-col">
                    {item.children.map((child) => (
                      <Link
                        key={child.key}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className={`rounded-lg px-3 py-2 text-sm ${
                          isActive(child.href)
                            ? "text-azure-700"
                            : "text-steel hover:bg-cloud"
                        }`}
                      >
                        {t(child.key)}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
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

function DesktopDropdown({
  item,
  label,
  active,
  open,
  onOpen,
  onClose,
  t,
}: {
  item: NavItem;
  label: string;
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  t: ReturnType<typeof useTranslations<"nav">>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
          active || open
            ? "bg-azure-50 text-azure-700"
            : "text-steel hover:bg-cloud hover:text-ink"
        }`}
        aria-expanded={open}
        onClick={() => (open ? onClose() : onOpen())}
      >
        {label}
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
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
      {open && item.children ? (
        <div className="absolute left-0 top-full z-50 pt-2">
          <div className="min-w-[220px] rounded-2xl border border-line bg-white p-2 shadow-lift">
            {item.children.map((child) => (
              <Link
                key={child.key}
                href={child.href}
                onClick={onClose}
                className="block rounded-xl px-3 py-2.5 text-sm text-steel transition-colors hover:bg-cloud hover:text-ink"
              >
                {t(child.key)}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
