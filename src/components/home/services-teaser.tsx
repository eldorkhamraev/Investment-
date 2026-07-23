import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { Icons } from "@/components/ui/icons";

type Service = { title: string; desc: string };

/**
 * Home services strip — institutional list, not marketing cards.
 */
export function ServicesTeaser() {
  const t = useTranslations("home.services");
  const items = t.raw("items") as Service[];

  return (
    <Section tone="paper" className="!py-14 md:!py-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="max-w-2xl">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-2 text-2xl tracking-tight md:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-steel">
            {t("intro")}
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-azure-700 transition-colors hover:text-azure-800"
        >
          {t("cta")}
          <Icons.arrow className="h-3.5 w-3.5" />
        </Link>
      </div>

      <ul className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.title} className="bg-paper px-5 py-7 sm:px-6 sm:py-8">
            <h3 className="text-[0.95rem] font-semibold leading-snug tracking-tight text-ink md:text-base">
              {item.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-steel">
              {item.desc}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
