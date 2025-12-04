import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel deployment için optimizasyonlar
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Dynamic routing için
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
