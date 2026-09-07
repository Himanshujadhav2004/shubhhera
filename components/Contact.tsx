"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/data/content";
import { Eyebrow, Reveal, RevealGroup, fadeUp } from "@/components/ui/Reveal";
import SocialIcon from "@/components/ui/SocialIcon";

type Status = "idle" | "sending" | "sent";

const fields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: false },
  { name: "date", label: "Event Date", type: "date", required: false },
] as const;

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  /**
   * No backend is wired up yet, so this simulates the round-trip and shows the
   * success state. Swap the timeout for a POST to your form endpoint (Formspree,
   * Resend, a route handler) when one exists.
   */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("sent");
  }

  return (
    <section id="contact" className="relative bg-paper-alt py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
          <div>
            <RevealGroup>
              <Eyebrow>Contact Us</Eyebrow>
              <motion.h2
                variants={fadeUp}
                className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-balance text-ink"
              >
                Let&rsquo;s tell your story
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 max-w-md leading-relaxed text-ink-soft">
                Tell us about your day — the date, the place, and what matters most to
                you. We reply to every enquiry personally.
              </motion.p>
            </RevealGroup>

            <Reveal delay={0.15} className="mt-12 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-sage">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 block font-display text-xl text-ink transition-colors hover:text-sage"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-sage">Phone</p>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="mt-2 block font-display text-xl text-ink transition-colors hover:text-sage"
                >
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-sage">Based in</p>
                <p className="mt-2 text-ink-soft">{site.location}</p>
                <p className="mt-1 text-sm text-ink-faint">{site.serviceAreaLine}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-sage">Follow</p>
                <div className="mt-3 flex gap-3">
                  {site.socials.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      /* Icon-only, so the accessible name comes from aria-label. */
                      aria-label={label}
                      title={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                    >
                      <SocialIcon name={label} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-sm border border-line bg-paper p-8 sm:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                {fields.map((f) => (
                  <label
                    key={f.name}
                    className={`block ${f.name === "name" || f.name === "email" ? "sm:col-span-2" : ""}`}
                  >
                    <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
                      {f.label}
                      {f.required && <span className="text-sage"> *</span>}
                    </span>
                    <input
                      name={f.name}
                      type={f.type}
                      required={f.required}
                      disabled={status !== "idle"}
                      className="mt-2.5 w-full border-b border-line bg-transparent pb-2.5 text-ink outline-none transition-colors duration-300 placeholder:text-ink/25 focus:border-sage disabled:opacity-50"
                    />
                  </label>
                ))}

                <label className="block sm:col-span-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">
                    Message
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    disabled={status !== "idle"}
                    placeholder="Tell us about your day…"
                    className="mt-2.5 w-full resize-none border-b border-line bg-transparent pb-2.5 text-ink outline-none transition-colors duration-300 placeholder:text-ink/25 focus:border-sage disabled:opacity-50"
                  />
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={status !== "idle"}
                whileHover={status === "idle" ? { scale: 1.02 } : undefined}
                whileTap={status === "idle" ? { scale: 0.98 } : undefined}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="mt-10 flex w-full items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-xs uppercase tracking-[0.25em] text-paper disabled:opacity-70"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Send Enquiry
                    </motion.span>
                  )}
                  {status === "sending" && (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                        className="block h-3.5 w-3.5 rounded-full border-[1.5px] border-paper/30 border-t-paper"
                      />
                      Sending
                    </motion.span>
                  )}
                  {status === "sent" && (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2.5"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
                        <motion.path
                          d="M4 12.5l5 5L20 6.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                        />
                      </svg>
                      Thank You
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <AnimatePresence>
                {status === "sent" && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 text-center text-sm text-ink-soft"
                  >
                    We&rsquo;ve received your enquiry and will be in touch shortly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
