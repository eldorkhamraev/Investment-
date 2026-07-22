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
import {
  REGIONS,
  getRegion,
  type RegionMeta,
  type RegionStats,
} from "@/lib/regionData";

type MapLayout = "default" | "portal";

const COLORS = {
  default: {
    fill: "#D0E8F0",
    hover: "#1A6B8A",
    selected: "#E8A020",
    stroke: "#0E3054",
    aral: "#A8D4E6",
  },
  portal: {
    fill: "#E4EEF3",
    hover: "#2A8BB0",
    selected: "#0B7CA0",
    stroke: "#0E3054",
    aral: "#B8D0DC",
  },
} as const;

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

type StatLabels = {
  population: string;
  projects: string;
  fdi: string;
  trade: string;
  area: string;
};

function hasDownloadUrl(url: string | undefined): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  return trimmed.length > 0 && trimmed !== "#";
}

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

export function UzbekistanMap({
  layout = "default",
}: {
  layout?: MapLayout;
}) {
  const t = useTranslations("regionsPage");
  const titleId = useId();
  const locations = useMemo(() => buildLocations(), []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [leader, setLeader] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<Record<string, SVGPathElement | null>>({});
  const isPortal = layout === "portal";
  const palette = COLORS[layout];

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
    if (id === "aral-sea") return palette.aral;
    if (selectedId === id) return palette.selected;
    if (hoveredId === id) return palette.hover;
    return palette.fill;
  }

  function selectRegion(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  useEffect(() => {
    if (!isPortal) return;
    if (!selectedId) {
      setCardVisible(false);
      setLeader(null);
      return;
    }
    setCardVisible(false);
    const frame = requestAnimationFrame(() => {
      setCardVisible(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [isPortal, selectedId]);

  // Dotted leader from region centre to the side card (desktop).
  useEffect(() => {
    if (!isPortal || !selectedId || !cardVisible) {
      setLeader(null);
      return;
    }

    function updateLeader() {
      const stage = stageRef.current;
      const path = pathRefs.current[selectedId!];
      const card = panelRef.current;
      if (!stage || !path || !card) {
        setLeader(null);
        return;
      }
      if (window.matchMedia("(max-width: 1023px)").matches) {
        setLeader(null);
        return;
      }

      const stageBox = stage.getBoundingClientRect();
      const pathBox = path.getBoundingClientRect();
      const cardBox = card.getBoundingClientRect();

      setLeader({
        x1: pathBox.left + pathBox.width / 2 - stageBox.left,
        y1: pathBox.top + pathBox.height / 2 - stageBox.top,
        x2: cardBox.left - stageBox.left,
        y2: cardBox.top + 18 - stageBox.top,
      });
    }

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(updateLeader);
    });
    window.addEventListener("resize", updateLeader);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateLeader);
    };
  }, [isPortal, selectedId, cardVisible]);

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
    close: t("close"),
  };

  const statLabels = t.raw("statLabels") as StatLabels;

  return (
    <div className="relative">
      <div
        className={
          isPortal
            ? "overflow-visible bg-transparent"
            : "overflow-hidden rounded-2xl border border-line bg-mist p-4 md:p-6"
        }
        inert={!isPortal && panelOpen ? true : undefined}
      >
        {!isPortal ? (
          <p className="mb-4 text-sm text-slate">{t("mapHint")}</p>
        ) : null}

        <div
          ref={isPortal ? stageRef : undefined}
          className={
            isPortal
              ? "relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10 xl:gap-14"
              : undefined
          }
        >
          <div className={isPortal ? "min-w-0 flex-1" : undefined}>
            <svg
              viewBox={uzbekistanMap.viewBox}
              aria-label={t("mapAria")}
              className={
                isPortal
                  ? "mx-auto h-auto w-full max-h-[min(78vh,680px)]"
                  : "h-auto w-full"
              }
            >
              {locations.map((loc) => {
                const interactive = loc.id !== "aral-sea";
                const region = interactive ? localize(loc.id) : undefined;
                return (
                  <path
                    key={`${loc.id}-${loc.path.slice(0, 24)}`}
                    id={loc.id}
                    ref={(el) => {
                      pathRefs.current[loc.id] = el;
                    }}
                    d={loc.path}
                    fill={fillFor(loc.id)}
                    stroke={palette.stroke}
                    strokeWidth={interactive ? 0.85 : 0.5}
                    strokeLinejoin="round"
                    className={
                      interactive
                        ? "cursor-pointer transition-[fill] duration-200 outline-none focus-visible:stroke-2 focus-visible:stroke-azure-500"
                        : "pointer-events-none"
                    }
                    role={interactive ? "button" : undefined}
                    tabIndex={interactive ? 0 : undefined}
                    aria-label={region?.name ?? loc.name}
                    aria-pressed={
                      interactive ? selectedId === loc.id : undefined
                    }
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
          </div>

          {isPortal ? (
            <aside
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className={`w-full shrink-0 overflow-hidden border border-azure-700/40 bg-white shadow-lift transition-all duration-500 ease-out lg:sticky lg:top-28 ${
                panelOpen && cardVisible
                  ? "pointer-events-auto max-h-[40rem] translate-y-0 opacity-100 lg:w-72 xl:w-80"
                  : "pointer-events-none max-h-0 translate-y-2 opacity-0 max-lg:border-0 lg:max-h-none lg:w-0 lg:border-0 lg:opacity-0"
              }`}
              aria-hidden={!panelOpen}
              inert={!panelOpen ? true : undefined}
            >
              {selected ? (
                <PortalRegionCard
                  key={selected.id}
                  region={selected}
                  titleId={titleId}
                  closeRef={closeRef}
                  onClose={() => setSelectedId(null)}
                  labels={labels}
                  statLabels={statLabels}
                  visible={cardVisible}
                />
              ) : null}
            </aside>
          ) : null}

          {isPortal && leader ? (
            <svg
              className="pointer-events-none absolute inset-0 z-10 hidden overflow-visible lg:block"
              aria-hidden
            >
              <path
                d={`M ${leader.x1} ${leader.y1} L ${leader.x2 - 12} ${leader.y1} L ${leader.x2 - 12} ${leader.y2} L ${leader.x2} ${leader.y2}`}
                fill="none"
                stroke="#0E3054"
                strokeWidth="1.5"
                strokeDasharray="3 5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx={leader.x1}
                cy={leader.y1}
                r="5"
                fill="white"
                stroke="#0B7CA0"
                strokeWidth="2"
              />
            </svg>
          ) : null}
        </div>

        {/* Region index — quiet text row, not pill buttons */}
        <nav
          className={
            isPortal
              ? "mt-6 flex flex-wrap items-center justify-center gap-x-0 gap-y-1 border-t border-line pt-5"
              : "mt-6 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }
          aria-label={t("mapHint")}
        >
          {REGIONS.map((r, index) => {
            const name = t(`items.${r.id}.name`);
            const active = selectedId === r.id;
            if (isPortal) {
              return (
                <span key={r.id} className="flex items-center">
                  {index > 0 ? (
                    <span
                      className="mx-1.5 h-3 w-px shrink-0 bg-line md:mx-2"
                      aria-hidden
                    />
                  ) : null}
                  <button
                    type="button"
                    onClick={() => selectRegion(r.id)}
                    aria-pressed={active}
                    className={`relative px-1.5 py-1.5 text-[12px] tracking-tight transition-colors md:text-[13px] ${
                      active
                        ? "font-semibold text-azure-800 after:absolute after:inset-x-1.5 after:bottom-0 after:h-0.5 after:bg-azure-600"
                        : "font-medium text-steel hover:text-ink"
                    }`}
                  >
                    {name}
                  </button>
                </span>
              );
            }
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => selectRegion(r.id)}
                aria-pressed={active}
                className={`rounded-xl border px-3 py-2 text-left text-sm font-medium transition-colors ${
                  active
                    ? "border-gold-500 bg-gold-500/20 text-ink"
                    : "border-line bg-white text-steel hover:border-azure-700 hover:text-azure-700"
                }`}
              >
                {name}
              </button>
            );
          })}
        </nav>
      </div>

      {!isPortal ? (
        <>
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
                statLabels={statLabels}
              />
            ) : null}
          </aside>
        </>
      ) : null}
    </div>
  );
}

function StatsBlock({
  stats,
  labels,
}: {
  stats: RegionStats;
  labels: StatLabels;
}) {
  const rows: { value: string; label: string }[] = [
    { value: stats.population, label: labels.population },
    { value: stats.projects, label: labels.projects },
    { value: stats.fdi, label: labels.fdi },
    { value: stats.trade, label: labels.trade },
    { value: stats.area, label: labels.area },
  ];

  return (
    <ul className="space-y-3.5">
      {rows.map((row) => (
        <li key={row.label}>
          <p className="font-display text-xl font-bold tracking-tight text-azure-800 md:text-2xl">
            {row.value}
          </p>
          <p className="mt-0.5 text-sm text-ink/80">{row.label}</p>
        </li>
      ))}
    </ul>
  );
}

function PdfLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 underline-offset-2 hover:text-white hover:underline"
      title={label}
    >
      <span>{label}</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M14 4h6v6M20 4 10 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </a>
  );
}

