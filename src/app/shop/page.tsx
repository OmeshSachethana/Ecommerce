import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopSkeleton, ShopView } from "@/components/shop/shop-view";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse the full Aurora collection of audio, wearables, footwear, apparel, accessories and home goods.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopView />
    </Suspense>
  );
}
