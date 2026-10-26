"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Quantity({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const btn = cn(
    "grid place-items-center rounded-full transition hover:bg-subtle disabled:opacity-30 disabled:hover:bg-transparent",
    size === "sm" ? "size-7" : "size-10",
  );
  return (
    <div className={cn("inline-flex items-center rounded-full border border-line", size === "sm" ? "h-8 px-0.5" : "h-12 px-1")}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <Minus className="size-3.5" />
      </button>
      <span className={cn("text-center font-medium tabular-nums", size === "sm" ? "w-6 text-sm" : "w-8")} aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
