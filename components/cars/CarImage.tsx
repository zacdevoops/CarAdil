"use client";

import { useState } from "react";
import Image from "next/image";
import { carImageFallback } from "@/content/cars";
import { cn } from "@/lib/utils";

type CarImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function CarImage({ src, alt, className, sizes, priority }: CarImageProps) {
  const [current, setCurrent] = useState(src);
  const unoptimized = current.endsWith(".svg");

  return (
    <Image
      src={current}
      alt={alt}
      fill
      sizes={sizes ?? "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
      priority={priority}
      unoptimized={unoptimized}
      className={cn("object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.03]", className)}
      onError={() => {
        if (current !== carImageFallback) setCurrent(carImageFallback);
      }}
    />
  );
}
