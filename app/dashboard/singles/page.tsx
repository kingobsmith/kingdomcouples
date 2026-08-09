"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import { Paywall, renderMemberTab, InterestFormSection } from "@/components/DashboardSections";

export default function SinglesDashboard() {
  const router = useRouter();
  const { member, loading } = useAuth();

  useEffect(() => {
    if (!loading && !member) router.push("/login");
    if (!loading && member && member.role === "admin") router.push("/dashboard/admin");
    if (!loading && member && member.lane !== "singles") router.push(`/dashboard/${member.lane}`);
  }, [member, loading, router]);

  if (loading || !member) return null;

  if (member.membershipStatus !== "active") {
    return (
      <div className="min-h-screen bg-kingdom-cream flex items-center justify-center px-4">
        <div className="max-w-lg w-full"><Paywall /></div>
      </div>
    );
  }

  return (
    <DashboardShell
      lane="singles"
      title="Singles Ministry"
      subtitle="Fellowship and community — not dating"
      extraTabs={[{ id: "lane", label: "Singles Fellowship" }]}
    >
      {(tab) => renderMemberTab(tab, "singles",
        tab === "lane" ? (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold text-kingdom-navy mb-2">Singles Fellowship</h2>
              <p className="text-gray-600 text-sm">No dating profiles. No swiping. No romance matching. Just genuine Christian community.</p>
            </div>
            <InterestFormSection lane="singles" types={[
              { value: "small-group", label: "Small Group Interest" },
              { value: "mentorship", label: "Mentorship Interest" },
              { value: "general", label: "General Fellowship Interest" },
            ]} />
          </div>
        ) : undefined
      )}
    </DashboardShell>
  );
}
