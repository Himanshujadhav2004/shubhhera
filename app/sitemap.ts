import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/seo";

/**
 * Served at /sitemap.xml.
 *
 * The site is a single page, so this is one entry — its value is not helping
 * Google crawl five URLs, it is giving Search Console something to submit so
 * the domain gets discovered and re-crawled on a schedule instead of whenever
 * Google happens to notice it.
 *
 * The in-page anchors (#gallery, #work, #contact) are deliberately absent: a
 * fragment is not a separate URL and listing them would submit duplicates of
 * the same page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
