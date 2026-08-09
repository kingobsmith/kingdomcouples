"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import { Paywall, renderMemberTab, InterestFormSection } from "@/components/DashboardSections";

export default function FamilyDashboard() {
  const router = useRouter();
  const { member, loading } = useAuth();

  useEffect(() => {
    if (!loading && !member) router.push("/login");
    if (!loading && member && member.role === "admin") router.push("/dashboard/admin");
    if (!loading && member && member.lane !== "family") router.push(`/dashboard/${member.lane}`);
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
      lane="family"
      title={member.householdName || "Family Side"}
      subtitle="Devotionals, game nights, household covenants, and community"
      extraTabs={[{ id: "lane", label: "Family Resources" }]}
    >
      {(tab) => renderMemberTab(tab, "family",
        tab === "lane" ? (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold text-kingdom-navy mb-2">Family Side</h2>
              <p className="text-gray-600 text-sm">Family devotionals, game-night resources, household covenants, and family events.</p>
              {member.numberOfAdults && (
                <p className="text-sm text-gray-500 mt-2">Household: {member.numberOfAdults} adults, {member.numberOfChildren || 0} children</p>
              )}
            </div>
            <InterestFormSection lane="family" types={[
              { value: "general", label: "Family Event Interest" },
            ]} />
          </div>
        ) : undefined
      )}
    </DashboardShell>
  );
}
