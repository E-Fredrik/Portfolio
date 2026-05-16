import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

// Update this to match your GitHub repository name
const repoName = "portfolio-2026";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
};

export default nextConfig;
