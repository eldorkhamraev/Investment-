import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { WhyUzbekistan } from "@/components/home/why-uzbekistan";
import { GuidesStrip } from "@/components/home/guides-strip";
import { TrackRecord } from "@/components/home/track-record";
import { ServicesTeaser } from "@/components/home/services-teaser";
import { Sectors } from "@/components/home/sectors";
import { RegionsTeaser } from "@/components/home/regions-teaser";
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

  // Portal-style home (invest.gov structure, digital mandate):
  // hero → why → guides → proof → services → sectors → map teaser → stories → news.
  // No testimonials. No events. No closing sales CTA.
  return (
    <>
      <Hero />
      <WhyUzbekistan />
      <GuidesStrip />
      <TrackRecord />
      <ServicesTeaser />
      <Sectors />
      <RegionsTeaser />
      <StoriesTeaser />
      <NewsTeaser />
    </>
  );
}
