"use client";

import { ArrowRight, CornerDownLeft, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { ProductImage } from "@/components/product-image";
import { categories, products } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import { useShop } from "@/store/shop";

const trending = ["headphones", "sneakers", "watch", "leather", "lamp"];

function searchProducts(query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return products.filter((p) => p.featured).slice(0, 5);
  return products
    .map((p) => {
      const haystack = `${p.name} ${p.brand} ${p.category} ${p.description}`.toLowerCase();
      const score = terms.reduce(
        (acc, t) => acc + (p.name.toLowerCase().includes(t) ? 3 : haystack.includes(t) ? 1 : -100),
        0,
      );
      return { p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p)
    .slice(0, 8);
}

export function CommandSearch() {
  const open = useShop((s) => s.searchOpen);
  const setOpen = useShop((s) => s.setSearchOpen);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const deferred = useDeferredValue(query);
  const results = useMemo(() => searchProducts(deferred), [deferred]);

  function close() {
    setOpen(false);
    setQuery("");
    setActive(0);
  }

  function go(href: string) {
    close();
    router.push(href);
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      const hit = results[active];
      if (hit) go(`/product/${hit.slug}`);
      else if (query.trim()) go(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]">
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-bg shadow-2xl"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="size-5 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search for products, brands and more…"
                className="h-16 flex-1 bg-transparent text-lg outline-none placeholder:text-muted"
                role="combobox"
                aria-expanded="true"
                aria-controls="search-results"
                aria-activedescendant={results[active] ? `result-${results[active].id}` : undefined}
              />
              <button type="button" onClick={close} aria-label="Close search" className="grid size-8 place-items-center rounded-full hover:bg-subtle">
                <X className="size-4" />
              </button>
            </div>

            {!query && (
              <div className="flex flex-wrap items-center gap-2 border-b border-line px-5 py-3">
                <span className="text-xs text-muted">Trending:</span>
                {trending.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setQuery(t)}
                    className="rounded-full border border-line px-3 py-1 text-xs transition hover:bg-subtle"
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            <div className="max-h-[50vh] overflow-y-auto p-2">
              <p className="px-3 pt-2 pb-1 text-xs font-medium text-muted">
                {query ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Popular right now"}
              </p>
              {results.length === 0 ? (
                <div className="px-3 py-10 text-center text-sm text-muted">
                  No products match “{query}”. Try another search.
                </div>
              ) : (
                <ul id="search-results" role="listbox">
                  {results.map((p, i) => (
                    <li key={p.id} id={`result-${p.id}`} role="option" aria-selected={i === active}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(`/product/${p.slug}`)}
                        className={cn(
                          "flex w-full items-center gap-4 rounded-2xl p-2.5 text-left transition",
                          i === active && "bg-subtle",
                        )}
                      >
                        <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-subtle">
                          <ProductImage src={p.images[0]} alt={p.name} fill sizes="56px" className="object-cover" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium">{p.name}</span>
                          <span className="block text-xs text-muted">
                            {p.brand} · {categories.find((c) => c.id === p.category)?.name}
                          </span>
                        </span>
                        <span className="text-sm font-semibold">{formatPrice(p.price)}</span>
                        <ArrowRight className={cn("size-4 text-muted transition", i === active ? "opacity-100" : "opacity-0")} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-line bg-card px-5 py-3 text-xs text-muted">
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-line px-1.5 font-mono">↑</kbd>
                  <kbd className="rounded border border-line px-1.5 font-mono">↓</kbd> navigate
                </span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="size-3" /> select
                </span>
              </span>
              {query.trim() && (
                <button type="button" onClick={() => go(`/shop?q=${encodeURIComponent(query.trim())}`)} className="font-medium text-fg hover:underline">
                  See all results →
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
