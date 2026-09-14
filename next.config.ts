import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: process.env.SITES_EXPORT === '1' ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: process.env.SITES_EXPORT === '1',
    formats: ['image/avif', 'image/webp']
  }
};

export default nextConfig;
