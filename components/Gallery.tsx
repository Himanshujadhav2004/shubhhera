"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { gallery, galleryFilters, type GalleryItem } from "@/data/content";
import { Eyebrow, Reveal, RevealGroup, fadeUp } from "@/components/ui/Reveal";

export default function Gallery() {
  const [filter, setFilter] = useState<(typeof galleryFilters)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "All" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter],
  );

  const close = useCallback(() => setLightboxIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightboxIndex((i) =>
        i === null ? i : (i + dir + items.length) % items.length,
      ),
    [items.length],
  );

  // Keyboard control is the difference between a lightbox and a lightbox trap.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, step]);

  const openItem: GalleryItem | null =
    lightboxIndex === null ? null : items[lightboxIndex];

  return (
    <section id="gallery" className="relative bg-paper py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealGroup className="max-w-3xl">
          <Eyebrow>Gallery</Eyebrow>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-balance text-ink"
          >
            Stills from the stories we&rsquo;ve told
          </motion.h2>
        </RevealGroup>

        <Reveal className="mt-10">
          <div className="flex flex-wrap gap-2.5">
            {galleryFilters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setLightboxIndex(null);
                }}
                aria-pressed={filter === f}
                className={`relative rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
                  filter === f
                    ? "border-ink text-paper"
                    : "border-line text-ink-soft hover:border-sage hover:text-ink"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="gallery-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Masonry via CSS columns; `layout` keeps items fluid as filters change. */}
        <motion.div layout className="mt-12 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.button
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                  layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                }}
                onClick={() => setLightboxIndex(i)}
                className="group relative block w-full break-inside-avoid overflow-hidden rounded-sm"
                aria-label={`Open ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.orientation === "portrait" ? 800 : 1200}
                  height={item.orientation === "portrait" ? 1200 : 800}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 translate-y-3 text-[0.6rem] uppercase tracking-[0.25em] text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.category}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {openItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={openItem.alt}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-full w-full max-w-4xl"
            >
              <Image
                src={openItem.src}
                alt={openItem.alt}
                width={1600}
                height={1600}
                sizes="90vw"
                className="max-h-[82vh] w-full rounded-sm object-contain"
              />
              <p className="mt-4 text-center text-xs uppercase tracking-[0.25em] text-paper/70">
                {openItem.category} · {(lightboxIndex ?? 0) + 1} / {items.length}
              </p>
            </motion.div>

            <button
              onClick={close}
              className="absolute right-5 top-5 text-3xl leading-none text-paper transition-opacity hover:opacity-60"
              aria-label="Close"
            >
              &times;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-4 text-3xl text-paper transition-opacity hover:opacity-60 sm:left-6"
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-4 text-3xl text-paper transition-opacity hover:opacity-60 sm:right-6"
              aria-label="Next image"
            >
              &#8250;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
