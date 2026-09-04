"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { films, filmFilters, type Film } from "@/data/content";
import { toEmbedUrl } from "@/lib/video";
import { Eyebrow, Reveal, RevealGroup, fadeUp } from "@/components/ui/Reveal";

/**
 * YouTube's own thumbnail CDN, so a film needs no poster image of its own.
 * `maxresdefault` is the 1280x720 version and is what pro uploads have, but it
 * genuinely 404s on some videos — the card falls back to `hqdefault`, which
 * always exists.
 */
const poster = (id: string, max = true) =>
  `https://i.ytimg.com/vi/${id}/${max ? "maxresdefault" : "hqdefault"}.jpg`;

function FilmCard({ film, onPlay }: { film: Film; onPlay: (f: Film) => void }) {
  const [maxRes, setMaxRes] = useState(true);

  return (
    <motion.button
      layout
      variants={fadeUp}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onPlay(film)}
      className="group block w-full text-left"
      aria-label={`Watch ${film.title}`}
    >
      <div className="relative aspect-video overflow-hidden rounded-sm bg-paper-deep">
        <Image
          src={poster(film.youtubeId, maxRes)}
          alt={film.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          onError={() => setMaxRes(false)}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ink/10 transition-colors duration-500 group-hover:bg-ink/30" />

        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-paper/70 bg-ink/25 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-ink/50">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-paper" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </div>

      <p className="mt-4 text-[0.6rem] uppercase tracking-[0.25em] text-sage">
        {film.category}
      </p>
      <h3 className="mt-1.5 font-display text-xl leading-snug text-ink">
        {film.title}
      </h3>
    </motion.button>
  );
}

export default function OurWork() {
  const [filter, setFilter] = useState<(typeof filmFilters)[number]>("All");
  const [playing, setPlaying] = useState<Film | null>(null);

  const shown = useMemo(
    () => (filter === "All" ? films : films.filter((f) => f.category === filter)),
    [filter],
  );

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
    <section id="work" className="relative bg-paper-alt py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealGroup className="max-w-3xl">
          <Eyebrow>Our Work</Eyebrow>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-balance text-ink"
          >
            Selected films
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-ink-soft">
            Teasers, wedding highlights, and reels — shot, cut, graded, and scored
            in house.
          </motion.p>
        </RevealGroup>

        <Reveal className="mt-10">
          <div className="flex flex-wrap gap-2.5">
            {filmFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`relative rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
                  filter === f
                    ? "border-ink text-paper"
                    : "border-line text-ink-soft hover:border-sage hover:text-ink"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="work-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          layout
          className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {shown.map((film) => (
              <FilmCard key={film.youtubeId} film={film} onPlay={setPlaying} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setPlaying(null)}
            /* Near-solid dark ground so the film reads; pinned high on phones
               because a 16:9 player is only ~a fifth of a portrait screen. */
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-forest-900/97 pt-20 backdrop-blur-sm sm:items-center sm:p-8 sm:pt-8"
            role="dialog"
            aria-modal="true"
            aria-label={playing.title}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-5xl"
            >
              <div className="aspect-video w-full overflow-hidden bg-black sm:rounded-sm">
                <iframe
                  src={`${toEmbedUrl(playing.youtubeId)}&autoplay=1`}
                  title={playing.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>

              <div className="px-6 pt-6 sm:px-0 sm:pt-5">
                <p className="text-[0.65rem] uppercase tracking-[0.25em] text-sage-light">
                  {playing.category}
                </p>
                <h3 className="mt-2 font-display text-2xl text-paper sm:text-3xl">
                  {playing.title}
                </h3>
              </div>
            </motion.div>

            <button
              onClick={() => setPlaying(null)}
              className="fixed right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-forest-900/70 text-3xl leading-none text-paper backdrop-blur-sm transition-opacity hover:opacity-60 sm:absolute sm:right-5 sm:top-5 sm:bg-transparent"
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
