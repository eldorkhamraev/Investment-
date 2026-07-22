/**
 * Official Ministry of Digital Technologies emblem (8-petal rosette),
 * extracted from the supplied logo lockup.
 */
export function EmblemMark({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/ministry-emblem-full.png"
      alt=""
      aria-hidden="true"
      className={`object-contain ${className}`}
    />
  );
}

/**
 * Full Ministry logo lockup. On dark surfaces, `tone="dark"` knocks the
 * single-colour mark out to white via filter.
 */
export function MinistryLockup({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/ministry-logo.png"
      alt="Ministry of Digital Technologies of the Republic of Uzbekistan"
      className={`object-contain ${tone === "dark" ? "[filter:brightness(0)_invert(1)]" : ""} ${className}`}
    />
  );
}

export function Wordmark({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <span className="flex items-center gap-2.5 sm:gap-3">
      <EmblemMark className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
      <span className="flex min-w-0 flex-col">
        <span
          className={`font-display text-[0.95rem] font-bold leading-none tracking-tight sm:text-[1.05rem] sm:whitespace-nowrap ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          <span className="block sm:inline">Investment Project </span>
          <span className="block sm:inline">Office</span>
        </span>
        <span
          className={`mt-1 text-[0.65rem] font-medium leading-snug tracking-wide sm:mt-1.5 sm:text-[0.7rem] sm:whitespace-nowrap ${
            dark ? "text-azure-100/75" : "text-slate"
          }`}
        >
          Ministry of Digital Technologies · Uzbekistan
        </span>
      </span>
    </span>
  );
}
