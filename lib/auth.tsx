"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { SafeMember } from "./types";

interface AuthContextType {
  member: SafeMember | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  startCheckout: () => Promise<string | null>;
  openBillingPortal: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<SafeMember | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setMember(data.member || null);
    } catch {
      setMember(null);
    }
  }, []);

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  async function login(email: string, password: string): Promise<string | null> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return data.error || "Login failed";
    setMember(data.member);
    return null;
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setMember(null);
  }

  async function startCheckout(): Promise<string | null> {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (!res.ok) return data.error || "Checkout failed";
    return data.url;
  }

  async function openBillingPortal(): Promise<string | null> {
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (!res.ok) return data.error || "Billing portal failed";
    return data.url;
  }

  return (
    <AuthContext.Provider value={{ member, loading, login, logout, refresh, startCheckout, openBillingPortal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
