"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { LANE_INFO, Lane } from "@/lib/types";

type Tab =
  | "overview"
  | "profile"
  | "church"
  | "testimony"
  | "family"
  | "prayer"
  | "events"
  | "messages"
  | "connections"
  | "guidelines"
  | "moderation";

interface DashboardShellProps {
  lane: Lane | "admin";
  title: string;
  subtitle: string;
  children: (activeTab: Tab) => ReactNode;
  extraTabs?: { id: Tab; label: string }[];
}

const BASE_TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "profile", label: "Profile" },
  { id: "church", label: "Church" },
  { id: "testimony", label: "Testimony" },
  { id: "prayer", label: "Prayer" },
  { id: "events", label: "Events" },
  { id: "connections", label: "Connections" },
  { id: "messages", label: "Messages" },
  { id: "guidelines", label: "Guidelines" },
];

export default function DashboardShell({ lane, title, subtitle, children, extraTabs = [] }: DashboardShellProps) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const laneInfo = lane !== "admin" ? LANE_INFO[lane] : null;
  const tabs = [
    ...BASE_TABS,
    ...(lane === "family" ? [{ id: "family" as Tab, label: "Family Details" }] : []),
    ...extraTabs,
  ];

  return (
    <div className="min-h-screen bg-kingdom-cream">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div>
            <Link href="/" className="text-xl font-bold text-kingdom-navy font-serif">
              Kin<span className="text-kingdom-gold">dom</span>Couples
            </Link>
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              {user?.name}
            </span>
            <button onClick={logout} className="text-sm text-kingdom-navy font-semibold hover:underline">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-kingdom-navy">{title}</h1>
          {laneInfo && (
            <p className={`text-sm font-semibold mt-1 ${laneInfo.textColor}`}>{laneInfo.subtitle}</p>
          )}
          {user && !user.approved && user.role !== "admin" && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-yellow-800 text-sm">
              Your account is pending approval. A moderator will review your profile soon.
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <nav className="lg:w-56 flex-shrink-0">
            <div className="card p-3 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                    activeTab === tab.id
                      ? "bg-kingdom-navy text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          <main className="flex-1 min-w-0">{children(activeTab)}</main>
        </div>
      </div>
    </div>
  );
}

export type { Tab };
