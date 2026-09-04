import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Film posters come straight from YouTube's thumbnail CDN, so no poster
    // image has to be stored per video. Scoped to the /vi/ thumbnail path.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
