"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Lane, UserProfile } from "@/lib/types";
import { Tab } from "./DashboardShell";

export function OverviewSection({ lane }: { lane: Lane }) {
  const { user, events, connections, prayers } = useAuth();
  const laneEvents = events.filter((e) => e.lane === lane || e.lane === "all");
  const pendingConnections = connections.filter(
    (c) => c.toId === user?.id && c.status === "pending"
  );

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold text-kingdom-navy mb-2">
          Welcome, {user?.name}
        </h2>
        <p className="text-gray-600">
          This is your Kingdom space. Connect, pray, fellowship, and grow with believers who share your season of life.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-bold text-kingdom-navy">{pendingConnections.length}</p>
          <p className="text-sm text-gray-500 mt-1">Pending Requests</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-kingdom-sage">{prayers.length}</p>
          <p className="text-sm text-gray-500 mt-1">Prayer Requests</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-kingdom-gold">{laneEvents.length}</p>
          <p className="text-sm text-gray-500 mt-1">Upcoming Events</p>
        </div>
      </div>

      <div className="card">
        <h3 className="font-bold text-kingdom-navy mb-3">Quick Actions</h3>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li>Complete your profile and church affiliation</li>
          <li>Share your testimony to help others know your heart</li>
          <li>Browse upcoming fellowship events in your lane</li>
          <li>Send connection requests to build your community</li>
        </ul>
      </div>
    </div>
  );
}

export function ProfileSection() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateProfile({ name, bio });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-kingdom-navy mb-6">Profile Setup</h2>
      <form onSubmit={handleSave} className="space-y-4 max-w-lg">
        <div>
          <label className="label">Full Name</label>
          <input className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input-field bg-gray-50" value={user?.email || ""} disabled />
        </div>
        <div>
          <label className="label">Short Bio</label>
          <textarea
            className="input-field min-h-[100px]"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell the community a little about yourself..."
          />
        </div>
        <button type="submit" className="btn-primary">
          {saved ? "Saved!" : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

export function ChurchSection() {
  const { user, updateProfile } = useAuth();
  const [church, setChurch] = useState(user?.church || "");
  const [denomination, setDenomination] = useState(user?.denomination || "");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateProfile({ church, denomination });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-kingdom-navy mb-6">Church Affiliation</h2>
      <form onSubmit={handleSave} className="space-y-4 max-w-lg">
        <div>
          <label className="label">Home Church</label>
          <input
            className="input-field"
            value={church}
            onChange={(e) => setChurch(e.target.value)}
            placeholder="e.g. Grace Community Church"
          />
        </div>
        <div>
          <label className="label">Denomination / Tradition</label>
          <input
            className="input-field"
            value={denomination}
            onChange={(e) => setDenomination(e.target.value)}
            placeholder="e.g. Non-denominational, Baptist, Pentecostal..."
          />
        </div>
        <button type="submit" className="btn-primary">
          {saved ? "Saved!" : "Save Church Info"}
        </button>
      </form>
    </div>
  );
}

export function TestimonySection() {
  const { user, updateProfile } = useAuth();
  const [testimony, setTestimony] = useState(user?.testimony || "");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateProfile({ testimony });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-kingdom-navy mb-2">Testimony & Bio</h2>
      <p className="text-gray-500 text-sm mb-6">
        Share your faith journey. This helps others connect with your heart, not just your profile.
      </p>
      <form onSubmit={handleSave} className="space-y-4">
        <textarea
          className="input-field min-h-[200px]"
          value={testimony}
          onChange={(e) => setTestimony(e.target.value)}
          placeholder="How did you come to know Christ? What is God doing in your life today?"
        />
        <button type="submit" className="btn-primary">
          {saved ? "Saved!" : "Save Testimony"}
        </button>
      </form>
    </div>
  );
}

