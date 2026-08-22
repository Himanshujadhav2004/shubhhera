"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { navLinks, site } from "@/data/content";
import SocialIcon from "@/components/ui/SocialIcon";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setShowTop(y > 700));

  return (
    <>
      <footer className="grain relative border-t border-line bg-paper py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="font-display text-2xl tracking-[0.2em] text-ink">
                {site.wordmark.primary}
              </p>
              <p className="mt-1.5 text-[0.6rem] tracking-[0.4em] text-sage">
                {site.wordmark.secondary}
              </p>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-soft">
                {site.tagline}
              </p>
            </div>

            <nav aria-label="Footer">
              <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3 lg:grid-cols-2">
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-sage">Follow</p>
              <div className="mt-4 flex gap-3">
                {site.socials.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-300 hover:border-ink hover:text-ink"
                  >
                    <SocialIcon name={label} className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <a
                href={`mailto:${site.email}`}
                className="mt-6 block text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {site.email}
              </a>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <p>Wedding cinematography · Photo &amp; video editing</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            aria-label="Back to top"
            className="fixed bottom-7 right-7 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper/90 text-ink backdrop-blur-sm transition-colors hover:border-sage-light hover:bg-sage/15"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
              <path
                d="M12 19V5M5 12l7-7 7 7"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
