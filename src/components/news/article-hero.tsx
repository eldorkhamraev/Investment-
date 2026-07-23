import { Link } from "@/i18n/navigation";
import { Icons } from "@/components/ui/icons";

/**
 * Full-bleed press-release hero — title sits on a photo (or ink wash),
 * with a brand accent rule, matching the invest.gov / UzNIF treatment.
 */
export function ArticleHero({
  title,
  date,
  tag,
  image,
  backLabel,
}: {
  title: string;
  date: string;
  tag?: string;
  image?: string | null;
  backLabel: string;
}) {
  return (
    <header className="relative overflow-hidden bg-ink">
      {image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Lighter scrim so the photo reads more clearly */}
          <div className="absolute inset-0 bg-ink/30" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(7,30,47,0.78) 0%, rgba(7,30,47,0.45) 48%, rgba(7,30,47,0.18) 100%)",
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, var(--color-ink) 0%, #0e3054 48%, var(--color-azure-700) 100%)",
          }}
        />
      )}

      <div className="container-edge relative flex min-h-[14rem] flex-col md:min-h-[17rem] lg:min-h-[19rem]">
        <div className="pt-6 md:pt-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-azure-100 transition-[gap,color] hover:gap-2.5 hover:text-white"
          >
            <Icons.arrow className="h-4 w-4 rotate-180" />
            {backLabel}
          </Link>
        </div>

        <div className="flex flex-1 flex-col justify-end pb-8 pt-8 md:pb-10 md:pt-10">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            {date ? (
              <time className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-azure-100">
                {date}
              </time>
            ) : null}
            {date && tag ? (
              <span className="h-1 w-1 rounded-full bg-white/50" aria-hidden />
            ) : null}
            {tag ? (
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/75">
                {tag}
              </span>
            ) : null}
          </div>

          <h1 className="mt-3 max-w-3xl text-2xl font-bold leading-[1.2] tracking-normal text-white md:text-3xl lg:text-[2.15rem] [font-family:var(--font-montserrat)]">
            {title}
          </h1>
        </div>
      </div>

      <div
        className="h-0.5 w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--color-azure-500), var(--color-azure-300), var(--color-gold-400))",
        }}
        aria-hidden
      />
    </header>
  );
}
