import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { ContactCta } from "@/components/home/contact-cta";
import { FAQ, FAQ_CATEGORIES } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about the Investment Project Office mandate, market entry, incentives and process.",
};

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        eyebrow="For investors"
        title="Frequently asked questions."
        subtitle="Mandate, market entry, incentives, investment and what happens after you contact us."
        image="/about-building.png"
      />

      <Section>
        <SectionHeading
          eyebrow="FAQ"
          title="Answers before the first call."
        />
        <div className="mx-auto mt-12 max-w-3xl space-y-12">
          {FAQ_CATEGORIES.map((category) => {
            const items = FAQ.filter((f) => f.category === category);
            return (
              <div key={category}>
                <h2 className="text-xl text-azure-700">{category}</h2>
                <div className="mt-4 space-y-3">
                  {items.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-2xl border border-line bg-white px-5 py-4 shadow-card open:shadow-lift"
                    >
                      <summary className="cursor-pointer list-none font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                        <span className="flex items-start justify-between gap-4">
                          {item.q}
                          <span
                            className="mt-0.5 shrink-0 text-azure-600 transition-transform group-open:rotate-45"
                            aria-hidden="true"
                          >
                            +
                          </span>
                        </span>
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-steel">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
