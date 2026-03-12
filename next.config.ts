import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.ibb.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.ibb.co.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.imgur.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.pexels.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
