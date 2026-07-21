"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactCta } from "@/components/home/contact-cta";
import { Link } from "@/i18n/navigation";
import { searchContent } from "@/content/search";

function SearchInner() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initial);

  useEffect(() => {
    setQuery(initial);
  }, [initial]);

  const results = useMemo(() => searchContent(query), [query]);

  return (
    <>
      <PageHero
        eyebrow="Search"
        title="Find pages, projects and answers."
        subtitle="Search sectors, programs, stories, events, FAQ and more."
        image="/samarkand.jpg"
      />

      <Section>
        <SectionHeading eyebrow="Site search" title="What are you looking for?" />
        <div className="mx-auto mt-8 max-w-2xl">
          <label htmlFor="site-search" className="sr-only">
            Search
          </label>
          <input
            id="site-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “IT Park”, “data centre”, “visa”…"
            className="w-full rounded-2xl border border-line bg-white px-5 py-4 text-base shadow-card outline-none ring-azure-500 focus:ring-2"
          />
          <p className="mt-3 text-sm text-slate">
            {query.trim()
              ? `${results.length} result${results.length === 1 ? "" : "s"}`
              : "Enter a keyword to search the site."}
          </p>
        </div>

        <ul className="mx-auto mt-10 max-w-3xl space-y-4">
          {results.map((hit) => {
            const external =
              hit.href.startsWith("http://") || hit.href.startsWith("https://");
            const body = (
              <Card interactive className="h-full">
                <Badge tone="neutral">{hit.type}</Badge>
                <h3 className="mt-3 text-lg">{hit.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">
                  {hit.excerpt}
                </p>
              </Card>
            );
            return (
              <li key={`${hit.type}-${hit.href}-${hit.title}`}>
                {external ? (
                  <a href={hit.href} target="_blank" rel="noopener noreferrer">
                    {body}
                  </a>
                ) : (
                  <Link href={hit.href}>{body}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <ContactCta />
    </>
  );
}

export function SearchClient() {
  return (
    <Suspense
      fallback={
        <Section>
          <p className="text-slate">Loading search…</p>
        </Section>
      }
    >
      <SearchInner />
    </Suspense>
  );
}
