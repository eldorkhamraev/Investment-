/**
 * Investment presentation download card. The button downloads the PDF
 * directly (served from /public) — no external link, no new tab.
 */
export function Presentation({
  intro,
  title,
  desc,
  button,
  file,
  meta,
}: {
  intro: string;
  title: string;
  desc: string;
  button: string;
  file: string;
  meta: string;
}) {
  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="text-slate">{intro}</p>

      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-line bg-white p-4 text-left shadow-card sm:gap-5 sm:p-5">
        {/* PDF file icon */}
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-azure-500 to-azure-700 shadow-sm">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 2.75h7.2L19 8.5V20a1.25 1.25 0 0 1-1.25 1.25H6A1.25 1.25 0 0 1 4.75 20V4A1.25 1.25 0 0 1 6 2.75Z"
              fill="white"
            />
            <path d="M13 2.75 19 8.5h-4.75A1.25 1.25 0 0 1 13 7.25V2.75Z" fill="#BFE0F5" />
          </svg>
          <span className="absolute -bottom-1.5 right-0 rounded-[4px] bg-ink px-1 py-px text-[8px] font-bold leading-none tracking-wide text-white">
            PDF
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-ink">{title}</h3>
          <p className="mt-0.5 text-sm leading-snug text-slate">{desc}</p>
          <p className="mt-1 text-xs font-medium text-steel">{meta}</p>
        </div>

        <a
          href={file}
          download
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-azure-600 px-5 text-[0.95rem] font-semibold tracking-tight text-white shadow-sm transition-all duration-200 hover:bg-azure-700 active:translate-y-px h-11 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 3.5v11m0 0 4-4m-4 4-4-4"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 16.5v2A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5v-2"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
          </svg>
          <span className="hidden sm:inline">{button}</span>
        </a>
      </div>
    </div>
  );
}
