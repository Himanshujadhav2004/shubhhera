"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/data/content";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The still drifts slower than the copy, which reads as depth on scroll.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="grain relative flex h-svh min-h-[640px] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10 scale-110">
        <Image
          src="/media/wedding/wedding-09.jpg"
          alt="Cinematic wedding still by Stories by Shubhh.era"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dual wash: a vertical fade for type legibility, plus a green cast so
            the photography sits inside the brand rather than beside it. Kept
            light enough that the photograph still reads as a photograph. */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/70 via-forest-900/45 to-forest-900" />
        <div className="absolute inset-0 bg-forest-800/25 mix-blend-color" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-script text-2xl text-sage-light sm:text-3xl"
        >
          Every story deserves
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-display text-[clamp(2.75rem,9vw,7rem)] leading-[0.95] tracking-[0.06em] text-cream"
        >
          {site.wordmark.primary}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-4 text-[0.65rem] tracking-[0.5em] text-cream-dim sm:text-xs"
        >
          {site.wordmark.secondary}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mx-auto mt-10 max-w-xl text-balance text-base leading-relaxed text-cream-dim sm:text-lg"
        >
          {site.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-4 text-sm text-cream-dim/70"
        >
          3+ years of wedding cinematography and post-production
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="w-full rounded-full bg-cream px-9 py-4 text-xs uppercase tracking-[0.25em] text-forest-900 sm:w-auto"
          >
            View Our Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="w-full rounded-full border border-cream/40 px-9 py-4 text-xs uppercase tracking-[0.25em] text-cream transition-colors hover:bg-cream/10 sm:w-auto"
          >
            Book a Consultation
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-label="Scroll to About"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-cream-dim/70">
          Scroll
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-cream/20">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-1/2 bg-sage-light"
          />
        </span>
      </motion.a>
    </section>
  );
}
