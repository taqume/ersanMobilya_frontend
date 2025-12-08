import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dkym1q69r/**',
      },
    ],
  },
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Empty turbopack config to silence the warning
  turbopack: {},
};

export default nextConfig;
