/**
 * Helper to ensure static assets (images, PDFs) work correctly on both:
 * - Vercel / Localhost (root: "")
 * - GitHub Pages (basePath: "/Portfolio")
 */
export function getAssetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("mailto:")) {
    return path;
  }

  const isGhPages =
    process.env.NEXT_PUBLIC_DEPLOY_TARGET === "gh-pages";

  const basePath = isGhPages ? "/Portfolio" : "";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (basePath && normalizedPath.startsWith(basePath)) {
    return normalizedPath;
  }

  return `${basePath}${normalizedPath}`;
}
