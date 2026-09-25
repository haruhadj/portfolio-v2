import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/portfolio",
  async headers() {
    return [
      {
        source: "/bad-apple.d2adb797.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        // basePath: false keeps this matching the bare root rather than
        // being prefixed to /portfolio, which would loop.
        source: "/",
        destination: "/portfolio",
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
