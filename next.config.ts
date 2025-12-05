import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },

  async rewrites() {
    return [
      {
        source: "/access",
        destination: "/auth",
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/auth",
        destination: "/access",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
