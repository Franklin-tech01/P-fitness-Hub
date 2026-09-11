import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Unsplash's CDN already serves resized/format-negotiated images via URL
    // params (w=, q=, auto=format). Routing them through Next's server-side
    // optimizer too adds a fetch that occasionally times out upstream, so we
    // skip it and load the Unsplash URLs directly.
    unoptimized: true,
  },
};

export default nextConfig;
