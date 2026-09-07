"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { testimonials } from "@/data/content";
import { Eyebrow, RevealGroup, fadeUp } from "@/components/ui/Reveal";

const AUTOPLAY_MS = 7000;

export default function Testimonials() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: 1 | -1) => {
    setState(([i]) => [(i + dir + testimonials.length) % testimonials.length, dir]);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, go, index]);

  const active = testimonials[index];

  return (
    <section
      className="relative bg-paper py-28 sm:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <RevealGroup>
          <Eyebrow>Kind Words</Eyebrow>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-tight text-ink"
          >
            What our couples say
          </motion.h2>
        </RevealGroup>

        <div className="relative mt-14 min-h-72 sm:min-h-64">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 48 : -48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -48 : 48 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              /* Swipe on touch: past ~80px of travel counts as a page turn. */
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                else if (info.offset.x > 80) go(-1);
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <div
                className="flex justify-center gap-1.5 text-sage"
                aria-label={`${active.rating} out of 5 stars`}
              >
                {Array.from({ length: active.rating }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                    <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
                  </svg>
                ))}
              </div>

              <p className="mt-8 font-display text-[clamp(1.25rem,2.6vw,1.9rem)] leading-relaxed text-balance text-ink">
                &ldquo;{active.quote}&rdquo;
              </p>

              <footer className="mt-8">
                <p className="text-sm uppercase tracking-[0.22em] text-ink">
                  {active.name}
                </p>
                <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-sage">
                  {active.detail}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setState([i, i > index ? 1 : -1])}
              aria-label={`Show testimonial from ${t.name}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                i === index ? "w-8 bg-ink" : "w-1.5 bg-line hover:bg-sage"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
