"use client";

import { ArrowRight, Sparkles, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { ProductImage } from "@/components/product-image";
import { getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const showcase = [
  getProduct("aurora-anc-headphones")!,
  getProduct("chrono-classic-watch")!,
  getProduct("nova-runner-sneakers")!,
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="grain relative -mt-16 overflow-hidden pt-16">
      {/* Aurora backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 size-[38rem] animate-aurora rounded-full bg-violet-500/30 blur-[120px] dark:bg-violet-600/30" />
        <div className="absolute top-20 right-[-10rem] size-[34rem] animate-aurora rounded-full bg-pink-400/30 blur-[120px] [animation-delay:-6s] dark:bg-pink-600/20" />
        <div className="absolute bottom-[-12rem] left-1/3 size-[30rem] animate-aurora rounded-full bg-amber-300/30 blur-[120px] [animation-delay:-12s] dark:bg-amber-500/10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)] bg-[size:64px_64px] opacity-50" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 pt-16 pb-24 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:pt-24 lg:pb-32">
        <motion.div style={{ opacity: fade }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 py-1.5 pr-4 pl-1.5 text-xs font-medium backdrop-blur"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-fg px-2 py-0.5 text-bg">
              <Sparkles className="size-3" /> New
            </span>
            Autumn ’26 collection has landed
          </motion.div>

          <h1 className="mt-8 font-display text-6xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            {["Objects", "for"].map((word, i) => (
              <motion.span
                key={word}
                className="mr-[0.25em] inline-block"
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              className="text-gradient inline-block pr-2 italic"
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", backgroundPosition: ["0% 50%", "100% 50%"] }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease,
                backgroundPosition: { duration: 6, repeat: Infinity, repeatType: "reverse", ease: "linear" },
              }}
            >
              modern
            </motion.span>{" "}
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
            >
              living.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
            className="mt-8 max-w-lg text-lg text-muted"
          >
            A curated edit of design-led audio, wearables, apparel and home goods — made by
            independent makers, built to last a lifetime.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/shop"
              className="group relative inline-flex h-13 items-center gap-2 overflow-hidden rounded-full bg-fg px-7 py-3.5 font-medium text-bg transition hover:shadow-[0_10px_40px_-10px] hover:shadow-violet-500/60"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full" />
              Shop the collection
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/shop?sort=newest"
              className="inline-flex h-13 items-center rounded-full border border-line bg-card/60 px-7 py-3.5 font-medium backdrop-blur transition hover:bg-card"
            >
              New arrivals
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-4"
          >
            {[
              ["120k+", "Happy customers"],
              ["4.9", "Average rating"],
              ["48h", "Express delivery"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="flex items-center gap-1 text-3xl font-semibold tracking-tight">
                  {value}
                  {value === "4.9" && <Star className="size-5 fill-amber-400 text-amber-400" />}
                </dd>
                <p className="text-sm text-muted">{label}</p>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Floating product showcase */}
        <div className="relative mx-auto h-[520px] w-full max-w-md sm:h-[600px] lg:max-w-none">
          {showcase.map((p, i) => {
            const layout = [
              "top-0 right-0 w-[70%] rotate-3",
              "top-[28%] left-0 w-[52%] -rotate-6",
              "bottom-0 right-[8%] w-[48%] rotate-[-2deg]",
            ][i];
            const y = [y1, y2, y3][i];
            return (
              <motion.div key={p.id} style={{ y }} className={`absolute ${layout}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15, ease }}
                  whileHover={{ scale: 1.03, rotate: 0 }}
                >
                  <Link
                    href={`/product/${p.slug}`}
                    className="block overflow-hidden rounded-[2rem] border border-white/40 bg-card/70 p-2 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-[1.6rem] bg-subtle">
                      <ProductImage src={p.images[0]} alt={p.name} fill priority={i === 0} sizes="(min-width: 1024px) 30vw, 70vw" className="object-cover" />
                    </div>
                    <div className="flex items-center justify-between gap-2 px-3 py-3">
                      <span className="truncate text-sm font-medium">{p.name}</span>
                      <span className="shrink-0 rounded-full bg-fg px-2.5 py-1 text-xs font-semibold text-bg">
                        {formatPrice(p.price)}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
