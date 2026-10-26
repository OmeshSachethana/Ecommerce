"use client";

import { ArrowLeft, Check, CreditCard, Loader2, Lock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PromoField } from "@/components/order-summary";
import { ProductImage } from "@/components/product-image";
import { cn, formatPrice } from "@/lib/utils";
import { cartTotals, useShop, useStoreReady } from "@/store/shop";

const steps = ["Information", "Delivery", "Payment"] as const;

const deliveryOptions = [
  { id: "standard", label: "Standard", eta: "3–5 business days", extra: 0 },
  { id: "express", label: "Express", eta: "1–2 business days", extra: 15 },
  { id: "nextday", label: "Next day", eta: "Order by 8pm", extra: 29 },
] as const;

type Form = Record<
  "email" | "firstName" | "lastName" | "address" | "city" | "postal" | "country" | "phone" | "cardName" | "cardNumber" | "expiry" | "cvc",
  string
>;

const initialForm: Form = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postal: "",
  country: "United States",
  phone: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

function validate(step: number, f: Form, payment: string) {
  const e: Partial<Record<keyof Form, string>> = {};
  if (step === 0) {
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email";
    if (!f.firstName.trim()) e.firstName = "Required";
    if (!f.lastName.trim()) e.lastName = "Required";
    if (f.address.trim().length < 5) e.address = "Enter your street address";
    if (!f.city.trim()) e.city = "Required";
    if (!/^[A-Za-z0-9 -]{3,10}$/.test(f.postal)) e.postal = "Invalid postal code";
  }
  if (step === 2 && payment === "card") {
    if (!f.cardName.trim()) e.cardName = "Required";
    if (f.cardNumber.replace(/\s/g, "").length < 15) e.cardNumber = "Enter a valid card number";
    const [mm, yy] = f.expiry.split("/").map(Number);
    if (!mm || mm > 12 || !yy || yy < 26) e.expiry = "Invalid expiry";
    if (!/^\d{3,4}$/.test(f.cvc)) e.cvc = "Invalid CVC";
  }
  return e;
}

