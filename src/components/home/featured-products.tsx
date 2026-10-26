"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { SectionHeading } from "@/components/home/section-heading";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

const tabs = {
  Trending: products.filter((p) => p.featured),
  "New in": [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  "On sale": products.filter((p) => p.compareAt),
} as const;

type Tab = keyof typeof tabs;

export function FeaturedProducts() {
  const [tab, setTab] = useState<Tab>("Trending");

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="The edit" title={<>Loved by <em>everyone</em></>} href="/shop" cta="View all products" />
      <div role="tablist" aria-label="Product collections" className="mb-8 inline-flex rounded-full border border-line bg-card p-1">
        {(Object.keys(tabs) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn("relative rounded-full px-5 py-2 text-sm font-medium transition", tab === t ? "text-bg" : "text-muted hover:text-fg")}
          >
            {tab === t && (
              <motion.span layoutId="featured-tab" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", damping: 30, stiffness: 400 }} />
            )}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {tabs[tab].slice(0, 8).map((p, i) => (
          <ProductCard key={`${tab}-${p.id}`} product={p} priority={i < 4} />
        ))}
      </div>
    </section>
  );
}
