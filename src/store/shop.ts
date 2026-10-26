"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  color?: string;
  size?: string;
  quantity: number;
};

export const PROMO_CODES: Record<string, number> = {
  AURORA10: 0.1,
  WELCOME20: 0.2,
};

export const FREE_SHIPPING_THRESHOLD = 150;
const SHIPPING_FEE = 12;
const TAX_RATE = 0.08;

type ShopState = {
  items: CartItem[];
  wishlist: string[];
  promo: string | null;
  cartOpen: boolean;
  searchOpen: boolean;
  addItem: (item: Omit<CartItem, "key" | "quantity">, quantity?: number) => void;
  removeItem: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
};

export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      promo: null,
      cartOpen: false,
      searchOpen: false,
      addItem: (item, quantity = 1) => {
        const key = [item.productId, item.color, item.size].filter(Boolean).join(":");
        set((s) => {
          const existing = s.items.find((i) => i.key === key);
          const items = existing
            ? s.items.map((i) =>
                i.key === key ? { ...i, quantity: i.quantity + quantity } : i,
              )
            : [...s.items, { ...item, key, quantity }];
          return { items };
        });
      },
      removeItem: (key) => set((s) => ({ items: s.items.filter((i) => i.key !== key) })),
      setQuantity: (key, quantity) =>
        set((s) => ({
          items:
            quantity <= 0
              ? s.items.filter((i) => i.key !== key)
              : s.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
        })),
      clearCart: () => set({ items: [], promo: null }),
      toggleWishlist: (productId) =>
        set((s) => ({
          wishlist: s.wishlist.includes(productId)
            ? s.wishlist.filter((id) => id !== productId)
            : [...s.wishlist, productId],
        })),
      applyPromo: (code) => {
        const normalized = code.trim().toUpperCase();
        if (!(normalized in PROMO_CODES)) return false;
        set({ promo: normalized });
        return true;
      },
      removePromo: () => set({ promo: null }),
      setCartOpen: (cartOpen) => set({ cartOpen }),
      setSearchOpen: (searchOpen) => set({ searchOpen: searchOpen && !get().cartOpen }),
    }),
    {
      name: "aurora-shop",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items, wishlist: s.wishlist, promo: s.promo }),
      // Rehydrated after mount by <StoreHydrator /> so server and first client render match.
      skipHydration: true,
    },
  ),
);

export function cartTotals(items: CartItem[], promo: string | null) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const discount = promo ? subtotal * (PROMO_CODES[promo] ?? 0) : 0;
  const afterDiscount = subtotal - discount;
  const shipping = count === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const tax = afterDiscount * TAX_RATE;
  return { subtotal, count, discount, shipping, tax, total: afterDiscount + shipping + tax };
}

/** True once persisted cart/wishlist state has been loaded from localStorage. */
export function useStoreReady() {
  return useSyncExternalStore(
    (onChange) => useShop.persist.onFinishHydration(onChange),
    () => useShop.persist.hasHydrated(),
    () => false,
  );
}
