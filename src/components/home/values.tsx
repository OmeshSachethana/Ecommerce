import { Leaf, RefreshCcw, ShieldCheck, Truck } from "lucide-react";

const values = [
  { icon: Truck, title: "Express delivery", body: "Free 48h shipping on orders over $150, tracked door to door." },
  { icon: RefreshCcw, title: "30-day returns", body: "Changed your mind? Return anything within 30 days, free." },
  { icon: ShieldCheck, title: "2-year warranty", body: "Every product is covered. Lifetime repairs on leather goods." },
  { icon: Leaf, title: "Carbon neutral", body: "We offset every shipment and use 100% recycled packaging." },
];

export function Values() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ icon: Icon, title, body }) => (
          <div key={title} className="group bg-card p-8 transition hover:bg-subtle">
            <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/15 to-pink-500/15 text-violet-600 transition group-hover:scale-110 dark:text-violet-300">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-5 font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
