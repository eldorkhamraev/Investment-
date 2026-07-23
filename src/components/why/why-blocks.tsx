import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/section";
import { RankTable } from "@/components/ui/simple-bars";
import {
  StatStrip,
  CompareStat,
  LineCompare,
  StackedBars,
  GroupedBars,
  ColumnChart,
  DonutChart,
} from "@/components/ui/interactive-charts";
import { TalentFilmstrip } from "@/components/why/talent-mosaic";
import { UniversityCarousel } from "@/components/why/university-carousel";
import { AnimatedRings } from "@/components/why/animated-rings";
import { Link } from "@/i18n/navigation";
import type { WhyBlock } from "@/content/why";

function Prose({
  paragraphs,
  heading,
  size = "default",
}: {
  paragraphs: string[];
  heading?: string;
  size?: "default" | "compact";
}) {
  const textClass =
    size === "compact"
      ? "text-sm leading-relaxed text-steel md:text-[0.95rem]"
      : "text-base leading-relaxed text-steel md:text-lg";

  return (
    <div className={`space-y-4 ${size === "compact" ? "max-w-xl" : "max-w-3xl"}`}>
      {heading ? (
        <h2 className="text-2xl font-semibold text-azure-800">{heading}</h2>
      ) : null}
      {paragraphs.map((p, i) => (
        <p key={i} className={textClass}>
          {p}
        </p>
      ))}
    </div>
  );
}

function Split({
  reverse,
  align = "center",
  children,
}: {
  reverse?: boolean;
  align?: "start" | "center" | "stretch";
  children: [ReactNode, ReactNode];
}) {
  const alignClass =
    align === "center"
      ? "items-center"
      : align === "start"
        ? "items-start"
        : "items-stretch";

  return (
    <div className={`grid gap-5 lg:grid-cols-2 lg:gap-6 ${alignClass}`}>
      <div className={`min-h-0 ${reverse ? "lg:order-2" : ""}`}>
        {children[0]}
      </div>
      <div className={`min-h-0 ${reverse ? "lg:order-1" : ""}`}>
        {children[1]}
      </div>
    </div>
  );
}

