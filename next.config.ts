import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel deployment için optimizasyonlar
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
