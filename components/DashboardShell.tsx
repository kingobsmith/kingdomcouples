"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { LANE_INFO, Lane } from "@/lib/types";

export type Tab =
  | "overview"
  | "profile"
  | "events"
  | "resources"
  | "covenant"
  | "support"
  | "lane";

interface DashboardShellProps {
  lane: Lane | "admin";
  title: string;
  subtitle: string;
  children: (activeTab: Tab) => ReactNode;
  extraTabs?: { id: Tab; label: string }[];
}

const BASE_TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "events", label: "Events" },
  { id: "resources", label: "Resources" },
  { id: "profile", label: "Update Profile" },
  { id: "covenant", label: "Community Covenant" },
  { id: "support", label: "Contact & Report" },
];

export default function DashboardShell({ lane, title, subtitle, children, extraTabs = [] }: DashboardShellProps) {
  const { member, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const laneInfo = lane !== "admin" ? LANE_INFO[lane] : null;
  const tabs = [...BASE_TABS, ...extraTabs];

  return (
    <div className="min-h-screen bg-kingdom-cream">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div>
            <Link href="/" className="text-xl font-bold text-kingdom-navy font-serif">
              Kingdom <span className="text-kingdom-gold">Folk</span>
            </Link>
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">{member?.fullName}</span>
            <button onClick={() => logout()} className="text-sm text-kingdom-navy font-semibold hover:underline">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-kingdom-navy">{title}</h1>
          {laneInfo && <p className={`text-sm font-semibold mt-1 ${laneInfo.textColor}`}>{laneInfo.subtitle}</p>}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <nav className="lg:w-56 flex-shrink-0">
            <div className="card p-3 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                    activeTab === tab.id ? "bg-kingdom-navy text-white" : "text-gray-600 hover:bg-gray-100"
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
