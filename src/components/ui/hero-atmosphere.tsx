/**
 * Animated, video-like hero backdrop — drifting aurora light, a fine grid, and
 * a slowly rotating "digital orbit" motif. Pure CSS/SVG, no external asset.
 *
 * To use a real background video or photo instead, drop it into the `media`
 * slot (e.g. <video autoPlay muted loop playsInline> or next/image) and it will
 * render behind the same legibility gradient — everything else still applies.
 */
export function HeroAtmosphere({
  media,
  showOrbit = true,
}: {
  media?: React.ReactNode;
  showOrbit?: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-ink" />

      {/* Real media slot (video/photo) — empty until assets are supplied */}
      {media ? (
        <>
          <div className="absolute inset-0">{media}</div>
          {/* Overall brand scrim so the footage sits in the palette */}
          <div className="absolute inset-0 bg-ink/35" />
        </>
      ) : null}

      {/* Drifting aurora blobs */}
      {!media ? (
        <>
          <div
            className="anim-drift-a absolute -right-24 -top-40 h-[38rem] w-[38rem] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(16,156,196,0.55), transparent 62%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="anim-drift-b absolute right-1/4 top-1/3 h-[30rem] w-[30rem] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(52,182,220,0.34), transparent 60%)",
              filter: "blur(70px)",
            }}
          />
          <div
            className="anim-drift-c absolute -bottom-40 left-1/4 h-[26rem] w-[26rem] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(14,48,84,0.9), transparent 60%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="anim-pulse-soft absolute right-16 top-24 h-64 w-64 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(242,180,76,0.16), transparent 60%)",
              filter: "blur(50px)",
            }}
          />
        </>
      ) : null}

      {/* Rotating digital orbit, anchored to the right */}
      {showOrbit && !media ? (
        <div className="absolute -right-24 top-1/2 hidden h-[46rem] w-[46rem] -translate-y-1/2 md:block lg:right-[-6rem]">
          <div className="anim-spin-slow h-full w-full opacity-70">
            <Orbit />
          </div>
        </div>
      ) : null}

      {/* Fine grid, faded toward the text side */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage:
            "radial-gradient(90% 90% at 75% 30%, black, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(90% 90% at 75% 30%, black, transparent 78%)",
        }}
      />

      {/* Left-to-right legibility gradient so text stays crisp */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--color-ink) 8%, rgba(7,30,47,0.72) 42%, rgba(7,30,47,0.15) 100%)",
        }}
      />
      {/* Bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}

function Orbit() {
  const rings = [
    { r: 130, dot: 0 },
    { r: 200, dot: 210 },
    { r: 275, dot: 90 },
    { r: 345, dot: 300 },
  ];
  return (
    <svg viewBox="-400 -400 800 800" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="orbit-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#34b6dc" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#34b6dc" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="0" cy="0" r="120" fill="url(#orbit-core)" opacity="0.5" />
      {rings.map((ring, i) => {
        const rad = (ring.dot * Math.PI) / 180;
        const cx = Math.cos(rad) * ring.r;
        const cy = Math.sin(rad) * ring.r;
        return (
          <g key={i}>
            <circle
              cx="0"
              cy="0"
              r={ring.r}
              fill="none"
              stroke="#6fd0ec"
              strokeWidth="1"
              strokeOpacity={0.22}
            />
            <circle cx={cx} cy={cy} r="6" fill="#6fd0ec" />
            <circle cx={cx} cy={cy} r="12" fill="#6fd0ec" opacity="0.25" />
          </g>
        );
      })}
      {/* central node */}
      <circle cx="0" cy="0" r="7" fill="#ffffff" />
    </svg>
  );
}
