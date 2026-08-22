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
  heroPoster: "/media/wedding/wedding-09.jpg",
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
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Our Work", href: "#work" },
  { label: "Team", href: "#team" },
  { label: "Contact Us", href: "#contact" },
] as const;

/* ---------------------------------------------------------------- About -- */

export const about = {
  eyebrow: "About Us",
  heading: "Every story deserves to be told beautifully",
  intro:
    "Welcome to Stories by Shubhh.era, where we transform your most precious moments into cinematic masterpieces. Over 3+ years of dedicated experience in wedding cinematography and post-production have taught us one thing above all: every story deserves to be told beautifully.",
  whoWeAre: [
    "We are a creative team specializing in capturing and crafting wedding films, commercial content, and creative visual projects. What began as a passion for storytelling has grown into a full-fledged production and editing studio.",
    "A wedding day isn't just an event — it's a collection of emotions, connections, and unforgettable moments. Our mission is to preserve them in a way that is cinematic and deeply personal.",
  ],
  approach: [
    {
      title: "Cinematic Excellence",
      body: "Blending technical expertise with artistic vision on every frame.",
    },
    {
      title: "Client-Centric",
      body: "Your story, your vision, your voice — we build the film around it.",
    },
    {
      title: "Attention to Detail",
      body: "From color grading to sound design, the small things carry the feeling.",
    },
    {
      title: "Timely Delivery",
      body: "Respecting your timeline without ever compromising on quality.",
    },
    {
      title: "Full Service",
      body: "From first concept conversation through to final delivery.",
    },
  ],
  whyChooseUs: [
    "3+ years of professional wedding cinematography experience",
    "Expertise across weddings, commercials, and creative content",
    "Professional-grade equipment and industry-standard editing software",
    "A portfolio of satisfied clients and stunning films",
    "Same-day editing capabilities for events",
    "Dedicated to storytelling with authenticity and artistry",
  ],
} as const;

/* ------------------------------------------------------------- Services -- */

export type Service = { title: string; body: string };

export const services: {
  id: string;
  label: string;
  blurb: string;
  items: readonly Service[];
}[] = [
  {
    id: "video",
    label: "Video",
    blurb: "Films built to be felt — shot, cut, graded, and scored with intent.",
    items: [
      {
        title: "Video Editing",
        body: "Transforming raw footage into stunning visual stories with precision, creativity, and technical excellence.",
      },
      {
        title: "Influencer Content Editing",
        body: "Trend-aware edits optimized for YouTube, TikTok, and Instagram — built to hold attention and drive engagement.",
      },
      {
        title: "Instagram Reels & Short-Form",
        body: "Fast-paced edits with dynamic transitions, music sync, text overlays, and color grading made to stop the scroll.",
      },
      {
        title: "Wedding Films",
        body: "Cinematic, emotionally-told love stories using advanced color grading, sound design, and cinematic technique.",
      },
      {
        title: "Wedding Teasers",
        body: "Compact, highlight-driven films that build anticipation ahead of the full feature.",
      },
      {
        title: "Pre-Wedding Videos",
        body: "Cinematic visuals paired with authentic moments and music of your choosing — made for sharing.",
      },
      {
        title: "Same-Day Edits (SDE)",
        body: "A beautifully edited highlight film, ready to play at your reception the very same day.",
      },
    ],
  },
  {
    id: "editing",
    label: "Editing & Photo",
    blurb: "Post-production craft — for your story, your brand, or your studio.",
    items: [
      {
        title: "Photo Editing",
        body: "Color grading, skin retouching, creative compositing, and album design.",
      },
      {
        title: "Model Shots & Creative Content",
        body: "Fashion and creative visual content for brands, influencers, and individuals.",
      },
      {
        title: "Commercial & Brand Content",
        body: "Commercials and promotional storytelling designed to engage and convert.",
      },
      {
        title: "Makeup Content & Coverage",
        body: "Precise documentation of beauty transformations, start to finish.",
      },
      {
        title: "Professional Editing Services",
        body: "Post-production support for other photographers, studios, and creators using tools like DaVinci Resolve.",
      },
    ],
  },
];

export const editingApproach = [
  "Professional color grading and tone matching",
  "Detailed retouching while maintaining authenticity",
  "Creative enhancements that elevate without overwhelming",
  "Batch processing for consistent, cohesive results",
  "Custom styling to match your aesthetic",
] as const;

export const serviceStrengths = [
  "Expert Storytelling",
  "Technical Precision",
  "Fast Turnaround",
  "Custom Solutions",
  "Collaborative Process",
] as const;

/* -------------------------------------------------------------- Gallery -- */

export type GalleryCategory =
  | "Weddings"
  | "Pre-Wedding"
  | "Commercial"
  | "Reels"
  | "Makeup";

export type GalleryItem = {
  src: string;
  alt: string;
  category: GalleryCategory;
  /** Drives masonry row-spans so the grid keeps a magazine rhythm. */
  orientation: "portrait" | "landscape";
};

const seq = (n: number) => Array.from({ length: n }, (_, i) => i + 1);
const pad = (n: number) => String(n).padStart(2, "0");

