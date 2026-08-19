import { describe, expect, it } from "vitest";
import { getLocalPublicImagesPath } from "./publicAssets";

describe("getLocalPublicImagesPath", () => {
  it("resolves the project public images directory from the server core", () => {
    expect(getLocalPublicImagesPath("/project/server/_core")).toBe(
      "/project/client/public/images",
    );
  });
});
