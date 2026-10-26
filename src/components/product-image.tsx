"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = Omit<ImageProps, "src" | "alt"> & { src: string; alt: string };

/** next/image with a soft gradient fallback if the remote image can't load. */
export function ProductImage({ src, alt, className, ...props }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "absolute inset-0 grid place-items-center bg-gradient-to-br from-violet-200 via-rose-100 to-amber-100 dark:from-violet-950 dark:via-zinc-900 dark:to-amber-950",
          className,
        )}
      >
        <span className="px-6 text-center font-display text-2xl text-fg/60 italic">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailedSrc(src)}
      {...props}
    />
  );
}
