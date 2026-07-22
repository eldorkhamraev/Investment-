"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { useTranslations } from "next-intl";
import uzbekistanMap from "@svg-maps/uzbekistan";
import { Link } from "@/i18n/navigation";
import { REGIONS, getRegion, type RegionMeta } from "@/lib/regionData";

const FILL_DEFAULT = "#D0E8F0";
const FILL_HOVER = "#1A6B8A";
const FILL_SELECTED = "#E8A020";
const STROKE = "#0E3054";

type MapLocation = {
  id: string;
  name: string;
  path: string;
};

type LocalizedRegion = RegionMeta & {
  name: string;
  description: string;
  facts: string[];
};

function hasDownloadUrl(url: string | undefined): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  return trimmed.length > 0 && trimmed !== "#";
}

/**
 * @svg-maps/uzbekistan (CC BY 4.0 / MapSVG-based) lists Tashkent twice under
 * one id and includes the Aral Sea. Remap to our 14 administrative ids.
 */
function buildLocations(): MapLocation[] {
  const raw = uzbekistanMap.locations as MapLocation[];
  let tashkentSeen = 0;
  const out: MapLocation[] = [];

  for (const loc of raw) {
    if (loc.id === "aral-sea") {
      out.push(loc);
      continue;
    }
    if (loc.id === "tashkent") {
      tashkentSeen += 1;
      out.push({
        ...loc,
        id: tashkentSeen === 1 ? "tashkent-city" : "tashkent-region",
        name: tashkentSeen === 1 ? "Tashkent City" : "Tashkent Region",
      });
      continue;
    }
    out.push(loc);
  }
  return out;
}

export function UzbekistanMap() {
  const t = useTranslations("regionsPage");
  const titleId = useId();
  const locations = useMemo(() => buildLocations(), []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  function localize(id: string): LocalizedRegion | null {
    const meta = getRegion(id);
    if (!meta) return null;
    return {
      ...meta,
      name: t(`items.${id}.name`),
      description: t(`items.${id}.description`),
      facts: t.raw(`items.${id}.facts`) as string[],
    };
  }

  const selected = selectedId ? localize(selectedId) : null;
  const panelOpen = Boolean(selected);

  function fillFor(id: string) {
    if (id === "aral-sea") return "#A8D4E6";
    if (selectedId === id) return FILL_SELECTED;
    if (hoveredId === id) return FILL_HOVER;
    return FILL_DEFAULT;
  }

  function selectRegion(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  useEffect(() => {
    if (!panelOpen) return;

    lastFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const frame = requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setSelectedId(null);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      lastFocusRef.current?.focus();
    };
  }, [panelOpen, selectedId]);

  const labels = {
    keyFacts: t("keyFacts"),
    download: t("downloadBrief"),
    book: t("bookIntro"),
    close: t("close"),
  };

  return (
    <div className="relative">
      <div
        className="overflow-hidden rounded-2xl border border-line bg-mist p-4 md:p-6"
        inert={panelOpen ? true : undefined}
      >
        <p className="mb-4 text-sm text-slate">{t("mapHint")}</p>
        <svg
          viewBox={uzbekistanMap.viewBox}
          aria-label={t("mapAria")}
          className="h-auto w-full"
        >
          {locations.map((loc) => {
            const interactive = loc.id !== "aral-sea";
            const region = interactive ? localize(loc.id) : undefined;
            return (
              <path
                key={`${loc.id}-${loc.path.slice(0, 24)}`}
                id={loc.id}
                d={loc.path}
                fill={fillFor(loc.id)}
                stroke={STROKE}
                strokeWidth={interactive ? 0.9 : 0.5}
                strokeLinejoin="round"
                className={
                  interactive
                    ? "cursor-pointer transition-[fill] duration-200 outline-none focus-visible:stroke-2 focus-visible:stroke-azure-500"
                    : "pointer-events-none"
                }
                role={interactive ? "button" : undefined}
                tabIndex={interactive ? 0 : undefined}
                aria-label={region?.name ?? loc.name}
                aria-pressed={interactive ? selectedId === loc.id : undefined}
                onMouseEnter={() =>
                  interactive ? setHoveredId(loc.id) : undefined
                }
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  if (!interactive) return;
                  selectRegion(loc.id);
                }}
                onKeyDown={(e) => {
                  if (!interactive) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectRegion(loc.id);
                  }
                }}
              />
            );
          })}
        </svg>

        <div className="mt-6 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {REGIONS.map((r) => {
            const name = t(`items.${r.id}.name`);
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => selectRegion(r.id)}
                aria-pressed={selectedId === r.id}
                className={`rounded-xl border px-3 py-2 text-left text-sm font-medium transition-colors ${
                  selectedId === r.id
                    ? "border-[#E8A020] bg-[#E8A020]/20 text-ink"
                    : "border-line bg-white text-steel hover:border-[#1A6B8A] hover:text-[#1A6B8A]"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        tabIndex={panelOpen ? 0 : -1}
        aria-label={t("close")}
        onClick={() => setSelectedId(null)}
        className={`fixed inset-0 z-40 bg-ink/35 transition-opacity duration-300 ${
          panelOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col rounded-l-2xl border-l border-line bg-white p-6 shadow-lift transition-transform duration-300 ease-out sm:m-4 sm:inset-y-4 sm:rounded-2xl sm:border sm:p-8 ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!panelOpen}
        inert={!panelOpen ? true : undefined}
      >
        {selected ? (
          <RegionPanel
            region={selected}
            titleId={titleId}
            closeRef={closeRef}
            onClose={() => setSelectedId(null)}
            labels={labels}
          />
        ) : null}
      </aside>
    </div>
  );
}

function RegionPanel({
  region,
  titleId,
  closeRef,
  onClose,
  labels,
}: {
  region: LocalizedRegion;
  titleId: string;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  labels: {
    keyFacts: string;
    download: string;
    book: string;
    close: string;
  };
}) {
  const canDownload = hasDownloadUrl(region.pdfUrl);

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="flex items-start justify-between gap-3">
        <h2 id={titleId} className="text-3xl leading-tight text-ink md:text-4xl">
          {region.name}
        </h2>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-steel hover:bg-cloud hover:text-ink"
          aria-label={labels.close}
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
      </div>

      <p className="mt-5 text-base leading-relaxed text-steel">
        {region.description}
      </p>

      <div className="mt-8">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-azure-700">
          {labels.keyFacts}
        </h3>
        <ul className="mt-3 space-y-2.5">
          {region.facts.map((fact) => (
            <li
              key={fact}
              className="flex gap-2.5 text-sm leading-relaxed text-slate"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-azure-600"
                aria-hidden
              />
              {fact}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-10">
        {canDownload ? (
          <a
            href={region.pdfUrl}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#1A6B8A] bg-transparent px-5 text-sm font-semibold text-[#1A6B8A] transition-colors hover:bg-azure-50"
          >
            {labels.download}
          </a>
        ) : null}
        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#E8A020] px-5 text-sm font-semibold text-ink shadow-sm transition-colors hover:bg-gold-400"
        >
          {labels.book}
        </Link>
      </div>
    </div>
  );
}
