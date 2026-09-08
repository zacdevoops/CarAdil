"use client";

import { useState } from "react";
import { uniqueGallery, type Car, getCarDisplayName } from "@/content/cars";
import { CarImage } from "@/components/cars/CarImage";
import { cn } from "@/lib/utils";

export function CarGallery({ car }: { car: Car }) {
  const images = uniqueGallery(car);
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  const name = getCarDisplayName(car);

  return (
    <div>
      <div className="media-frame aspect-[4/3] group">
        {current ? <CarImage src={current} alt={name} priority sizes="(min-width: 1024px) 55vw, 100vw" className="group-hover:scale-[1.02]" /> : null}
      </div>
      {images.length > 1 ? (
        <ul className="mt-3 grid grid-cols-4 gap-2">
          {images.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                className={cn(
                  "relative aspect-[4/3] w-full overflow-hidden rounded-xl border",
                  index === active ? "border-brand" : "border-border",
                )}
                onClick={() => setActive(index)}
                aria-label={`${name} ${index + 1}`}
                aria-pressed={index === active}
              >
                <CarImage src={src} alt="" sizes="120px" className="group-hover:scale-100" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
