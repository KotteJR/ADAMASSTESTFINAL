/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeFonts: false, // 🔥 Disables automatic font optimization
    appDir: true, // ✅ Ensures compatibility with App Router
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
