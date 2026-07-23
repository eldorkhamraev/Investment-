"use client";

import { useTranslations } from "next-intl";

export type UniversityLogo = {
  name: string;
  logo: string;
  tone?: "light" | "dark";
};

/** Editorial campus directory — names lead, logos stay small and quiet. */
export function UniversityCarousel({
  title,
  items,
}: {
  title: string;
  items: UniversityLogo[];
}) {
  const t = useTranslations("whyPage");

  return (
    <div>
      <div className="max-w-2xl">
        <p className="eyebrow">{t("universitiesEyebrow")}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink md:text-2xl">
          {title}
        </h3>
      </div>

      <ul className="mt-8 grid gap-x-10 gap-y-0 sm:grid-cols-2">
        {items.map((uni) => (
          <li
            key={uni.name}
            className="group flex items-center gap-4 border-t border-line py-4 transition-colors hover:border-azure-300"
          >
            <div className="flex h-10 w-14 shrink-0 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={uni.logo}
                alt=""
                className="max-h-9 max-w-full object-contain opacity-70 transition duration-300 group-hover:opacity-100"
              />
            </div>
            <p className="text-sm font-medium leading-snug text-ink md:text-[15px]">
              {uni.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
