import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { INVESTOR_SECTIONS } from "@/content/investors";

/**
 * Quiet section nav under the For Investors hero —
 * matches Why Uzbekistan: text links, hairlines, underline active.
 */
export async function InvestorsSubnav({
  current,
}: {
  current?: string;
}) {
  const t = await getTranslations("investorsPage");

  const items = [
    {
      href: "/how-to-invest" as const,
      label: t("overview"),
      slug: undefined as string | undefined,
    },
    ...INVESTOR_SECTIONS.map((section) => ({
      href: section.href as `/${string}`,
      label: section.eyebrow,
      slug: section.slug as string | undefined,
    })),
  ];

  return (
    <div className="border-b border-line bg-paper">
      <div className="container-edge">
        <nav
          className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 py-1"
          aria-label={t("subnavLabel")}
        >
          {items.map((item, index) => {
            const active =
              item.slug === undefined ? !current : current === item.slug;
            return (
              <span key={item.href} className="flex items-center">
                {index > 0 ? (
                  <span
                    className="mx-1 h-3 w-px shrink-0 bg-line md:mx-2"
                    aria-hidden
                  />
                ) : null}
                <Link
                  href={item.href}
                  className={`relative px-2.5 py-3 text-[13px] tracking-tight transition-colors md:px-3 md:text-sm ${
                    active
                      ? "font-semibold text-ink after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:rounded-full after:bg-azure-600 md:after:inset-x-3"
                      : "font-medium text-steel hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
