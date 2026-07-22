import { Link } from "@/i18n/navigation";
import { WHY_PAGES } from "@/content/why";

export function WhySidebar({ current }: { current?: string }) {
  return (
    <aside className="lg:sticky lg:top-24">
      <p className="text-xs font-semibold uppercase tracking-widest text-azure-700">
        Why Uzbekistan
      </p>
      <nav className="mt-4 flex flex-col gap-1" aria-label="Why Uzbekistan pages">
        <Link
          href="/why"
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            !current
              ? "bg-azure-50 text-azure-800"
              : "text-steel hover:bg-cloud hover:text-ink"
          }`}
        >
          Overview
        </Link>
        {WHY_PAGES.map((page) => {
          const active = current === page.slug;
          return (
            <Link
              key={page.slug}
              href={`/why/${page.slug}`}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-azure-50 text-azure-800"
                  : "text-steel hover:bg-cloud hover:text-ink"
              }`}
            >
              {page.eyebrow}
            </Link>
          );
        })}
      </nav>
      <p className="mt-6 text-xs leading-relaxed text-slate">
        Economy-wide topics (mining, textiles, agri) live on{" "}
        <a
          href="https://invest.gov.uz/en"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-azure-700 underline-offset-2 hover:underline"
        >
          invest.gov.uz
        </a>
        .
      </p>
    </aside>
  );
}
