import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { mockApiFetch, enableMockApi, isMockApiEnabled } from "@/lib/mockApi";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  whatsapp?: string;
  village: string;
  address?: string;
  role: "member" | "admin";
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  whatsapp: string;
  password: string;
  village: string;
  address: string;
}

const API = "/api";

async function apiFetch(path: string, options?: RequestInit) {
  // If mock API is already enabled, use it directly to avoid failed requests
  if (isMockApiEnabled()) {
    return mockApiFetch(path, options);
  }

  try {
    const res = await fetch(`${API}${path}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!res.ok) {
      // If backend is not available, fall back to mock API
      if (res.status === 404 || res.status === 503 || res.status === 502 || res.status === 0) {
        enableMockApi();
        return mockApiFetch(path, options);
      }
      const err = await res.json().catch(() => ({ error: "Request failed" }));
      throw new Error(err.error || "Request failed");
    }
    return res.json();
  } catch (err: any) {
    // Network error or backend not running — use mock API
    if (err.name === "TypeError" || err.message?.includes("Failed to fetch") || err.message?.includes("NetworkError") || err.message?.includes("fetch")) {
      enableMockApi();
      return mockApiFetch(path, options);
    }
    throw err;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const data = await apiFetch("/auth/me");
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMe(); }, []);

  const login = async (email: string, password: string) => {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setUser(data);
  };

  const register = async (formData: RegisterData) => {
    const data = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    setUser(data);
  };

  const logout = async () => {
    await apiFetch("/auth/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refetch: fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { apiFetch };
