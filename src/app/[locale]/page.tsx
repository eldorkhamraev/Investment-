import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { WhyUzbekistan } from "@/components/home/why-uzbekistan";
import { TrackRecord } from "@/components/home/track-record";
import { Timeline } from "@/components/home/timeline";
import { ServicesTeaser } from "@/components/home/services-teaser";
import { Sectors } from "@/components/home/sectors";
import { NewsTeaser } from "@/components/home/news-teaser";
import { ContactCta } from "@/components/home/contact-cta";

// The news teaser reads from the CMS, so render on demand.
export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <WhyUzbekistan />
      <TrackRecord />
      <Timeline />
      <ServicesTeaser />
      <Sectors />
      <NewsTeaser />
      <ContactCta />
    </>
  );
}
