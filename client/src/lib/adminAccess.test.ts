import { describe, expect, it } from "vitest";
import { resolveAdminAccess } from "./adminAccess";

describe("resolveAdminAccess", () => {
  it("keeps the shell loading while the session is unknown", () => {
    expect(resolveAdminAccess(true, null)).toBe("loading");
  });

  it("sends unauthenticated visitors to the login screen", () => {
    expect(resolveAdminAccess(false, null)).toBe("login");
  });

  it("shows access denied to non-admin users and opens the dashboard for admins", () => {
    expect(resolveAdminAccess(false, { role: "user" })).toBe("denied");
    expect(resolveAdminAccess(false, { role: "admin" })).toBe("allowed");
  });
});
