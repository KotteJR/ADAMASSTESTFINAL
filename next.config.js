/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    instrumentationHook: false // Disable instrumentation hook
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
        path: false,
        child_process: false
      };
    }
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