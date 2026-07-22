"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import { renderDashboardTab, CouplesDetailsSection } from "@/components/DashboardSections";
import { Tab } from "@/components/DashboardShell";

export default function CouplesDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user && user.role !== "couples" && user.role !== "admin") {
      router.push(`/dashboard/${user.role}`);
    }
    if (!loading && user && !user.onboardingComplete) router.push("/onboarding");
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <DashboardShell
      lane="couples"
      title="Couples Corner"
      subtitle="Married couples connect with married couples"
      extraTabs={[{ id: "family" as Tab, label: "Couple Details" }]}
    >
      {(tab) =>
        tab === "family"
          ? <CouplesDetailsSection />
          : renderDashboardTab(tab, "couples")
      }
    </DashboardShell>
  );
}
