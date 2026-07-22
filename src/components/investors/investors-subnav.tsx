import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { INVESTOR_SECTIONS } from "@/content/investors";

/**
 * Full-width section nav under the For Investors hero.
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
    <div className="border-b border-line bg-navy-900">
      <div className="container-edge">
        <nav
          className="-mx-1 flex gap-1 overflow-x-auto py-2 scrollbar-none"
          aria-label={t("subnavLabel")}
        >
          {items.map((item) => {
            const active =
              item.slug === undefined ? !current : current === item.slug;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-lg px-3.5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                  active
                    ? "bg-azure-600 text-white"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
