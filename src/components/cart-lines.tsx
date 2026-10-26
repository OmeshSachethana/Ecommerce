"use client";

import { Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { ProductImage } from "@/components/product-image";
import { Quantity } from "@/components/quantity";
import { formatPrice } from "@/lib/utils";
import { useShop } from "@/store/shop";

export function CartLines({ onNavigate }: { onNavigate?: () => void }) {
  const items = useShop((s) => s.items);
  const setQuantity = useShop((s) => s.setQuantity);
  const removeItem = useShop((s) => s.removeItem);

  return (
    <ul className="divide-y divide-line">
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.li
            key={item.key}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <div className="flex gap-4 py-5">
              <Link
                href={`/product/${item.slug}`}
                onClick={onNavigate}
                className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-subtle"
              >
                <ProductImage src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link href={`/product/${item.slug}`} onClick={onNavigate} className="line-clamp-1 font-medium hover:underline">
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted">
                      {[item.color, item.size && `Size ${item.size}`].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <p className="font-semibold tabular-nums">{formatPrice(item.price * item.quantity)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <Quantity size="sm" value={item.quantity} onChange={(q) => setQuantity(item.key, q)} />
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="inline-flex items-center gap-1 text-xs text-muted transition hover:text-rose-500"
                  >
                    <Trash2 className="size-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
