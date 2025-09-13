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
    scrollRestoration: true,
    optimizeCss: true,
    optimizeServerReact: true,
    appDocumentPreloading: true,
    serverSourceMaps: false,
    webpackMemoryOptimizations: true,
    viewTransition: true,
    serverActions: {
      allowedOrigins: ["https://moviescafe.vercel.app"],
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
