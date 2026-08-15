export type AdminAccessUser = { role?: "admin" | "user" | null } | null | undefined;

export type AdminAccessState = "loading" | "login" | "denied" | "allowed";

export function resolveAdminAccess(loading: boolean, user: AdminAccessUser): AdminAccessState {
  if (loading) return "loading";
  if (!user) return "login";
  return user.role === "admin" ? "allowed" : "denied";
}
