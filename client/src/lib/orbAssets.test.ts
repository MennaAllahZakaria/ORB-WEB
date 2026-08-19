import { describe, expect, it } from "vitest";
import { isManusHost, orbImageUrl } from "./orbAssets";

describe("ORB image paths", () => {
  it("uses Manus Storage only on Manus hostnames", () => {
    expect(isManusHost("orbadmin-9cgnzkpn.manus.space")).toBe(true);
    expect(isManusHost("3000-preview.manus.computer")).toBe(true);
    expect(isManusHost("orb-admin-production.up.railway.app")).toBe(false);
    expect(orbImageUrl("orb-official-logo.png", "/manus-storage/orb-official-logo_bf763485.png", "orb-admin-production.up.railway.app")).toBe("/images/orb-official-logo.png");
  });
});
