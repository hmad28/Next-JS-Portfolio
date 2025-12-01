import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "portfolio-hmd-.free.nf",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  // Hapus eslint config dari sini
  // Pindahkan ke .eslintrc.json atau eslint.config.js
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
