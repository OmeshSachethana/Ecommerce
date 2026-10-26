"use client";

import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { categories } from "@/lib/products";
import { cn } from "@/lib/utils";
import { cartTotals, useShop } from "@/store/shop";

const nav = [
  { href: "/shop", label: "Shop all" },
  { href: "/shop?category=audio", label: "Audio" },
  { href: "/shop?category=wearables", label: "Wearables" },
  { href: "/shop?category=footwear", label: "Footwear" },
  { href: "/shop?category=home", label: "Home" },
];

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = useShop((s) => s.items);
  const wishlistCount = useShop((s) => s.wishlist.length);
  const setCartOpen = useShop((s) => s.setCartOpen);
  const setSearchOpen = useShop((s) => s.setSearchOpen);
  const { count } = cartTotals(items, null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        useShop.getState().setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="relative z-50 overflow-hidden bg-fg py-2 text-center text-xs font-medium tracking-wide text-bg">
        Free express shipping over $150 · Use code <span className="font-mono">AURORA10</span> for 10% off
      </div>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-line/60 bg-glass shadow-[0_8px_30px_-12px_rgb(0_0_0/0.15)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-bg/0",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full hover:bg-subtle lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </button>

          <Link href="/" className="group flex items-center gap-2" aria-label="Aurora home">
            <span className="relative grid size-8 place-items-center overflow-hidden rounded-xl bg-fg">
              <span className="absolute inset-0 bg-[conic-gradient(from_180deg,#8b5cf6,#ec4899,#f59e0b,#22d3ee,#8b5cf6)] opacity-90 transition duration-700 group-hover:rotate-180" />
              <span className="relative size-3 rounded-full bg-bg" />
            </span>
            <span className="font-display text-2xl tracking-tight">Aurora</span>
          </Link>

          <nav className="ml-8 hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm text-fg/70 transition hover:bg-subtle hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden h-10 items-center gap-2 rounded-full border border-line bg-card/60 pr-2 pl-3.5 text-sm text-muted transition hover:border-fg/20 hover:text-fg md:flex"
            >
              <Search className="size-4" />
              <span className="pr-8">Search products</span>
              <kbd className="rounded-md border border-line bg-subtle px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="grid size-10 place-items-center rounded-full hover:bg-subtle md:hidden"
            >
              <Search className="size-[18px]" />
            </button>
            <ThemeToggle />
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishlistCount} items`}
              className="relative grid size-10 place-items-center rounded-full hover:bg-subtle"
            >
              <Heart className="size-[18px]" />
              <CountBadge value={wishlistCount} />
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart, ${count} items`}
              className="relative grid size-10 place-items-center rounded-full bg-fg text-bg transition hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="size-[18px]" />
              <CountBadge value={count} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.nav
              aria-label="Mobile"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-bg p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-3xl">Aurora</span>
                <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-subtle">
                  <X className="size-5" />
                </button>
              </div>
              <Link href="/shop" className="py-3 text-2xl font-medium">Shop all</Link>
              {categories.map((c) => (
                <Link key={c.id} href={`/shop?category=${c.id}`} className="py-3 text-2xl font-medium text-fg/70">
                  {c.name}
                </Link>
              ))}
              <Link href="/wishlist" className="mt-auto py-3 text-lg">Wishlist</Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CountBadge({ value }: { value: number }) {
  return (
    <AnimatePresence>
      {value > 0 && (
        <motion.span
          key={value}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          className="absolute -top-0.5 -right-0.5 grid min-w-[18px] place-items-center rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-1 text-[10px] leading-[18px] font-semibold text-white ring-2 ring-bg"
        >
          {value}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
