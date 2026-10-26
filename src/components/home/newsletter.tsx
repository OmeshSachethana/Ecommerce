"use client";

import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 px-6 py-20 text-center text-white sm:px-16">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
        <div className="relative">
          <h2 className="font-display text-5xl leading-none sm:text-6xl">
            Get <em>20% off</em> your first order
          </h2>
          <p className="mx-auto mt-5 max-w-md text-white/80">
            Join 80,000 subscribers for early access to drops, maker stories and members-only offers.
          </p>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.p
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto mt-10 inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3.5 font-medium backdrop-blur"
              >
                <Check className="size-4" /> You&apos;re in! Use code <span className="font-mono">WELCOME20</span> at checkout.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -8 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
                className="mx-auto mt-10 flex max-w-md gap-2 rounded-full bg-white/15 p-1.5 backdrop-blur"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 bg-transparent px-4 text-white outline-none placeholder:text-white/60"
                />
                <button type="submit" className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
                  Subscribe <ArrowRight className="size-4" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