/** Text column for zig-zag rows. */
function ProsePanel({
  paragraphs,
  heading,
}: {
  paragraphs: string[];
  heading?: string;
}) {
  return (
    <div className="border border-line bg-mist/60 px-5 py-5 md:px-6 md:py-6">
      {heading ? (
        <h2 className="text-lg font-semibold tracking-tight text-ink md:text-xl">
          {heading}
        </h2>
      ) : null}
      <div className={`space-y-3 ${heading ? "mt-3" : ""}`}>
        {paragraphs.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-steel md:text-[0.95rem]">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function EvidencePanel({ children }: { children: ReactNode }) {
  return <div className="min-w-0">{children}</div>;
}

function BlockFrame({
  children,
  tone = "plain",
  compact = false,
}: {
  children: ReactNode;
  tone?: "plain" | "mist" | "paper";
  compact?: boolean;
}) {
  if (tone === "plain") {
    return (
      <div
        className={`border-t border-line first:border-t-0 first:pt-2 ${
          compact ? "py-8 md:py-10" : "py-10 md:py-14"
        }`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`rounded-3xl ${
        compact
          ? "my-3 px-5 py-6 md:my-4 md:px-8 md:py-8"
          : "my-4 px-5 py-8 md:my-5 md:px-10 md:py-10"
      } ${tone === "mist" ? "bg-mist" : "border border-line bg-white"}`}
    >
      {children}
    </div>
  );
}

export function WhyBlocks({
  blocks,
  pointsEyebrow,
  pointsTitle,
  chartsEyebrow,
  chartsTitle,
  chartsIntro,
  mosaicHint,
}: {
  blocks: WhyBlock[];
  pointsEyebrow: string;
  pointsTitle: string;
  chartsEyebrow: string;
  chartsTitle: string;
  chartsIntro: string;
  mosaicHint: string;
}) {
  let mistToggle = false;

  return (
    <div>
      {blocks.map((block, index) => {
        const useMist =
          block.type === "stats" ||
          block.type === "rings" ||
          block.type === "charts-grid" ||
          block.type === "grouped" ||
          block.type === "media-strip" ||
          block.type === "pathways" ||
          block.type === "points" ||
          block.type === "split-share";
        const tone = useMist
          ? mistToggle
            ? "mist"
            : "paper"
          : "plain";
        if (useMist) mistToggle = !mistToggle;

        switch (block.type) {
          case "proof":
            return (
              <div
                key={index}
                className="border-b border-line pb-10 md:pb-12"
              >
                <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                  {block.items.map((item) => (
                    <li
                      key={item.label}
                      className="border-t border-gold-400/70 pt-4"
                    >
                      <p className="text-3xl font-semibold tracking-tight text-ink tabular-nums md:text-4xl">
                        {item.value}
                      </p>
                      <p className="mt-2 text-sm leading-snug text-slate">
                        {item.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );

          case "story":
            return (
              <BlockFrame key={index} tone="plain">
                <div className="max-w-3xl">
                  <p className="eyebrow !normal-case tracking-wide">
                    {block.number}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    {block.heading}
                  </h2>
                  <div className="mt-4 space-y-3">
                    {block.prose.map((p) => (
                      <p
                        key={p}
                        className="text-base leading-relaxed text-steel md:text-lg"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="mt-8 md:mt-10">
                  {block.evidence.kind === "line" ? (
                    <LineCompare
                      title={block.evidence.line.title}
                      caption={block.evidence.line.caption}
                      labels={block.evidence.line.labels}
                      series={block.evidence.line.series}
                      yMin={block.evidence.line.yMin}
                      yMax={block.evidence.line.yMax}
                    />
                  ) : null}
                  {block.evidence.kind === "compares" ? (
                    <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                      {block.evidence.items.map((item) => (
                        <CompareStat
                          key={item.title}
                          title={item.title}
                          caption={item.caption}
                          before={item.before}
                          after={item.after}
                        />
                      ))}
                    </div>
                  ) : null}
                  {block.evidence.kind === "share" ? (
                    <div className="mx-auto max-w-xl">
                      <DonutChart
                        title={block.evidence.share.title}
                        caption={block.evidence.share.caption}
                        items={block.evidence.share.items}
                      />
                    </div>
                  ) : null}
                  {block.evidence.kind === "grouped" ? (
                    <GroupedBars
                      title={block.evidence.grouped.title}
                      caption={block.evidence.grouped.caption}
                      series={block.evidence.grouped.series}
                      items={block.evidence.grouped.items}
                    />
                  ) : null}
                </div>
              </BlockFrame>
            );

          case "bridge":
            return (
              <BlockFrame key={index} tone="plain">
                <div className="max-w-3xl border-l-2 border-azure-400 pl-6 md:pl-8">
                  <h2 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
                    {block.heading}
                  </h2>
                  <div className="mt-4 space-y-3">
                    {block.paragraphs.map((p) => (
                      <p
                        key={p}
                        className="text-base leading-relaxed text-steel md:text-lg"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                  <Link
                    href={block.href}
                    className="mt-5 inline-flex text-sm font-medium text-azure-700 underline-offset-2 hover:underline"
                  >
                    {block.linkLabel}
                  </Link>
                </div>
              </BlockFrame>
            );

          case "prose":
            return (
              <BlockFrame key={index} tone="plain">
                {block.aside ? (
                  <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-8">
                      <Prose
                        paragraphs={block.paragraphs}
                        heading={block.heading}
                      />
                    </div>
                    <aside className="lg:col-span-4">
                      <div className="border-l border-azure-300/80 pl-6 lg:pt-1">
                        <p className="text-4xl font-semibold tracking-tight text-ink tabular-nums md:text-5xl">
                          {block.aside.value}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-slate">
                          {block.aside.label}
                        </p>
                      </div>
                    </aside>
                  </div>
                ) : (
                  <Prose
                    paragraphs={block.paragraphs}
                    heading={block.heading}
                  />
                )}
              </BlockFrame>
            );

          case "split-media": {
            if (block.layout === "feature") {
              return (
                <BlockFrame key={index} tone="plain">
                  <div
                    className={`grid min-h-[20rem] overflow-hidden border border-line bg-white md:min-h-[22rem] md:grid-cols-2 ${
                      block.reverse ? "md:[&>div:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="relative min-h-[12rem] overflow-hidden bg-mist md:min-h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={block.image}
                        alt={block.imageAlt ?? ""}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10 lg:px-12">
                      {block.heading ? (
                        <h2 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
                          {block.heading}
                        </h2>
                      ) : null}
                      <div
                        className={`space-y-3 ${block.heading ? "mt-4" : ""}`}
                      >
                        {block.prose.map((p, i) => (
                          <p
                            key={i}
                            className="text-sm leading-relaxed text-steel"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </BlockFrame>
              );
            }

            return (
              <BlockFrame key={index} tone="plain">
                <Split reverse={block.reverse} align="stretch">
                  <Prose
                    paragraphs={block.prose}
                    heading={block.heading}
                    size="compact"
                  />
                  <figure className="flex h-full min-h-0 min-w-0 flex-col">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={block.image}
                      alt={block.imageAlt ?? ""}
                      className="h-full min-h-[14rem] w-full flex-1 rounded-2xl object-cover shadow-sm max-lg:aspect-[16/9] max-lg:h-auto max-lg:flex-none lg:min-h-[18rem]"
                    />
                    {block.imageAlt ? (
                      <figcaption className="mt-3 shrink-0 text-xs tracking-wide text-slate">
                        {block.imageAlt}
                      </figcaption>
                    ) : null}
                  </figure>
                </Split>
              </BlockFrame>
            );
          }

          case "proof-mosaic":
            return (
              <BlockFrame key={index} tone="plain">
                <div className="border-y border-line py-10 md:py-12">
                  <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
                    {block.stats.map((item) => (
                      <li
                        key={item.label}
                        className="border-l border-azure-300/70 pl-4 sm:border-l-0 sm:border-t sm:border-azure-300/70 sm:pl-0 sm:pt-4"
                      >
                        <p className="text-3xl font-semibold tracking-tight text-ink tabular-nums md:text-4xl">
                          {item.value}
                        </p>
                        <p className="mt-2 text-sm text-slate">{item.label}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 max-w-3xl space-y-4">
                    {block.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-base leading-relaxed text-steel md:text-lg"
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  <div className="mt-10">
                    <TalentFilmstrip images={block.images} hint={mosaicHint} />
                  </div>
                </div>
              </BlockFrame>
            );

          case "split":
            return (
              <BlockFrame key={index} tone="plain" compact>
                <Split reverse={block.reverse}>
                  <ProsePanel
                    paragraphs={block.prose}
                    heading={block.heading}
                  />
                  <EvidencePanel>
                    <div className="h-full border border-line bg-white p-4 md:p-5">
                      <CompareStat
                        title={block.compare.title}
                        caption={block.compare.caption}
                        before={block.compare.before}
                        after={block.compare.after}
                      />
                    </div>
                  </EvidencePanel>
                </Split>
              </BlockFrame>
            );

          case "split-line":
            return (
              <BlockFrame key={index} tone="plain" compact>
                <Split reverse={block.reverse}>
                  <EvidencePanel>
                    <LineCompare
                      title={block.line.title}
                      caption={block.line.caption}
                      labels={block.line.labels}
                      series={block.line.series}
                      yMin={block.line.yMin}
                      yMax={block.line.yMax}
                    />
                  </EvidencePanel>
                  <ProsePanel
                    paragraphs={block.prose}
                    heading={block.heading}
                  />
                </Split>
              </BlockFrame>
            );

          case "split-stacked":
            return (
              <BlockFrame key={index} tone="plain">
                <Split reverse={block.reverse}>
                  <ProsePanel
                    paragraphs={block.prose}
                    heading={block.heading}
                  />
                  <EvidencePanel>
                    <StackedBars
                      title={block.stacked.title}
                      caption={block.stacked.caption}
                      series={block.stacked.series}
                      items={block.stacked.items}
                    />
                  </EvidencePanel>
                </Split>
              </BlockFrame>
            );

          case "split-share":
            return (
              <BlockFrame key={index} tone="plain">
                <Split reverse={block.reverse}>
                  <ProsePanel
                    paragraphs={block.prose}
                    heading={block.heading}
                  />
                  <EvidencePanel>
                    <DonutChart
                      title={block.share.title}
                      caption={block.share.caption}
                      items={block.share.items}
                    />
                  </EvidencePanel>
                </Split>
              </BlockFrame>
            );

          case "split-rank":
            return (
              <BlockFrame key={index} tone="plain">
                <Split reverse={block.reverse}>
                  <div className="space-y-6">
                    {block.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={block.image}
                        alt=""
                        className="aspect-[4/3] w-full rounded-2xl object-cover"
                      />
                    ) : null}
                    <Prose paragraphs={block.prose} heading={block.heading} />
                  </div>
                  <RankTable
                    title={block.rank.title}
                    caption={block.rank.caption}
                    items={block.rank.items}
                    variant="panel"
                  />
                </Split>
              </BlockFrame>
            );

          case "stats":
            return (
              <BlockFrame key={index} tone="mist" compact>
                {block.title ? (
                  <StatStrip title={block.title} items={block.items} />
                ) : (
                  <div className="rounded-2xl bg-navy-900 px-6 py-10 text-white md:px-12">
                    <ul className="grid gap-8 sm:grid-cols-3">
                      {block.items.map((item) => (
                        <li key={item.label} className="text-center">
                          <p className="text-3xl font-semibold tabular-nums md:text-4xl">
                            {item.value}
                          </p>
                          <p className="mt-2 text-sm text-white/75">
                            {item.label}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </BlockFrame>
            );

          case "rings":
            return (
              <BlockFrame key={index} tone="paper">
                <AnimatedRings
                  title={block.title}
                  caption={block.caption}
                  items={block.items}
                />
              </BlockFrame>
            );

          case "charts-grid":
            return (
              <BlockFrame key={index} tone="mist">
                <SectionHeading
                  eyebrow={chartsEyebrow}
                  title={chartsTitle}
                  intro={chartsIntro}
                />
                <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {block.charts.slice(0, 2).map((chart) => (
                    <ColumnChart
                      key={chart.title}
                      title={chart.title}
                      caption={chart.caption}
                      unit={chart.unit}
                      items={chart.items}
                    />
                  ))}
                  {block.shares[0] ? (
                    <DonutChart
                      key={block.shares[0].title}
                      title={block.shares[0].title}
                      caption={block.shares[0].caption}
                      items={block.shares[0].items}
                    />
                  ) : null}
                  {block.charts.slice(2).map((chart) => (
                    <ColumnChart
                      key={chart.title}
                      title={chart.title}
                      caption={chart.caption}
                      unit={chart.unit}
                      items={chart.items}
                    />
                  ))}
                  {block.shares[1] ? (
                    <DonutChart
                      key={block.shares[1].title}
                      title={block.shares[1].title}
                      caption={block.shares[1].caption}
                      items={block.shares[1].items}
                    />
                  ) : null}
                </div>
              </BlockFrame>
            );

          case "grouped":
            return (
              <BlockFrame key={index} tone="paper" compact>
                {block.heading || block.caption ? (
                  <div className="mb-6 max-w-3xl">
                    {block.heading ? (
                      <h2 className="text-2xl font-semibold text-azure-800">
                        {block.heading}
                      </h2>
                    ) : null}
                    {block.caption ? (
                      <p className="mt-2 text-sm leading-relaxed text-slate md:text-base">
                        {block.caption}
                      </p>
                    ) : null}
                  </div>
                ) : null}
                <GroupedBars
                  title={block.grouped.title}
                  caption={block.grouped.caption}
                  series={block.grouped.series}
                  items={block.grouped.items}
                />
              </BlockFrame>
            );

          case "universities":
            return (
              <BlockFrame key={index} tone="plain">
                {block.items.some((u) => u.logo) ? (
                  <UniversityCarousel
                    title={block.title}
                    items={block.items.filter(
                      (u): u is { name: string; logo: string; tone?: "light" | "dark" } =>
                        Boolean(u.logo),
                    )}
                  />
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-ink">{block.title}</h3>
                    <ul className="mt-6 grid gap-0 sm:grid-cols-2">
                      {block.items.map((u) => (
                        <li
                          key={u.name}
                          className="border-t border-line py-4 text-sm font-medium text-ink"
                        >
                          {u.name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </BlockFrame>
            );

          case "media-strip":
            return (
              <BlockFrame key={index} tone="mist">
                <div className="max-w-3xl">
                  <h3 className="text-lg font-semibold text-ink md:text-xl">
                    {block.title}
                  </h3>
                  {block.caption ? (
                    <p className="mt-2 text-sm leading-relaxed text-slate">
                      {block.caption}
                    </p>
                  ) : null}
                </div>
                <ul
                  className={
                    block.items.length <= 3
                      ? "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                      : "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                  }
                >
                  {block.items.map((item) => (
                    <li key={item.src} className="min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={item.caption}
                        className="aspect-[4/3] w-full rounded-xl object-cover"
                      />
                      <p className="mt-2.5 text-sm font-semibold text-ink">
                        {item.caption}
                      </p>
                      {item.detail ? (
                        <p className="mt-1.5 text-xs leading-relaxed text-slate md:text-[0.8125rem]">
                          {item.detail}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </BlockFrame>
            );

          case "pathways":
            if (block.compact) {
              return (
                <BlockFrame key={index} tone="plain" compact>
                  <p className="eyebrow">{block.title}</p>
                  {block.intro ? (
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">
                      {block.intro}
                    </p>
                  ) : null}
                  <ul className="mt-5 divide-y divide-line border-y border-line">
                    {block.items.map((item) => (
                      <li
                        key={item.title}
                        className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:gap-8"
                      >
                        <h4 className="shrink-0 text-sm font-semibold text-ink sm:w-44">
                          {item.href ? (
                            <Link
                              href={item.href}
                              className="underline-offset-2 hover:text-azure-700 hover:underline"
                            >
                              {item.title}
                            </Link>
                          ) : (
                            item.title
                          )}
                        </h4>
                        <p className="text-sm leading-relaxed text-steel">
                          {item.detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </BlockFrame>
              );
            }

            return (
              <BlockFrame key={index} tone="paper">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-semibold text-ink md:text-2xl">
                    {block.title}
                  </h3>
                  {block.intro ? (
                    <p className="mt-3 text-sm leading-relaxed text-slate md:text-base">
                      {block.intro}
                    </p>
                  ) : null}
                </div>
                <ol className="mt-8 divide-y divide-line border-y border-line">
                  {block.items.map((item, i) => (
                    <li
                      key={item.title}
                      className="grid gap-3 py-6 md:grid-cols-12 md:gap-8 md:py-7"
                    >
                      <div className="md:col-span-4">
                        <span className="eyebrow !normal-case tracking-wide">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="mt-2 text-lg font-semibold text-ink">
                          {item.href ? (
                            <Link
                              href={item.href}
                              className="underline-offset-2 hover:text-azure-700 hover:underline"
                            >
                              {item.title}
                            </Link>
                          ) : (
                            item.title
                          )}
                        </h4>
                      </div>
                      <p className="text-sm leading-relaxed text-steel md:col-span-8 md:text-base">
                        {item.detail}
                      </p>
                    </li>
                  ))}
                </ol>
              </BlockFrame>
            );

          case "goals-split":
            return (
              <BlockFrame
                key={index}
                tone={block.tone === "ink" ? "plain" : "mist"}
              >
                <Split reverse={block.reverse}>
                  <div
                    className={`rounded-2xl p-6 md:p-8 ${
                      block.tone === "ink"
                        ? "bg-navy-900 text-white"
                        : "bg-azure-600 text-white"
                    }`}
                  >
                    <ul className="space-y-6">
                      {block.goals.map((g) => (
                        <li key={g.number}>
                          <p
                            className={`text-2xl font-semibold ${
                              block.tone === "ink"
                                ? "text-azure-300"
                                : "text-azure-100"
                            }`}
                          >
                            {g.number}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-white/95 md:text-base">
                            {g.text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Prose paragraphs={block.prose} />
                </Split>
              </BlockFrame>
            );

          case "points":
            return (
              <BlockFrame key={index} tone="plain" compact>
                <SectionHeading
                  eyebrow={pointsEyebrow}
                  title={pointsTitle}
                />
                <ol className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
                  {block.items.map((point, i) => (
                    <li
                      key={point.title}
                      className="relative overflow-hidden rounded-2xl border border-line bg-mist px-5 py-5 md:px-6 md:py-6"
                    >
                      <span
                        className="absolute -right-1 -top-3 text-7xl font-semibold tabular-nums leading-none text-azure-100 select-none"
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="relative">
                        <span className="eyebrow !normal-case tracking-wide">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-2 text-lg font-semibold text-ink">
                          {point.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-steel">
                          {point.desc}
                        </p>
                      </div>
                      <span
                        className="absolute inset-x-0 bottom-0 h-1 bg-gold-400"
                        aria-hidden
                      />
                    </li>
                  ))}
                </ol>
              </BlockFrame>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
