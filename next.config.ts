import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push({
      "zlib-sync": "commonjs zlib-sync",
      "discord.js": "commonjs discord.js",
    });
    return config;
  },
};

export default nextConfig;
