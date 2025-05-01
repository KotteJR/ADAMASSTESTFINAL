/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    instrumentationHook: false // Disable instrumentation hook
  },
  webpack: (config, { isServer }) => {
    // Add specific webpack configurations if needed
    return config;
  },
  // Handle specific file imports
  transpilePackages: [
    '@mantine/core',
    '@mantine/hooks',
    '@mantine/carousel',
    '@mantine/dropzone',
    'plotly.js-dist'
  ]
};

module.exports = nextConfig; 