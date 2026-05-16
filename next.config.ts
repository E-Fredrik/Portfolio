import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let repo = "";
if (isGithubActions) {
  // Extract your repository name from the GITHUB_REPOSITORY environment variable
  // e.g., "username/portfolio" -> "portfolio"
  repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, "") || "";
}

const nextConfig: NextConfig = {
  // config options here 
  reactCompiler: true,
  
  // 1. Enable Static Export
  output: "export",

  // 2. Disable Image Optimization for next/image
  images: {
    unoptimized: true,
  },

  // 3. Set basePath if deployed to username.github.io/repo-name
  // (Remove this if you are using a custom domain)
  basePath: repo ? `/${repo}` : "",
  assetPrefix: repo ? `/${repo}/` : "",
};

export default nextConfig;
