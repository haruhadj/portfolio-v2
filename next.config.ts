import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/portfolio",
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
