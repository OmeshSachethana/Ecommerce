import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  href,
  cta,
}: {
  eyebrow: string;
  title: React.ReactNode;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="text-sm font-medium tracking-widest text-violet-600 uppercase dark:text-violet-400">{eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="group inline-flex items-center gap-1 text-sm font-medium">
          {cta}
          <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  );
}
