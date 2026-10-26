import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/home/section-heading";
import { ProductImage } from "@/components/product-image";
import { categories, products } from "@/lib/products";
import { cn } from "@/lib/utils";

const spans = [
  "md:col-span-2 md:row-span-2",
  "",
  "",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
];

export function CategoryBento() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Categories" title={<>Shop by <em>world</em></>} href="/shop" cta="Browse everything" />
      <div className="grid auto-rows-[240px] grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((c, i) => {
          const count = products.filter((p) => p.category === c.id).length;
          return (
            <Link
              key={c.id}
              href={`/shop?category=${c.id}`}
              className={cn("group relative overflow-hidden rounded-[2rem] bg-subtle", spans[i])}
            >
              <ProductImage
                src={c.image}
                alt={c.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 mix-blend-multiply transition duration-500 group-hover:opacity-100", c.hue)} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                <div>
                  <p className="text-xs tracking-widest text-white/70 uppercase">{count} products</p>
                  <h3 className={cn("font-display", i === 0 ? "text-5xl" : "text-3xl")}>{c.name}</h3>
                  <p className="mt-1 text-sm text-white/80">{c.tagline}</p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
