"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Icons } from "@/components/ui/icons";
import type { NewsItem } from "@/lib/cms";

function hrefFor(item: NewsItem): string | null {
  if (item.id) return `/news/${item.id}`;
  if (item.slug) return `/news/${item.slug}`;
  return null;
}

const ALL = "__all__";

export function NewsGrid({ items }: { items: NewsItem[] }) {
  const t = useTranslations("newsPage");

  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const n of items) if (n.tag) set.add(n.tag);
    return [ALL, ...Array.from(set)];
  }, [items]);

  const [tag, setTag] = useState(ALL);
  const filtered = tag === ALL ? items : items.filter((n) => n.tag === tag);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div>
      <div
        className="flex flex-wrap gap-x-1 gap-y-2 border-b border-line pb-4"
        role="tablist"
        aria-label={t("filterLabel")}
      >
        {tags.map((value) => {
          const active = tag === value;
          const label = value === ALL ? t("filterAll") : value;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTag(value)}
              className={`px-3.5 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "border-b-2 border-azure-600 text-ink"
                  : "border-b-2 border-transparent text-steel hover:text-ink"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {featured ? (
        <FeaturedStory
          item={featured}
          readLabel={t("readArticle")}
          featuredLabel={t("featuredLabel")}
        />
      ) : null}

      {rest.length > 0 ? (
        <ul className="mt-2 divide-y divide-line border-t border-line">
          {rest.map((n, i) => (
            <NewsRow
              key={n.id ?? `${n.title}-${i}`}
              item={n}
              readLabel={t("readArticle")}
            />
          ))}
        </ul>
      ) : null}

      {filtered.length === 0 ? (
        <p className="mt-10 text-steel">{t("empty")}</p>
      ) : null}
    </div>
  );
}

function FeaturedStory({
  item,
  readLabel,
  featuredLabel,
}: {
  item: NewsItem;
  readLabel: string;
  featuredLabel: string;
}) {
  const href = hrefFor(item);
  const content = (
    <div className="grid overflow-hidden border border-line bg-white shadow-card md:grid-cols-2">
      <div className="relative min-h-56 bg-mist md:min-h-[22rem]">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <MediaPlaceholder className="absolute inset-0 h-full w-full" seed={item.id ?? 0} />
        )}
      </div>
      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-9">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-azure-700">
          {featuredLabel}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
          {item.date ? (
            <time className="font-semibold uppercase tracking-[0.12em] text-slate">
              {item.date}
            </time>
          ) : null}
          {item.tag ? (
            <span className="font-semibold uppercase tracking-[0.12em] text-azure-700">
              {item.tag}
            </span>
          ) : null}
        </div>
        <h2 className="mt-3 text-xl leading-snug text-ink transition-colors group-hover:text-azure-700 md:text-2xl">
          {item.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-steel md:text-[0.95rem]">
          {item.excerpt}
        </p>
        {href ? (
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-azure-700 transition-[gap] group-hover:gap-2.5">
            {readLabel} <Icons.arrow className="h-4 w-4" />
          </span>
        ) : null}
      </div>
    </div>
  );

  if (!href) return <div className="mt-8">{content}</div>;
  return (
    <Link href={href} className="group mt-8 block">
      {content}
    </Link>
  );
}

function NewsRow({ item, readLabel }: { item: NewsItem; readLabel: string }) {
  const href = hrefFor(item);

  const inner = (
    <div className="grid gap-5 py-5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-8 md:grid-cols-[10rem_minmax(0,1fr)_auto] md:items-start">
      <div className="relative hidden aspect-[4/3] overflow-hidden bg-mist sm:block">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <MediaPlaceholder className="h-full w-full" seed={item.id ?? 1} />
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
          {item.date ? (
            <time className="font-semibold uppercase tracking-[0.12em] text-slate">
              {item.date}
            </time>
          ) : null}
          {item.tag ? (
            <span className="font-semibold uppercase tracking-[0.12em] text-azure-700">
              {item.tag}
            </span>
          ) : null}
        </div>
        <h3 className="mt-1.5 text-base leading-snug text-ink transition-colors group-hover:text-azure-700 md:text-lg">
          {item.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-steel">
          {item.excerpt}
        </p>
      </div>

      <span className="hidden items-center gap-1.5 self-center text-sm font-semibold text-azure-700 md:inline-flex">
        {readLabel}
        <Icons.arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </div>
  );

  if (!href) return <li>{inner}</li>;
  return (
    <li>
      <Link href={href} className="group block">
        {inner}
      </Link>
    </li>
  );
}
