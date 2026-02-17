import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dkym1q69r'}/**`,
      },
    ],
  },
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Empty turbopack config to silence the warning
  turbopack: {},
  
  // Proxy /admin and all admin API routes to backend
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    
    return [
      {
        source: '/admin/:path*',
        destination: `${backendUrl}/admin/:path*`,
      },
      {
        source: '/content-manager/:path*',
        destination: `${backendUrl}/content-manager/:path*`,
      },
      {
        source: '/content-type-builder/:path*',
        destination: `${backendUrl}/content-type-builder/:path*`,
      },
      {
        source: '/upload/:path*',
        destination: `${backendUrl}/upload/:path*`,
      },
      {
        source: '/users-permissions/:path*',
        destination: `${backendUrl}/users-permissions/:path*`,
      },
      {
        source: '/i18n/:path*',
        destination: `${backendUrl}/i18n/:path*`,
      },
      {
        source: '/content-releases/:path*',
        destination: `${backendUrl}/content-releases/:path*`,
      },
    ];
  },
};

export default nextConfig;
