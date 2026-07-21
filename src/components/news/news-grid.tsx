"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Icons } from "@/components/ui/icons";
import type { NewsItem } from "@/lib/cms";

export function NewsGrid({ items }: { items: NewsItem[] }) {
  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const n of items) if (n.tag) set.add(n.tag);
    return ["All", ...Array.from(set)];
  }, [items]);

  const [tag, setTag] = useState("All");
  const filtered = tag === "All" ? items : items.filter((n) => n.tag === tag);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(t)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              tag === t
                ? "bg-azure-600 text-white"
                : "bg-cloud text-steel hover:bg-azure-50 hover:text-azure-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((n, i) => (
          <NewsCard key={n.id ?? `${n.title}-${i}`} item={n} />
        ))}
      </div>
    </div>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  const inner = (
    <>
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt={item.title}
          className="h-48 w-full object-cover"
        />
      ) : (
        <MediaPlaceholder className="h-48 w-full" seed={item.id ?? 0} />
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          {item.tag ? <Badge tone="azure">{item.tag}</Badge> : null}
          <span className="text-xs text-slate">{item.date}</span>
        </div>
        <h3 className="mt-4 text-lg leading-snug group-hover:text-azure-700">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate">
          {item.excerpt}
        </p>
        {item.id || item.slug ? (
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-azure-700 transition-transform group-hover:gap-2.5">
            Read the article <Icons.arrow className="h-4 w-4" />
          </span>
        ) : null}
      </div>
    </>
  );

  const shell =
    "group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-200";

  const href = item.id
    ? `/news/${item.id}`
    : item.slug
      ? `/news/${item.slug}`
      : null;
  return href ? (
    <Link
      href={href}
      className={`${shell} hover:-translate-y-0.5 hover:border-azure-200 hover:shadow-lift`}
    >
      {inner}
    </Link>
  ) : (
    <article className={shell}>{inner}</article>
  );
}
