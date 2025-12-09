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
  
  // Proxy /admin to backend
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
