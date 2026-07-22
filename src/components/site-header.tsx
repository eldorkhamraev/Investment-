"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Wordmark } from "@/components/ui/brand";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { NAV, type NavItem } from "@/config/navigation";
import { Icons } from "@/components/ui/icons";

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const groupActive = (item: NavItem) => {
    if (isActive(item.href)) return true;
    return item.children?.some((c) => isActive(c.href)) ?? false;
  };

  return (
    <header className="sticky top-0 z-50 bg-paper shadow-[0_1px_0_0_rgba(13,27,42,0.06)]">
      {/* Top: brand + utilities */}
      <div className="bg-paper">
        <div className="container-edge flex h-[4.25rem] items-center justify-between gap-4 sm:h-[4.75rem]">
          <Link
            href="/"
            aria-label="Investment Project Office — home"
            className="shrink-0"
          >
            <Wordmark />
          </Link>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <Link
              href="/search"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-steel transition-colors hover:bg-mist hover:text-ink"
              aria-label={t("search")}
            >
              <Icons.search className="h-4 w-4" />
            </Link>
            <LocaleSwitcher />
            <Link
              href="/contact"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-steel transition-colors hover:bg-mist hover:text-ink"
              aria-label={t("contact")}
              title={t("contact")}
            >
              <MailIcon className="h-4 w-4" />
            </Link>

            <button
              type="button"
              className="ml-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink hover:bg-mist xl:hidden"
              aria-label={t("menu")}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
      </div>

      {/* Brand accent — separates utility row from navigation */}
      <div className="h-[3px] bg-azure-600" aria-hidden />

      {/* Bottom: primary navigation on cool mist */}
      <div className="hidden border-b border-line bg-mist xl:block">
        <div className="container-edge">
          <nav className="flex items-center gap-x-0.5 py-0">
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
                  isActive={isActive}
                  t={t}
                />
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`relative px-3.5 py-3.5 text-sm tracking-tight transition-colors ${
                    isActive(item.href)
                      ? "font-semibold text-azure-800 after:absolute after:inset-x-3.5 after:bottom-0 after:h-0.5 after:bg-azure-600"
                      : "font-medium text-ink/75 hover:text-ink"
                  }`}
                >
                  {t(item.key)}
                </Link>
              ),
            )}
          </nav>
        </div>
      </div>

      {open ? (
        <div className="border-b border-line bg-paper xl:hidden">
          <nav className="container-edge flex max-h-[80vh] flex-col overflow-y-auto py-3">
            {NAV.map((item) => (
              <div
                key={item.key}
                className="border-b border-line/60 py-1 last:border-0"
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-1 py-2.5 text-sm font-semibold ${
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
                        className={`px-1 py-2 text-sm ${
                          isActive(child.href)
                            ? "font-medium text-azure-700"
                            : "text-steel hover:text-ink"
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
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="text-sm font-semibold text-azure-700"
              >
                {t("contact")}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6.75h16A1.25 1.25 0 0 1 21.25 8v8A1.25 1.25 0 0 1 20 17.25H4A1.25 1.25 0 0 1 2.75 16V8A1.25 1.25 0 0 1 4 6.75Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m4 8 8 5.5L20 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DesktopDropdown({
  item,
  label,
  active,
  open,
  onOpen,
  onClose,
  isActive,
  t,
}: {
  item: NavItem;
  label: string;
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  isActive: (href: string) => boolean;
  t: ReturnType<typeof useTranslations<"nav">>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const children = item.children ?? [];
  const multiCol = children.length >= 5;

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
        className={`relative inline-flex items-center gap-1.5 px-3.5 py-3.5 text-sm tracking-tight transition-colors ${
          active || open
            ? "font-semibold text-azure-700 after:absolute after:inset-x-3.5 after:bottom-0 after:h-0.5 after:bg-azure-600"
            : "font-medium text-ink/80 hover:text-ink"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? onClose() : onOpen())}
      >
        {label}
        <svg
          width="11"
          height="11"
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
        className={`absolute left-0 top-full z-50 pt-0 transition-[opacity,transform] duration-200 ease-out ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
        aria-hidden={!open}
      >
        {children.length > 0 ? (
          <div
            className={`rounded-b-xl border border-t-0 border-line bg-white shadow-lift ${
              multiCol ? "w-[28rem]" : "min-w-[17rem]"
            }`}
          >
            {multiCol ? (
              <div className="grid grid-cols-2 divide-x divide-line">
                {(() => {
                  const mid = Math.ceil(children.length / 2);
                  const columns = [
                    children.slice(0, mid),
                    children.slice(mid),
                  ];
                  return columns.map((colItems, col) => (
                    <div key={col} className="flex flex-col py-1">
                      {colItems.map((child, index) => {
                        const childActive = isActive(child.href);
                        return (
                          <div key={child.key} className="flex flex-col">
                            {index > 0 ? (
                              <div
                                className="mx-3 border-t border-line"
                                aria-hidden
                              />
                            ) : null}
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className={`relative px-3.5 py-3 text-sm leading-snug tracking-tight transition-colors ${
                                childActive
                                  ? "font-semibold text-ink after:absolute after:inset-x-3.5 after:bottom-1 after:h-0.5 after:rounded-full after:bg-azure-600"
                                  : "font-medium text-steel hover:text-ink"
                              }`}
                            >
                              {t(child.key)}
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  ));
                })()}
              </div>
            ) : (
              <div className="flex flex-col py-1">
                {children.map((child, index) => {
                  const childActive = isActive(child.href);
                  return (
                    <div key={child.key} className="flex flex-col">
                      {index > 0 ? (
                        <div
                          className="mx-3 border-t border-line"
                          aria-hidden
                        />
                      ) : null}
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className={`relative px-3.5 py-3 text-sm leading-snug tracking-tight transition-colors ${
                          childActive
                            ? "font-semibold text-ink after:absolute after:inset-x-3.5 after:bottom-1 after:h-0.5 after:rounded-full after:bg-azure-600"
                            : "font-medium text-steel hover:text-ink"
                        }`}
                      >
                        {t(child.key)}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
            {item.key !== "about" ? (
              <div className="border-t border-line">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold text-azure-700 transition-colors hover:bg-mist"
                >
                  {label}
                  <Icons.arrow className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
