import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { COOKIE_NAME } from "../shared/const";

type CookieCall = { name: string; value: string; options: Record<string, unknown> };

function passwordLoginContext(): { ctx: TrpcContext; cookies: CookieCall[] } {
  const cookies: CookieCall[] = [];
  return {
    ctx: {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: { cookie: (name: string, value: string, options: Record<string, unknown>) => cookies.push({ name, value, options }) } as TrpcContext["res"],
    },
    cookies,
  };
}

describe("auth.passwordLogin", () => {
  it("accepts the configured admin credentials and creates a secure session cookie", async () => {
    const email = process.env.ORB_ADMIN_EMAIL ?? "";
    const password = process.env.ORB_ADMIN_PASSWORD ?? "";
    expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(password.length).toBeGreaterThanOrEqual(8);

    const { ctx, cookies } = passwordLoginContext();
    const caller = appRouter.createCaller(ctx);
    const user = await caller.auth.passwordLogin({ email, password });

    expect(user.role).toBe("admin");
    expect(cookies).toHaveLength(1);
    expect(cookies[0]?.name).toBe(COOKIE_NAME);
    expect(cookies[0]?.value).toBeTruthy();
    expect(cookies[0]?.options).toMatchObject({ httpOnly: true, path: "/", sameSite: "none", secure: true });
  });
});
