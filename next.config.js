/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = ({
 productionBrowserSourceMaps: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
});

module.exports = nextConfig;
