import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.lionmotorsgroup.com",
      },
    ],
  },
};

export default nextConfig;
