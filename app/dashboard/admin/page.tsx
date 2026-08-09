"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import { SafeMember, PlatformEvent, Resource, Announcement, Report, Lane } from "@/lib/types";
import { Tab } from "@/components/DashboardShell";

export default function AdminDashboard() {
  const router = useRouter();
  const { member, loading } = useAuth();
  const [members, setMembers] = useState<SafeMember[]>([]);
  const [filter, setFilter] = useState("");
  const [events, setEvents] = useState<PlatformEvent[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  const [eventForm, setEventForm] = useState({ title: "", description: "", date: "", location: "", lane: "all" as Lane | "all", hostName: "" });
  const [resourceForm, setResourceForm] = useState({ title: "", description: "", lane: "all" as Lane | "all", type: "general" as Resource["type"], url: "" });
  const [announceForm, setAnnounceForm] = useState({ title: "", content: "", lane: "all" as Lane | "all" });

  useEffect(() => {
    if (!loading && !member) router.push("/login");
    if (!loading && member && member.role !== "admin") router.push(`/dashboard/${member.lane}`);
  }, [member, loading, router]);

  async function loadMembers(f?: string) {
    const url = f ? `/api/admin?type=members&filter=${f}` : "/api/admin?type=members";
    const res = await fetch(url);
    const data = await res.json();
    setMembers(data.members || []);
  }

  async function loadAll() {
    loadMembers(filter);
    const [e, r, a, rep] = await Promise.all([
      fetch("/api/admin?type=events").then((x) => x.json()),
      fetch("/api/admin?type=resources").then((x) => x.json()),
      fetch("/api/admin?type=announcements").then((x) => x.json()),
      fetch("/api/admin?type=reports").then((x) => x.json()),
    ]);
    setEvents(e.events || []);
    setResources(r.resources || []);
    setAnnouncements(a.announcements || []);
    setReports(rep.reports || []);
  }

  useEffect(() => {
    if (member?.role === "admin") loadAll();
  }, [member, filter]);

  if (loading || !member) return null;

  async function adminAction(action: string, payload: Record<string, unknown>) {
    await fetch("/api/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, ...payload }) });
    loadAll();
  }

  function exportMembers() {
    const csv = ["Name,Email,Type,Membership,Subscription,CRM Synced,Stripe Customer,Stripe Sub"]
      .concat(members.map((m) =>
        `${m.fullName},${m.email},${m.membershipType},${m.membershipStatus},${m.subscriptionStatus},${m.crmSynced},${m.stripeCustomerId || ""},${m.stripeSubscriptionId || ""}`
      )).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "kingdom-folk-members.csv";
    a.click();
  }

  function renderTab(tab: Tab) {
    if (tab === "overview") {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card text-center"><p className="text-3xl font-bold text-kingdom-navy">{members.length}</p><p className="text-sm text-gray-500">Members</p></div>
          <div className="card text-center"><p className="text-3xl font-bold text-green-600">{members.filter((m) => m.membershipStatus === "active").length}</p><p className="text-sm text-gray-500">Active</p></div>
          <div className="card text-center"><p className="text-3xl font-bold text-yellow-600">{members.filter((m) => m.membershipStatus === "pending_payment").length}</p><p className="text-sm text-gray-500">Pending</p></div>
          <div className="card text-center"><p className="text-3xl font-bold text-red-600">{reports.filter((r) => r.status === "pending").length}</p><p className="text-sm text-gray-500">Open Reports</p></div>
        </div>
      );
    }

    if (tab === "lane") {
      return (
        <div className="space-y-6">
          <div className="card">
            <div className="flex flex-wrap gap-2 mb-4">
              {["", "single", "couple", "family", "active", "pending", "inactive"].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`text-xs px-3 py-1 rounded-full ${filter === f ? "bg-kingdom-navy text-white" : "bg-gray-100"}`}>
                  {f || "All"}
                </button>
              ))}
              <button onClick={exportMembers} className="text-xs px-3 py-1 rounded-full bg-kingdom-gold text-kingdom-navy font-semibold ml-auto">Export CSV</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-left text-gray-500 border-b">
                  <th className="py-2">Name</th><th>Email</th><th>Type</th><th>Status</th><th>CRM</th><th>Stripe</th><th></th>
                </tr></thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.id} className="border-b border-gray-50">
                      <td className="py-2 font-medium">{m.fullName}</td>
                      <td className="text-gray-500">{m.email}</td>
                      <td>{m.membershipType}</td>
                      <td><span className={`text-xs px-2 py-0.5 rounded-full ${m.membershipStatus === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{m.membershipStatus}</span></td>
                      <td>{m.crmSynced ? "✓" : "✗"}</td>
                      <td className="text-xs text-gray-400">{m.stripeCustomerId?.slice(0, 12) || "—"}</td>
                      <td><button onClick={() => adminAction("grant-free-access", { memberId: m.id })} className="text-xs text-green-600 hover:underline mr-2">Free Access</button><button onClick={() => adminAction("suspend-member", { memberId: m.id })} className="text-xs text-red-600 hover:underline">Suspend</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-kingdom-navy mb-4">Reports</h3>
            {reports.map((r) => (
              <div key={r.id} className="py-3 border-b border-gray-100 text-sm">
                <p className="font-semibold">{r.targetName} — {r.reason}</p>
                <p className="text-gray-500">{r.details}</p>
                {r.status === "pending" && (
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => adminAction("resolve-report", { reportId: r.id, status: "reviewed" })} className="text-xs btn-outline py-1 px-2">Reviewed</button>
                    <button onClick={() => adminAction("resolve-report", { reportId: r.id, status: "resolved" })} className="text-xs btn-primary py-1 px-2">Resolved</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (tab === "events") {
      return (
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-bold text-kingdom-navy mb-4">Create Event</h3>
            <form onSubmit={(e) => { e.preventDefault(); adminAction("create-event", { event: eventForm }); setEventForm({ title: "", description: "", date: "", location: "", lane: "all", hostName: "" }); }} className="space-y-3">
              <input className="input-field" placeholder="Title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required />
              <textarea className="input-field" placeholder="Description" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <input className="input-field" type="date" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} required />
                <select className="input-field" value={eventForm.lane} onChange={(e) => setEventForm({ ...eventForm, lane: e.target.value as Lane | "all" })}>
                  <option value="all">All Lanes</option><option value="singles">Singles</option><option value="couples">Couples</option><option value="family">Family</option>
                </select>
              </div>
              <input className="input-field" placeholder="Location" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} required />
              <input className="input-field" placeholder="Host Name" value={eventForm.hostName} onChange={(e) => setEventForm({ ...eventForm, hostName: e.target.value })} required />
              <button type="submit" className="btn-primary text-sm">Add Event</button>
            </form>
          </div>
          {events.map((ev) => (
            <div key={ev.id} className="card flex justify-between"><div><p className="font-semibold">{ev.title}</p><p className="text-sm text-gray-500">{ev.date} — {ev.lane}</p></div></div>
          ))}
        </div>
      );
    }

    if (tab === "resources") {
      return (
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-bold text-kingdom-navy mb-4">Add Resource</h3>
            <form onSubmit={(e) => { e.preventDefault(); adminAction("create-resource", { resource: resourceForm }); setResourceForm({ title: "", description: "", lane: "all", type: "general", url: "" }); }} className="space-y-3">
              <input className="input-field" placeholder="Title" value={resourceForm.title} onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })} required />
              <textarea className="input-field" placeholder="Description" value={resourceForm.description} onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })} required />
              <select className="input-field" value={resourceForm.type} onChange={(e) => setResourceForm({ ...resourceForm, type: e.target.value as Resource["type"] })}>
                <option value="devotional">Devotional</option><option value="game-night">Game Night</option><option value="covenant">Covenant</option><option value="retreat">Retreat</option><option value="general">General</option>
              </select>
              <input className="input-field" placeholder="URL (optional)" value={resourceForm.url} onChange={(e) => setResourceForm({ ...resourceForm, url: e.target.value })} />
              <button type="submit" className="btn-primary text-sm">Add Resource</button>
            </form>
          </div>
          {resources.map((r) => (
            <div key={r.id} className="card"><p className="font-semibold">{r.title}</p><p className="text-sm text-gray-500">{r.type} — {r.lane}</p></div>
          ))}
        </div>
      );
    }

    if (tab === "support") {
      return (
        <div className="card">
          <h3 className="font-bold text-kingdom-navy mb-4">Create Announcement</h3>
          <form onSubmit={(e) => { e.preventDefault(); adminAction("create-announcement", { announcement: announceForm }); setAnnounceForm({ title: "", content: "", lane: "all" }); }} className="space-y-3">
            <input className="input-field" placeholder="Title" value={announceForm.title} onChange={(e) => setAnnounceForm({ ...announceForm, title: e.target.value })} required />
            <textarea className="input-field" placeholder="Content" value={announceForm.content} onChange={(e) => setAnnounceForm({ ...announceForm, content: e.target.value })} required />
            <select className="input-field" value={announceForm.lane} onChange={(e) => setAnnounceForm({ ...announceForm, lane: e.target.value as Lane | "all" })}>
              <option value="all">All</option><option value="singles">Singles</option><option value="couples">Couples</option><option value="family">Family</option>
            </select>
            <button type="submit" className="btn-primary text-sm">Post Announcement</button>
          </form>
        </div>
      );
    }

    return null;
  }

  return (
    <DashboardShell
      lane="admin"
      title="Admin Panel"
      subtitle="Members, events, resources, and moderation"
      extraTabs={[
        { id: "lane", label: "Members & Reports" },
        { id: "events", label: "Manage Events" },
        { id: "resources", label: "Manage Resources" },
        { id: "support", label: "Announcements" },
      ]}
    >
      {(tab) => renderTab(tab)}
    </DashboardShell>
  );
}
