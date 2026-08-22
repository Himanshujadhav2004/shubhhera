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
            <motion.article key={member.name} variants={fadeUp}>
              {/*
                The studio's "Introducing" card shown whole and unaltered: its
                own proportions, no crop box, no object-cover, no hover zoom,
                no tint. The name, role and bio are part of the artwork, so the
                card is the content here rather than an illustration beside it.
              */}
              <div className="overflow-hidden rounded-sm">
                <Image
                  src={member.photo}
                  alt={`${member.name}, ${member.role}. ${member.bio}`}
                  width={1400}
                  height={1750}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full"
                />
              </div>

              {/* Repeated for assistive tech and search engines: the copy above
                  exists only as pixels inside the card, which they can't read. */}
              <div className="sr-only">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <p>{member.bio}</p>
              </div>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
