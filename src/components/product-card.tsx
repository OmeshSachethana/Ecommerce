"use client";

import { Plus } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { toast } from "sonner";
import { ProductImage } from "@/components/product-image";
import { Rating } from "@/components/rating";
import { WishlistButton } from "@/components/wishlist-button";
import type { Product } from "@/lib/products";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import { useShop } from "@/store/shop";

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  New: "bg-fg text-bg",
  Bestseller: "bg-amber-400 text-black",
  Limited: "bg-gradient-to-r from-violet-500 to-pink-500 text-white",
  Sale: "bg-rose-500 text-white",
};

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const addItem = useShop((s) => s.addItem);
  const discount = discountPercent(product.price, product.compareAt);
  const needsOptions = Boolean(product.sizes?.length);

  function quickAdd() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      color: product.colors[0]?.name,
    });
    toast.success("Added to bag", {
      description: product.name,
      action: { label: "View bag", onClick: () => useShop.getState().setCartOpen(true) },
    });
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-subtle">
        <Link href={`/product/${product.slug}`} className="absolute inset-0" tabIndex={-1} aria-hidden>
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-105"
          />
          {product.images[1] && (
            <ProductImage
              src={product.images[1]}
              alt=""
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover opacity-0 transition duration-700 group-hover:opacity-100"
            />
          )}
        </Link>
        <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", badgeStyles[product.badge])}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-semibold text-rose-600 backdrop-blur">
              −{discount}%
            </span>
          )}
        </div>
        <WishlistButton productId={product.id} name={product.name} className="absolute top-3 right-3" />
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 max-md:hidden">
          {needsOptions ? (
            <Link
              href={`/product/${product.slug}`}
              className="flex h-11 items-center justify-center rounded-full bg-card/90 text-sm font-medium backdrop-blur transition hover:bg-card"
            >
              Choose options
            </Link>
          ) : (
            <button
              type="button"
              onClick={quickAdd}
              className="flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-fg text-sm font-medium text-bg transition hover:opacity-90 active:scale-[0.98]"
            >
              <Plus className="size-4" /> Quick add
            </button>
          )}
        </div>
      </div>
      <Link href={`/product/${product.slug}`} className="block">
        <div className="mt-4 flex items-start justify-between gap-3 px-1">
          <div className="min-w-0">
            <p className="text-xs tracking-wide text-muted uppercase">{product.brand}</p>
            <h3 className="mt-1 truncate font-medium">{product.name}</h3>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
              <Rating value={product.rating} />
              <span>({product.reviewCount.toLocaleString("en-US")})</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">{formatPrice(product.price)}</p>
            {product.compareAt && (
              <p className="text-xs text-muted line-through">{formatPrice(product.compareAt)}</p>
            )}
          </div>
        </div>
        <div className="mt-2 flex gap-1 px-1">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="size-3.5 rounded-full ring-1 ring-line ring-offset-1 ring-offset-bg"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </Link>
    </motion.article>
  );
}
