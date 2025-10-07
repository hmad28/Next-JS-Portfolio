/** @type {import('next').NextConfig} */
const nextConfig = {
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
