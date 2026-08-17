import { parse } from "cookie";
import { timingSafeEqual } from "crypto";
import type { Request } from "express";
import { SignJWT, jwtVerify } from "jose";
import type { User } from "../drizzle/schema";
import { ENV } from "./_core/env";

const SESSION_ISSUER = "orb-web";
const SESSION_AUDIENCE = "orb-admin";

function sessionSecret() {
  if (!ENV.cookieSecret) throw new Error("JWT_SECRET is required for password login");
  return new TextEncoder().encode(ENV.cookieSecret);
}

function fixedTimeEquals(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  return valueBuffer.length === expectedBuffer.length && timingSafeEqual(valueBuffer, expectedBuffer);
}

function localAdminUser(email: string): User {
  const now = new Date();
  return {
    id: 0,
    openId: `local-admin:${email}`,
    name: "مدير ORB",
    email,
    loginMethod: "password",
    role: "admin",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
  };
}

export function authenticatePasswordAdmin(email: string, password: string): User | null {
  const configuredEmail = process.env.ORB_ADMIN_EMAIL?.trim().toLowerCase() ?? "";
  const configuredPassword = process.env.ORB_ADMIN_PASSWORD ?? "";
  const normalizedEmail = email.trim().toLowerCase();

  if (!configuredEmail || !configuredPassword) return null;
  if (!fixedTimeEquals(normalizedEmail, configuredEmail)) return null;
  if (!fixedTimeEquals(password, configuredPassword)) return null;

  return localAdminUser(configuredEmail);
}

export async function createPasswordAdminSession(user: User) {
  return new SignJWT({ kind: "orb-password-admin", email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(SESSION_ISSUER)
    .setAudience(SESSION_AUDIENCE)
    .setSubject(user.openId)
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(sessionSecret());
}

export async function authenticatePasswordSession(req: Request): Promise<User | null> {
  const token = parse(req.headers.cookie ?? "").app_session_id;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, sessionSecret(), {
      issuer: SESSION_ISSUER,
      audience: SESSION_AUDIENCE,
    });
    const configuredEmail = process.env.ORB_ADMIN_EMAIL?.trim().toLowerCase() ?? "";
    const email = typeof payload.email === "string" ? payload.email.toLowerCase() : "";

    if (payload.kind !== "orb-password-admin" || !configuredEmail || email !== configuredEmail) return null;
    return localAdminUser(configuredEmail);
  } catch {
    return null;
  }
}
