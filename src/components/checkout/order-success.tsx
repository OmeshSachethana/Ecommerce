"use client";

import { Check, Package, Truck } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSyncExternalStore } from "react";
import { formatPrice } from "@/lib/utils";

type LastOrder = { id: string; email: string; name: string; total: number };

const noop = () => () => {};
function readOrder() {
  try {
    return sessionStorage.getItem("aurora-last-order");
  } catch {
    return null;
  }
}

const confetti = Array.from({ length: 28 }, (_, i) => ({
  x: Math.cos((i / 28) * Math.PI * 2) * (120 + (i % 4) * 40),
  y: Math.sin((i / 28) * Math.PI * 2) * (120 + (i % 3) * 40),
  color: ["#8b5cf6", "#ec4899", "#f59e0b", "#22d3ee"][i % 4],
  rotate: i * 37,
}));

export function OrderSuccess() {
  const orderId = useSearchParams().get("order");
  const raw = useSyncExternalStore(noop, readOrder, () => null);
  const order: LastOrder | null = raw ? JSON.parse(raw) : null;
  const matches = order && order.id === orderId;

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="relative mx-auto grid size-24 place-items-center">
        {confetti.map((c, i) => (
          <motion.span
            key={i}
            className="absolute size-2.5 rounded-sm"
            style={{ backgroundColor: c.color }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0 }}
            animate={{ x: c.x, y: c.y, opacity: 0, rotate: c.rotate, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          />
        ))}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="grid size-24 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-2xl shadow-pink-500/30"
        >
          <Check className="size-10" strokeWidth={3} />
        </motion.span>
      </div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h1 className="mt-10 font-display text-5xl sm:text-6xl">
          Thank you{matches && order.name ? `, ${order.name}` : ""}!
        </h1>
        <p className="mt-4 text-lg text-muted">
          Your order {orderId && <span className="font-mono font-medium text-fg">{orderId}</span>} is confirmed.
          {matches && <> A receipt is on its way to {order.email}.</>}
        </p>
        {matches && <p className="mt-2 text-sm text-muted">Total charged: {formatPrice(order.total)}</p>}
      </motion.div>

      <div className="mt-12 grid gap-3 text-left sm:grid-cols-3">
        {[
          { icon: Check, title: "Confirmed", body: "Just now", done: true },
          { icon: Package, title: "Packing", body: "Within 24 hours", done: false },
          { icon: Truck, title: "On its way", body: "Tracking sent by email", done: false },
        ].map(({ icon: Icon, title, body, done }) => (
          <div key={title} className="rounded-2xl border border-line bg-card p-5">
            <Icon className={done ? "size-5 text-emerald-500" : "size-5 text-muted"} />
            <p className="mt-3 font-medium">{title}</p>
            <p className="text-sm text-muted">{body}</p>
          </div>
        ))}
      </div>

      <Link href="/shop" className="mt-12 inline-flex rounded-full bg-fg px-8 py-3.5 font-medium text-bg transition hover:opacity-90">
        Continue shopping
      </Link>
    </div>
  );
}
