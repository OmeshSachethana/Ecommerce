"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { CartLines } from "@/components/cart-lines";
import { FreeShippingMeter, PromoField, TotalsTable } from "@/components/order-summary";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import { useShop, useStoreReady } from "@/store/shop";

export function CartView() {
  const ready = useStoreReady();
  const items = useShop((s) => s.items);
  const suggestions = products.filter((p) => p.featured && !items.some((i) => i.productId === p.id)).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-5xl tracking-tight sm:text-7xl">Your bag</h1>

      {!ready ? (
        <div className="mt-12 h-64 animate-pulse rounded-[2rem] bg-subtle" />
      ) : items.length === 0 ? (
        <div className="mt-12 flex flex-col items-center rounded-[2rem] border border-dashed border-line px-6 py-24 text-center">
          <ShoppingBag className="size-10 text-muted" />
          <p className="mt-4 font-display text-4xl">Your bag is empty</p>
          <p className="mt-2 text-muted">Looks like you haven&apos;t added anything yet.</p>
          <Link href="/shop" className="mt-6 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div>
            <FreeShippingMeter />
            <div className="mt-6 border-t border-line">
              <CartLines />
            </div>
          </div>
          <aside className="h-fit space-y-6 rounded-[2rem] border border-line bg-card p-8 lg:sticky lg:top-28">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <PromoField />
            <TotalsTable />
            <Link href="/checkout" className="group flex h-13 items-center justify-center gap-2 rounded-full bg-fg py-3.5 font-medium text-bg transition hover:opacity-90">
              Proceed to checkout <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <p className="text-center text-xs text-muted">Taxes calculated at checkout · Secure SSL payment</p>
          </aside>
        </div>
      )}

      {ready && suggestions.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 font-display text-4xl">Complete the look</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {suggestions.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
