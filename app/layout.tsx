import type { Metadata } from "next";
import { Bodoni_Moda, Inter, Parisienne } from "next/font/google";
import { site } from "@/data/content";
import { SITE_URL, keywords, location, locationLine } from "@/data/seo";
import { structuredDataJson } from "@/lib/schema";
import "./globals.css";

/* Chosen to match the brand marks: a high-contrast fashion serif for the
   wordmark and headings, a geometric sans for wide-tracked labels, and the
   thin script that appears on the studio's "Meet the team" lockup. */
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const parisienne = Parisienne({
  variable: "--font-parisienne",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

/*
  The title carries the search term, not the brand.

  A studio's instinct is to lead with its own name, but nobody types "Stories
  by Shubhh.era" until they already know it exists. The people worth reaching
  type "wedding photographer in Shirpur" — so that phrase goes first, where
  Google weights it most and where it is still visible after the ~60-character
  truncation in results.
*/
const title = `Wedding Photographer in ${location.city} & ${location.district} | ${site.name}`;

/*
  The description does not rank the page, but it is the sentence that decides
  whether the result gets clicked. It names the place, the service, the proof
  (3+ years) and ends on an action, inside the ~155 characters Google shows.
*/
const description = `Candid wedding photography and cinematic wedding films in ${location.city}, ${location.district} and across ${location.region}. 3+ years, same-day edits, pre-wedding shoots.`;

export const metadata: Metadata = {
  /* Root for every relative URL below, so OG images resolve absolutely. */
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    /* Any future page exporting `title: "Pricing"` becomes "Pricing | ...". */
    template: `%s | ${site.name} — Wedding Photographer ${location.city}`,
  },
  description,
  /*
    Google has ignored this tag since 2009; it is emitted for the smaller
    engines that still read it. The same phrases doing the real work appear in
    the title, headings and body copy — see data/seo.ts.
  */
  keywords: [...keywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: "Wedding Photography",
  /*
    Tells Google this is the one true URL for the page, so a visit via
    ?fbclid=… or a trailing slash does not get indexed as a duplicate that
    competes with the original.
  */
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      /* Without these, Google shows a thumbnail-sized image and a clipped
         snippet. For a photography studio the large preview is the pitch. */
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description,
    url: SITE_URL,
    locale: "en_IN",
    /* Explicit dimensions stop WhatsApp and Facebook rendering a small square
       crop while they wait to measure the file themselves. */
    images: [
      {
        url: site.heroPoster,
        width: 1536,
        height: 1024,
        alt: `Wedding photography by ${site.name} in ${locationLine}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [site.heroPoster],
  },
  /*
    Paste the token from Google Search Console here to prove ownership of the
    domain, then submit /sitemap.xml there. Until that is done Google has no
    fast way to discover the site and none of this metadata gets read.
  */
  // verification: { google: "paste-search-console-token-here" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${inter.variable} ${parisienne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
        {/* Describes the studio, its services and its films to search engines
            as data rather than prose — see lib/schema.ts. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
      </body>
    </html>
  );
}
