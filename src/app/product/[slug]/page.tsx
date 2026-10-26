import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductCard } from "@/components/product-card";
import { BuyBox } from "@/components/product/buy-box";
import { Gallery } from "@/components/product/gallery";
import { Rating } from "@/components/rating";
import { getCategory, getProduct, getRelated, products, reviews } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.images[0]] },
  };
}

export default function ProductPage({ params }: PageProps<"/product/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: { params: PageProps<"/product/[slug]">["params"] }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = getRelated(product);
  const distribution = [72, 18, 6, 3, 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" className="hover:text-fg">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/shop" className="hover:text-fg">Shop</Link></li>
          <li aria-hidden>/</li>
          <li><Link href={`/shop?category=${product.category}`} className="hover:text-fg">{category?.name}</Link></li>
          <li aria-hidden>/</li>
          <li className="text-fg" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
        <Gallery images={product.images} name={product.name} />
        <BuyBox product={product} />
      </div>

      <section id="reviews" className="mt-32 scroll-mt-24">
        <h2 className="font-display text-4xl tracking-tight sm:text-5xl">Customer reviews</h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-[320px_1fr]">
          <div className="rounded-[2rem] border border-line bg-card p-8">
            <p className="text-6xl font-semibold tracking-tight">{product.rating}</p>
            <Rating value={product.rating} className="mt-3" />
            <p className="mt-2 text-sm text-muted">Based on {product.reviewCount.toLocaleString("en-US")} reviews</p>
            <div className="mt-6 space-y-2">
              {distribution.map((pct, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-3 text-muted">{5 - i}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-subtle">
                    <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-9 text-right text-muted tabular-nums">{pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <ul className="divide-y divide-line">
            {reviews.map((r) => (
              <li key={r.author} className="py-6 first:pt-0">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-sm font-semibold text-white">
                      {r.author[0]}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{r.author}</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">Verified buyer</p>
                    </div>
                  </div>
                  <time dateTime={r.date} className="text-xs text-muted">
                    {new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}
                  </time>
                </div>
                <Rating value={r.rating} className="mt-4" />
                <p className="mt-2 font-medium">{r.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-32">
        <h2 className="mb-10 font-display text-4xl tracking-tight sm:text-5xl">
          You may also <em>like</em>
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-20 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:px-8">
      <div className="aspect-[4/5] animate-pulse rounded-[2rem] bg-subtle" />
      <div className="space-y-4">
        <div className="h-4 w-24 animate-pulse rounded bg-subtle" />
        <div className="h-14 w-3/4 animate-pulse rounded-2xl bg-subtle" />
        <div className="h-8 w-32 animate-pulse rounded-xl bg-subtle" />
        <div className="h-24 animate-pulse rounded-2xl bg-subtle" />
        <div className="h-12 animate-pulse rounded-full bg-subtle" />
      </div>
    </div>
  );
}
