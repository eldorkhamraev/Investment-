import { heroMedia } from "@/config/site";

/**
 * Renders the configured hero background media (video or photo), or nothing
 * when none is set (the animated atmosphere then shows through).
 */
export function HeroMedia() {
  if (!heroMedia) return null;

  if (heroMedia.type === "video") {
    return (
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={heroMedia.poster}
      >
        <source src={heroMedia.src} type="video/mp4" />
      </video>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={heroMedia.src}
      alt=""
      className="h-full w-full object-cover"
      aria-hidden="true"
    />
  );
}
