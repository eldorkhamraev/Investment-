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
    <span className="flex items-center gap-2.5">
      <EmblemMark className="h-11 w-11 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-extrabold tracking-tight ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          Investment Office
        </span>
        <span
          className={`mt-1 text-[0.72rem] font-medium tracking-wide ${
            dark ? "text-azure-100/70" : "text-slate"
          }`}
        >
          Ministry of Digital Technologies · Uzbekistan
        </span>
      </span>
    </span>
  );
}
