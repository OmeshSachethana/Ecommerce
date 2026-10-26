import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderSuccess } from "@/components/checkout/order-success";

export const metadata: Metadata = { title: "Order confirmed" };

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="mx-auto mt-24 h-96 max-w-2xl animate-pulse rounded-[2rem] bg-subtle" />}>
      <OrderSuccess />
    </Suspense>
  );
}
