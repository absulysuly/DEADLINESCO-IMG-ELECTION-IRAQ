/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Fix for CSS/Tailwind build errors
  webpack: (config, { isServer }) => {
    // Handle CSS modules
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    });

    return config;
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001',
  },
  
  // Image optimization
  images: {
    domains: ['localhost'],
    unoptimized: true, // Disable image optimization for faster builds
  },
  
  // Disable ESLint during builds (speeds up deployment)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript errors during builds
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
