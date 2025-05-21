import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Opcional, solo si necesitas ignorar ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // Opcional, solo si necesitas ignorar TypeScript
  },
};

export default nextConfig;
