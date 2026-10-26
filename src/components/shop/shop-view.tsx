"use client";

import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { ProductCard } from "@/components/product-card";
import { brands, categories, products, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const sorts = {
  featured: "Featured",
  newest: "Newest",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Top rated",
} as const;
type SortKey = keyof typeof sorts;

const priceBands = [
  { id: "0-100", label: "Under $100", min: 0, max: 100 },
  { id: "100-250", label: "$100 – $250", min: 100, max: 250 },
  { id: "250-500", label: "$250 – $500", min: 250, max: 500 },
  { id: "500-", label: "$500+", min: 500, max: Infinity },
];

function sortProducts(list: Product[], sort: SortKey) {
  const sorted = [...list];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }
}

export function ShopView() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const category = params.get("category");
  const brandKey = params.getAll("brand").join(",");
  const selectedBrands = useMemo(() => (brandKey ? brandKey.split(",") : []), [brandKey]);
  const price = params.get("price");
  const onSale = params.get("sale") === "1";
  const query = params.get("q") ?? "";
  const sort = (params.get("sort") as SortKey) in sorts ? (params.get("sort") as SortKey) : "featured";

  function update(mutate: (next: URLSearchParams) => void) {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    const qs = next.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  }

  const results = useMemo(() => {
    const band = priceBands.find((b) => b.id === price);
    const q = query.toLowerCase();
    const filtered = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!selectedBrands.length || selectedBrands.includes(p.brand)) &&
        (!band || (p.price >= band.min && p.price < band.max)) &&
        (!onSale || Boolean(p.compareAt)) &&
        (!q || `${p.name} ${p.brand} ${p.category} ${p.description}`.toLowerCase().includes(q)),
    );
    return sortProducts(filtered, sort);
  }, [category, selectedBrands, price, onSale, query, sort]);

  const activeCategory = categories.find((c) => c.id === category);
  const chips = [
    activeCategory && { label: activeCategory.name, clear: (n: URLSearchParams) => n.delete("category") },
    ...selectedBrands.map((b) => ({ label: b, clear: (n: URLSearchParams) => n.delete("brand", b) })),
    price && { label: priceBands.find((b) => b.id === price)?.label ?? price, clear: (n: URLSearchParams) => n.delete("price") },
    onSale && { label: "On sale", clear: (n: URLSearchParams) => n.delete("sale") },
    query && { label: `“${query}”`, clear: (n: URLSearchParams) => n.delete("q") },
  ].filter(Boolean) as { label: string; clear: (n: URLSearchParams) => void }[];

  const filters = (
    <div className="space-y-8">
      <FilterGroup title="Category">
        <FilterOption active={!category} onClick={() => update((n) => n.delete("category"))}>
          All products <Count n={products.length} />
        </FilterOption>
        {categories.map((c) => (
          <FilterOption
            key={c.id}
            active={category === c.id}
            onClick={() => update((n) => (category === c.id ? n.delete("category") : n.set("category", c.id)))}
          >
            {c.name} <Count n={products.filter((p) => p.category === c.id).length} />
          </FilterOption>
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        {priceBands.map((b) => (
          <FilterOption
            key={b.id}
            active={price === b.id}
            onClick={() => update((n) => (price === b.id ? n.delete("price") : n.set("price", b.id)))}
          >
            {b.label}
          </FilterOption>
        ))}
      </FilterGroup>

      <FilterGroup title="Brand">
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => {
            const active = selectedBrands.includes(b);
            return (
              <button
                key={b}
                type="button"
                aria-pressed={active}
                onClick={() => update((n) => (active ? n.delete("brand", b) : n.append("brand", b)))}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm transition",
                  active ? "border-fg bg-fg text-bg" : "border-line hover:border-fg/30",
                )}
              >
                {b}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-line bg-card p-4">
        <span className="text-sm font-medium">On sale only</span>
        <input
          type="checkbox"
          checked={onSale}
          onChange={() => update((n) => (onSale ? n.delete("sale") : n.set("sale", "1")))}
          className="peer sr-only"
        />
        <span className="relative h-6 w-11 rounded-full bg-line transition peer-checked:bg-violet-500 peer-focus-visible:ring-2 peer-focus-visible:ring-violet-500/50 after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5" />
      </label>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden py-14">
        <div aria-hidden className="absolute -top-24 left-1/2 -z-10 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[100px]" />
        <p className="text-sm text-muted">Shop / {activeCategory?.name ?? "All products"}</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-7xl">
          {query ? <>Results for <em>“{query}”</em></> : activeCategory ? activeCategory.name : <>The <em>full</em> collection</>}
        </h1>
        {activeCategory && <p className="mt-3 text-lg text-muted">{activeCategory.tagline}</p>}
      </div>

      <div className="sticky top-16 z-30 -mx-4 mb-8 flex items-center gap-3 border-y border-line bg-bg/80 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium lg:hidden"
        >
          <SlidersHorizontal className="size-4" /> Filters
          {chips.length > 0 && <span className="grid size-5 place-items-center rounded-full bg-fg text-[10px] text-bg">{chips.length}</span>}
        </button>
        <p className="text-sm text-muted" aria-live="polite">
          <span className={cn("font-medium text-fg transition", isPending && "opacity-50")}>{results.length}</span> products
        </p>
        <div className="no-scrollbar hidden flex-1 gap-2 overflow-x-auto md:flex">
          <AnimatePresence initial={false}>
            {chips.map((chip) => (
              <motion.button
                key={chip.label}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={() => update(chip.clear)}
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-subtle px-3 py-1.5 text-xs font-medium hover:bg-line"
              >
                {chip.label} <X className="size-3" />
              </motion.button>
            ))}
          </AnimatePresence>
          {chips.length > 1 && (
            <button type="button" onClick={() => startTransition(() => router.replace(pathname, { scroll: false }))} className="shrink-0 px-2 text-xs text-muted underline">
              Clear all
            </button>
          )}
        </div>
        <div className="relative ml-auto">
          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => update((n) => (e.target.value === "featured" ? n.delete("sort") : n.set("sort", e.target.value)))}
            className="h-10 cursor-pointer appearance-none rounded-full border border-line bg-card pr-10 pl-4 text-sm font-medium outline-none focus:border-fg/40"
          >
            {Object.entries(sorts).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted" />
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-36">{filters}</div>
        </aside>

        <div className={cn("transition-opacity", isPending && "opacity-60")}>
          {results.length === 0 ? (
            <div className="flex flex-col items-center rounded-[2rem] border border-dashed border-line px-6 py-24 text-center">
              <p className="font-display text-4xl">Nothing here… yet</p>
              <p className="mt-3 text-muted">Try adjusting your filters or search for something else.</p>
              <button
                type="button"
                onClick={() => startTransition(() => router.replace(pathname, { scroll: false }))}
                className="mt-6 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 3} />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <div className="fixed inset-0 z-[70] lg:hidden">
            <motion.div className="absolute inset-0 bg-black/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFiltersOpen(false)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320 }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[2rem] bg-bg p-6"
            >
              <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-line" />
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="grid size-10 place-items-center rounded-full hover:bg-subtle">
                  <X className="size-5" />
                </button>
              </div>
              {filters}
              <button type="button" onClick={() => setFiltersOpen(false)} className="mt-8 h-12 w-full rounded-full bg-fg font-medium text-bg">
                Show {results.length} products
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-semibold tracking-widest text-muted uppercase">{title}</legend>
      <div className="space-y-1">{children}</div>
    </fieldset>
  );
}

function FilterOption({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition",
        active ? "bg-fg font-medium text-bg" : "text-fg/80 hover:bg-subtle",
      )}
    >
      {children}
    </button>
  );
}

function Count({ n }: { n: number }) {
  return <span className="text-xs opacity-60">{n}</span>;
}

export function ShopSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="h-4 w-32 animate-pulse rounded bg-subtle" />
      <div className="mt-4 h-16 w-2/3 animate-pulse rounded-2xl bg-subtle" />
      <div className="mt-24 grid grid-cols-2 gap-4 md:grid-cols-3 lg:ml-[280px]">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-3xl bg-subtle" />
        ))}
      </div>
      <span className="sr-only">Loading products…</span>
    </div>
  );
}
