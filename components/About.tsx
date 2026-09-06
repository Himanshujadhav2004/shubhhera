"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { about } from "@/data/content";
import { Eyebrow, Reveal, RevealGroup, fadeUp } from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="about" className="relative bg-paper py-28 sm:py-36">
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

        {/* Who we are — copy paired with a still so the section is not a wall of text. */}
        <div className="mt-24 grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <p className="font-script text-3xl text-sage">Who we are</p>
            <div className="mt-6 space-y-6">
              {about.whoWeAre.map((para) => (
                <p key={para} className="leading-relaxed text-ink-soft">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grain relative aspect-4/5 overflow-hidden rounded-sm"
            >
              <Image
                src="/media/wedding/wedding-06.jpg"
                alt="Behind the scenes on a Stories by Shubhh.era wedding shoot"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-ink/10" />
            </motion.div>
          </Reveal>
        </div>

        {/* Our approach */}
        <div className="mt-28">
          <Reveal>
            <p className="font-script text-3xl text-sage">Our approach</p>
          </Reveal>

          <RevealGroup
            className="mt-10 grid gap-px overflow-hidden rounded-sm bg-ink/5 sm:grid-cols-2 lg:grid-cols-3"
            staggerChildren={0.07}
          >
            {about.approach.map((title, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="group relative bg-paper p-8 transition-colors duration-500 hover:bg-paper-deep"
              >
                <span className="font-display text-sm text-sage/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-2xl text-ink">{title}</h3>
                <span className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-sage transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </RevealGroup>
        </div>

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
