import path from "node:path";

/**
 * Resolves image assets for the active runtime. Development reads the editable
 * public folder, while the production server reads Vite's copied build output.
 */
export function getLocalPublicImagesPath(
  baseDirectory = import.meta.dirname,
  nodeEnv = process.env.NODE_ENV,
) {
  return nodeEnv === "production"
    ? path.resolve(baseDirectory, "public/images")
    : path.resolve(baseDirectory, "../../client/public/images");
}
