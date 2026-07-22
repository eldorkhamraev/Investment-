import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export type AboutSection = "office" | "structure" | "team";

const ITEMS: { section: AboutSection; href: "/about" | "/about/structure" | "/about/team" }[] = [
  { section: "office", href: "/about" },
  { section: "structure", href: "/about/structure" },
  { section: "team", href: "/about/team" },
];

export async function AboutSubnav({ current }: { current: AboutSection }) {
  const t = await getTranslations("about.sidebar");

  return (
    <div className="border-b border-line bg-paper">
      <div className="container-edge">
        <nav
          className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 py-1"
          aria-label={t("navLabel")}
        >
          {ITEMS.map((item, index) => {
            const active = current === item.section;
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
                  {t(item.section)}
                </Link>
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
