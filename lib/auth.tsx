"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  UserProfile,
  ConnectionRequest,
  Message,
  PrayerRequest,
  Event,
  Report,
  Lane,
} from "./types";

const USERS_KEY = "kc_users";
const SESSION_KEY = "kc_session";
const CONNECTIONS_KEY = "kc_connections";
const MESSAGES_KEY = "kc_messages";
const PRAYERS_KEY = "kc_prayers";
const EVENTS_KEY = "kc_events";
const REPORTS_KEY = "kc_reports";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (data: Omit<UserProfile, "id" | "createdAt" | "onboardingComplete" | "approved">) => UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  connections: ConnectionRequest[];
  sendConnection: (toId: string, toName: string, message: string) => void;
  respondConnection: (id: string, status: "accepted" | "declined") => void;
  messages: Message[];
  sendMessage: (toId: string, toName: string, content: string) => void;
  prayers: PrayerRequest[];
  addPrayer: (title: string, content: string) => void;
  prayFor: (id: string) => void;
  events: Event[];
  reports: Report[];
  submitReport: (targetId: string, targetName: string, reason: string, details: string) => void;
  resolveReport: (id: string, status: "reviewed" | "resolved") => void;
  allUsers: UserProfile[];
  approveUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEFAULT_EVENTS: Event[] = [
  {
    id: "e1",
    title: "Kingdom Family Picnic",
    description: "Bring your household for food, fellowship, and fun in the park.",
    date: "2026-08-15",
    location: "Riverside Community Park",
    lane: "family",
    hostName: "Grace Community Church",
  },
  {
    id: "e2",
    title: "Couples Covenant Night",
    description: "An evening of worship, testimony, and couple fellowship.",
    date: "2026-08-22",
    location: "Fellowship Hall",
    lane: "couples",
    hostName: "KingdomCouples Team",
  },
  {
    id: "e3",
    title: "Singles Game Night",
    description: "Board games, snacks, and genuine friendship. No pressure.",
    date: "2026-08-29",
    location: "Community Center",
    lane: "singles",
    hostName: "Singles Ministry Leaders",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState<ConnectionRequest[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [events, setEvents] = useState<Event[]>(DEFAULT_EVENTS);
  const [reports, setReports] = useState<Report[]>([]);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    const sessionId = load<string | null>(SESSION_KEY, null);
    const users = load<UserProfile[]>(USERS_KEY, []);
    setAllUsers(users);
    if (sessionId) {
      const found = users.find((u) => u.id === sessionId);
      if (found) setUser(found);
    }
    setConnections(load(CONNECTIONS_KEY, []));
    setMessages(load(MESSAGES_KEY, []));
    setPrayers(load(PRAYERS_KEY, []));
    setEvents(load(EVENTS_KEY, DEFAULT_EVENTS));
    setReports(load(REPORTS_KEY, []));
    setLoading(false);
  }, []);

  function persistUsers(users: UserProfile[]) {
    save(USERS_KEY, users);
  }

  function login(email: string, password: string): boolean {
    const users = load<UserProfile[]>(USERS_KEY, []);
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (found) {
      setUser(found);
      save(SESSION_KEY, found.id);
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }

  function register(
    data: Omit<UserProfile, "id" | "createdAt" | "onboardingComplete" | "approved">
  ): UserProfile {
    const users = load<UserProfile[]>(USERS_KEY, []);
    const newUser: UserProfile = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      onboardingComplete: false,
      approved: data.role === "admin",
    };
    users.push(newUser);
    persistUsers(users);
    setAllUsers(users);
    setUser(newUser);
    save(SESSION_KEY, newUser.id);
    return newUser;
  }

  function updateProfile(updates: Partial<UserProfile>) {
    if (!user) return;
    const users = load<UserProfile[]>(USERS_KEY, []);
    const updated = { ...user, ...updates };
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx >= 0) users[idx] = updated;
    persistUsers(users);
    setAllUsers(users);
    setUser(updated);
  }

  function sendConnection(toId: string, toName: string, message: string) {
    if (!user) return;
    const req: ConnectionRequest = {
      id: crypto.randomUUID(),
      fromId: user.id,
      fromName: user.name,
      toId,
      message,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const updated = [...connections, req];
    setConnections(updated);
    save(CONNECTIONS_KEY, updated);
  }

  function respondConnection(id: string, status: "accepted" | "declined") {
    const updated = connections.map((c) => (c.id === id ? { ...c, status } : c));
    setConnections(updated);
    save(CONNECTIONS_KEY, updated);
  }

  function sendMessage(toId: string, toName: string, content: string) {
    if (!user) return;
    const msg: Message = {
      id: crypto.randomUUID(),
      fromId: user.id,
      fromName: user.name,
      toId,
      content,
      createdAt: new Date().toISOString(),
      read: false,
    };
    const updated = [...messages, msg];
    setMessages(updated);
    save(MESSAGES_KEY, updated);
  }

  function addPrayer(title: string, content: string) {
    if (!user) return;
    const prayer: PrayerRequest = {
      id: crypto.randomUUID(),
      userId: user.id,
      userName: user.name,
      title,
      content,
      createdAt: new Date().toISOString(),
      prayers: 0,
    };
    const updated = [...prayers, prayer];
    setPrayers(updated);
    save(PRAYERS_KEY, updated);
  }

  function prayFor(id: string) {
    const updated = prayers.map((p) => (p.id === id ? { ...p, prayers: p.prayers + 1 } : p));
    setPrayers(updated);
    save(PRAYERS_KEY, updated);
  }

  function submitReport(targetId: string, targetName: string, reason: string, details: string) {
    if (!user) return;
    const report: Report = {
      id: crypto.randomUUID(),
      reporterId: user.id,
      reporterName: user.name,
      targetId,
      targetName,
      reason,
      details,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const updated = [...reports, report];
    setReports(updated);
    save(REPORTS_KEY, updated);
  }

  function resolveReport(id: string, status: "reviewed" | "resolved") {
    const updated = reports.map((r) => (r.id === id ? { ...r, status } : r));
    setReports(updated);
    save(REPORTS_KEY, updated);
  }

  function approveUser(id: string) {
    const users = load<UserProfile[]>(USERS_KEY, []);
    const updated = users.map((u) => (u.id === id ? { ...u, approved: true } : u));
    persistUsers(updated);
    setAllUsers(updated);
    if (user?.id === id) setUser({ ...user, approved: true });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        updateProfile,
        connections,
        sendConnection,
        respondConnection,
        messages,
        sendMessage,
        prayers,
        addPrayer,
        prayFor,
        events,
        reports,
        submitReport,
        resolveReport,
        allUsers,
        approveUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function seedAdminIfNeeded() {
  const users = load<UserProfile[]>(USERS_KEY, []);
  if (!users.find((u) => u.role === "admin")) {
    const admin: UserProfile = {
      id: "admin-001",
      email: "admin@kingdomcouples.co",
      password: "kingdom2026",
      name: "Kingdom Admin",
      lane: "family",
      role: "admin",
      onboardingComplete: true,
      approved: true,
      createdAt: new Date().toISOString(),
    };
    users.push(admin);
    save(USERS_KEY, users);
  }
}
