import { Sparkle } from "lucide-react";

const words = [
  "Free express shipping",
  "30-day returns",
  "Carbon-neutral delivery",
  "Lifetime repairs",
  "Independent makers",
  "2-year warranty",
];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="relative flex overflow-hidden border-y border-line bg-card py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused]">
        {row.concat(row).map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl whitespace-nowrap italic sm:text-3xl">
            {w}
            <Sparkle className="size-5 text-violet-500" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
