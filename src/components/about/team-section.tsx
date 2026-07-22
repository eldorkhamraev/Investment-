"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ABOUT_TEAM_IDS } from "@/content/about";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function TeamSection() {
  const t = useTranslations("about.team");
  const tp = useTranslations("about.people");
  const ts = useTranslations("about.structure");

  return (
    <div className="mt-10 space-y-0 divide-y divide-line border-y border-line">
      {ABOUT_TEAM_IDS.map((id) => {
        const name = tp(`${id}.name`);
        const role = tp(`${id}.role`);
        const bio = tp(`${id}.bio`);
        const phone = tp.has(`${id}.phone`) ? tp(`${id}.phone`) : undefined;
        const email = tp.has(`${id}.email`) ? tp(`${id}.email`) : undefined;
        const reception = tp.has(`${id}.reception`)
          ? tp(`${id}.reception`)
          : undefined;

        return (
          <article
            key={id}
            id={`team-${id}`}
            className="grid gap-6 py-8 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-10 md:py-10"
          >
            <span
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-lg font-semibold text-white"
              aria-hidden
            >
              {initials(name)}
            </span>

            <div className="min-w-0">
              <h3 className="text-xl font-semibold text-ink">{name}</h3>
              <p className="mt-1 text-sm font-medium text-azure-800">{role}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel md:text-base">
                {bio}
              </p>
              <Link
                href={`/about/structure?person=${id}`}
                className="mt-4 inline-block text-sm font-semibold text-azure-700 underline-offset-4 hover:underline"
              >
                {t("viewInStructure")}
              </Link>
            </div>

            <dl className="space-y-2 text-sm text-ink md:min-w-[200px] md:text-right">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
                {t("contactLabel")}
              </dt>
              {phone ? (
                <dd>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="hover:text-azure-700"
                    aria-label={ts("phone")}
                  >
                    {phone}
                  </a>
                </dd>
              ) : null}
              {email ? (
                <dd>
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-azure-700"
                    aria-label={ts("email")}
                  >
                    {email}
                  </a>
                </dd>
              ) : null}
              {reception ? (
                <dd className="text-steel md:text-right">{reception}</dd>
              ) : null}
            </dl>
          </article>
        );
      })}
    </div>
  );
}
