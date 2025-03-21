import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true, // Recommended for performance and catching issues
    compiler: {
        styledComponents: true, // Ensures styled-components support
    },
    env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY // Exposing your OpenAI API key securely
    },
    typescript: {
        ignoreBuildErrors: false, // Ensures proper error catching during builds
    }
};

export default nextConfig;
