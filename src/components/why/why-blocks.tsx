import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section";
import {
  SimpleBars,
  StatStrip,
  CompareStat,
  ShareBars,
  RankTable,
  RingsRow,
  LineCompare,
  StackedBars,
  GroupedBars,
} from "@/components/ui/simple-bars";
import type { WhyBlock } from "@/content/why";

function Prose({
  paragraphs,
  heading,
}: {
  paragraphs: string[];
  heading?: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      {heading ? (
        <h2 className="text-2xl font-semibold text-azure-800">{heading}</h2>
      ) : null}
      {paragraphs.map((p, i) => (
        <p key={i} className="text-base leading-relaxed text-steel md:text-lg">
          {p}
        </p>
      ))}
    </div>
  );
}

function Split({
  reverse,
  children,
}: {
  reverse?: boolean;
  children: [ReactNode, ReactNode];
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <div className={reverse ? "lg:order-2" : undefined}>{children[0]}</div>
      <div className={reverse ? "lg:order-1" : undefined}>{children[1]}</div>
    </div>
  );
}

function BlockFrame({
  children,
  tone = "plain",
}: {
  children: ReactNode;
  tone?: "plain" | "mist" | "paper";
}) {
  if (tone === "plain") {
    return (
      <div className="border-t border-line py-12 first:border-t-0 first:pt-2 md:py-16">
        {children}
      </div>
    );
  }

  return (
    <div
      className={`my-4 rounded-3xl px-5 py-10 md:my-6 md:px-10 md:py-14 ${
        tone === "mist" ? "bg-mist" : "border border-line bg-white"
      }`}
    >
      {children}
    </div>
  );
}

export function WhyBlocks({
  blocks,
  pointsEyebrow,
  pointsTitle,
}: {
  blocks: WhyBlock[];
  pointsEyebrow: string;
  pointsTitle: string;
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
          block.type === "universities" ||
          block.type === "gallery" ||
          block.type === "points";
        const tone = useMist
          ? mistToggle
            ? "mist"
            : "paper"
          : "plain";
        if (useMist) mistToggle = !mistToggle;

        switch (block.type) {
          case "prose":
            return (
              <BlockFrame key={index} tone="plain">
                <Prose
                  paragraphs={block.paragraphs}
                  heading={block.heading}
                />
              </BlockFrame>
            );

          case "split":
            return (
              <BlockFrame key={index} tone={index % 2 === 0 ? "plain" : "mist"}>
                <Split reverse={block.reverse}>
                  <Prose paragraphs={block.prose} />
                  <CompareStat
                    title={block.compare.title}
                    caption={block.compare.caption}
                    before={block.compare.before}
                    after={block.compare.after}
                  />
                </Split>
              </BlockFrame>
            );

          case "split-line":
            return (
              <BlockFrame key={index} tone="plain">
                <Split reverse={block.reverse}>
                  <LineCompare
                    title={block.line.title}
                    caption={block.line.caption}
                    labels={block.line.labels}
                    series={block.line.series}
                    yMin={block.line.yMin}
                    yMax={block.line.yMax}
                  />
                  <Prose paragraphs={block.prose} />
                </Split>
              </BlockFrame>
            );

          case "split-stacked":
            return (
              <BlockFrame key={index} tone="mist">
                <Split reverse={block.reverse}>
                  <Prose paragraphs={block.prose} />
                  <StackedBars
                    title={block.stacked.title}
                    caption={block.stacked.caption}
                    series={block.stacked.series}
                    items={block.stacked.items}
                  />
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
                    <Prose paragraphs={block.prose} />
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
              <BlockFrame key={index} tone="mist">
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
                <RingsRow items={block.items} />
              </BlockFrame>
            );

          case "charts-grid":
            return (
              <BlockFrame key={index} tone="mist">
                <p className="eyebrow">The path to IT excellence</p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {block.charts.slice(0, 2).map((chart) => (
                    <SimpleBars
                      key={chart.title}
                      title={chart.title}
                      caption={chart.caption}
                      unit={chart.unit}
                      items={chart.items}
                    />
                  ))}
                  {block.shares[0] ? (
                    <ShareBars
                      key={block.shares[0].title}
                      title={block.shares[0].title}
                      caption={block.shares[0].caption}
                      items={block.shares[0].items}
                    />
                  ) : null}
                  {block.charts.slice(2).map((chart) => (
                    <SimpleBars
                      key={chart.title}
                      title={chart.title}
                      caption={chart.caption}
                      unit={chart.unit}
                      items={chart.items}
                    />
                  ))}
                  {block.shares[1] ? (
                    <ShareBars
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
              <BlockFrame key={index} tone="paper">
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
              <BlockFrame key={index} tone="mist">
                <h3 className="text-center text-xl font-semibold text-azure-800">
                  {block.title}
                </h3>
                <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  {block.items.map((u) => (
                    <li
                      key={u.name}
                      className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-steel"
                    >
                      {u.name}
                    </li>
                  ))}
                </ul>
              </BlockFrame>
            );

          case "gallery":
            return (
              <BlockFrame key={index} tone="paper">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {block.images.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className="aspect-[4/3] w-full rounded-xl object-cover"
                    />
                  ))}
                </div>
                <div className="mt-10">
                  <h3 className="text-center text-xl font-semibold text-azure-800">
                    {block.title}
                  </h3>
                  <div className="mx-auto mt-6 max-w-3xl space-y-4">
                    {block.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-base leading-relaxed text-steel"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
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
              <BlockFrame key={index} tone="mist">
                <SectionHeading
                  eyebrow={pointsEyebrow}
                  title={pointsTitle}
                />
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {block.items.map((point) => (
                    <Card key={point.title}>
                      <h3 className="text-lg">{point.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate">
                        {point.desc}
                      </p>
                    </Card>
                  ))}
                </div>
              </BlockFrame>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
