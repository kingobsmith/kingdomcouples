"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Lane, SafeMember, PlatformEvent, Resource, Announcement, MEMBERSHIP_PRICE, TRIAL_DAYS } from "@/lib/types";
import { Tab } from "./DashboardShell";
import Link from "next/link";

export function Paywall() {
  const { startCheckout } = useAuth();
  const [error, setError] = useState("");

  async function handlePay() {
    const url = await startCheckout();
    if (url) window.location.href = url;
    else setError("Payment could not be started. Please try again.");
  }

  return (
    <div className="card text-center py-12">
      <h2 className="text-2xl font-bold text-kingdom-navy mb-4">Complete Your Membership</h2>
      <p className="text-gray-600 mb-2">Your account is registered. Start your {TRIAL_DAYS}-day free trial to access the dashboard.</p>
      <p className="text-kingdom-navy font-bold text-xl mb-2">{TRIAL_DAYS}-day free trial</p>
      <p className="text-gray-500 text-sm mb-6">Then ${MEMBERSHIP_PRICE}/month. Promo codes accepted at checkout.</p>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <button onClick={handlePay} className="btn-primary">Start {TRIAL_DAYS}-Day Free Trial</button>
    </div>
  );
}

export function OverviewSection({ lane }: { lane: Lane }) {
  const { member, openBillingPortal } = useAuth();
  const [events, setEvents] = useState<PlatformEvent[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch(`/api/events?lane=${lane}`).then((r) => r.json()).then((d) => setEvents(d.events || []));
    fetch("/api/announcements").then((r) => r.json()).then((d) => setAnnouncements(d.announcements || []));
  }, [lane]);

  async function handleBilling() {
    const url = await openBillingPortal();
    if (url) window.location.href = url;
  }

  if (!member) return null;

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold text-kingdom-navy mb-2">Welcome, {member.fullName}</h2>
        <p className="text-gray-600">Your Kingdom Folk membership dashboard.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card">
          <p className="text-sm text-gray-500">Membership Status</p>
          <p className={`text-lg font-bold ${member.membershipStatus === "active" ? "text-green-600" : "text-yellow-600"}`}>
            {member.complimentaryAccess ? "Complimentary" : member.subscriptionStatus === "trialing" ? "Free Trial" : member.membershipStatus === "active" ? "Active" : member.membershipStatus === "pending_payment" ? "Pending Payment" : "Inactive"}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Your Lane</p>
          <p className="text-lg font-bold text-kingdom-navy capitalize">{member.membershipType} — {lane}</p>
        </div>
      </div>

      {member.membershipStatus === "active" && (
        <div className="card">
          <h3 className="font-bold text-kingdom-navy mb-2">Manage Billing</h3>
          <p className="text-sm text-gray-600 mb-3">Update payment method or cancel your subscription.</p>
          <button onClick={handleBilling} className="btn-outline text-sm">Manage Billing</button>
        </div>
      )}

      {announcements.length > 0 && (
        <div className="card">
          <h3 className="font-bold text-kingdom-navy mb-3">Announcements</h3>
          {announcements.slice(0, 3).map((a) => (
            <div key={a.id} className="border-b border-gray-100 py-3 last:border-0">
              <p className="font-semibold text-sm">{a.title}</p>
              <p className="text-gray-600 text-sm mt-1">{a.content}</p>
            </div>
          ))}
        </div>
      )}

      <div className="card">
        <h3 className="font-bold text-kingdom-navy mb-3">Upcoming Events</h3>
        {events.length === 0 ? (
          <p className="text-gray-500 text-sm">No upcoming events yet. Check back soon.</p>
        ) : (
          events.slice(0, 3).map((e) => (
            <div key={e.id} className="border-b border-gray-100 py-3 last:border-0">
              <p className="font-semibold text-sm">{e.title} <span className="text-kingdom-gold">— {e.date}</span></p>
              <p className="text-gray-600 text-sm">{e.location}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function EventsSection({ lane }: { lane: Lane }) {
  const [events, setEvents] = useState<PlatformEvent[]>([]);
  useEffect(() => {
    fetch(`/api/events?lane=${lane}`).then((r) => r.json()).then((d) => setEvents(d.events || []));
  }, [lane]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-kingdom-navy">Upcoming Kingdom Folk Events</h2>
      {events.length === 0 && <p className="text-gray-500 text-sm">No events scheduled yet.</p>}
      {events.map((e) => (
        <div key={e.id} className="card">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-kingdom-navy">{e.title}</h3>
            <span className="text-sm text-kingdom-gold font-semibold">{e.date}</span>
          </div>
          <p className="text-gray-600 text-sm mt-2">{e.description}</p>
          <p className="text-xs text-gray-400 mt-2">{e.location} — {e.hostName}</p>
        </div>
      ))}
    </div>
  );
}

export function ResourcesSection({ lane }: { lane: Lane }) {
  const [resources, setResources] = useState<Resource[]>([]);
  useEffect(() => {
    fetch(`/api/resources?lane=${lane}`).then((r) => r.json()).then((d) => setResources(d.resources || []));
  }, [lane]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-kingdom-navy">Resources</h2>
      {resources.length === 0 && <p className="text-gray-500 text-sm">Resources coming soon.</p>}
      {resources.map((r) => (
        <div key={r.id} className="card">
          <h3 className="font-bold text-kingdom-navy">{r.title}</h3>
          <p className="text-sm text-gray-500 capitalize">{r.type.replace("-", " ")}</p>
          <p className="text-gray-600 text-sm mt-2">{r.description}</p>
          {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-kingdom-navy text-sm underline mt-2 inline-block">View Resource</a>}
        </div>
      ))}
    </div>
  );
}

export function ProfileSection() {
  const { member, refresh } = useAuth();
  const [form, setForm] = useState<Partial<SafeMember>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (member) setForm({
      fullName: member.fullName, phone: member.phone, city: member.city,
      state: member.state, country: member.country, churchName: member.churchName,
      partnerName: member.partnerName, partnerEmail: member.partnerEmail,
      householdName: member.householdName,
    });
  }, [member]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    await refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-kingdom-navy mb-6">Update Profile</h2>
      <form onSubmit={handleSave} className="space-y-4 max-w-lg">
        {(["fullName", "phone", "city", "state", "country", "churchName"] as const).map((field) => (
          <div key={field}>
            <label className="label capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
            <input className="input-field" value={(form[field] as string) || ""} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
          </div>
        ))}
        <button type="submit" className="btn-primary">{saved ? "Saved!" : "Save Profile"}</button>
      </form>
    </div>
  );
}

export function CovenantSection() {
  return (
    <div className="card space-y-4">
      <h2 className="text-xl font-bold text-kingdom-navy">Community Covenant</h2>
      <ul className="space-y-3 text-gray-600 text-sm">
        <li>Honor God in every interaction. Speak with grace and truth.</li>
        <li>No dating, romance matching, or sexual content. This is fellowship, not a dating service.</li>
        <li>No solicitation, spam, or harassment.</li>
        <li>Respect boundaries. Consent and modesty matter.</li>
        <li>Protect families and children. No minors in adult areas without guardian workflows.</li>
        <li>Be authentic. Misrepresentation breaks trust in the Body.</li>
        <li>Report concerns promptly. Moderators may suspend accounts that violate these standards.</li>
      </ul>
      <Link href="/guidelines" className="text-kingdom-navy text-sm underline">Read full Community Covenant</Link>
    </div>
  );
}

export function SupportSection() {
  const [targetName, setTargetName] = useState("");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleReport(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ targetName, reason, details }) });
    setSubmitted(true);
    setTargetName(""); setReason(""); setDetails("");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold text-kingdom-navy mb-4">Contact Support</h2>
        <p className="text-gray-600 text-sm">Email: <a href="mailto:support@kingdomfolk.co" className="text-kingdom-navy underline">support@kingdomfolk.co</a></p>
      </div>
      <div className="card">
        <h3 className="font-bold text-kingdom-navy mb-4">Report a Concern</h3>
        <form onSubmit={handleReport} className="space-y-4 max-w-lg">
          <input className="input-field" value={targetName} onChange={(e) => setTargetName(e.target.value)} placeholder="Person or situation" required />
          <select className="input-field" value={reason} onChange={(e) => setReason(e.target.value)} required>
            <option value="">Select reason...</option>
            <option value="harassment">Harassment</option>
            <option value="solicitation">Solicitation / Spam</option>
            <option value="inappropriate">Inappropriate behavior</option>
            <option value="dating">Dating / romance matching violation</option>
            <option value="safety">Safety concern</option>
            <option value="other">Other</option>
          </select>
          <textarea className="input-field min-h-[80px]" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Details..." required />
          <button type="submit" className="btn-primary">{submitted ? "Report Submitted" : "Submit Report"}</button>
        </form>
      </div>
    </div>
  );
}

export function InterestFormSection({ lane, types }: { lane: Lane; types: { value: string; label: string }[] }) {
  const [type, setType] = useState(types[0]?.value || "");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/interest", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, message }) });
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-kingdom-navy mb-4">Express Interest</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <select className="input-field" value={type} onChange={(e) => setType(e.target.value)}>
          {types.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <textarea className="input-field min-h-[80px]" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your interest..." required />
        <button type="submit" className="btn-primary">{sent ? "Submitted!" : "Submit"}</button>
      </form>
    </div>
  );
}

export function renderMemberTab(tab: Tab, lane: Lane, laneContent?: React.ReactNode) {
  if (tab === "lane" && laneContent) return laneContent;
  switch (tab) {
    case "overview": return <OverviewSection lane={lane} />;
    case "events": return <EventsSection lane={lane} />;
    case "resources": return <ResourcesSection lane={lane} />;
    case "profile": return <ProfileSection />;
    case "covenant": return <CovenantSection />;
    case "support": return <SupportSection />;
    default: return laneContent || null;
  }
}
