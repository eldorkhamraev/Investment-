import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Privacy Policy" };

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations("privacy");
  const body = t.raw("body") as string[];

  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl md:text-4xl">{t("title")}</h1>
        <p className="mt-2 text-sm text-slate">{t("updated")}</p>
        <div className="mt-8 space-y-5">
          {body.map((p, i) => (
            <p key={i} className="leading-relaxed text-steel">
              {p}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
