"use client";

import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";
import { CartLines } from "@/components/cart-lines";
import { FreeShippingMeter, TotalsTable } from "@/components/order-summary";
import { cartTotals, useShop } from "@/store/shop";

export function CartDrawer() {
  const open = useShop((s) => s.cartOpen);
  const setOpen = useShop((s) => s.setCartOpen);
  const items = useShop((s) => s.items);
  const { count } = cartTotals(items, null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-bg shadow-2xl sm:rounded-l-[2rem]"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="text-lg font-semibold">
                Your bag <span className="text-muted">({count})</span>
              </h2>
              <button type="button" onClick={close} aria-label="Close bag" autoFocus className="grid size-10 place-items-center rounded-full hover:bg-subtle">
                <X className="size-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="grid size-20 place-items-center rounded-full bg-subtle">
                  <ShoppingBag className="size-8 text-muted" />
                </div>
                <p className="font-display text-3xl">Your bag is empty</p>
                <p className="text-sm text-muted">Discover something you&apos;ll love.</p>
                <Link href="/shop" onClick={close} className="mt-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg">
                  Start shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="border-b border-line px-6 py-4">
                  <FreeShippingMeter />
                </div>
                <div className="flex-1 overflow-y-auto px-6">
                  <CartLines onNavigate={close} />
                </div>
                <div className="space-y-4 border-t border-line bg-card px-6 py-5">
                  <TotalsTable />
                  <Link
                    href="/checkout"
                    onClick={close}
                    className="group flex h-13 items-center justify-center gap-2 rounded-full bg-fg py-3.5 font-medium text-bg transition hover:opacity-90"
                  >
                    Checkout
                    <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                  </Link>
                  <Link href="/cart" onClick={close} className="block text-center text-sm text-muted underline-offset-4 hover:text-fg hover:underline">
                    View full bag
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
