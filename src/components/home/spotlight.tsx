"use client";

import { ArrowRight, Check } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { ProductImage } from "@/components/product-image";
import { getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function Spotlight() {
  const product = getProduct("aurora-anc-headphones")!;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        style={{ scale }}
        className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] bg-zinc-950 text-white lg:grid-cols-2"
      >
        <div aria-hidden className="absolute inset-0">
          <div className="absolute -top-20 -left-20 size-96 rounded-full bg-violet-600/40 blur-[100px]" />
          <div className="absolute right-0 bottom-0 size-96 rounded-full bg-pink-600/30 blur-[100px]" />
        </div>
        <div className="relative z-10 flex flex-col justify-center p-8 sm:p-14">
          <p className="text-sm font-medium tracking-widest text-violet-300 uppercase">Product spotlight</p>
          <h2 className="mt-4 font-display text-5xl leading-none sm:text-6xl">
            Silence, <em className="text-gradient">perfected.</em>
          </h2>
          <p className="mt-6 max-w-md text-white/70">{product.description}</p>
          <ul className="mt-8 space-y-3">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-white/85">
                <span className="grid size-5 place-items-center rounded-full bg-white/10">
                  <Check className="size-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href={`/product/${product.slug}`}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-black transition hover:bg-white/90"
            >
              Shop now — {formatPrice(product.price)}
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
            {product.compareAt && (
              <span className="text-sm text-white/50 line-through">{formatPrice(product.compareAt)}</span>
            )}
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden lg:min-h-[620px]">
          <motion.div style={{ y: imgY }} className="absolute -inset-y-[10%] inset-x-0">
            <ProductImage src={product.images[0]} alt={product.name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent max-lg:bg-gradient-to-b" />
        </div>
      </motion.div>
    </section>
  );
}
