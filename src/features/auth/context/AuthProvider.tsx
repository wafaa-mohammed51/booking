import { useCallback, useMemo, useState, type ReactNode } from "react";
import { tokenStorage } from "@/features/auth/utils/tokenStorage";
import type { User } from "@/features/auth/types/auth";
import { AuthContext, type AuthContextValue } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  //persistant login
  const [token, setToken] = useState<string | null>(
    () => tokenStorage.getToken(), //lqzy initialize to avoid flicker
  );
  const [user, setUser] = useState<User | null>(() => tokenStorage.getUser());

  const login = useCallback(
    //make reference for function between renders
    (newToken: string, newUser: User, remember: boolean) => {
      tokenStorage.setToken(newToken, remember);
      tokenStorage.setUser(newUser, remember);
      setToken(newToken);
      setUser(newUser);
    },
    [],
  );

  const logout = useCallback(() => {
    tokenStorage.clear();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, token, isAuthenticated: Boolean(token), login, logout }),
    [user, token, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
