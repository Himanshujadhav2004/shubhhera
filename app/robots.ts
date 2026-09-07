import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/seo";

/**
 * Served at /robots.txt.
 *
 * Everything is crawlable — there is nothing private here, and a portfolio
 * that blocks crawlers cannot rank. The line that earns its keep is the
 * sitemap pointer, which is how a crawler that arrives from a link rather
 * than from Search Console finds the sitemap on its own.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