export const gallery: GalleryItem[] = [
  ...seq(18).map((i) => ({
    src: `/media/wedding/wedding-${pad(i)}.jpg`,
    alt: `Wedding photography still ${i} by Stories by Shubhh.era`,
    category: "Weddings" as const,
    orientation: (i % 3 === 0 ? "landscape" : "portrait") as GalleryItem["orientation"],
  })),
  ...seq(18).map((i) => ({
    src: `/media/pre-wedding/pre-wedding-${pad(i)}.jpg`,
    alt: `Pre-wedding shoot still ${i} by Stories by Shubhh.era`,
    category: "Pre-Wedding" as const,
    orientation: (i % 4 === 0 ? "landscape" : "portrait") as GalleryItem["orientation"],
  })),
  ...seq(6).map((i) => ({
    src: `/media/model/model-${pad(i)}.jpg`,
    alt: `Model and creative shoot still ${i} by Stories by Shubhh.era`,
    category: "Commercial" as const,
    orientation: (i % 2 === 0 ? "landscape" : "portrait") as GalleryItem["orientation"],
  })),
  ...seq(10).map((i) => ({
    src: `/media/portrait/portrait-${pad(i)}.jpg`,
    alt: `Portrait and reel still ${i} by Stories by Shubhh.era`,
    category: "Reels" as const,
    orientation: "portrait" as const,
  })),
  ...seq(6).map((i) => ({
    src: `/media/portrait/portrait-${pad(i + 10)}.jpg`,
    alt: `Makeup coverage still ${i} by Stories by Shubhh.era`,
    category: "Makeup" as const,
    orientation: "portrait" as const,
  })),
];

export const galleryFilters: readonly ("All" | GalleryCategory)[] = [
  "All",
  "Weddings",
  "Pre-Wedding",
  "Commercial",
  "Reels",
  "Makeup",
];

/* ------------------------------------------------------------- Our Work -- */

/**
 * `embedUrl` accepts the link you actually have in hand — no need to build an
 * embed URL by hand. All of these work:
 *
 *   https://www.youtube.com/watch?v=VIDEO_ID     (address bar)
 *   https://youtu.be/VIDEO_ID                    (share button)
 *   VIDEO_ID                                     (just the 11-char id)
 *   https://vimeo.com/123456789
 *   https://player.mediadelivery.net/embed/...   (Bunny, or any embed URL)
 *
 * lib/video.ts normalizes it. Upload films to YouTube as **Unlisted** — they
 * stay off your channel and out of search, but still embed here.
 *
 * Leave it empty and the card still renders: it shows the still without a play
 * affordance, so the site stays correct until the films are up.
 */
export type Film = {
  title: string;
  couple: string;
  description: string;
  poster: string;
  embedUrl: string;
  meta: string;
};

export const films: Film[] = [
  {
    title: "The Wedding Film",
    couple: "Jay & Yashika",
    description:
      "A full-day celebration cut into a feature-length love story — golden-hour portraits, a first look that stopped the room, and a reception that ran until sunrise.",
    poster: "/media/wedding/wedding-16.jpg",
    // Drive works here (click-to-play in the lightbox) even though it failed as
    // the hero background, which needed silent autoplay. Requires the file to
    // stay shared as "Anyone with the link".
    embedUrl: "https://drive.google.com/file/d/1cn8s4OhJR7rjU47nBFGzyowczuPqLh8-/preview",
    meta: "Wedding Film · 2024",
  },
  {
    title: "Pre-Wedding Story",
    couple: "Dhiraj & Vaishnavi",
    description:
      "Shot across open country at first light. Quiet, unhurried, and built entirely around the two of them rather than the location.",
    poster: "/media/pre-wedding/pre-wedding-06.jpg",
    embedUrl: "",
    meta: "Pre-Wedding · 2024",
  },
  {
    title: "Same-Day Edit",
    couple: "Ansh & Riya",
    description:
      "Filmed, cut, graded, and delivered inside eighteen hours — playing on the reception screen while the night was still going.",
    poster: "/media/wedding/wedding-08.jpg",
    embedUrl: "",
    meta: "Same-Day Edit · 2024",
  },
  {
    title: "The Teaser",
    couple: "Ranaji",
    description:
      "Ninety seconds built to make people ask when the full film lands. Every frame earns its place.",
    poster: "/media/pre-wedding/pre-wedding-16.jpg",
    embedUrl: "",
    meta: "Wedding Teaser · 2023",
  },
  {
    title: "Brand Commercial",
    couple: "Carnival",
    description:
      "Commercial storytelling with the same cinematic language we bring to weddings — subject as character, not as prop.",
    poster: "/media/model/model-04.jpg",
    embedUrl: "",
    meta: "Commercial · 2024",
  },
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
    quote:
      "We have watched our film more times than we can count, and it still makes us cry. They did not just record the day — they understood it.",
    name: "Jay & Yashika",
    detail: "Wedding Film",
    rating: 5,
  },
  {
    quote:
      "The same-day edit played at our reception and the entire room went silent. Nobody could believe it was shot that morning.",
    name: "Ansh & Riya",
    detail: "Same-Day Edit",
    rating: 5,
  },
  {
    quote:
      "Every frame felt considered. The color, the sound, the pacing — it looks like something made for a cinema, not a wedding.",
    name: "Dhiraj & Vaishnavi",
    detail: "Pre-Wedding Story",
    rating: 5,
  },
  {
    quote:
      "Professional from the first call to final delivery. They took our rough brief and returned something better than we pictured.",
    name: "Carnival",
    detail: "Brand Commercial",
    rating: 5,
  },
] as const;
