import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ContactCta } from "@/components/home/contact-cta";
import { ButtonLink } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "How to invest",
  description:
    "Discover, structure, establish and grow — the Investment Project Office path for technology market entry in Uzbekistan.",
};

const STEPS = [
  {
    title: "Discover",
    desc: "Map your sector fit, review priority projects and understand incentives. Start with the opportunity brief and a discovery call.",
    links: [
      { label: "Why Uzbekistan", href: "/why" },
      { label: "Sectors", href: "/sectors" },
      { label: "Projects", href: "/projects" },
    ],
  },
  {
    title: "Structure",
    desc: "Choose the right legal and incentive path — IT Park residency, tax treatment and ownership structure for your model.",
    links: [
      { label: "Services", href: "/services" },
      { label: "Programs", href: "/programs" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Establish",
    desc: "Register, secure visas, open banking relationships and complete soft-landing so your team can operate on the ground.",
    links: [
      { label: "IT Park Zero Risk", href: "/programs/it-park-zero-risk" },
      { label: "IT-Visa", href: "/programs/it-visa" },
      { label: "Soft-Landing", href: "/programs/soft-landing" },
    ],
  },
  {
    title: "Grow",
    desc: "Hire, expand and stay connected to the ecosystem — forums, partners and aftercare from the office.",
    links: [
      { label: "Events", href: "/events" },
      { label: "Success stories", href: "/stories" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export default async function HowToInvestPage({
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
        title="How to invest in digital Uzbekistan."
        subtitle="Four stages from first conversation to a growing local presence — with the Investment Project Office beside you."
        image="/tashkent-city.webp"
      />

      <Section>
        <SectionHeading
          eyebrow="Pathway"
          title="Discover → Structure → Establish → Grow."
          intro="You do not need to know the full process before contacting us. Bring your goals; we map the path."
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <Card className="h-full">
                <span className="font-display text-3xl font-extrabold text-azure-600">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {step.desc}
                </p>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {step.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm font-semibold text-azure-700 hover:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/contact" variant="primary" size="lg">
            Start a conversation
          </ButtonLink>
          <ButtonLink href="/faq" variant="outline" size="lg">
            Read the FAQ
          </ButtonLink>
          <ButtonLink href="/resources" variant="outline" size="lg">
            Browse resources
          </ButtonLink>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
