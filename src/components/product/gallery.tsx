"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ProductImage } from "@/components/product-image";
import { cn } from "@/lib/utils";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      <div className="no-scrollbar flex gap-3 overflow-x-auto lg:flex-col" role="tablist" aria-label="Product images">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show image ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "relative size-20 shrink-0 overflow-hidden rounded-2xl bg-subtle ring-2 ring-offset-2 ring-offset-bg transition",
              i === index ? "ring-fg" : "ring-transparent opacity-60 hover:opacity-100",
            )}
          >
            <ProductImage src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
      <div
        className="relative aspect-[4/5] flex-1 cursor-zoom-in overflow-hidden rounded-[2rem] bg-subtle"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onMouseLeave={() => setZoom(null)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={images[index]}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <ProductImage
              src={images[index]}
              alt={`${name} — image ${index + 1}`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-200"
              style={zoom ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 lg:hidden">
          {images.map((src, i) => (
            <span key={src} className={cn("h-1.5 rounded-full bg-white transition-all", i === index ? "w-6" : "w-1.5 opacity-50")} />
          ))}
        </div>
      </div>
    </div>
  );
}
