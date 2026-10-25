import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {
    "/expolens": ["./app/expolens/**/*"],
  },
};

export default nextConfig;
