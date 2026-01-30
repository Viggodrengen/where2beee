import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "beerwalk.dk",
      },
      {
        protocol: "https",
        hostname: "api.salling.dk",
      },
      {
        protocol: "https",
        hostname: "migogkbh.dk",
      },
    ],
  },
};

export default nextConfig;
