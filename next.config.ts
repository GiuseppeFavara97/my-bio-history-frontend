import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },

  async rewrites() {
    return [
      {
        source: "/access",
        destination: "/login-register",
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/login-register",
        destination: "/access",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
