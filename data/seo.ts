/**
 * Single source of truth for search metadata.
 *
 * Same idea as data/content.ts, but for the things a reader never sees: the
 * canonical domain, where the studio works, and the phrases people actually
 * type into Google when they are looking for a wedding photographer here.
 *
 * Changing the domain, the base city, or the service area is a one-line edit
 * in this file — layout.tsx, sitemap.ts, robots.ts and the business schema all
 * read from here, so nothing drifts out of sync.
 */

/**
 * The live domain, no trailing slash.
 *
 * This is the root of every canonical URL, the sitemap, and the business's
 * identity in structured data. Pointing it at the wrong host is worse than
 * leaving SEO alone: Google would index one domain and be told to credit
 * another. Update this the day DNS goes live.
 */
export const SITE_URL = "https://storiesbyshubhhera.com";

/* -------------------------------------------------------------- Location -- */

/**
 * Where the studio is, and where it travels.
 *
 * `city` is the one term worth ranking first for; `serviceArea` is everywhere
 * that is a realistic drive. Google treats these differently — the home city
 * earns a place in the local map pack, the service area only ever competes in
 * ordinary blue-link results — so keep `city` singular and honest.
 */
export const location = {
  city: "Shirpur",
  district: "Dhule",
  region: "Maharashtra",
  regionCode: "MH",
  country: "India",
  countryCode: "IN",
  /**
   * PIN for Shirpur, Dhule district. Verify against the studio's own postal
   * address before launch — a wrong PIN in schema is a wrong answer given
   * confidently, which is worse than omitting the field.
   */
  postalCode: "425405",
  /**
   * Approximate centre of Shirpur, not the studio's door. Replace both numbers
   * with the exact pin from the studio's Google Business Profile once that
   * listing exists; the profile and the schema agreeing is what makes Google
   * trust either of them.
   */
  latitude: 21.3486,
  longitude: 74.8811,
  /** Towns close enough to shoot without an overnight stay. */
  serviceArea: [
    "Shirpur",
    "Dhule",
    "Nandurbar",
    "Jalgaon",
    "Nashik",
    "Shahada",
    "Dondaicha",
    "Sakri",
    "Amalner",
    "Chopda",
    "Khandesh",
    "Maharashtra",
  ],
} as const;

/** "Shirpur, Dhule, Maharashtra" — the human-readable form, built once. */
export const locationLine = `${location.city}, ${location.district}, ${location.region}`;

/* -------------------------------------------------------------- Keywords -- */

/**
 * Search phrases, ordered by how much they are worth winning.
 *
 * These are written the way a couple would type them, not the way a studio
 * would describe itself — "wedding photographer in Shirpur", not "premium
 * matrimonial visual services". Two honest cautions about this list:
 *
 *  1. Google has ignored the `keywords` meta tag since 2009. It is emitted for
 *     the handful of smaller engines that still read it, and it costs nothing,
 *     but it is not what moves rankings.
 *  2. What actually ranks is these same phrases appearing in the title, the
 *     headings, and the body copy of the page — which is why the strings below
 *     are reused in the metadata and the on-page text rather than hidden here.
 */
export const keywords = [
  // Highest intent: someone ready to book, in the home city.
  "wedding photographer in Shirpur",
  "best wedding photographer in Shirpur",
  "wedding photography Shirpur",
  "candid wedding photographer Shirpur",
  "pre wedding shoot Shirpur",
  "wedding cinematography Shirpur",

  // The district, which is the larger pool of searches.
  "wedding photographer in Dhule",
  "best wedding photographer in Dhule",
  "wedding photography Dhule",
  "candid photographer Dhule",
  "pre wedding shoot Dhule",
  "wedding videographer Dhule",

  // Neighbouring towns worth travelling to.
  "wedding photographer Nandurbar",
  "wedding photographer Jalgaon",
  "wedding photographer Nashik",
  "wedding photographer Shahada",
  "wedding photography Khandesh",
  "wedding photographer Maharashtra",

  // Service-led searches, where the city is implied by the searcher's location.
  "cinematic wedding films",
  "wedding highlight video",
  "same day wedding edit",
  "wedding teaser video",
  "destination wedding photographer India",
  "bridal portrait photography",
  "haldi mehendi sangeet photography",
  "baraat photography",
  "professional video editor for weddings",
] as const;

/* -------------------------------------------------------------- Services -- */

/**
 * What the studio sells, in Google's vocabulary rather than the site's.
 *
 * These feed the `hasOfferCatalog` block in the business schema, which is how
 * a search engine learns that "same-day edit" is a bookable service here and
 * not just a phrase in a testimonial.
 */
export const services = [
  {
    name: "Wedding Photography",
    description:
      "Candid and traditional wedding photography across every ceremony — haldi, mehendi, sangeet, baraat, phera and reception.",
  },
  {
    name: "Wedding Cinematography",
    description:
      "Cinematic wedding films, highlight reels and teasers, shot and graded to be rewatched for years.",
  },
  {
    name: "Pre-Wedding Shoots",
    description:
      "Pre-wedding photo and film shoots on location around Shirpur, Dhule and the wider Khandesh region.",
  },
  {
    name: "Same-Day Edit",
    description:
      "A finished highlight film cut and delivered on the wedding day itself, ready to play at the reception.",
  },
  {
    name: "Bridal & Portrait Photography",
    description:
      "Bridal portraits, model portfolios and makeup-artist collaboration shoots.",
  },
  {
    name: "Commercial Video Editing",
    description:
      "Brand commercials, event films and social reels, edited to a professional finish.",
  },
] as const;
