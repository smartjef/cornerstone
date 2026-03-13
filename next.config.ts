import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 's3.mauzoplus.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3-console.mauzoplus.app',
        pathname: '/**',
      }

    ],
  },
};

export default nextConfig;
