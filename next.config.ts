import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
};

export default nextConfig;
