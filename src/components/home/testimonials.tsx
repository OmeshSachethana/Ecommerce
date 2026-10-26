import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { Rating } from "@/components/rating";

const testimonials = [
  { name: "Amelia Chen", role: "Interior designer", quote: "Aurora has replaced three stores for me. Every piece feels considered — and the Lune chair is the best thing in my studio.", initials: "AC", tone: "from-violet-500 to-fuchsia-500" },
  { name: "Daniel Okafor", role: "Product engineer", quote: "Ordered on Tuesday, wearing the Nova Runners on Thursday. The packaging alone is worth it. Unreal experience.", initials: "DO", tone: "from-amber-400 to-rose-500" },
  { name: "Sofia Marín", role: "Photographer", quote: "The Aurora ANC headphones are ridiculous. Better than brands twice the price. Customer support was lovely too.", initials: "SM", tone: "from-sky-400 to-indigo-500" },
  { name: "Lukas Weber", role: "Architect", quote: "Finally a store that values durability. My Voyager backpack has been through four countries and still looks new.", initials: "LW", tone: "from-emerald-400 to-teal-500" },
  { name: "Hana Sato", role: "Writer", quote: "The merino sweater is so soft I bought it in every colour. The returns process was effortless when I sized up.", initials: "HS", tone: "from-pink-400 to-orange-400" },
  { name: "Marcus Hill", role: "Music producer", quote: "Two Orbit speakers in stereo filled my loft. Setup took a minute. The design gets compliments from every guest.", initials: "MH", tone: "from-lime-400 to-cyan-500" },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Reviews" title={<>Words from our <em>community</em></>} />
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="mb-4 break-inside-avoid rounded-[2rem] border border-line bg-card p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
            <Quote className="size-6 text-violet-500/60" />
            <Rating value={5} className="mt-4" />
            <blockquote className="mt-3 leading-relaxed">“{t.quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className={`grid size-10 place-items-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ${t.tone}`}>{t.initials}</span>
              <span>
                <span className="block text-sm font-semibold">{t.name}</span>
                <span className="block text-xs text-muted">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
