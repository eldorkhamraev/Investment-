import type { ReactNode } from "react";

type Tone = "azure" | "gold" | "neutral" | "success" | "outline";

const tones: Record<Tone, string> = {
  azure: "bg-azure-50 text-azure-700 ring-azure-200",
  gold: "bg-gold-300/25 text-gold-600 ring-gold-400/40",
  neutral: "bg-cloud text-steel ring-line",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  outline: "bg-transparent text-slate ring-line",
};

export function Badge({
  children,
  tone = "azure",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