export function FamilyDetailsSection() {
  const { user, updateProfile } = useAuth();
  const [householdName, setHouseholdName] = useState(user?.householdName || "");
  const [childrenCount, setChildrenCount] = useState(user?.childrenCount || "");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateProfile({ householdName, childrenCount });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-kingdom-navy mb-6">Family Details</h2>
      <form onSubmit={handleSave} className="space-y-4 max-w-lg">
        <div>
          <label className="label">Household Name</label>
          <input
            className="input-field"
            value={householdName}
            onChange={(e) => setHouseholdName(e.target.value)}
            placeholder="e.g. The Johnson Family"
          />
        </div>
        <div>
          <label className="label">Number of Children</label>
          <input
            className="input-field"
            value={childrenCount}
            onChange={(e) => setChildrenCount(e.target.value)}
            placeholder="e.g. 3"
          />
        </div>
        {user?.familyMembers && user.familyMembers.length > 0 && (
          <div>
            <label className="label">Household Members</label>
            <ul className="space-y-2">
              {user.familyMembers.map((m) => (
                <li key={m.id} className="bg-gray-50 rounded-lg px-4 py-3 text-sm">
                  <span className="font-semibold">{m.name}</span>
                  <span className="text-gray-500 ml-2">({m.relationship})</span>
                  <span className="text-gray-400 block text-xs mt-1">{m.email}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button type="submit" className="btn-primary">
          {saved ? "Saved!" : "Save Family Details"}
        </button>
      </form>
    </div>
  );
}

export function CouplesDetailsSection() {
  const { user, updateProfile } = useAuth();
  const [spouseName, setSpouseName] = useState(user?.spouseName || "");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateProfile({ spouseName });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-kingdom-navy mb-6">Couple Details</h2>
      <form onSubmit={handleSave} className="space-y-4 max-w-lg">
        <div>
          <label className="label">Spouse Name</label>
          <input
            className="input-field"
            value={spouseName}
            onChange={(e) => setSpouseName(e.target.value)}
            placeholder="Your spouse's name"
          />
        </div>
        <button type="submit" className="btn-primary">
          {saved ? "Saved!" : "Save Details"}
        </button>
      </form>
    </div>
  );
}

export function PrayerSection() {
  const { prayers, addPrayer, prayFor } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    addPrayer(title, content);
    setTitle("");
    setContent("");
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold text-kingdom-navy mb-4">Submit a Prayer Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Prayer title"
          />
          <textarea
            className="input-field min-h-[80px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your prayer need..."
          />
          <button type="submit" className="btn-primary">Submit Prayer</button>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-kingdom-navy">Community Prayer Wall</h3>
        {prayers.length === 0 && (
          <p className="text-gray-500 text-sm">No prayer requests yet. Be the first to share.</p>
        )}
        {prayers.map((p) => (
          <div key={p.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-kingdom-navy">{p.title}</h4>
                <p className="text-xs text-gray-400 mt-1">by {p.userName}</p>
              </div>
              <button
                onClick={() => prayFor(p.id)}
                className="text-sm bg-kingdom-gold/20 text-kingdom-navy px-3 py-1 rounded-full font-semibold hover:bg-kingdom-gold/40 transition"
              >
                Pray ({p.prayers})
              </button>
            </div>
            <p className="text-gray-600 text-sm mt-3">{p.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EventsSection({ lane }: { lane: Lane }) {
  const { events } = useAuth();
  const laneEvents = events.filter((e) => e.lane === lane || e.lane === "all");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-kingdom-navy">Fellowship & Events</h2>
      {laneEvents.length === 0 && (
        <p className="text-gray-500 text-sm">No upcoming events. Check back soon.</p>
      )}
      {laneEvents.map((e) => (
        <div key={e.id} className="card">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-kingdom-navy">{e.title}</h3>
            <span className="text-sm text-kingdom-gold font-semibold">{e.date}</span>
          </div>
          <p className="text-gray-600 text-sm mt-2">{e.description}</p>
          <div className="flex gap-4 mt-3 text-xs text-gray-400">
            <span>{e.location}</span>
            <span>Hosted by {e.hostName}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ConnectionsSection({ lane }: { lane: Lane }) {
  const { user, allUsers, connections, sendConnection, respondConnection } = useAuth();
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  const members = allUsers.filter(
    (u) => u.lane === lane && u.id !== user?.id && u.role !== "admin"
  );
  const myRequests = connections.filter((c) => c.fromId === user?.id);
  const incoming = connections.filter((c) => c.toId === user?.id);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const target = members.find((m) => m.id === selectedUser);
    if (!target || !message.trim()) return;
    sendConnection(target.id, target.name, message);
    setMessage("");
    setSelectedUser("");
  }

  return (
    <div className="space-y-6">
      {incoming.filter((c) => c.status === "pending").length > 0 && (
        <div className="card">
          <h3 className="font-bold text-kingdom-navy mb-4">Incoming Requests</h3>
          {incoming
            .filter((c) => c.status === "pending")
            .map((c) => (
              <div key={c.id} className="bg-gray-50 rounded-lg p-4 mb-3">
                <p className="font-semibold">{c.fromName}</p>
                <p className="text-sm text-gray-600 mt-1">{c.message}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => respondConnection(c.id, "accepted")}
                    className="btn-primary text-sm py-1.5 px-4"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => respondConnection(c.id, "declined")}
                    className="btn-outline text-sm py-1.5 px-4"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="card">
        <h3 className="font-bold text-kingdom-navy mb-4">Send Connection Request</h3>
        <form onSubmit={handleSend} className="space-y-4 max-w-lg">
          <select
            className="input-field"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">Select a member...</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <textarea
            className="input-field min-h-[80px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Introduce yourself and why you'd like to connect..."
            required
          />
          <button type="submit" className="btn-primary">Send Request</button>
        </form>
      </div>

      {myRequests.length > 0 && (
        <div className="card">
          <h3 className="font-bold text-kingdom-navy mb-4">Your Sent Requests</h3>
          {myRequests.map((c) => (
            <div key={c.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm">{c.message.slice(0, 60)}...</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  c.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : c.status === "declined"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function MessagesSection() {
  const { user, allUsers, messages, sendMessage } = useAuth();
  const [toId, setToId] = useState("");
  const [content, setContent] = useState("");

  const acceptedConnections = allUsers.filter(
    (u) => u.id !== user?.id && u.role !== "admin"
  );
  const myMessages = messages.filter(
    (m) => m.fromId === user?.id || m.toId === user?.id
  );

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const target = acceptedConnections.find((u) => u.id === toId);
    if (!target || !content.trim()) return;
    sendMessage(target.id, target.name, content);
    setContent("");
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="font-bold text-kingdom-navy mb-4">Send a Message</h3>
        <p className="text-xs text-gray-500 mb-4">
          Safe messaging within the Kingdom community. Be respectful and Christ-like in all communication.
        </p>
        <form onSubmit={handleSend} className="space-y-4 max-w-lg">
          <select className="input-field" value={toId} onChange={(e) => setToId(e.target.value)} required>
            <option value="">Select recipient...</option>
            {acceptedConnections.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          <textarea
            className="input-field min-h-[80px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Your message..."
            required
          />
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
      </div>

      <div className="card">
        <h3 className="font-bold text-kingdom-navy mb-4">Message History</h3>
        {myMessages.length === 0 && (
          <p className="text-gray-500 text-sm">No messages yet.</p>
        )}
        {myMessages.map((m) => (
          <div key={m.id} className={`py-3 border-b border-gray-100 last:border-0 ${m.fromId === user?.id ? "" : "bg-blue-50/50 -mx-6 px-6 rounded"}`}>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{m.fromId === user?.id ? `To: ${allUsers.find(u => u.id === m.toId)?.name}` : `From: ${m.fromName}`}</span>
              <span>{new Date(m.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-gray-700 mt-1">{m.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GuidelinesSection() {
  const { submitReport } = useAuth();
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [targetName, setTargetName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleReport(e: React.FormEvent) {
    e.preventDefault();
    submitReport("report-target", targetName, reason, details);
    setSubmitted(true);
    setReason("");
    setDetails("");
    setTargetName("");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold text-kingdom-navy mb-4">Community Guidelines</h2>
        <ul className="space-y-3 text-gray-600 text-sm">
          <li className="flex gap-2"><span className="text-kingdom-gold font-bold">1.</span> Honor God in every interaction. Speak with grace and truth.</li>
          <li className="flex gap-2"><span className="text-kingdom-gold font-bold">2.</span> No worldly dating app behavior. Friendship first, always.</li>
          <li className="flex gap-2"><span className="text-kingdom-gold font-bold">3.</span> Respect boundaries. Consent and modesty matter.</li>
          <li className="flex gap-2"><span className="text-kingdom-gold font-bold">4.</span> Protect families and children. Report anything concerning immediately.</li>
          <li className="flex gap-2"><span className="text-kingdom-gold font-bold">5.</span> No harassment, solicitation, or inappropriate content.</li>
          <li className="flex gap-2"><span className="text-kingdom-gold font-bold">6.</span> Be authentic. Misrepresentation breaks trust in the Body.</li>
          <li className="flex gap-2"><span className="text-kingdom-gold font-bold">7.</span> Moderators may remove content or accounts that violate these standards.</li>
        </ul>
      </div>

      <div className="card">
        <h3 className="font-bold text-kingdom-navy mb-4">Report a Concern</h3>
        <form onSubmit={handleReport} className="space-y-4 max-w-lg">
          <input
            className="input-field"
            value={targetName}
            onChange={(e) => setTargetName(e.target.value)}
            placeholder="Name of person or content to report"
            required
          />
          <select className="input-field" value={reason} onChange={(e) => setReason(e.target.value)} required>
            <option value="">Select reason...</option>
            <option value="inappropriate">Inappropriate behavior</option>
            <option value="harassment">Harassment</option>
            <option value="misrepresentation">Misrepresentation</option>
            <option value="safety">Safety concern</option>
            <option value="other">Other</option>
          </select>
          <textarea
            className="input-field min-h-[80px]"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Describe what happened..."
            required
          />
          <button type="submit" className="btn-primary">
            {submitted ? "Report Submitted" : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
}

export function renderDashboardTab(tab: Tab, lane: Lane, extra?: React.ReactNode) {
  switch (tab) {
    case "overview": return <OverviewSection lane={lane} />;
    case "profile": return <ProfileSection />;
    case "church": return <ChurchSection />;
    case "testimony": return <TestimonySection />;
    case "family": return <FamilyDetailsSection />;
    case "prayer": return <PrayerSection />;
    case "events": return <EventsSection lane={lane} />;
    case "connections": return <ConnectionsSection lane={lane} />;
    case "messages": return <MessagesSection />;
    case "guidelines": return <GuidelinesSection />;
    default: return extra || null;
  }
}
