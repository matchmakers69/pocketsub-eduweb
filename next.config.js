/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.clerk.dev", port: "" },
      { protocol: "https", hostname: "dsc.cloud", port: "" },
    ],
  },
};

module.exports = nextConfig;
