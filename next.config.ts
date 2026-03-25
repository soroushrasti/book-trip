import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove dev-only setting for production
  ...(process.env.NODE_ENV === "development" && {
    allowedDevOrigins: ["192.168.2.4"],
  }),
};

export default nextConfig;