function PortalRegionCard({
  region,
  titleId,
  closeRef,
  onClose,
  labels,
  statLabels,
  visible,
}: {
  region: LocalizedRegion;
  titleId: string;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  labels: {
    keyFacts: string;
    download: string;
    close: string;
  };
  statLabels: StatLabels;
  visible: boolean;
}) {
  const canDownload = hasDownloadUrl(region.pdfUrl);

  return (
    <div
      className={`flex max-h-[min(70vh,28rem)] flex-col transition-[opacity,transform] duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between gap-2 bg-navy-900 px-3.5 py-2.5">
        <h2
          id={titleId}
          className="min-w-0 truncate text-sm font-semibold text-white md:text-[15px]"
        >
          {region.name}
        </h2>
        <div className="flex shrink-0 items-center gap-1">
          {canDownload ? (
            <PdfLink href={region.pdfUrl!} label={labels.download} />
          ) : null}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-7 w-7 items-center justify-center rounded text-white/70 hover:bg-white/10 hover:text-white"
            aria-label={labels.close}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-y-auto px-4 py-4">
        {region.stats ? (
          <StatsBlock stats={region.stats} labels={statLabels} />
        ) : (
          <>
            <p className="text-sm leading-relaxed text-steel">
              {region.description}
            </p>
            <ul className="mt-3 space-y-2">
              {region.facts.map((fact) => (
                <li
                  key={fact}
                  className="flex gap-2 text-sm leading-relaxed text-slate"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-azure-600"
                    aria-hidden
                  />
                  {fact}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

function RegionPanel({
  region,
  titleId,
  closeRef,
  onClose,
  labels,
  statLabels,
}: {
  region: LocalizedRegion;
  titleId: string;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  labels: {
    keyFacts: string;
    download: string;
    close: string;
  };
  statLabels: StatLabels;
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

      {region.stats ? (
        <div className="mt-8">
          <StatsBlock stats={region.stats} labels={statLabels} />
        </div>
      ) : (
        <>
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
        </>
      )}

      {canDownload ? (
        <div className="mt-auto pt-10">
          <a
            href={region.pdfUrl}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-azure-700 bg-transparent px-5 text-sm font-semibold text-azure-700 transition-colors hover:bg-azure-50"
          >
            {labels.download}
          </a>
        </div>
      ) : null}
    </div>
  );
}
