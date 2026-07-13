import type { ReactNode } from "react";

type Tone = "paper" | "mist" | "ink";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  ink: "bg-ink text-white",
};

export function Section({
  children,
  tone = "paper",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`${tones[tone]} py-16 md:py-24 ${className}`}>
      <div className="container-edge">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? (
        <span className={`eyebrow ${dark ? "!text-azure-300" : ""}`}>
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`mt-3 text-3xl md:text-4xl ${dark ? "!text-white" : ""}`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            dark ? "text-azure-100/80" : "text-slate"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
