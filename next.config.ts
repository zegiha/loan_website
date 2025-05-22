import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // assetPrefix: process.env.NEXT_PUBLIC_CLOUDFRONT_URL,
  images: {
    formats: [
      'image/avif',
      'image/webp',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME ?? '',
        port: '',
        pathname: '/*',
      },
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_BASE_HOSTNAME ?? '',
        port: '',
        pathname: '/*',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_LENDERS_BASE_HOSTNAME ?? '',
        port: '',
        pathname: '/*',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/*',
      }
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
