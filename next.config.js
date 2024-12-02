/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["api.microlink.io", "aceternity.com", "assets.aceternity.com"],
  },
};

module.exports = nextConfig;
