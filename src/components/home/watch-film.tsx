"use client";

import { useEffect, useState } from "react";

/**
 * "Watch the film" button + lightbox. The YouTube iframe is only mounted once
 * the modal opens, so nothing loads from YouTube on initial page render.
 */
export function WatchFilm({
  videoId,
  label = "Watch the film",
  caption = "Uzbekistan · a new regional IT hub",
  variant = "inline",
}: {
  videoId: string;
  label?: string;
  caption?: string;
  variant?: "inline" | "circle";
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {variant === "circle" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={label}
          className="group flex flex-col items-center gap-5"
        >
          <span className="relative grid h-52 w-52 place-items-center sm:h-64 sm:w-64">
            {/* Orbit rings */}
            <span className="anim-spin-slow absolute h-52 w-52 rounded-full border border-white/15 sm:h-64 sm:w-64" />
            <span className="anim-pulse-soft absolute h-40 w-40 rounded-full border border-white/20 sm:h-48 sm:w-48" />
            <span className="absolute h-28 w-28 rounded-full bg-azure-500/20 blur-xl sm:h-32 sm:w-32" />
            {/* Core */}
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-azure-500 text-white shadow-lift ring-1 ring-white/30 transition-transform duration-200 group-hover:scale-105 sm:h-24 sm:w-24">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/85">
            {label}
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group inline-flex items-center gap-3 text-white"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-inset ring-white/30 backdrop-blur transition-all group-hover:scale-105 group-hover:bg-white/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="text-left">
            <span className="block text-sm font-semibold">{label}</span>
            <span className="block text-xs text-white/60">{caption}</span>
          </span>
        </button>
      )}

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/30 hover:bg-white/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lift">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                title="Investment Project Office film"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
