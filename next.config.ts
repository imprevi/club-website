import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds for production deployment
    // Keep ESLint active during development
    ignoreDuringBuilds: true,
  },
  /* config options here */
};

export default nextConfig;
