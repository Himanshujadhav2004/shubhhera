"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { films, type Film } from "@/data/content";
import { toEmbedUrl } from "@/lib/video";
import { Eyebrow, RevealGroup, fadeUp } from "@/components/ui/Reveal";

function FilmRow({
  film,
  index,
  onPlay,
}: {
  film: Film;
  index: number;
  onPlay: (f: Film) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const flipped = index % 2 === 1;
  const playable = film.embedUrl.length > 0;

  return (
    <div
      ref={ref}
      className="grid items-center gap-10 border-t border-cream/10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={flipped ? "lg:order-2" : ""}
      >
        <button
          onClick={() => playable && onPlay(film)}
          disabled={!playable}
          className="group relative block w-full overflow-hidden rounded-sm disabled:cursor-default"
          aria-label={playable ? `Watch ${film.title} — ${film.couple}` : film.title}
        >
          <div className="relative aspect-16/10 overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-[-8%]">
              <Image
                src={film.poster}
                alt={`${film.title} — ${film.couple}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </motion.div>
            <div className="absolute inset-0 bg-forest-900/25 transition-colors duration-500 group-hover:bg-forest-900/45" />

            {playable && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-cream/60 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-cream/15">
                  <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-cream" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            )}
          </div>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className={flipped ? "lg:order-1" : ""}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-sage-light">{film.meta}</p>
        <h3 className="mt-5 font-display text-[clamp(1.75rem,4vw,3rem)] leading-tight text-cream">
          {film.couple}
        </h3>
        <p className="mt-2 font-script text-2xl text-sage-light">{film.title}</p>
        <p className="mt-6 max-w-md leading-relaxed text-cream-dim">{film.description}</p>

        {playable ? (
          <button
            onClick={() => onPlay(film)}
            className="group mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-cream"
          >
            Watch Film
            <span className="relative block h-px w-12 bg-cream/40">
              <span className="absolute inset-y-0 left-0 w-0 bg-cream transition-all duration-500 group-hover:w-full" />
            </span>
          </button>
        ) : (
          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-cream-dim/50">
            Film coming soon
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default function OurWork() {
  const [playing, setPlaying] = useState<Film | null>(null);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPlaying(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [playing]);

  return (
    <section id="work" className="relative bg-forest-800 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealGroup className="max-w-3xl">
          <Eyebrow>Our Work</Eyebrow>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-balance text-cream"
          >
            Selected films
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-cream-dim">
            A few of the stories we&rsquo;ve been trusted with — shot, cut, graded, and
            scored in house.
          </motion.p>
        </RevealGroup>

        <div className="mt-16">
          {films.map((film, i) => (
            <FilmRow key={film.title} film={film} index={i} onPlay={setPlaying} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setPlaying(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-900/95 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${playing.title} — ${playing.couple}`}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="aspect-video w-full max-w-5xl overflow-hidden rounded-sm bg-black"
            >
              <iframe
                src={toEmbedUrl(playing.embedUrl)}
                title={`${playing.title} — ${playing.couple}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </motion.div>
            <button
              onClick={() => setPlaying(null)}
              className="absolute right-5 top-5 text-3xl leading-none text-cream transition-opacity hover:opacity-60"
              aria-label="Close video"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
