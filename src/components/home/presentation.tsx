"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Investment presentation card. Opens a Google Drive preview in an on-page
 * lightbox (no new tab, no download). The iframe mounts only when opened.
 */
export function Presentation({
  intro,
  title,
  desc,
  button,
  previewSrc,
}: {
  intro: string;
  title: string;
  desc: string;
  button: string;
  previewSrc: string;
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
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-slate">{intro}</p>

      <div className="mt-6 flex flex-col items-center gap-5 rounded-2xl border border-line bg-white p-8 shadow-card sm:flex-row sm:items-center sm:gap-6 sm:text-left">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-azure-50 text-azure-600 ring-1 ring-inset ring-azure-100">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 3h7l4 4v14H7z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M14 3v4h4"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 12.5h5M9.5 15.5h5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex-1">
          <h3 className="text-lg">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate">{desc}</p>
        </div>

        <Button
          variant="secondary"
          onClick={() => setOpen(true)}
          className="shrink-0"
        >
          {button}
        </Button>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            className="relative h-[86vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close presentation"
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/30 hover:bg-white/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <iframe
              className="h-full w-full rounded-xl bg-white shadow-lift"
              src={previewSrc}
              title={title}
              allow="autoplay"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
