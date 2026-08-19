import { describe, expect, it } from "vitest";
import { isManusOAuthConfigured } from "./runtimeConfig";

describe("isManusOAuthConfigured", () => {
  it("enables the Manus callback only when the OAuth server and application id exist", () => {
    expect(isManusOAuthConfigured({ OAUTH_SERVER_URL: "https://oauth.example", VITE_APP_ID: "app_123" })).toBe(true);
    expect(isManusOAuthConfigured({ OAUTH_SERVER_URL: "https://oauth.example" })).toBe(false);
    expect(isManusOAuthConfigured({ VITE_APP_ID: "app_123" })).toBe(false);
    expect(isManusOAuthConfigured({})).toBe(false);
  });
});
