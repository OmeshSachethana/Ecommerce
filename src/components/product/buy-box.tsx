"use client";

import { Check, Lock, RefreshCcw, ShoppingBag, Truck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Quantity } from "@/components/quantity";
import { Rating } from "@/components/rating";
import { WishlistButton } from "@/components/wishlist-button";
import type { Product } from "@/lib/products";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import { useShop } from "@/store/shop";

export function BuyBox({ product }: { product: Product }) {
  const addItem = useShop((s) => s.addItem);
  const setCartOpen = useShop((s) => s.setCartOpen);
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const discount = discountPercent(product.price, product.compareAt);
  const lowStock = product.stock <= 10;

  function add() {
    if (product.sizes && !size) {
      setSizeError(true);
      toast.error("Please select a size");
      return;
    }
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0],
        price: product.price,
        color: color?.name,
        size: size ?? undefined,
      },
      quantity,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    toast.success(`${quantity} × ${product.name} added to bag`, {
      action: { label: "View bag", onClick: () => setCartOpen(true) },
    });
  }

  return (
    <div className="lg:sticky lg:top-28">
      <p className="text-sm tracking-widest text-muted uppercase">{product.brand}</p>
      <h1 className="mt-2 font-display text-5xl leading-none tracking-tight sm:text-6xl">{product.name}</h1>
      <a href="#reviews" className="mt-4 inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
        <Rating value={product.rating} />
        <span className="font-medium text-fg">{product.rating}</span>
        <span>· {product.reviewCount.toLocaleString("en-US")} reviews</span>
      </a>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="text-3xl font-semibold tracking-tight">{formatPrice(product.price)}</span>
        {product.compareAt && (
          <>
            <span className="text-lg text-muted line-through">{formatPrice(product.compareAt)}</span>
            <span className="rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
              Save {discount}%
            </span>
          </>
        )}
      </div>
      <p className="mt-1 text-sm text-muted">
        or 4 interest-free payments of {formatPrice(product.price / 4)}
      </p>

      <p className="mt-6 leading-relaxed text-fg/80">{product.description}</p>

      <div className="mt-8">
        <p className="text-sm font-medium">
          Colour: <span className="text-muted">{color?.name}</span>
        </p>
        <div className="mt-3 flex gap-3" role="radiogroup" aria-label="Colour">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              role="radio"
              aria-checked={color?.name === c.name}
              aria-label={c.name}
              onClick={() => setColor(c)}
              className={cn(
                "size-10 rounded-full ring-2 ring-offset-2 ring-offset-bg transition",
                color?.name === c.name ? "ring-fg" : "ring-transparent hover:ring-line",
              )}
            >
              <span className="block size-full rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
            </button>
          ))}
        </div>
      </div>

      {product.sizes && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className={cn("text-sm font-medium", sizeError && "text-rose-500")}>
              Size{size ? <span className="text-muted">: {size}</span> : sizeError && " — please select"}
            </p>
            <button type="button" className="text-sm text-muted underline underline-offset-4 hover:text-fg">
              Size guide
            </button>
          </div>
          <motion.div
            animate={sizeError ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6"
            role="radiogroup"
            aria-label="Size"
          >
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={size === s}
                onClick={() => {
                  setSize(s);
                  setSizeError(false);
                }}
                className={cn(
                  "h-12 rounded-xl border text-sm font-medium transition",
                  size === s ? "border-fg bg-fg text-bg" : "border-line hover:border-fg/40",
                )}
              >
                {s}
              </button>
            ))}
          </motion.div>
        </div>
      )}

      <div className="mt-8 flex gap-3">
        <Quantity value={quantity} onChange={setQuantity} max={Math.min(10, product.stock)} />
        <button
          type="button"
          onClick={add}
          className="relative flex h-12 min-w-0 flex-1 items-center whitespace-nowrap justify-center gap-2 overflow-hidden rounded-full bg-fg font-medium text-bg transition hover:opacity-90 active:scale-[0.99]"
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span key="added" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} className="flex items-center gap-2">
                <Check className="size-4" /> Added
              </motion.span>
            ) : (
              <motion.span key="add" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} className="flex items-center gap-2">
                <ShoppingBag className="size-4" /> Add to bag · {formatPrice(product.price * quantity)}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <WishlistButton productId={product.id} name={product.name} className="size-12 border border-line" />
      </div>

      <p className={cn("mt-4 flex items-center gap-2 text-sm", lowStock ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400")}>
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-current" />
        </span>
        {lowStock ? `Only ${product.stock} left — order soon` : "In stock, ready to ship"}
      </p>

      <div className="mt-8 grid grid-cols-3 gap-2 text-center text-xs">
        {[
          { icon: Truck, label: "Free 48h delivery" },
          { icon: RefreshCcw, label: "30-day returns" },
          { icon: Lock, label: "Secure checkout" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="rounded-2xl border border-line bg-card px-2 py-4">
            <Icon className="mx-auto mb-2 size-5 text-muted" />
            {label}
          </div>
        ))}
      </div>

      <div className="mt-8 divide-y divide-line border-y border-line">
        <Details title="Highlights" defaultOpen>
          <ul className="space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-violet-500" /> {f}
              </li>
            ))}
          </ul>
        </Details>
        <Details title="Shipping & returns">
          Free express shipping on orders over $150, delivered in 1–3 business days. Not quite right? Return
          within 30 days for a full refund — we&apos;ll even cover the label.
        </Details>
        <Details title="Care & warranty">
          Covered by our 2-year warranty against manufacturing defects. Leather goods include lifetime repairs
          at any Aurora partner workshop.
        </Details>
      </div>
    </div>
  );
}

function Details({ title, children, defaultOpen }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group py-5" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <span className="relative size-4">
          <span className="absolute top-1/2 left-0 h-px w-4 bg-current" />
          <span className="absolute top-0 left-1/2 h-4 w-px bg-current transition group-open:rotate-90 group-open:opacity-0" />
        </span>
      </summary>
      <div className="pt-4 text-sm leading-relaxed text-muted">{children}</div>
    </details>
  );
}
