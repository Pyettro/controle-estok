import { ReactNode, createContext, useContext, useMemo, useState } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  userEmail?: string;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const AUTH_KEY = "controle-estok:isAuthenticated";
const EMAIL_KEY = "controle-estok:userEmail";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(AUTH_KEY) === "true";
  });
  const [userEmail, setUserEmail] = useState<string | undefined>(() => {
    if (typeof window === "undefined") return undefined;
    return localStorage.getItem(EMAIL_KEY) ?? undefined;
  });

  const login = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(EMAIL_KEY, email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(undefined);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(EMAIL_KEY);
  };

  const value = useMemo(
    () => ({ isAuthenticated, userEmail, login, logout }),
    [isAuthenticated, userEmail],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
};
