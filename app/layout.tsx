import type { Metadata } from "next";
import { Bodoni_Moda, Inter, Parisienne } from "next/font/google";
import { site } from "@/data/content";
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

export const metadata: Metadata = {
  // Swap for the real domain at launch so OG images resolve absolutely.
  metadataBase: new URL("https://storiesbyshubhhera.com"),
  title: `${site.name} — Wedding Cinematography & Film Editing`,
  description: site.tagline,
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
    images: ["/media/featured/featured-01.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${inter.variable} ${parisienne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
