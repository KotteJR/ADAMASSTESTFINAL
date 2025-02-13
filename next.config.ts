/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // If using styled-components
  },
  // Ensure SSR is enabled:
  target: 'server', // This will force Next.js to treat the site as dynamic
};

export default nextConfig;
