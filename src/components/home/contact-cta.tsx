"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export function ContactCta() {
  const t = useTranslations("home.contact");

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="container-edge">
        <div className="relative overflow-hidden rounded-3xl bg-azure-700 px-6 py-14 md:px-16 md:py-20">
          {/* Background photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lets-do-it-together.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
          />
          {/* Decorative glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(50% 90% at 90% 10%, rgba(52,182,220,0.55), transparent 60%), radial-gradient(60% 80% at 0% 100%, rgba(7,30,47,0.55), transparent 60%)",
            }}
          />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl text-white md:text-4xl">{t("title")}</h2>
            <p className="mt-4 text-lg leading-relaxed text-azure-50/90">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/contact" variant="primary" size="lg">
                {t("primary")}
                <Icons.arrow className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink
                href="mailto:invest@digital.uz"
                variant="on-dark"
                size="lg"
              >
                {t("secondary")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
