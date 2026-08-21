"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { editingApproach, serviceStrengths, services } from "@/data/content";
import { Eyebrow, Reveal, RevealGroup, fadeUp } from "@/components/ui/Reveal";

export default function Services() {
  const [activeId, setActiveId] = useState(services[0].id);
  const active = services.find((s) => s.id === activeId) ?? services[0];

  return (
    <section id="services" className="relative bg-forest-800 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealGroup className="max-w-3xl">
          <Eyebrow>Services</Eyebrow>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-balance text-cream"
          >
            From the first frame to the final grade
          </motion.h2>
        </RevealGroup>

        {/* Category tabs with a shared-layout pill that slides between them. */}
        <Reveal className="mt-12">
          <div
            role="tablist"
            aria-label="Service categories"
            className="inline-flex rounded-full border border-cream/15 p-1.5"
          >
            {services.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeId === cat.id}
                onClick={() => setActiveId(cat.id)}
                className={`relative rounded-full px-7 py-3 text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                  activeId === cat.id ? "text-forest-900" : "text-cream-dim hover:text-cream"
                }`}
              >
                {activeId === cat.id && (
                  <motion.span
                    layoutId="service-tab"
                    className="absolute inset-0 rounded-full bg-cream"
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mt-10 max-w-xl text-lg text-cream-dim">{active.blurb}</p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
              className="mt-10 grid gap-px overflow-hidden rounded-sm bg-cream/10 sm:grid-cols-2 lg:grid-cols-3"
            >
              {active.items.map((item, i) => (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.35 }}
                  className="group relative flex min-h-56 flex-col justify-between bg-forest-800 p-8 transition-colors duration-500 hover:bg-forest-700"
                >
                  <span className="font-display text-sm text-sage-light/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-6">
                    <h3 className="font-display text-2xl leading-snug text-cream">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                      {item.body}
                    </p>
                  </div>
                  <span className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-sage-light transition-transform duration-500 group-hover:scale-x-100" />
                </motion.article>
              ))}
            </motion.div>

            {/* Sub-list that only belongs to the photo/editing category. */}
            {active.id === "editing" && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-12 rounded-sm border border-cream/10 p-8 sm:p-10"
              >
                <p className="font-script text-2xl text-sage-light">
                  Our approach to editing
                </p>
                <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                  {editingApproach.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-3 text-sm text-cream-dim"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sage-light" />
                      {line}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Compact strengths strip — deliberately styled unlike the About list. */}
        <RevealGroup
          className="mt-20 flex flex-wrap items-center justify-center gap-x-3 gap-y-4 border-t border-cream/10 pt-12"
          staggerChildren={0.08}
        >
          {serviceStrengths.map((label, i) => (
            <motion.span key={label} variants={fadeUp} className="flex items-center gap-3">
              <span className="text-sm uppercase tracking-[0.18em] text-cream-dim">
                {label}
              </span>
              {i < serviceStrengths.length - 1 && (
                <span className="text-sage-light/40" aria-hidden>
                  ·
                </span>
              )}
            </motion.span>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
