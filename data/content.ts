/**
 * Single source of truth for site copy and media.
 *
 * Everything a non-developer would want to change lives here: section text,
 * service lists, which photos appear in the gallery, team names, and the film
 * links. Components read from this file and never hardcode copy.
 */

export const site = {
  name: "Stories by Shubhh.era",
  wordmark: { primary: "STORIES", secondary: "BY SHUBHH ERA" },
  tagline: "We transform your most precious moments into cinematic masterpieces.",
  /**
   * Hero background film. Two forms are supported:
   *
   *  - A YouTube link or id  → embedded muted, looping, chrome cropped.
   *  - A local path like "/media/hero-reel.mp4" → plain <video>, which is the
   *    cleaner result: no platform branding at all, and it starts faster.
   *
   * If you later export a 5-10MB loop (720p/1080p H.264, 10-20s, no audio),
   * drop it in public/media/ and point this at it — nothing else changes.
   *
   * Set to "" to show heroPoster alone, which is a fine hero on its own.
   */
  heroVideo: "/media/hero-reel.mp4",
  /**
   * The still that carries the hero on its own: it paints first, covers the
   * film while it buffers, and is what remains if the video fails or autoplay
   * is blocked. Swap this path to change the fallback.
   */
  heroPoster: "/media/wedding/hero-poster.png",
  intro:
    "Over 3+ years of dedicated experience in wedding cinematography and post-production — because every story deserves to be told beautifully.",
  email: "jangidshubh08@gmail.com",
  phone: "+91 79729 35868",
  location: "Available worldwide · Based in India",
  socials: [
    // Link kept clean: the ?igsh= on a copied Instagram link is share-tracking
    // for the copying device and isn't needed for the profile to resolve.
    { label: "Instagram", href: "https://www.instagram.com/storiesbyshubhh.era" },
  ],
} as const;

