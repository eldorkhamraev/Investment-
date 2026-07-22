import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MinistryLockup } from "@/components/ui/brand";
import { FOOTER_NAV } from "@/config/navigation";

export function SiteFooter() {
  const t = useTranslations();
  const year = 2026;

  return (
    <footer className="bg-ink text-white/70">
      <div className="container-edge py-8 md:py-10">
        {/* Brand + contact */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_auto] md:items-start md:gap-10">
          <div className="max-w-md">
            <span className="font-display text-base font-bold text-white sm:text-lg">
              Investment Project Office
            </span>
            <p className="mt-2 text-sm leading-relaxed">{t("footer.tagline")}</p>
            <MinistryLockup
              tone="dark"
              className="mt-4 h-7 w-auto opacity-90 sm:h-8"
            />
          </div>

          <ul className="space-y-1.5 text-sm md:pt-0.5 md:text-right">
            <li>
              <a
                href="mailto:invest@digital.uz"
                className="transition-colors hover:text-white"
              >
                invest@digital.uz
              </a>
            </li>
            <li>
              <a
                href="tel:+998712384176"
                className="transition-colors hover:text-white"
              >
                +998 71 238 41 76
              </a>
            </li>
            <li className="text-white/50">{t("footer.address")}</li>
          </ul>
        </div>

        {/* Primary nav — single horizontal strip */}
        <nav
          aria-label={t("footer.explore")}
          className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-sm font-semibold text-white"
        >
          {FOOTER_NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="transition-colors hover:text-azure-300"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        {/* Legal bar */}
        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {t("footer.rights")}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/privacy" className="hover:text-white">
              {t("footer.privacy")}
            </Link>
            <Link href="/cookies" className="hover:text-white">
              {t("footer.cookies")}
            </Link>
            <Link href="/sitemap" className="hover:text-white">
              {t("footer.sitemap")}
            </Link>
            <a
              href="https://www.linkedin.com/company/investment-project-office/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
