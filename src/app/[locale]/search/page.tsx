import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SearchClient } from "./search-client";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search the Investment Project Office site — sectors, programs, projects, stories and FAQ.",
};

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SearchClient />;
}
