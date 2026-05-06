import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/clerk-proxy/:path*",
        destination:
          "https://upward-kangaroo-48.clerk.accounts.dev/:path*",
      },
    ];
  },
};

export default nextConfig;