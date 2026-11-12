import type { NextConfig } from "next";

// Statischer Export für normalen Webspace (siehe README).
// BASE_PATH nur setzen, wenn die Seite in einem Unterordner liegt, z. B. "/asiawok".
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
