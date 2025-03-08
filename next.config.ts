import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cssChunking: true,
  },
  images: {
    formats: [
      'image/avif',
      'image/webp',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/*',
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'production',
  },
  compress: true,
};

export default nextConfig;
