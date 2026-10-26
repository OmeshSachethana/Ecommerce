"use client";

import { Tag, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import { cartTotals, FREE_SHIPPING_THRESHOLD, useShop } from "@/store/shop";

export function FreeShippingMeter() {
  const items = useShop((s) => s.items);
  const promo = useShop((s) => s.promo);
  const { subtotal, discount } = cartTotals(items, promo);
  const spent = subtotal - discount;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - spent);
  const pct = Math.min(100, (spent / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div>
      <p className="text-sm">
        {remaining > 0 ? (
          <>
            You&apos;re <span className="font-semibold">{formatPrice(remaining)}</span> away from free express shipping
          </>
        ) : (
          <span className="font-medium">🎉 You&apos;ve unlocked free express shipping</span>
        )}
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-subtle">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-amber-400 transition-[width] duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function PromoField() {
  const promo = useShop((s) => s.promo);
  const applyPromo = useShop((s) => s.applyPromo);
  const removePromo = useShop((s) => s.removePromo);
  const [code, setCode] = useState("");

  if (promo) {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-dashed border-emerald-500/50 bg-emerald-500/5 px-4 py-3 text-sm">
        <span className="inline-flex items-center gap-2 font-medium text-emerald-600 dark:text-emerald-400">
          <Tag className="size-4" /> {promo} applied
        </span>
        <button type="button" onClick={removePromo} aria-label="Remove promo code" className="text-muted hover:text-fg">
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (applyPromo(code)) {
          toast.success("Promo code applied");
          setCode("");
        } else {
          toast.error("That code isn't valid", { description: "Try AURORA10 or WELCOME20" });
        }
      }}
    >
      <label className="sr-only" htmlFor="promo">
        Promo code
      </label>
      <input
        id="promo"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Promo code"
        className="h-11 min-w-0 flex-1 rounded-full border border-line bg-card px-4 text-sm uppercase outline-none placeholder:normal-case placeholder:text-muted focus:border-fg/40"
      />
      <button type="submit" disabled={!code.trim()} className="h-11 rounded-full border border-line px-5 text-sm font-medium transition hover:bg-subtle disabled:opacity-40">
        Apply
      </button>
    </form>
  );
}

export function TotalsTable() {
  const items = useShop((s) => s.items);
  const promo = useShop((s) => s.promo);
  const t = cartTotals(items, promo);

  return (
    <dl className="space-y-2.5 text-sm">
      <Row label="Subtotal" value={formatPrice(t.subtotal)} />
      {t.discount > 0 && <Row label={`Discount (${promo})`} value={`−${formatPrice(t.discount)}`} accent />}
      <Row label="Shipping" value={t.shipping === 0 ? "Free" : formatPrice(t.shipping)} />
      <Row label="Estimated tax" value={formatPrice(t.tax)} />
      <div className="flex items-baseline justify-between border-t border-line pt-3">
        <dt className="font-medium">Total</dt>
        <dd className="text-xl font-semibold tabular-nums">{formatPrice(t.total)}</dd>
      </div>
    </dl>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className={accent ? "font-medium text-emerald-600 tabular-nums dark:text-emerald-400" : "tabular-nums"}>{value}</dd>
    </div>
  );
}
