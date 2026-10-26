import Link from "next/link";
import { categories } from "@/lib/products";

const columns = [
  {
    title: "Shop",
    links: categories.map((c) => ({ label: c.name, href: `/shop?category=${c.id}` })),
  },
  {
    title: "Support",
    links: [
      { label: "Shipping & delivery", href: "/shop" },
      { label: "30-day returns", href: "/shop" },
      { label: "Warranty", href: "/shop" },
      { label: "Contact us", href: "/shop" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "/" },
      { label: "Sustainability", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Press", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-card">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div>
          <p className="font-display text-4xl">Aurora</p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Objects for modern living. Thoughtfully designed, responsibly made and built to last.
          </p>
          <div className="mt-6 flex gap-2 text-xs text-muted">
            {["Visa", "Mastercard", "Amex", "Apple Pay", "PayPal"].map((p) => (
              <span key={p} className="rounded-md border border-line px-2 py-1">
                {p}
              </span>
            ))}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted transition hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 Aurora Goods, Inc. All rights reserved.</p>
          <p>Crafted with Next.js 16, React 19 &amp; Tailwind CSS 4</p>
        </div>
      </div>
    </footer>
  );
}
