"use client";

import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useShop } from "@/store/shop";

export function WishlistButton({
  productId,
  name,
  className,
}: {
  productId: string;
  name: string;
  className?: string;
}) {
  const active = useShop((s) => s.wishlist.includes(productId));
  const toggle = useShop((s) => s.toggleWishlist);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
        toast(active ? "Removed from wishlist" : "Saved to wishlist", { description: name });
      }}
      className={cn(
        "grid size-10 place-items-center rounded-full bg-card/80 shadow-sm backdrop-blur transition hover:bg-card",
        className,
      )}
    >
      <Heart
        className={cn("size-[18px] transition", active ? "fill-pink-500 text-pink-500" : "text-fg/70")}
      />
    </motion.button>
  );
}
