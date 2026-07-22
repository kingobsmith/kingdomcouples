"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import { renderDashboardTab } from "@/components/DashboardSections";

export default function SinglesDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user && user.role !== "singles" && user.role !== "admin") {
      router.push(`/dashboard/${user.role}`);
    }
    if (!loading && user && !user.onboardingComplete) router.push("/onboarding");
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <DashboardShell
      lane="singles"
      title="Singles Ministry"
      subtitle="Friends-first Christian connection"
    >
      {(tab) => renderDashboardTab(tab, "singles")}
    </DashboardShell>
  );
}
