import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { WhyUzbekistan } from "@/components/home/why-uzbekistan";
import { TrackRecord } from "@/components/home/track-record";
import { ServicesTeaser } from "@/components/home/services-teaser";
import { Sectors } from "@/components/home/sectors";
import { InvestmentMap } from "@/components/home/investment-map";
import { StoriesTeaser } from "@/components/home/stories-teaser";
import { NewsTeaser } from "@/components/home/news-teaser";

// The news teaser reads from the CMS, so render on demand.
export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Portal-style home: hero → why → proof → services → fields → map → stories → news.
  return (
    <>
      <Hero />
      <WhyUzbekistan />
      <TrackRecord />
      <ServicesTeaser />
      <Sectors />
      <InvestmentMap />
      <StoriesTeaser />
      <NewsTeaser />
    </>
  );
}