export function CheckoutFlow() {
  const ready = useStoreReady();
  const router = useRouter();
  const items = useShop((s) => s.items);
  const promo = useShop((s) => s.promo);
  const clearCart = useShop((s) => s.clearCart);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [delivery, setDelivery] = useState<(typeof deliveryOptions)[number]["id"]>("standard");
  const [payment, setPayment] = useState<"card" | "paypal" | "applepay">("card");
  const [placing, setPlacing] = useState(false);

  const totals = cartTotals(items, promo);
  const deliveryExtra = deliveryOptions.find((d) => d.id === delivery)!.extra;
  const grandTotal = totals.total + deliveryExtra;

  function set<K extends keyof Form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function next(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(step, form, payment);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (step < steps.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setPlacing(true);
    const orderId = `AUR-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    try {
      sessionStorage.setItem(
        "aurora-last-order",
        JSON.stringify({ id: orderId, email: form.email, name: form.firstName, total: grandTotal, items, delivery }),
      );
    } catch {}
    setTimeout(() => {
      router.push(`/checkout/success?order=${orderId}`);
      clearCart();
    }, 1600);
  }

  if (!ready) {
    return <div className="mx-auto mt-14 h-96 max-w-7xl animate-pulse rounded-[2rem] bg-subtle" />;
  }

  if (items.length === 0 && !placing) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
        <p className="font-display text-5xl">Nothing to check out</p>
        <p className="mt-3 text-muted">Your bag is empty. Add a few favourites first.</p>
        <Link href="/shop" className="mt-8 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div>
          <h1 className="font-display text-5xl tracking-tight">Checkout</h1>

          <ol className="mt-8 flex items-center gap-2" aria-label="Checkout progress">
            {steps.map((label, i) => (
              <li key={label} className="flex flex-1 items-center gap-2">
                <button
                  type="button"
                  disabled={i > step}
                  onClick={() => setStep(i)}
                  aria-current={i === step ? "step" : undefined}
                  className="flex items-center gap-2 text-sm font-medium disabled:cursor-default"
                >
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full border text-xs transition",
                      i < step && "border-transparent bg-gradient-to-br from-violet-500 to-pink-500 text-white",
                      i === step && "border-fg bg-fg text-bg",
                      i > step && "border-line text-muted",
                    )}
                  >
                    {i < step ? <Check className="size-4" /> : i + 1}
                  </span>
                  <span className={cn("hidden sm:inline", i > step && "text-muted")}>{label}</span>
                </button>
                {i < steps.length - 1 && (
                  <span className="h-px flex-1 bg-line">
                    <span className="block h-px bg-fg transition-all duration-500" style={{ width: i < step ? "100%" : "0%" }} />
                  </span>
                )}
              </li>
            ))}
          </ol>

          <form onSubmit={next} noValidate className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 0 && (
                  <div className="space-y-8">
                    <fieldset className="space-y-4">
                      <legend className="mb-4 text-lg font-semibold">Contact</legend>
                      <Field label="Email" name="email" type="email" autoComplete="email" value={form.email} error={errors.email} onChange={set} />
                      <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set} />
                    </fieldset>
                    <fieldset className="space-y-4">
                      <legend className="mb-4 text-lg font-semibold">Shipping address</legend>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="First name" name="firstName" autoComplete="given-name" value={form.firstName} error={errors.firstName} onChange={set} />
                        <Field label="Last name" name="lastName" autoComplete="family-name" value={form.lastName} error={errors.lastName} onChange={set} />
                      </div>
                      <Field label="Address" name="address" autoComplete="street-address" value={form.address} error={errors.address} onChange={set} />
                      <div className="grid gap-4 sm:grid-cols-3">
                        <Field label="City" name="city" autoComplete="address-level2" value={form.city} error={errors.city} onChange={set} />
                        <Field label="Postal code" name="postal" autoComplete="postal-code" value={form.postal} error={errors.postal} onChange={set} />
                        <div>
                          <label htmlFor="country" className="mb-1.5 block text-sm font-medium">Country</label>
                          <select
                            id="country"
                            value={form.country}
                            onChange={(e) => set("country", e.target.value)}
                            autoComplete="country-name"
                            className="h-12 w-full rounded-2xl border border-line bg-card px-4 outline-none focus:border-fg/40 focus:ring-4 focus:ring-violet-500/10"
                          >
                            {["United States", "Canada", "United Kingdom", "Germany", "Australia", "Japan", "Sri Lanka"].map((c) => (
                              <option key={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                )}

                {step === 1 && (
                  <fieldset>
                    <legend className="mb-4 text-lg font-semibold">Delivery method</legend>
                    <div className="space-y-3">
                      {deliveryOptions.map((d) => (
                        <label
                          key={d.id}
                          className={cn(
                            "flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition",
                            delivery === d.id ? "border-fg bg-card shadow-sm" : "border-line hover:border-fg/30",
                          )}
                        >
                          <input type="radio" name="delivery" value={d.id} checked={delivery === d.id} onChange={() => setDelivery(d.id)} className="size-4 accent-violet-600" />
                          <span className="flex-1">
                            <span className="block font-medium">{d.label}</span>
                            <span className="block text-sm text-muted">{d.eta}</span>
                          </span>
                          <span className="font-medium">
                            {d.extra === 0 ? (totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)) : `+${formatPrice(d.extra)}`}
                          </span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-8 rounded-2xl bg-subtle p-5 text-sm">
                      <p className="font-medium">Shipping to</p>
                      <p className="mt-1 text-muted">
                        {form.firstName} {form.lastName}, {form.address}, {form.city} {form.postal}, {form.country}
                      </p>
                    </div>
                  </fieldset>
                )}

                {step === 2 && (
                  <fieldset>
                    <legend className="mb-4 text-lg font-semibold">Payment</legend>
                    <div className="grid grid-cols-3 gap-3">
                      {([
                        ["card", "Card"],
                        ["paypal", "PayPal"],
                        ["applepay", "Apple Pay"],
                      ] as const).map(([id, label]) => (
                        <button
                          key={id}
                          type="button"
                          aria-pressed={payment === id}
                          onClick={() => setPayment(id)}
                          className={cn(
                            "flex h-14 items-center justify-center gap-2 rounded-2xl border text-sm font-medium transition",
                            payment === id ? "border-fg bg-card shadow-sm" : "border-line hover:border-fg/30",
                          )}
                        >
                          {id === "card" && <CreditCard className="size-4" />} {label}
                        </button>
                      ))}
                    </div>

                    {payment === "card" ? (
                      <div className="mt-6 space-y-4">
                        <CardPreview name={form.cardName} number={form.cardNumber} expiry={form.expiry} />
                        <Field label="Name on card" name="cardName" autoComplete="cc-name" value={form.cardName} error={errors.cardName} onChange={set} />
                        <Field
                          label="Card number"
                          name="cardNumber"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          placeholder="4242 4242 4242 4242"
                          value={form.cardNumber}
                          error={errors.cardNumber}
                          onChange={(k, v) => set(k, v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 "))}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Field
                            label="Expiry"
                            name="expiry"
                            inputMode="numeric"
                            autoComplete="cc-exp"
                            placeholder="MM/YY"
                            value={form.expiry}
                            error={errors.expiry}
                            onChange={(k, v) => {
                              const d = v.replace(/\D/g, "").slice(0, 4);
                              set(k, d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
                            }}
                          />
                          <Field
                            label="CVC"
                            name="cvc"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            placeholder="123"
                            value={form.cvc}
                            error={errors.cvc}
                            onChange={(k, v) => set(k, v.replace(/\D/g, "").slice(0, 4))}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="mt-6 rounded-2xl bg-subtle p-6 text-center text-sm text-muted">
                        You&apos;ll be redirected to {payment === "paypal" ? "PayPal" : "Apple Pay"} to complete your purchase securely.
                      </p>
                    )}
                    <p className="mt-6 flex items-center gap-2 text-xs text-muted">
                      <Lock className="size-3.5" /> This is a demo store — no real payment will be taken.
                    </p>
                  </fieldset>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between gap-4">
              {step > 0 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-fg">
                  <ArrowLeft className="size-4" /> Back
                </button>
              ) : (
                <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-fg">
                  <ArrowLeft className="size-4" /> Return to bag
                </Link>
              )}
              <button
                type="submit"
                disabled={placing}
                className="inline-flex h-13 min-w-48 items-center justify-center gap-2 rounded-full bg-fg px-8 py-3.5 font-medium text-bg transition hover:opacity-90 disabled:opacity-70"
              >
                {placing ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Processing…
                  </>
                ) : step === steps.length - 1 ? (
                  <>
                    <Lock className="size-4" /> Pay {formatPrice(grandTotal)}
                  </>
                ) : (
                  `Continue to ${steps[step + 1].toLowerCase()}`
                )}
              </button>
            </div>
          </form>
        </div>

        <aside className="h-fit rounded-[2rem] border border-line bg-card p-8 lg:sticky lg:top-28">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <ul className="mt-6 max-h-72 space-y-4 overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.key} className="flex items-center gap-4">
                <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-subtle">
                  <ProductImage src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                  <span className="absolute top-1 right-1 grid size-5 place-items-center rounded-full bg-fg text-[10px] font-semibold text-bg">
                    {item.quantity}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{item.name}</span>
                  <span className="block text-xs text-muted">{[item.color, item.size].filter(Boolean).join(" · ")}</span>
                </span>
                <span className="text-sm font-medium tabular-nums">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="my-6 border-t border-line pt-6">
            <PromoField />
          </div>
          <dl className="space-y-2.5 text-sm">
            <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
            {totals.discount > 0 && <Row label={`Discount (${promo})`} value={`−${formatPrice(totals.discount)}`} />}
            <Row
              label="Shipping"
              value={totals.shipping + deliveryExtra === 0 ? "Free" : formatPrice(totals.shipping + deliveryExtra)}
            />
            <Row label="Tax" value={formatPrice(totals.tax)} />
            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <dt className="font-medium">Total</dt>
              <dd className="text-2xl font-semibold tabular-nums">{formatPrice(grandTotal)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  ...props
}: {
  label: string;
  name: keyof Form;
  value: string;
  error?: string;
  onChange: (name: keyof Form, value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "name" | "value">) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-12 w-full rounded-2xl border bg-card px-4 outline-none transition placeholder:text-muted/60 focus:ring-4",
          error ? "border-rose-500 focus:ring-rose-500/10" : "border-line focus:border-fg/40 focus:ring-violet-500/10",
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
}

function CardPreview({ name, number, expiry }: { name: string; number: string; expiry: string }) {
  return (
    <div className="relative aspect-[1.6/1] max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-violet-900 to-fuchsia-800 p-6 text-white shadow-2xl">
      <div className="absolute -top-10 -right-10 size-40 rounded-full bg-pink-500/40 blur-3xl" />
      <div className="absolute -bottom-16 -left-10 size-48 rounded-full bg-violet-400/30 blur-3xl" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="h-8 w-11 rounded-md bg-gradient-to-br from-amber-200 to-amber-500" />
          <span className="font-display text-xl italic">Aurora</span>
        </div>
        <p className="font-mono text-xl tracking-widest">{number || "•••• •••• •••• ••••"}</p>
        <div className="flex justify-between text-xs uppercase">
          <span className="truncate">{name || "Your name"}</span>
          <span>{expiry || "MM/YY"}</span>
        </div>
      </div>
    </div>
  );
}
