import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "mohitmishra7.com" }],
        destination: "https://www.mohitmishra7.com",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "mohitmishra7.com" }],
        destination: "https://www.mohitmishra7.com/:path+",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "miro.medium.com" },
      { protocol: "https", hostname: "substack-post-media.s3.amazonaws.com" },
      { protocol: "https", hostname: "pbs.twimg.com" }, // Twitter/X images
    ],
  },
};

export default nextConfig;
