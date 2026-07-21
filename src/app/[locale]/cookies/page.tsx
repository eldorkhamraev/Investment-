import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = { title: "Cookie Policy" };

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl md:text-4xl">Cookie Policy</h1>
        <p className="mt-2 text-sm text-slate">Last updated: July 2026</p>
        <div className="mt-8 space-y-5 leading-relaxed text-steel">
          <p>
            This Cookie Policy explains how the Investment Project Office of the
            Ministry of Digital Technologies of the Republic of Uzbekistan
            (&quot;we&quot;, &quot;us&quot;) uses cookies and similar technologies on
            invest.digital.uz (the &quot;Site&quot;).
          </p>
          <p>
            Cookies are small text files placed on your device when you visit a
            website. They help the Site function, remember preferences and
            understand how visitors use our pages so we can improve content and
            performance.
          </p>
          <h2 className="pt-2 text-xl text-ink">Types of cookies we use</h2>
          <p>
            <strong className="text-ink">Essential cookies.</strong> Required for
            core Site features such as security, load balancing and remembering
            your language preference. These cannot be switched off in our systems
            if you wish to use the Site.
          </p>
          <p>
            <strong className="text-ink">Analytics cookies.</strong> Help us
            understand aggregated traffic and usage patterns (for example, which
            pages are visited most often). Where we use third-party analytics,
            data is processed in anonymised or aggregated form where practicable.
            You may refuse non-essential analytics cookies via your browser
            settings.
          </p>
          <h2 className="pt-2 text-xl text-ink">Managing cookies</h2>
          <p>
            Most browsers let you block or delete cookies through their settings.
            If you block all cookies, some parts of the Site may not work as
            intended. Instructions are usually available under your browser&apos;s
            &quot;Help&quot; or &quot;Privacy&quot; menu.
          </p>
          <h2 className="pt-2 text-xl text-ink">Updates</h2>
          <p>
            We may update this Cookie Policy when our practices or legal
            requirements change. The &quot;Last updated&quot; date at the top of
            this page will reflect the latest revision.
          </p>
          <h2 className="pt-2 text-xl text-ink">Contact</h2>
          <p>
            Questions about cookies or privacy can be sent to{" "}
            <a
              href="mailto:invest@digital.uz"
              className="font-semibold text-azure-700 hover:underline"
            >
              invest@digital.uz
            </a>
            . See also our{" "}
            <Link href="/privacy" className="font-semibold text-azure-700 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
