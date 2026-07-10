import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [65, 70, 75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
