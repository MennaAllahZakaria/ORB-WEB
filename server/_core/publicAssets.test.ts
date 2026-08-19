import { describe, expect, it } from "vitest";
import { getLocalPublicImagesPath } from "./publicAssets";

describe("getLocalPublicImagesPath", () => {
  it("resolves the editable public image directory in development", () => {
    expect(getLocalPublicImagesPath("/project/server/_core", "development")).toBe(
      "/project/client/public/images",
    );
  });

  it("resolves Vite's copied public images directory in production", () => {
    expect(getLocalPublicImagesPath("/project/dist", "production")).toBe(
      "/project/dist/public/images",
    );
  });
});
