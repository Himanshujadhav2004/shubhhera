"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { team } from "@/data/content";
import { RevealGroup, fadeUp } from "@/components/ui/Reveal";

export default function Team() {
  return (
    <section id="team" className="relative bg-paper py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealGroup className="max-w-3xl">
          <motion.p variants={fadeUp} className="font-script text-3xl text-sage">
            Meet
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-2 font-display text-[clamp(2.25rem,7vw,5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-ink"
          >
            The Team
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 font-script text-2xl text-sage">
            that started it all
          </motion.p>
        </RevealGroup>

        <RevealGroup
          className="mt-16 grid gap-10 sm:grid-cols-2 lg:gap-16"
          staggerChildren={0.12}
        >
          {team.map((member) => (
            <motion.article key={member.name} variants={fadeUp} className="group">
              <div className="grain relative aspect-4/5 overflow-hidden rounded-sm">
                <Image
                  src={member.photo}
                  alt={`${member.name} — ${member.role}`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  /* The source headshots are already black and white, so the
                     hover lift here is scale plus a lifting scrim, not colour. */
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/25 transition-opacity duration-500 group-hover:opacity-0" />
              </div>
              <p className="mt-6 font-script text-xl text-sage">Introducing</p>
              <h3 className="mt-1 font-display text-3xl text-ink">{member.name}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-sage">
                {member.role}
              </p>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
                {member.bio}
              </p>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
