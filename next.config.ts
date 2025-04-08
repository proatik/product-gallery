import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "cdn.dummyjson.com" }],
  },
  /* config options here */
};

export default nextConfig;
