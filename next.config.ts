import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isVercel = !!process.env.VERCEL;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  compress: true,
  compiler: {
    removeConsole: isProd,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
  experimental: {
    // cpus: 8,
    scrollRestoration: true,
    optimizeCss: true,
    optimizeServerReact: true,
    appDocumentPreloading: true,
    serverSourceMaps: false,
    webpackMemoryOptimizations: true,
    viewTransition: true,
    // turbopackMinify: true,
    // turbopackSourceMaps: false,
    // turbopackTreeShaking: true,
    serverActions: {
      allowedOrigins: [
        "https://moviescafe.vercel.app",
        "http://localhost:3000",
      ],
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
