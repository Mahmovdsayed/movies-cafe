import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  compiler: {
    removeConsole: isProd ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    appDocumentPreloading: true,
    viewTransition: true,
    serverActions: {
      allowedOrigins: ["https://moviescafe.vercel.app"],
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
