/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "portfolio-hmd-backend.free.nf",
        pathname: "/storage/**",
      },
    ],
    unoptimized: true, // Tambahkan ini untuk development
  },
};

export default nextConfig;
