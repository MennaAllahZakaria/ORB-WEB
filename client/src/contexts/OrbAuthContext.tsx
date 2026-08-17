import { ApiUser, fullName, orbApi } from "@/lib/orbApi";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

type RailwayLogin = { token: string; user: ApiUser; isProfileCompleted?: boolean };
type OrbAuthValue = {
  ready: boolean;
  user: ApiUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<ApiUser>;
  loginWithGoogleCredential: (credential: string) => Promise<ApiUser>;
  logout: () => void;
};

const TOKEN_KEY = "orb-railway-token";
const USER_KEY = "orb-railway-user";
const OrbAuthContext = createContext<OrbAuthValue | null>(null);

function readStoredSession() {
  try {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const userJson = sessionStorage.getItem(USER_KEY);
    return { token, user: userJson ? (JSON.parse(userJson) as ApiUser) : null };
  } catch {
    return { token: null, user: null };
  }
}

export function OrbAuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<ApiUser | null>(null);

  useEffect(() => {
    const stored = readStoredSession();
    setToken(stored.token);
    setUser(stored.user);
    setReady(true);
  }, []);

  const persist = useCallback((session: RailwayLogin) => {
    sessionStorage.setItem(TOKEN_KEY, session.token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(session.user));
    setToken(session.token);
    setUser(session.user);
    return session.user;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await orbApi<RailwayLogin>("/auth/login", { method: "POST", body: { email, password } });
    const session = (response.data ?? response) as RailwayLogin;
    if (!session.token || !session.user) throw new Error("استجابة تسجيل الدخول غير مكتملة.");
    return persist(session);
  }, [persist]);

  const loginWithGoogleCredential = useCallback(async (credential: string) => {
    const response = await orbApi<RailwayLogin>("/auth/google-login", { method: "POST", body: { token: credential } });
    const session = (response.data ?? response) as RailwayLogin;
    if (!session.token || !session.user) throw new Error("استجابة Google غير مكتملة.");
    return persist(session);
  }, [persist]);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ ready, user, token, login, loginWithGoogleCredential, logout }), [ready, user, token, login, loginWithGoogleCredential, logout]);
  return <OrbAuthContext.Provider value={value}>{children}</OrbAuthContext.Provider>;
}

export function useOrbAuth() {
  const context = useContext(OrbAuthContext);
  if (!context) throw new Error("useOrbAuth must be used inside OrbAuthProvider");
  return context;
}

export function useOrbAdminLabel() {
  const { user } = useOrbAuth();
  return fullName(user);
}
