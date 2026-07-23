"use client";

import { useState } from "react";

export type TalentFilmImage = {
  src: string;
  caption: string;
};

/** Equal-height photo rail — secondary to typography, not a competing mosaic. */
export function TalentFilmstrip({
  images,
  hint,
}: {
  images: TalentFilmImage[];
  hint: string;
}) {
  const [active, setActive] = useState(0);
  const tiles = images.slice(0, 5);

  return (
    <div>
      <ul
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-5 sm:gap-2.5 sm:overflow-visible [&::-webkit-scrollbar]:hidden"
        aria-label={hint}
      >
        {tiles.map((image, index) => {
          const isActive = active === index;
          return (
            <li key={image.src} className="w-[42%] shrink-0 sm:w-auto">
              <button
                type="button"
                aria-pressed={isActive}
                aria-label={image.caption}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`group relative block w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-600 ${
                  isActive ? "ring-1 ring-azure-500/50" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt=""
                  className={`aspect-[5/4] w-full object-cover transition duration-500 ${
                    isActive ? "scale-[1.03] opacity-100" : "opacity-90 group-hover:opacity-100"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
      <p
        className="mt-3 text-sm font-medium text-steel transition-opacity"
        aria-live="polite"
      >
        {tiles[active]?.caption}
      </p>
    </div>
  );
}
