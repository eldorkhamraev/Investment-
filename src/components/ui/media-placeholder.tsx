import type { ReactNode } from "react";

/**
 * Designed placeholder for real photography. Renders an abstract brand-toned
 * panel (gradient + fine topographic lines) — intentional, not a grey box —
 * and is a drop-in target for a real <Image> once assets arrive.
 */
export function MediaPlaceholder({
  className = "",
  label,
  children,
  seed = 0,
}: {
  className?: string;
  label?: string;
  children?: ReactNode;
  seed?: number;
}) {
  // Vary the gradient angle slightly per instance for a non-repetitive feel.
  const angle = 120 + (seed % 4) * 25;
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: `linear-gradient(${angle}deg, var(--color-navy-900), var(--color-azure-700) 120%)`,
      }}
    >
      {/* Abstract "digital contour" lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        preserveAspectRatio="none"
        viewBox="0 0 400 300"
        aria-hidden="true"
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <path
            key={i}
            d={`M-20 ${40 + i * 38} C 100 ${10 + i * 38}, 300 ${
              90 + i * 38
            }, 420 ${30 + i * 38}`}
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_0%,rgba(52,182,220,0.35),transparent)]" />
      {label ? (
        <span className="absolute bottom-3 left-3 rounded-full bg-black/25 px-2.5 py-1 text-[0.65rem] font-medium text-white/80 backdrop-blur">
          {label}
        </span>
      ) : null}
      {children ? (
        <div className="relative flex h-full w-full items-center justify-center">
          {children}
        </div>
      ) : null}
    </div>
  );
}
