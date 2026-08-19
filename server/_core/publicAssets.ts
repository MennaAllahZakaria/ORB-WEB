import path from "node:path";

/**
 * Resolves local image assets that developers place under client/public/images.
 * The directory is served explicitly by the custom Express development server.
 */
export function getLocalPublicImagesPath(baseDirectory = import.meta.dirname) {
  return path.resolve(baseDirectory, "../../client/public/images");
}
