/**
 * Structured data (JSON-LD) describing the studio to search engines.
 *
 * Metadata tags tell Google how to *label* the page in a result. Schema tells
 * it what the business *is* — that this is a photography studio in a named
 * town, with these services, this phone number and these films. That is the
 * part that makes a business eligible for the local map pack and for the
 * knowledge panel on the right of the results page.
 *
 * Everything here is derived from data/content.ts and data/seo.ts. Schema that
 * disagrees with the visible page is treated by Google as a spam signal, so
 * nothing in this file should ever be typed twice.
 */

import { films, site, team } from "@/data/content";
import { SITE_URL, keywords, location, services } from "@/data/seo";

const abs = (path: string) => new URL(path, SITE_URL).toString();

/**
 * Stable ids let the separate graph nodes reference each other instead of
 * repeating themselves — the website node can point at the same business
 * entity that the breadcrumb and the films point at.
 */
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * The studio itself.
 *
 * Typed as both `LocalBusiness` and `PhotographStudio`: the second is the
 * precise description, the first is the type Google's local features actually
 * key off. Declaring both costs nothing and covers either reading.
 */
const business = {
  "@type": ["LocalBusiness", "PhotographStudio"],
  "@id": BUSINESS_ID,
  name: site.name,
  alternateName: "Stories by Shubhh Era",
  url: SITE_URL,
  description: `Wedding photography and cinematic wedding films in ${location.city} and ${location.district}, ${location.region}. ${site.tagline}`,
  slogan: "Every story deserves to be told beautifully",
  email: site.email,
  telephone: site.phone,
  image: abs(site.heroPoster),
  logo: abs(site.heroPoster),
  priceRange: "₹₹",
  foundingDate: "2022",
  knowsAbout: [...keywords],
  /**
   * No `streetAddress`: publishing one the studio has not confirmed would be a
   * fabricated fact in machine-readable form. Locality, region and PIN are
   * enough to place the business in the right town — add the street line here
   * once it matches the Google Business Profile exactly.
   */
  address: {
    "@type": "PostalAddress",
    addressLocality: location.city,
    addressRegion: location.region,
    postalCode: location.postalCode,
    addressCountry: location.countryCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: location.latitude,
    longitude: location.longitude,
  },
  /** Where the studio will travel — the district, not just the home town. */
  areaServed: location.serviceArea.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
  /** A bookable list of services, so each one can surface on its own. */
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Wedding photography and film services",
    itemListElement: services.map(({ name, description }) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name, description },
    })),
  },
  founder: team.map(({ name, role }) => ({
    "@type": "Person",
    name,
    jobTitle: role,
  })),
  employee: team.map(({ name, role }) => ({
    "@type": "Person",
    name,
    jobTitle: role,
  })),
  sameAs: site.socials.map(({ href }) => href),
  /*
    Deliberately no `aggregateRating` or `review` node. The testimonials on the
    page are collected by the studio about the studio, and Google's guidelines
    class self-serving reviews on a LocalBusiness as ineligible for rich
    results — marking them up risks a manual structured-data penalty rather
    than a star rating. Ratings become legitimate here once they are pulled
    from a third party (Google Business Profile reviews), so this stays out
    until that is the source.
  */
} as const;

/** The site as an entity, so Google can attribute the domain to the studio. */
const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: site.name,
  description: site.tagline,
  inLanguage: "en-IN",
  publisher: { "@id": BUSINESS_ID },
} as const;

/**
 * The showreel films, as video entities.
 *
 * Each one is hosted on YouTube, so the embed and thumbnail URLs are derived
 * rather than stored — the same derivation OurWork uses to render the cards.
 * Video results are a genuinely under-contested surface for a wedding studio:
 * a couple searching "wedding highlight Dhule" is far likelier to click a
 * thumbnail than a text link.
 */
const videos = films.map(({ title, youtubeId }) => ({
  "@type": "VideoObject",
  name: `${title} — ${site.name}`,
  description: `${title} by ${site.name}, wedding cinematography in ${location.city} and ${location.district}, ${location.region}.`,
  thumbnailUrl: `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
  embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
  contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
  /*
    `uploadDate` is intentionally absent rather than invented. Google prefers
    it, but a guessed date is a wrong fact; fill these in from YouTube Studio
    if video rich results become a priority.
  */
  publisher: { "@id": BUSINESS_ID },
}));

/**
 * One `@graph` holding every node, emitted as a single script tag.
 *
 * A graph is preferred over several separate script tags because the nodes
 * cross-reference by `@id` — Google reads them as one connected description of
 * one business rather than as unrelated fragments.
 */
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [business, website, ...videos],
};

/**
 * Serialised for `dangerouslySetInnerHTML`.
 *
 * The `<` escape is the sanitisation step Next's JSON-LD guide calls for: it
 * stops any copy that later contains a `<` from being able to close the script
 * tag early and inject markup into the page.
 */
export const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");
