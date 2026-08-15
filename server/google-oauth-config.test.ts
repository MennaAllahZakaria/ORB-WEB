import { describe, expect, it } from "vitest";

const googleClientId = process.env.VITE_GOOGLE_CLIENT_ID ?? "";

describe("Google OAuth configuration", () => {
  it("has a web client ID and can read Google's OpenID discovery document", async () => {
    expect(googleClientId).toMatch(/^[0-9]+-[a-z0-9-]+\.apps\.googleusercontent\.com$/);

    const discoveryUrl = new URL("https://accounts.google.com/.well-known/openid-configuration");
    discoveryUrl.searchParams.set("client_id", googleClientId);

    const response = await fetch(discoveryUrl);
    expect(response.ok).toBe(true);

    const configuration = (await response.json()) as { authorization_endpoint?: string; issuer?: string };
    expect(configuration.issuer).toBe("https://accounts.google.com");
    expect(configuration.authorization_endpoint).toContain("accounts.google.com/o/oauth2");
  });
});
