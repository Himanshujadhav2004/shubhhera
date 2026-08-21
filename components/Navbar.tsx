"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { navLinks, site } from "@/data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  /**
   * Highlight whichever section the reader is currently in.
   *
   * Deliberately scroll-position based rather than IntersectionObserver: the
   * observer leaves the last section latched while the hero is on screen (no
   * section intersects up there), so the underline would sit under a link the
   * reader has not reached. Comparing offsets each frame stays correct at the
   * top of the page, at the bottom, and during anchor jumps.
   */
  useMotionValueEvent(scrollY, "change", (y) => {
    const probe = y + window.innerHeight * 0.3;
    let current = "";

    for (const { href } of navLinks) {
      const el = document.querySelector(href);
      if (el instanceof HTMLElement && el.offsetTop <= probe) current = href;
    }

    // Bottom of the page can't reach the last section's offsetTop on short
    // sections, so claim it explicitly once we're against the end.
    if (y + window.innerHeight >= document.body.scrollHeight - 2) {
      current = navLinks[navLinks.length - 1].href;
    }

    setActive(current);
  });

  // A full-screen menu that scrolls the page behind it feels broken.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-forest-900/85 backdrop-blur-md border-b border-cream/10"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a
            href="#top"
            className="group flex flex-col leading-none"
            aria-label={`${site.name} — back to top`}
          >
            <span className="font-display text-xl tracking-[0.2em] text-cream sm:text-2xl">
              {site.wordmark.primary}
            </span>
            <span className="mt-1 text-[0.55rem] tracking-[0.4em] text-sage-light transition-colors group-hover:text-cream sm:text-[0.6rem]">
              {site.wordmark.secondary}
            </span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="relative py-1 text-sm text-cream-dim transition-colors hover:text-cream"
                >
                  {label}
                  {active === href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-sage-light"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden rounded-full border border-sage-light/60 px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:border-sage-light hover:bg-sage/25 lg:block"
          >
            Book Now
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block h-px w-7 bg-cream"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-7 bg-cream"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block h-px w-7 bg-cream"
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grain fixed inset-0 z-40 flex flex-col justify-center bg-forest-900 px-8 lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
              }}
              className="relative z-10 space-y-6"
            >
              {navLinks.map(({ label, href }) => (
                <motion.li
                  key={href}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                >
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl text-cream transition-colors hover:text-sage-light sm:text-5xl"
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
              className="relative z-10 mt-14 flex gap-6 text-sm text-cream-dim"
            >
              {site.socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
