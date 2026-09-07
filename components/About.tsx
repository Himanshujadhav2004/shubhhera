"use client";

import { motion } from "motion/react";
import { about } from "@/data/content";
import { Eyebrow, Reveal, RevealGroup, fadeUp } from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="about" className="relative bg-paper-alt py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealGroup className="max-w-3xl">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-balance text-ink"
          >
            {about.heading}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-8 text-lg leading-relaxed text-ink-soft"
          >
            {about.intro}
          </motion.p>
        </RevealGroup>

        {/* Why choose us — checkmarks draw themselves in as the list staggers. */}
        <div className="mt-28 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="font-script text-3xl text-sage">Why choose us</p>
            <h3 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl">
              The reasons couples keep sending us their friends.
            </h3>
          </Reveal>

          <RevealGroup as="div" staggerChildren={0.1}>
            <ul className="space-y-5">
              {about.whyChooseUs.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex items-start gap-4 border-b border-line pb-5"
                >
                  <motion.svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="mt-0.5 h-5 w-5 shrink-0 text-sage"
                  >
                    <motion.path
                      d="M4 12.5l5 5L20 6.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: {
                          pathLength: 1,
                          opacity: 1,
                          transition: { duration: 0.5, ease: "easeOut" },
                        },
                      }}
                    />
                  </motion.svg>
                  <span className="leading-relaxed text-ink-soft">{item}</span>
                </motion.li>
              ))}
            </ul>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
