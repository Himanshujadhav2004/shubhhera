"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Shared scroll-reveal vocabulary. Keeping these in one place is what makes
 * the page feel like a single object rather than ten sections that each
 * animate slightly differently.
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

/** Parent that walks its children in one after another. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Fraction of the element that must be visible before it plays. */
  amount?: number;
  as?: "div" | "section" | "li" | "article" | "span";
};

/** Single-element fade-up on scroll. */
export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.25,
  as = "div",
}: RevealProps) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Wrapper that staggers its children. Children must be `motion` elements
 * using the `fadeUp` variants for the stagger to reach them.
 */
export function RevealGroup({
  children,
  className,
  staggerChildren = 0.08,
  delayChildren = 0,
  amount = 0.2,
  as = "div",
}: RevealProps & { staggerChildren?: number; delayChildren?: number }) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={stagger(staggerChildren, delayChildren)}
    >
      {children}
    </Tag>
  );
}

/** Small wide-tracked label that sits above every section heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <motion.p
      variants={fadeUp}
      className="mb-5 text-xs uppercase tracking-[0.35em] text-sage"
    >
      {children}
    </motion.p>
  );
}
