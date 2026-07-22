"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import { Tab } from "@/components/DashboardShell";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading, allUsers, reports, approveUser, resolveReport } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user && user.role !== "admin") {
      router.push(`/dashboard/${user.role}`);
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  const pendingUsers = allUsers.filter((u) => !u.approved && u.role !== "admin");
  const pendingReports = reports.filter((r) => r.status === "pending");

  function renderTab(tab: Tab) {
    if (tab === "overview") {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card text-center">
              <p className="text-3xl font-bold text-kingdom-navy">{allUsers.length}</p>
              <p className="text-sm text-gray-500 mt-1">Total Members</p>
            </div>
            <div className="card text-center">
              <p className="text-3xl font-bold text-yellow-600">{pendingUsers.length}</p>
              <p className="text-sm text-gray-500 mt-1">Pending Approvals</p>
            </div>
            <div className="card text-center">
              <p className="text-3xl font-bold text-red-600">{pendingReports.length}</p>
              <p className="text-sm text-gray-500 mt-1">Open Reports</p>
            </div>
          </div>
        </div>
      );
    }

    if (tab === "moderation" || tab === "connections") {
      return (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold text-kingdom-navy mb-4">Pending Member Approvals</h2>
            {pendingUsers.length === 0 && (
              <p className="text-gray-500 text-sm">No pending approvals.</p>
            )}
            {pendingUsers.map((u) => (
              <div key={u.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.email} &middot; {u.lane}</p>
                </div>
                <button
                  onClick={() => approveUser(u.id)}
                  className="btn-primary text-sm py-1.5 px-4"
                >
                  Approve
                </button>
              </div>
            ))}
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-kingdom-navy mb-4">Reports</h2>
            {reports.length === 0 && (
              <p className="text-gray-500 text-sm">No reports submitted.</p>
            )}
            {reports.map((r) => (
              <div key={r.id} className="py-3 border-b border-gray-100 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">Report against: {r.targetName}</p>
                    <p className="text-xs text-gray-400">by {r.reporterName} &middot; {r.reason}</p>
                    <p className="text-sm text-gray-600 mt-1">{r.details}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    r.status === "resolved" ? "bg-green-100 text-green-700" :
                    r.status === "reviewed" ? "bg-blue-100 text-blue-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {r.status}
                  </span>
                </div>
                {r.status === "pending" && (
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => resolveReport(r.id, "reviewed")} className="text-xs btn-outline py-1 px-3">
                      Mark Reviewed
                    </button>
                    <button onClick={() => resolveReport(r.id, "resolved")} className="text-xs btn-primary py-1 px-3">
                      Resolve
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-kingdom-navy mb-4">All Members</h2>
            {allUsers.filter(u => u.role !== "admin").map((u) => (
              <div key={u.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 text-sm">
                <div>
                  <span className="font-semibold">{u.name}</span>
                  <span className="text-gray-400 ml-2">({u.lane})</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${u.approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {u.approved ? "Approved" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (tab === "guidelines") {
      return (
        <div className="card">
          <h2 className="text-xl font-bold text-kingdom-navy mb-4">Moderation Guidelines</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Review all new member signups within 48 hours</li>
            <li>Investigate reports promptly and document actions</li>
            <li>Remove accounts that violate community standards</li>
            <li>Ensure family accounts have verified parent/guardian</li>
            <li>Monitor messaging for safety concerns</li>
          </ul>
        </div>
      );
    }

    return (
      <div className="card">
        <p className="text-gray-500 text-sm">Use the Moderation tab to manage approvals and reports.</p>
      </div>
    );
  }

  return (
    <DashboardShell
      lane="admin"
      title="Admin & Moderation"
      subtitle="Manage members, approvals, and community safety"
      extraTabs={[{ id: "moderation" as Tab, label: "Moderation" }]}
    >
      {(tab) => renderTab(tab)}
    </DashboardShell>
  );
}