export const navLinks = [
  { label: "Gallery", href: "#gallery" },
  { label: "Our Work", href: "#work" },
  { label: "Team", href: "#team" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
] as const;

/* ---------------------------------------------------------------- About -- */

export const about = {
  eyebrow: "About Us",
  heading: "Every story deserves to be told beautifully",
  intro:
    "Over 3+ years of wedding cinematography and post-production, turning the moments that matter into films worth rewatching.",
  whyChooseUs: [
    "3+ years of professional wedding cinematography",
    "Weddings, commercials, and creative content",
    "Professional-grade equipment and industry-standard tools",
    "Same-day editing for events",
  ],
} as const;

/* -------------------------------------------------------------- Gallery -- */

export type GalleryCategory = "Weddings" | "Pre-Wedding" | "Model";

export type GalleryItem = {
  src: string;
  alt: string;
  category: GalleryCategory;
  /** Drives the intrinsic ratio, so a wrong value would crop the picture. */
  orientation: "portrait" | "landscape";
};

const seq = (n: number) => Array.from({ length: n }, (_, i) => i + 1);
const pad = (n: number) => String(n).padStart(2, "0");

/*
  The portrait/ folder holds two different shoots, so it is split by subject
  rather than by folder: 02-12 are bridal portraits from a wedding, while 01
  and 13-16 are couple/pre-wedding frames.
*/
const BRIDAL_PORTRAITS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const COUPLE_PORTRAITS = [1, 13, 14, 15, 16];

export const gallery: GalleryItem[] = [
  ...seq(18).map((i) => ({
    src: `/media/wedding/wedding-${pad(i)}.jpg`,
    alt: `Wedding photography still ${i} by Stories by Shubhh.era`,
    category: "Weddings" as const,
    orientation: (i % 3 === 0 ? "landscape" : "portrait") as GalleryItem["orientation"],
  })),
  ...BRIDAL_PORTRAITS.map((i, n) => ({
    src: `/media/portrait/portrait-${pad(i)}.jpg`,
    alt: `Bridal portrait ${n + 1} by Stories by Shubhh.era`,
    category: "Weddings" as const,
    orientation: "portrait" as const,
  })),
  ...seq(18).map((i) => ({
    src: `/media/pre-wedding/pre-wedding-${pad(i)}.jpg`,
    alt: `Pre-wedding shoot still ${i} by Stories by Shubhh.era`,
    category: "Pre-Wedding" as const,
    orientation: (i % 4 === 0 ? "landscape" : "portrait") as GalleryItem["orientation"],
  })),
  ...COUPLE_PORTRAITS.map((i, n) => ({
    src: `/media/portrait/portrait-${pad(i)}.jpg`,
    alt: `Pre-wedding couple portrait ${n + 1} by Stories by Shubhh.era`,
    category: "Pre-Wedding" as const,
    orientation: "portrait" as const,
  })),
  ...seq(6).map((i) => ({
    src: `/media/model/model-${pad(i)}.jpg`,
    alt: `Model and creative shoot still ${i} by Stories by Shubhh.era`,
    category: "Model" as const,
    orientation: "portrait" as const,
  })),
];

export const galleryFilters: readonly ("All" | GalleryCategory)[] = [
  "All",
  "Weddings",
  "Pre-Wedding",
  "Model",
];

/* ------------------------------------------------------------- Our Work -- */

/**
 * The film portfolio, grouped the way the studio groups it.
 *
 * `youtubeId` is just the 11-character id from the share link — lib/video.ts
 * builds the embed URL, and the card poster comes from YouTube's own thumbnail
 * CDN, so adding a film needs nothing but its id, a title and a category.
 */
export type FilmCategory =
  | "Teasers"
  | "Client Work"
  | "Our Weddings"
  | "Portrait Reels";

export type Film = {
  title: string;
  youtubeId: string;
  category: FilmCategory;
};

/** Titles are the studio's own, minus the "| CINEMATIC" that ends every one. */
export const films: Film[] = [
  // Teasers portfolio
  { title: "Pre-Wedding Teaser", youtubeId: "-eDKGEjjP9A", category: "Teasers" },
  { title: "Pre-Wedding Teaser", youtubeId: "2bMAn1asHJY", category: "Teasers" },
  { title: "Pre-Wedding Teaser", youtubeId: "O3Ir3wc0mnM", category: "Teasers" },
  { title: "Pre-Wedding Teaser", youtubeId: "jlRvbqcbPnQ", category: "Teasers" },
  { title: "Pre-Wedding Teaser", youtubeId: "n8HCWswHymA", category: "Teasers" },

  // Edited work for clients
  { title: "Mehandi Highlight", youtubeId: "-7pfPpwWMZc", category: "Client Work" },
  { title: "Jay & Yashika — Wedding Highlight", youtubeId: "4ktl_xN7xWA", category: "Client Work" },
  { title: "Akanksh & Dipshikha — Wedding Highlight", youtubeId: "RYQ31dYIG9c", category: "Client Work" },
  { title: "Wedding Highlight", youtubeId: "RbPgIN1mcLM", category: "Client Work" },
  { title: "Jayesh Bhavsar — Wedding Highlight", youtubeId: "XJtgotz40TQ", category: "Client Work" },
  { title: "Carnival Reel", youtubeId: "b-WMu-9IN-Y", category: "Client Work" },

  // Our weddings
  { title: "Bidai Reel", youtubeId: "5muNzSyEMFU", category: "Our Weddings" },
  { title: "Dhiraj & Vaishnavi — Wedding Reel", youtubeId: "Fu_WNY3kN9g", category: "Our Weddings" },
  { title: "Dhiraj & Vaishnavi — Wedding Reel", youtubeId: "GMtd31QElLg", category: "Our Weddings" },
  { title: "Pranjal & Roshan — Wedding Reel", youtubeId: "NThl-DItBpY", category: "Our Weddings" },
  { title: "Vadik", youtubeId: "n540XwsE8pU", category: "Our Weddings" },

  // Portrait reels
  { title: "Model Shoot Reel", youtubeId: "-WBqYjv5XBM", category: "Portrait Reels" },
  { title: "Pre-Wedding Reel", youtubeId: "F7jkdrTpugo", category: "Portrait Reels" },
  { title: "Pre-Wedding Reel", youtubeId: "Wm_mg0WKxwc", category: "Portrait Reels" },
  { title: "Model Shoot Reel — Makeup", youtubeId: "X5P4lZRJKlE", category: "Portrait Reels" },
  { title: "Model Shoot Reel — Makeup", youtubeId: "kmOnJzWLJb8", category: "Portrait Reels" },
];

export const filmFilters: readonly ("All" | FilmCategory)[] = [
  "All",
  "Teasers",
  "Client Work",
  "Our Weddings",
  "Portrait Reels",
];

/* ----------------------------------------------------------------- Team -- */

/**
 * The studio's own "Introducing" cards, shown whole (see
 * scripts/build-team-cards.mjs).
 *
 * The card artwork already contains the name, role and bio, so the section
 * renders no visible text of its own — it would duplicate what's in the
 * picture. The fields below still carry that copy because text baked into an
 * image is invisible to screen readers and search engines; the section exposes
 * them to assistive tech instead.
 */
export const team = [
  {
    name: "Shubham Jangid",
    role: "Founder & Lead Editor",
    photo: "/media/team/card-shubham.jpg",
    bio: "A professional video editor and the founder of his own wedding creative company, he built his journey from the timeline up. What started as a passion for storytelling evolved into a team of creative minds working together to capture, craft, and deliver meaningful wedding films.",
  },
  {
    name: "Shivam Chavan",
    role: "Candid Photographer",
    photo: "/media/team/card-shivam.jpg",
    bio: "A candid photographer with an eye for the moments most people miss. He believes the best wedding photographs aren't posed — they're found in spontaneous laughter, quiet glances, and everything in between. Stay present, observe closely, let the story unfold.",
  },
] as const;

/* --------------------------------------------------------- Testimonials -- */

export const testimonials = [
  {
    quote: "We have watched our film more times than we can count, and it still makes us cry.",
    name: "Jay & Yashika",
    detail: "Wedding Film",
    rating: 5,
  },
  {
    quote: "The same-day edit played at our reception and the whole room went silent.",
    name: "Ansh & Riya",
    detail: "Same-Day Edit",
    rating: 5,
  },
  {
    quote: "Every frame felt considered. It looks like something made for a cinema.",
    name: "Dhiraj & Vaishnavi",
    detail: "Pre-Wedding Story",
    rating: 5,
  },
  {
    quote: "Professional from the first call to final delivery.",
    name: "Carnival",
    detail: "Brand Commercial",
    rating: 5,
  },
] as const;
