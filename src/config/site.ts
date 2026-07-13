/**
 * Site-level config.
 *
 * HERO MEDIA — when you supply a real background video or photo:
 *   1. Put the file in `public/` (e.g. public/hero.mp4 or public/hero.jpg).
 *   2. Set `heroMedia` below to point at it.
 * When `heroMedia` is null, the animated aurora/orbit backdrop is used instead.
 *
 * Recommended: MP4 (H.264), muted, ~10–20s seamless loop, 1920×1080, < 6 MB;
 * or a high-res 16:9 photo (JPG/WebP, ~2400px wide). Landscape, dark-friendly.
 */
export const heroMedia:
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string }
  | null = { type: "video", src: "/hero.mp4", poster: "/hero-poster.jpg" };

// Full promotional film (opened from the hero "Watch the film" button).
// The hero background is a muted 23–47s loop of this same video.
export const promoVideoId = "4RTUyTdfFeQ";
