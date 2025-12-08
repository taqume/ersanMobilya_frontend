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
  
  // Redirect /admin to backend
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    
    return [
      {
        source: '/admin/:path*',
        destination: `${backendUrl}/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
