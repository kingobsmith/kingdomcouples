"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import { renderDashboardTab } from "@/components/DashboardSections";

export default function FamilyDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user && user.role !== "family" && user.role !== "admin") {
      router.push(`/dashboard/${user.role}`);
    }
    if (!loading && user && !user.onboardingComplete) router.push("/onboarding");
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <DashboardShell
      lane="family"
      title={user.householdName || "Family Side Dashboard"}
      subtitle="Households connect with households"
    >
      {(tab) => renderDashboardTab(tab, "family")}
    </DashboardShell>
  );
}
