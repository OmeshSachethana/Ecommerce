"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import { useShop, useStoreReady } from "@/store/shop";

export function WishlistView() {
  const ready = useStoreReady();
  const wishlist = useShop((s) => s.wishlist);
  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-5xl tracking-tight sm:text-7xl">
        Your <em>wishlist</em>
      </h1>
      <p className="mt-3 text-muted">{ready ? `${saved.length} saved item${saved.length === 1 ? "" : "s"}` : " "}</p>
      {!ready ? null : saved.length === 0 ? (
        <div className="mt-12 flex flex-col items-center rounded-[2rem] border border-dashed border-line px-6 py-24 text-center">
          <Heart className="size-10 text-muted" />
          <p className="mt-4 font-display text-4xl">Nothing saved yet</p>
          <p className="mt-2 text-muted">Tap the heart on any product to save it for later.</p>
          <Link href="/shop" className="mt-6 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg">
            Discover products
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
