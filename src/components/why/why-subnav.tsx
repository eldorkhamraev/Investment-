import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { WHY_PAGES } from "@/content/why";

/**
 * Full-width section nav under the hero (replaces the old left sidebar).
 */
export async function WhySubnav({ current }: { current?: string }) {
  const t = await getTranslations("whyPage");

  const items = [
    { href: "/why" as const, label: t("overview"), slug: undefined as string | undefined },
    ...WHY_PAGES.map((page) => ({
      href: `/why/${page.slug}` as const,
      label: page.eyebrow,
      slug: page.slug as string | undefined,
    })),
  ];

  return (
    <div className="border-b border-line bg-navy-900">
      <div className="container-edge">
        <nav
          className="-mx-1 flex gap-1 overflow-x-auto py-2 scrollbar-none"
          aria-label={t("sidebarLabel")}
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
