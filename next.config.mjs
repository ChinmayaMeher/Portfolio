/** @type {import('next').NextConfig} */
const isGhPages =
  process.env.NEXT_PUBLIC_DEPLOY_TARGET === "gh-pages" ||
  process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: isGhPages ? "export" : undefined,
  basePath: isGhPages ? "/Portfolio" : "",
  assetPrefix: isGhPages ? "/Portfolio/" : undefined,
  images: {
    unoptimized: isGhPages ? true : false,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
