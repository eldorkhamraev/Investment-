import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Montserrat, Inter } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@/components/analytics";
import "../globals.css";

// Montserrat — primary UI + marketing face (gov.uz / ministry).
// Cyrillic subsets for RU and UZ; variable weights 400–800.
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

// Inter — kept available as an optional long-form alternate.
// Not used as the default; Montserrat is sitewide.
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://invest.digital.uz"),
  title: {
    default: "Investment Project Office — Invest in Uzbekistan's Digital Future",
    template: "%s · Investment Project Office",
  },
  description:
    "The Investment Project Office attracts investment, grants and partnerships into Uzbekistan's digital sector and helps foreign technology companies enter the market.",
  openGraph: {
    type: "website",
    siteName: "Investment Project Office",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale as Locale);

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
