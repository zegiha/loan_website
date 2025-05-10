import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      {
        protocol: 'https',
        hostname: 'loan.apne2a.algorix.cloud/',
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
  // compiler: {
  //   removeConsole: process.env.NODE_ENV !== 'production',
  // },
  compress: true,
};

export default nextConfig;
