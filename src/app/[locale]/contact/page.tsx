import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/contact/contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage.hero" });
  return { title: "Contact", description: t("subtitle") };
}

type Channel = { name: string; value: string };

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("contactPage");
  const channels = t.raw("channels.items") as Channel[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        image="/contact-bg.jpg"
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Form */}
          <div>
            <ContactForm />
          </div>

          {/* Details */}
          <aside className="space-y-8">
            <div className="rounded-2xl border border-line bg-mist p-7">
              <h2 className="text-lg">{t("details.title")}</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <Row label="Address" value={t("details.address")} />
                <Row
                  label="Phone"
                  value={t("details.phone")}
                  href={`tel:${t("details.phone").replace(/[^+\d]/g, "")}`}
                />
                <Row
                  label="Email"
                  value={t("details.email")}
                  href={`mailto:${t("details.email")}`}
                />
                <Row
                  label="Portal"
                  value={t("details.portal")}
                  href={`https://${t("details.portal")}`}
                />
              </dl>
            </div>

            <div className="rounded-2xl border border-line bg-white p-7">
              <h2 className="text-lg">{t("channels.title")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {t("channels.intro")}
              </p>
              <ul className="mt-4 space-y-2.5">
                {channels.map((c) => (
                  <li
                    key={c.name}
                    className="flex items-center justify-between gap-4 border-b border-line pb-2.5 text-sm last:border-0 last:pb-0"
                  >
                    <span className="font-semibold text-steel">{c.name}</span>
                    <span className="text-slate">{c.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Real Google map — full width */}
        <div className="mt-12 h-72 overflow-hidden rounded-2xl border border-line md:mt-16 md:h-96">
          <iframe
            title="Office location"
            src="https://www.google.com/maps?q=Ministry%20of%20Digital%20Technologies%2C%20Muminov%20street%2C%20Tashkent%2C%20Uzbekistan&z=15&output=embed"
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>
    </>
  );
}

function Row({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs uppercase tracking-wider text-slate">{label}</dt>
      <dd className="text-ink">
        {href ? (
          <a href={href} className="hover:text-azure-700">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
