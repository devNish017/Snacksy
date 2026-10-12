
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  outputFileTracingIncludes: {
    "/api/**/*": ["./src/generated/prisma/**/*"],
    "/**/*": ["./src/generated/prisma/**/*"],
  },
};

export default nextConfig;
