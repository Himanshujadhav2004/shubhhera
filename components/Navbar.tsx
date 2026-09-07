"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { navLinks, site } from "@/data/content";
import SocialIcon from "@/components/ui/SocialIcon";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollY } = useScroll();

  /* Unscrolled, the bar floats over the hero film and needs light type; once
     it lands on the paper background it has to invert to dark. */
  const onDark = !scrolled;

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
        /*
          Frosted-glass bar. The iOS look isn't blur on its own — it's blur plus
          a saturation boost (colour behind the panel stays vivid instead of
          going grey), a light translucent tint, and a one-pixel specular
          highlight along the top edge. Blur is always on so the bar reads as
          glass over the hero film too, only the tint swaps with the theme.
        */
        /*
          Fully transparent over the hero — no blur, no tint, no border — so the
          film reads uninterrupted. The frosted glass materialises only once the
          page scrolls: blur plus a saturation boost (which keeps colour behind
          the panel vivid instead of grey), a light tint, and a specular top
          edge. backdrop-filter is named in the transition explicitly so the
          blur fades in rather than snapping on.
        */
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled
            ? "border-line/60 bg-paper/55 shadow-[0_8px_32px_-12px_rgba(27,36,24,0.18)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* Specular edge: catches light along the top like a glass bevel. */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70 transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          {/*
            Two renderings of the same wordmark stacked and cross-faded: the
            ink one is the base (and carries the alt text), the cream one fades
            in while the bar floats over the hero film. Swapping `src` instead
            would pop, since the incoming file decodes mid-transition.
          */}
          <a
            href="#top"
            className="relative block shrink-0"
            aria-label={`${site.name} — back to top`}
          >
            <Image
              src="/media/brand/wordmark-ink.png"
              alt={site.name}
              width={720}
              height={162}
              priority
              className="h-8 w-auto sm:h-10"
            />
            <Image
              src="/media/brand/wordmark-cream.png"
              alt=""
              aria-hidden
              width={720}
              height={162}
              priority
              className={`absolute inset-0 h-8 w-auto transition-opacity duration-500 sm:h-10 ${
                !open && onDark ? "opacity-100" : "opacity-0"
              }`}
            />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`relative py-1 text-sm transition-colors duration-500 ${
                    onDark
                      ? "text-cream-dim hover:text-cream"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {label}
                  {active === href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-sage"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className={`hidden rounded-full border px-6 py-2.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 lg:block ${
              onDark
                ? "border-cream/50 text-cream hover:border-cream hover:bg-cream/10"
                : "border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper"
            }`}
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
              className={`block h-px w-7 transition-colors duration-500 ${!open && onDark ? "bg-cream" : "bg-ink"}`}
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={`block h-px w-7 transition-colors duration-500 ${!open && onDark ? "bg-cream" : "bg-ink"}`}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`block h-px w-7 transition-colors duration-500 ${!open && onDark ? "bg-cream" : "bg-ink"}`}
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
            className="fixed inset-0 z-40 flex flex-col justify-center bg-paper px-8 lg:hidden"
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
                    className="font-display text-4xl text-ink transition-colors hover:text-sage sm:text-5xl"
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
              className="relative z-10 mt-14 flex gap-6 text-sm text-ink-soft"
            >
              {site.socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-300 hover:border-ink hover:text-ink"
                >
                  <SocialIcon name={label} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
