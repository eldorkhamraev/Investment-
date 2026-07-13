import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MinistryLockup } from "@/components/ui/brand";

const EXPLORE = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
] as const;

export function SiteFooter() {
  const t = useTranslations();
  const year = 2026;

  return (
    <footer className="bg-ink text-white/70">
      <div className="container-edge py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + ministry credibility marker */}
          <div className="max-w-sm">
            <span className="font-display text-lg font-bold text-white">
              Investment Project Office
            </span>
            <p className="mt-4 text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="mt-6 border-l-2 border-azure-500 pl-3">
              <MinistryLockup tone="dark" className="h-9 w-auto opacity-90" />
              <p className="mt-3 text-xs leading-relaxed text-white/50">
                {t("site.under")}
              </p>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              {t("footer.explore")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {EXPLORE.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              {t("footer.connect")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
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
              <li>
                <a
                  href="https://www.linkedin.com/company/investment-project-office/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {t("footer.rights")}
          </p>
          <Link href="/privacy" className="hover:text-white">
            {t("footer.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
