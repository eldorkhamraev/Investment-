"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export type PersonProfile = {
  id: string;
  name: string;
  role: string;
  unit: string;
  bio?: string;
  phone?: string;
  email?: string;
  website?: string;
  reception?: string;
  photo?: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function PersonModal({
  person,
  onClose,
}: {
  person: PersonProfile;
  onClose: () => void;
}) {
  const t = useTranslations("about.structure");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="person-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/55 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-sm border border-line bg-paper shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.04]"
          style={{
            backgroundImage: "url(/ministry-emblem.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            backgroundSize: "70%",
          }}
          aria-hidden
        />

        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center text-steel transition-colors hover:text-ink"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="relative border-b border-line px-6 pb-4 pt-6 md:px-10">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-line sm:w-16" aria-hidden />
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-800">
              {person.unit}
            </p>
            <span className="h-px w-10 bg-line sm:w-16" aria-hidden />
          </div>
        </div>

        <div className="relative grid gap-6 px-6 py-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8 md:px-10 md:py-10">
          <div className="flex justify-center md:justify-start">
            {person.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={person.photo}
                alt={person.name}
                className="h-28 w-28 rounded-full object-cover ring-1 ring-line sm:h-32 sm:w-32"
              />
            ) : (
              <span
                className="flex h-28 w-28 items-center justify-center rounded-full bg-navy-900 font-display text-2xl font-semibold text-white sm:h-32 sm:w-32"
                aria-hidden
              >
                {initials(person.name)}
              </span>
            )}
          </div>

          <div className="text-center md:text-left">
            <h3
              id="person-modal-title"
              className="text-xl font-semibold text-ink md:text-2xl"
            >
              {person.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-steel md:text-base">
              {person.role}
            </p>
            {person.bio ? (
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate">
                {person.bio}
              </p>
            ) : null}
          </div>

          <dl className="space-y-3 text-sm text-ink md:min-w-[200px]">
            {person.phone ? (
              <div className="flex items-start gap-3">
                <ContactIcon kind="phone" label={t("phone")} />
                <div>
                  <dt className="sr-only">{t("phone")}</dt>
                  <dd>
                    <a
                      href={`tel:${person.phone.replace(/\s/g, "")}`}
                      className="hover:text-azure-700"
                    >
                      {person.phone}
                    </a>
                  </dd>
                </div>
              </div>
            ) : null}
            {person.email ? (
              <div className="flex items-start gap-3">
                <ContactIcon kind="email" label={t("email")} />
                <div>
                  <dt className="sr-only">{t("email")}</dt>
                  <dd>
                    <a
                      href={`mailto:${person.email}`}
                      className="break-all hover:text-azure-700"
                    >
                      {person.email}
                    </a>
                  </dd>
                </div>
              </div>
            ) : null}
            {person.website ? (
              <div className="flex items-start gap-3">
                <ContactIcon kind="website" label={t("website")} />
                <div>
                  <dt className="sr-only">{t("website")}</dt>
                  <dd>
                    <a
                      href={person.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-azure-700"
                    >
                      {person.website.replace(/^https?:\/\//, "")}
                    </a>
                  </dd>
                </div>
              </div>
            ) : null}
            {person.reception ? (
              <div className="flex items-start gap-3">
                <ContactIcon kind="clock" label={t("reception")} />
                <div>
                  <dt className="sr-only">{t("reception")}</dt>
                  <dd className="leading-snug text-steel">{person.reception}</dd>
                </div>
              </div>
            ) : null}
          </dl>
        </div>
      </div>
    </div>
  );
}

function ContactIcon({
  kind,
  label,
}: {
  kind: "phone" | "email" | "website" | "clock";
  label: string;
}) {
  return (
    <span
      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-azure-50 text-azure-700 ring-1 ring-inset ring-azure-100"
      aria-hidden
      title={label}
    >
      {kind === "phone" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M6.5 4.5h3l1.5 4-2 1.5a12 12 0 005.5 5.5l1.5-2 4 1.5v3a2 2 0 01-2 2A14.5 14.5 0 014.5 6.5a2 2 0 012-2z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
      {kind === "email" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 7.5h16v9H4v-9z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M4 8l8 5 8-5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
      {kind === "website" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M4.5 12h15M12 4.5c2.2 2.4 3.3 4.9 3.3 7.5S14.2 17.1 12 19.5M12 4.5C9.8 6.9 8.7 9.4 8.7 12s1.1 5.1 3.3 7.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      ) : null}
      {kind === "clock" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 8v4.5l3 1.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
    </span>
  );
}
