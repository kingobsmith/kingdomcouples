"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import { Paywall, renderMemberTab, InterestFormSection } from "@/components/DashboardSections";

export default function CouplesDashboard() {
  const router = useRouter();
  const { member, loading } = useAuth();

  useEffect(() => {
    if (!loading && !member) router.push("/login");
    if (!loading && member && member.role === "admin") router.push("/dashboard/admin");
    if (!loading && member && member.lane !== "couples") router.push(`/dashboard/${member.lane}`);
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
      lane="couples"
      title="Couples Corner"
      subtitle="Christian mingling, prayer, retreats, and accountability"
      extraTabs={[{ id: "lane", label: "Couples Resources" }]}
    >
      {(tab) => renderMemberTab(tab, "couples",
        tab === "lane" ? (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold text-kingdom-navy mb-2">Couples Corner</h2>
              <p className="text-gray-600 text-sm">Retreat calendar, prayer prompts, marriage devotionals, and accountability check-ins.</p>
            </div>
            <InterestFormSection lane="couples" types={[
              { value: "accountability", label: "Accountability Check-in Interest" },
              { value: "general", label: "Couples Event Interest" },
            ]} />
          </div>
        ) : undefined
      )}
    </DashboardShell>
  );
}
