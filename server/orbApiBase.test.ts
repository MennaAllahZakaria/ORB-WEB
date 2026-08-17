import { describe, expect, it } from "vitest";

const apiBaseUrl = process.env.VITE_ORB_API_BASE_URL ?? "";

describe("ORB Railway API base URL", () => {
  it("reaches the configured ORB service and receives its route response", async () => {
    expect(apiBaseUrl).toMatch(/^https:\/\//);

    const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/`);
    expect(response.status).toBe(404);

    const body = (await response.json()) as { status?: string; message?: string };
    expect(body.status).toBe("fail");
    expect(body.message).toContain("Can't find this route");
  }, 10_000);
});
